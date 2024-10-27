
<h1  align="center">

<img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZJWDIJeEpYRO5v3nTiDd4h1VhHsyCtDcnjw&s"  alt="OTDR-PDF-TO-EXCEL"  width="300"  height="300">

</h1>

  

<h1  align="center">

OTDR-Results-Extract - React & FastAPI Application

</h1>

  

## Main Tools Used

  

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

![pdfplumber](https://img.shields.io/badge/pdfplumber-007ACC?style=for-the-badge)

![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)

![OpenPyXL](https://img.shields.io/badge/OpenPyXL-404D59?style=for-the-badge)

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

  

## Introduction

  

The **OTDR-Results-Extract** is a web-based tool built using **React** for the frontend and **FastAPI** for the backend. It processes PDF reports containing OTDR (Optical Time Domain Reflectometer) results and exports them into formatted Excel files. This application allows users to upload multiple PDFs, extract span length and span loss data, and download the results in a structured Excel format. It streamlines the analysis of optical network test results, making data handling efficient and user-friendly.

  

**THIS IS AN INTERNAL TOOL USED BY SLC. NOT ALL FEATURES ARE INCLUDED.**

  

## Running Application

1.  **Clone the Repository:**
	```bash
	git clone https://github.com/jardo5/otdr-results-extract.git
	cd otdr-results-extract
	```

2.  **Install Docker and Docker Compose**
 
3. ```
	Using the terminal cd into otdr-results-extract and docker-compose up. 
	```
  
  

## Features

  

-  **PDF Upload:** Easily upload single or multiple OTDR PDF reports.

-  **Data Extraction:** Automatically extract key metrics such as span length and span loss.

-  **Excel Export:** Download the extracted data in a well-formatted Excel file.

-  **User-Friendly Interface:** Intuitive UI built with React for seamless user experience.

-  **Error Handling:** Robust error detection and informative messages for invalid inputs or extraction issues.

-  **Customization:** Option to select specific data fields for extraction based on user needs.

  
  

The application is divided into two main components:

  

1.  **Frontend (React):**

- Handles the user interface and user interactions.

- Communicates with the backend API to upload PDFs and download Excel files.

  

2.  **Backend (FastAPI):**

- Processes the uploaded PDFs using `pdfplumber`.

- Extracts relevant OTDR data and formats it using `pandas` and `openpyxl`.

- Provides API endpoints for the frontend to interact with.

  

## Dependencies

  

The OTDR-PDF-TO-EXCEL relies on the following key dependencies:

  

**Core Libraries:**

- [React](https://reactjs.org/) - For building the user interface.

- [FastAPI](https://fastapi.tiangolo.com/) - For building the backend API.

- [Python](https://www.python.org/) - The primary programming language.

  

**Data Processing:**

- [pdfplumber](https://github.com/jsvine/pdfplumber) - For extracting text and data from PDF files.

- [Pandas](https://pandas.pydata.org/) - For data manipulation and analysis.

- [OpenPyXL](https://openpyxl.readthedocs.io/en/stable/) - For creating and managing Excel files.

  

**Development Tools:**

- [pip](https://pip.pypa.io/en/stable/) - For managing Python packages.

- [virtualenv](https://virtualenv.pypa.io/en/latest/) (optional) - For creating isolated Python environments.

- [Vite](https://vitejs.dev/) - For frontend tooling and development.

- [Axios](https://axios-http.com/) - For making HTTP requests in the frontend.

- [Flowbite React](https://flowbite-react.com/) - For UI components.

  

## Be Aware

  

-  **PDF Format Consistency:**

Ensure that the OTDR PDF reports follow a consistent format. Variations in the report structure may affect data extraction accuracy.

  

-  **File Size Limits:**

Uploading very large PDF files or a large number of PDFs simultaneously may impact performance. Consider processing files in batches if necessary.

  

-  **Data Privacy:**

Handle sensitive OTDR data responsibly. Ensure that the extracted data is stored and shared securely, especially if deployed on a public server.

  

-  **Timeouts and Processing Times:**

Parsing large or complex PDFs may take time, especially on lower-resource hosting environments. Ensure your hosting solution can handle these requirements, or optimize your data extraction logic if necessary.
