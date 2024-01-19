// Function to generate a random Canadian SIN
function generateRandomSIN() {
    // (Your existing SIN generation code)
  }
  
  // Function to check if a value is in English
  function isEnglish(value) {
    // Regular expression to match English letters (case-insensitive)
    const englishRegex = /^[A-Za-z]+$/;
  
    // Test if the value contains only English letters
    return englishRegex.test(value);
  }
  
  // Function to fetch random names from the Random User Generator API
  async function fetchRandomNames(numEmployees) {
    // (Your existing code for fetching random names)
  }
  
  // Function to create the employee table with the given number of employees and their names fetched from the API
  async function createEmployeeTable(numEmployees) {
    const table = document.getElementById("employeeData");
    table.innerHTML = ""; // Clear previous data
  
    const employees = await fetchRandomNames(numEmployees);
  
    employees.forEach((employee) => {
      const firstName = employee.name.first;
      const lastName = employee.name.last;
      const sin = generateRandomSIN();
      const address = "Hidden Address"; // Example value, not displayed in HTML
      const employer = "Hidden Employer"; // Example value, not displayed in HTML
      const civilStatus = "Hidden Civil Status"; // Example value, not displayed in HTML
  
      const row = `<tr>
                      <td>${firstName}</td>
                      <td>${lastName}</td>
                      <td>${sin}</td>
                   </tr>`;
  
      // Append the row to the table
      table.innerHTML += row;
  
      // Store additional data in a hidden row for Excel export
      const hiddenRow = `<tr style="display: none;">
                           <td>${address}</td>
                           <td>${employer}</td>
                           <td>${civilStatus}</td>
                         </tr>`;
      table.innerHTML += hiddenRow;
    });
  }
  
  // Event listener for the Generate button
  document.getElementById("generateBtn").addEventListener("click", function () {
    const numEmployees = parseInt(
      document.getElementById("numEmployees").value,
      10
    );
    createEmployeeTable(numEmployees);
  });
  
  // Function to download data as Excel file
  function downloadDataAsExcel() {
    const table = document.getElementById("employeeTable");
  
    // Add the additional hidden rows to the table
    // (You can dynamically add this based on your data)
    const additionalRows = `
      <tr style="display: none;">
        <td>Hidden Address</td>
        <td>Hidden Employer</td>
        <td>Hidden Civil Status</td>
      </tr>
    `;
    table.innerHTML += additionalRows;
  
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "EmployeeData");
  
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  
    // Remove the added hidden rows after creating the Excel file
    table.innerHTML = table.innerHTML.replace(additionalRows, '');
  
    downloadFile(wbout, "employee_data.xlsx");
  }
  
  // (Your existing code for downloading CSV)
  
  // Event listeners for download buttons
  document
    .getElementById("downloadBtnXLSX")
    .addEventListener("click", downloadDataAsExcel);
  document
    .getElementById("downloadBtnCSV")
    .addEventListener("click", downloadDataAsCSV);
  
  // (Your existing code for initiating download)
  