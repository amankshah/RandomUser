// Function to generate a random Canadian SIN
// function generateRandomSIN() {
//   let sin = "";

//   // Generate the first digit (between 1 and 8 for individuals, 9 for temporary residents)
//   sin += Math.floor(Math.random() * 9) + 1;

//   // Generate the next 8 digits
//   for (let i = 0; i < 8; i++) {
//     sin += Math.floor(Math.random() * 10);
//   }

//   // Calculate the check digit
//   const sinDigits = sin.split("").map(Number);
//   let sum = 0;

//   for (let i = 0; i < 9; i++) {
//     let digit = sinDigits[i];
//     if (i % 2 !== 0) {
//       digit *= 2;
//       if (digit > 9) {
//         digit -= 9;
//       }
//     }
//     sum += digit;
//   }

//   const checkDigit = (10 - (sum % 10)) % 10;
//   sin = sin.slice(0, -1) + checkDigit; // Replace the last digit with the calculated check digit

//   return sin;
// }

// function isValidSIN(sin) {
//   if (!sin || sin.length !== 9 || isNaN(sin)) {
//     return false;
//   }

//   const sinDigits = sin.split("").map(Number);
//   let sum = 0;

//   for (let i = 0; i < 9; i++) {
//     let digit = sinDigits[i];
//     if (i % 2 !== 0) {
//       digit *= 2;
//       if (digit > 9) {
//         digit -= 9;
//       }
//     }
//     sum += digit;
//   }

//   return sum % 10 === 0;
// }

// function ValidSinNumber() {
//   let sin = generateRandomSIN();

//   // Check validity and regenerate if it's not valid
//   while (!isValidSIN(sin)) {
//     sin = generateRandomSIN();
//   }

//   return sin;
// }

function isEnglish(value) {
  // Regular expression to match English letters (case-insensitive)
  const englishRegex = /^[A-Za-z]+$/;

  // Test if the value contains only English letters
  return englishRegex.test(value);
}

// Example usage:
//   const inputValue = "Hello";
//   const isInEnglish = isEnglish(inputValue);
//   console.log(`${inputValue} is in English: ${isInEnglish}`);

// Function to generate a random Canadian SIN
function generateRandomSIN() {
  let sin = "";

  // Generate the first digit (between 1 and 8 for individuals, 9 for temporary residents)
  sin += Math.floor(Math.random() * 9) + 1;

  // Generate the next 8 digits
  for (let i = 0; i < 8; i++) {
    sin += Math.floor(Math.random() * 10);
  }

  // Calculate the check digit
  const sinDigits = sin.split("").map(Number);
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    let digit = sinDigits[i];
    if (i % 2 !== 0) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  sin = sin.slice(0, -1) + checkDigit; // Replace the last digit with the calculated check digit

  return sin;
}

/// Function to fetch random names from the Random User Generator API
async function fetchRandomNames(numEmployees) {
  try {
    const response = await fetch(
      `https://randomuser.me/api/?results=${numEmployees}&nat=eu&inc=name&noinfo&lang=en`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Function to create the employee table with the given number of employees and their names fetched from the API
async function createEmployeeTable(numEmployees) {
  const table = document.getElementById("employeeData");
  table.innerHTML = ""; // Clear previous data

  const employees = await fetchRandomNames(numEmployees);

  employees.forEach((employee) => {
    const firstName = employee.name.first;
    const lastName = employee.name.last;
    // const lastName = "Smith";
    const sin = generateRandomSIN();

    const row = `<tr>
                    <td>${firstName}</td>
                    <td>${lastName}</td>
                    <td>${sin}</td>
                  </tr>`;
    table.innerHTML += row;
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
  const ws = XLSX.utils.table_to_sheet(table);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "EmployeeData");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  downloadFile(wbout, "employee_data.xlsx");
}

// Function to download data as CSV file
function downloadDataAsCSV() {
  const table = document.getElementById("employeeTable");
  const csv = Array.from(table.rows)
    .map((row) =>
      Array.from(row.cells)
        .map((cell) => cell.innerText)
        .join(",")
    )
    .join("\n");
  downloadFile(csv, "employee_data.csv", "text/csv");
}

// Function to initiate download
function downloadFile(data, filename, type = "application/octet-stream") {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Event listeners for download buttons
document
  .getElementById("downloadBtnXLSX")
  .addEventListener("click", downloadDataAsExcel);
document
  .getElementById("downloadBtnCSV")
  .addEventListener("click", downloadDataAsCSV);
