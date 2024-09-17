<h1 align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZJWDIJeEpYRO5v3nTiDd4h1VhHsyCtDcnjw&s" alt="OTDR-PDF-TO-EXCEL" width="300" height="300">
</h1>

<h1 align="center">
  OTDR-Results-Extract - Streamlit App
</h1>

## Main Tools Used

![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![pdfplumber](https://img.shields.io/badge/pdfplumber-007ACC?style=for-the-badge)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![OpenPyXL](https://img.shields.io/badge/OpenPyXL-404D59?style=for-the-badge)

## Introduction

The **OTDR-Results-Extract** is a web-based tool built using **Streamlit** that processes PDF reports containing OTDR (Optical Time Domain Reflectometer) results and exports them into formatted Excel files. This app allows users to upload multiple PDFs, extract span length and span loss data, and download the results in a structured Excel format. It streamlines the analysis of optical network test results, making data handling efficient and user-friendly.

**THIS IS AN INTERNAL TOOL USED BY SLC NOT ALL FEATURES ARE INCLUDED**

## Table of Contents

- [Introduction](#introduction)
- [Main Tools Used](#main-tools-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Be Aware](#be-aware)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

- **PDF Upload:** Easily upload single or multiple OTDR PDF reports.
- **Data Extraction:** Automatically extract key metrics such as span length and span loss.
- **Excel Export:** Download the extracted data in a well-formatted Excel file.
- **User-Friendly Interface:** Intuitive UI built with Streamlit for seamless user experience.
- **Error Handling:** Robust error detection and informative messages for invalid inputs or extraction issues.
- **Customization:** Option to select specific data fields for extraction based on user needs.

## Installation

To set up the **OTDR-Results-Extract**, follow these steps:

1. **Clone the repository:**

   ~~~bash
   git clone https://github.com/jardo5/OTDR-Results-Extract.git
   cd OTDR-Results-Extract
   ~~~

2. **Create a virtual environment (optional):**

   ~~~bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ~~~

3. **Install the dependencies:**

   ~~~bash
   pip install -r requirements.txt`
   ~~~

4. **Run the application:**

   ~~~bash
   streamlit run app.py
   ~~~

## Usage

1. **Launch the App:**
   After running the `streamlit run app.py` command, your default web browser will open the app interface. If it doesn't, navigate to `http://localhost:8501` in your browser.

2. **Upload PDFs:**
   - Click on the "Browse files" button to select one or multiple OTDR PDF reports from your local machine.

3. **Extract Data:**
   - Once uploaded, the app will automatically process the PDFs and extract the relevant data fields.

4. **Download Excel:**
   - After extraction, click on the "Download Excel" button to save the structured data to your local device.

## Dependencies

The OTDR-PDF-TO-EXCEL relies on the following key dependencies:

**Core Libraries:**
- [Streamlit](https://streamlit.io/) - For building the web application interface.
- [Python](https://www.python.org/) - The primary programming language.

**Data Processing:**
- [pdfplumber](https://github.com/jsvine/pdfplumber) - For extracting text and data from PDF files.
- [Pandas](https://pandas.pydata.org/) - For data manipulation and analysis.
- [OpenPyXL](https://openpyxl.readthedocs.io/en/stable/) - For creating and managing Excel files.

**Development Tools:**
- [pip](https://pip.pypa.io/en/stable/) - For managing Python packages.
- [virtualenv](https://virtualenv.pypa.io/en/latest/) (optional) - For creating isolated Python environments.

## Configuration

If needed, adjust the following configurations:

- **PDF Parsing Parameters:**
  Modify the `app.py` file to change how PDFs are parsed or to extract additional data fields.

- **Environment Variables:**
  If you plan to deploy the app and need to manage secrets or configurations, consider using environment variables.

## Be Aware

- **PDF Format Consistency:**
  Ensure that the OTDR PDF reports follow a consistent format. Variations in the report structure may affect data extraction accuracy.

- **File Size Limits:**
  Uploading very large PDF files or a large number of PDFs simultaneously may impact performance. Consider processing files in batches if necessary.

- **Data Privacy:**
  Handle sensitive OTDR data responsibly. Ensure that the extracted data is stored and shared securely, especially if deployed on a public server.