from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import pandas as pd
import tempfile
import os
from typing import List
from pathlib import Path
from .utils import extract_otdr_data, insert_data_into_template

app = FastAPI(
    title="OTDR Results Extractor API",
    description="API to extract OTDR data from PDF files and populate Excel templates.",
    version="1.0.0",
)

# Corrected CORS Origins
origins = [
    "https://slcotdr.com",
    "https://www.slcotdr.com",
    "https://otdr-results-extract.vercel.app",
    "http://localhost:3000",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)

# Define wavelength options
WAVELENGTH_OPTIONS = {
    "1310nm & 1550nm": [1310, 1550],
    "1550nm & 1625nm": [1550, 1625],
    "1310nm & 1625nm": [1310, 1625],
    "1310nm, 1550nm & 1625nm": [1310, 1550, 1625],
}

# Define template paths using absolute paths
BASE_DIR = Path(__file__).resolve().parent  # Points to the app directory

TEMPLATE_PATHS = {
    "1310nm & 1550nm": str(BASE_DIR / 'templates' / 'OTDR_Template_1310_1550.xlsx'),
    "1550nm & 1625nm": str(BASE_DIR / 'templates' / 'OTDR_Template_1550_1625.xlsx'),
    "1310nm & 1625nm": str(BASE_DIR / 'templates' / 'OTDR_Template_1310_1625.xlsx'),
    "1310nm, 1550nm & 1625nm": str(BASE_DIR / 'templates' / 'OTDR_Template_All.xlsx')
}

# Maximum file size in bytes (30MB)
MAX_FILE_SIZE = 30 * 1024 * 1024  # 30 MB

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/process")
async def process_otdr_data(
    wavelengths: str = Form(...),
    pdfs: List[UploadFile] = File(...)
):
    """
    Endpoint to process uploaded PDF files and return an updated Excel file.
    """
    # Validate wavelengths
    if wavelengths not in WAVELENGTH_OPTIONS:
        raise HTTPException(status_code=400, detail="Invalid wavelength selection.")

    selected_wavelengths = WAVELENGTH_OPTIONS[wavelengths]

    # Validate and process uploaded files
    if not pdfs:
        raise HTTPException(status_code=400, detail="No PDF files uploaded.")

    # Select the appropriate template
    template_path = TEMPLATE_PATHS.get(wavelengths)
    if not template_path or not os.path.exists(template_path):
        raise HTTPException(status_code=500, detail="Excel template not found.")

    all_data = []
    fiber_counter = 1  # To keep the fiber number continuous across multiple PDFs

    for pdf_file in pdfs:
        try:
            # Save PDF to a temporary file
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_pdf:
                contents = await pdf_file.read()
                if len(contents) > MAX_FILE_SIZE:
                    raise HTTPException(
                        status_code=400,
                        detail=f"File {pdf_file.filename} exceeds the maximum allowed size of 10MB."
                    )
                tmp_pdf.write(contents)
                pdf_path = tmp_pdf.name

            with pdfplumber.open(pdf_path) as pdf:
                for page_num, page in enumerate(pdf.pages, start=1):
                    text = page.extract_text()
                    if not text:
                        # Log or handle pages with no text
                        continue
                    data = extract_otdr_data(text, selected_wavelengths)
                    data['PDF File Name'] = pdf_file.filename
                    data['Fiber #/Page #'] = fiber_counter  # Keep the fiber number continuous
                    fiber_counter += 1  # Increment for next page
                    all_data.append(data)

            # Remove temporary PDF file
            os.remove(pdf_path)

        except Exception as e:
            # Handle exceptions, log if necessary
            raise HTTPException(status_code=500, detail=f"Error processing {pdf_file.filename}: {str(e)}")

    if not all_data:
        raise HTTPException(status_code=400, detail="No data extracted from the uploaded PDFs.")

    # Create DataFrame
    df = pd.DataFrame(all_data)

    # Reorder columns and handle missing Span Loss data
    desired_columns = ['PDF File Name', 'Fiber #/Page #', 'Span Length (ft)'] + \
                      [f'Span Loss {wl}nm (dB)' for wl in selected_wavelengths]

    for col in desired_columns:
        if col not in df.columns:
            df[col] = None  # Assign None if column not present
    df = df[desired_columns]

    # Insert data into Excel Template
    try:
        updated_excel = insert_data_into_template(template_path, df)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error inserting data into Excel template: {str(e)}")

    # Return the updated Excel file as a StreamingResponse
    return StreamingResponse(
        updated_excel,
        media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        headers={'Content-Disposition': 'attachment; filename=Updated_OTDR_Results.xlsx'}
    )