import React, { useEffect, useState } from "react";
import { csvFileToArray } from "../../libs/fileUtils";

const ImportCSV: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  const [keys, setKeys] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = event.target.files?.[0];

    setFile(file);

    if (!file) {
      setErrorMessage("No file selected.");
      return;
    }

    if (!file.type.endsWith("csv")) {
      setErrorMessage("Please select a CSV file.");
      return;
    }
  };

  const handleFile = (localFile: File) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const text = e.target.result as string;
      const data = csvFileToArray(text);
      setKeys(data);
    };
    reader.readAsText(localFile);
  };

  useEffect(() => {
    if (file) {
      handleFile(file);
    }
  }, [file]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-5">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center !pt-5 !pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              CSV Only (MAX. 100 keywords)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleFileChange}
          />
        </label>
        <div>
          {errorMessage && <p className="text-red-800">{errorMessage}</p>}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-5">
        {keys.length > 0 && (
          <table>
            <thead>
              <tr>
                <th key={"header"}>Keyword</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((row, index) => (
                <tr key={row}>
                  <td key={index}>{row}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ImportCSV;
