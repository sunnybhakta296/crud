import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

function App() {
  const [csvData, setCsvData] = useState([]);
  //   const getHeadings = (data) => {
  //     return Object.keys(data[0]);
  // }

  useEffect(() => {
    fetchCSVData(); // Fetch the CSV data when the component mounts
  }, []); // The empty array ensures that this effect runs only once, like componentDidMount

  const fetchCSVData = () => {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRknOrr1HyeHWcthYAf40otkUuoZ8CM2Czu0ESeghiS-pTSet4Fjgc6oAxarcoHHCmFQe8uI5HjcFBJ/pub?output=csv"; // Replace with your Google Sheets CSV file URL

    axios
      .get(csvUrl) // Use Axios to fetch the CSV data
      .then((response) => {
        const parsedCsvData = parseCSV(response.data); // Parse the CSV data into an array of objects
        setCsvData(parsedCsvData); // Set the fetched data in the component's state
      })
      .catch((error) => {
        console.error("Error fetching CSV data:", error);
      });
  };

  function parseCSV(csvText) {
    // debugger;
    const rows = csvText.split(/\r?\n/); // Use a regular expression to split the CSV text into rows while handling '\r'
    const headers = rows[0].split(","); // Extract headers (assumes the first row is the header row)
    const data = []; // Initialize an array to store the parsed data
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(","); // Use the regular expression to split the row while handling '\r'
      const rowObject = {};
      for (let j = 0; j < headers.length; j++) {
        rowObject[headers[j]] = rowData[j];
      }
      data.push(rowObject);
    }
    console.log(data, " ....dddddddddddddd");
    return data;
  }

  return (
    <div className="App">
      <Table tableData={csvData} />

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header> */}
    </div>
  );
}

export default App;
