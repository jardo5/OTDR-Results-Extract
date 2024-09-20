import React, { useState } from "react";
import {
  Navbar,
  Button,
  Label,
  Select,
  Alert,
  FileInput,
  Spinner,
} from "flowbite-react";
import axios from "axios";
import "flowbite";

interface WavelengthOption {
  label: string;
  values: number[];
}

const wavelengthOptions: WavelengthOption[] = [
  { label: "1310nm & 1550nm", values: [1310, 1550] },
  { label: "1550nm & 1625nm", values: [1550, 1625] },
  { label: "1310nm & 1625nm", values: [1310, 1625] },
  { label: "1310nm, 1550nm & 1625nm", values: [1310, 1550, 1625] },
];

function App() {
  const [selectedWavelength, setSelectedWavelength] = useState<string>(
    wavelengthOptions[0].label,
  );
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const handleWavelengthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWavelength(e.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      // Validate file types and sizes here
      const validFiles = filesArray.filter(
        (file) =>
          file.type === "application/pdf" && file.size <= 10 * 1024 * 1024,
      );
      const invalidFiles = filesArray.filter(
        (file) =>
          !(file.type === "application/pdf" && file.size <= 10 * 1024 * 1024),
      );

      if (invalidFiles.length > 0) {
        setError(
          `Some files were rejected. Please upload valid PDF files under 10MB.`,
        );
      } else {
        setError(null);
      }

      setUploadedFiles(validFiles);
    }
  };

  const handleProcess = async () => {
    if (uploadedFiles.length === 0) {
      setError("Please upload at least one PDF file.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setDownloadLink(null);

    const formData = new FormData();
    formData.append("wavelengths", selectedWavelength);
    uploadedFiles.forEach((file) => {
      formData.append(`pdfs`, file, file.name);
    });

    try {
      const response = await axios.post(
        "/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        },
      );

      // Create a download link for the Excel file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);
      setIsProcessing(false);
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "An error occurred during processing.",
      );
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (downloadLink) {
      const link = document.createElement("a");
      link.href = downloadLink;
      link.setAttribute("download", "Updated_OTDR_Results.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      {/* Header */}
      <Navbar fluid={true} rounded={true} className="bg-inherit shadow-md">
        <Navbar.Brand
          href="https://schupps.com"
          target="_blank"
          className="flex items-center justify-center"
        >
          <img
            src="schupps-logo.png"
            className="h-16 sm:h-20 md:h-24 lg:h-28"
            alt="Schupps Logo"
          />
        </Navbar.Brand>
      </Navbar>

      {/* Main Content */}
      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="mb-6 text-center text-4xl font-extrabold text-[#E91F25] sm:text-5xl">
          OTDR Results Extractor to Excel
        </h1>

        {/* Instructions */}
        <section className="mb-8">
          <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
            <p className="mb-4 text-lg">
              Extract <span className="font-bold">.SOR</span> data from OTDR PDF
              reports and create easy copy-and-paste Excel files.
            </p>
            <div className="mb-4">
              <h2 className="mb-2 text-2xl font-semibold">How To:</h2>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  Upload multiple PDF files{" "}
                  <span className="font-bold text-red-500">IN ORDER</span>.
                </li>
                <li>
                  <span className="font-bold text-red-500">
                    SELECT THE CORRECT WAVELENGTHS
                  </span>
                  .
                </li>
                <li>Allow the system time to process the data.</li>
                <li>
                  Download the updated Excel file once processing is complete.
                </li>
                <li>Review and verify the extracted data.</li>
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-semibold">Notes:</h2>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  <strong>Issues?</strong> Please contact George.
                </li>
                <li>My new rate is $700/hr for fixes.</li>
                <li>
                  <span className="font-bold text-red-500">
                    1310 HASN'T BEEN FULLY TESTED YET
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Wavelength Selection */}
        <section className="mb-6">
          <Label
            htmlFor="wavelength"
            value="Select Wavelengths Present in the PDF Data:"
            className="mb-2 block text-lg font-medium"
          />
          <Select
            id="wavelength"
            value={selectedWavelength}
            onChange={handleWavelengthChange}
            className="w-full"
          >
            {wavelengthOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </Select>
        </section>

        {/* File Upload */}
        <section className="mb-6">
          <Label
            htmlFor="file-upload"
            value="Upload PDF Files:"
            className="mb-2 block text-lg font-medium"
          />
          <FileInput
            id="file-upload"
            multiple
            onChange={handleFileChange}
            helperText="Upload PDF files (MAX. 10MB each). Ensure files are in the correct order."
            accept=".pdf"
            className="mb-4"
          />
          {uploadedFiles.length > 0 && (
            <ul className="list-inside list-disc space-y-1 text-gray-300">
              {uploadedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Error Alert */}
        {error && (
          <Alert color="failure" className="mb-6">
            <span>
              <span className="font-medium">Error!</span> {error}
            </span>
          </Alert>
        )}

        {/* Process Button */}
        <div className="mb-6 flex justify-center">
          <Button
            onClick={handleProcess}
            disabled={isProcessing}
            gradientDuoTone="redToYellow"
            className="flex w-full max-w-md items-center justify-center"
          >
            {isProcessing ? (
              <>
                <Spinner size="sm" light={true} />
                <span className="ml-2">Processing...</span>
              </>
            ) : (
              <>🔍 Extract and Populate Data</>
            )}
          </Button>
        </div>

        {/* Download Button */}
        {downloadLink && (
          <div className="mb-6 flex justify-center">
            <Button
              onClick={handleDownload}
              gradientDuoTone="greenToBlue"
              className="w-full max-w-md"
            >
              Download Updated Excel
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;