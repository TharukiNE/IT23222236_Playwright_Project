// generate_excel.ts
import * as XLSX from 'xlsx';
import fs from 'fs';

const testCases = [
  {
    "TC ID": "Pos_Fun_0001",
    "Test case name": "Greeting",
    "Input length type": "S",
    "Input": "oyaata kohomadha?",
    "Expected output": "ඔයාට කොහොමද?",
    "Actual output": "ඔයාට කොහොමද?",
    "Status": "Pass",
    "Accuracy justification / Description": "Greeting meaning preserved",
    "What is covered by the test": "Greeting / request / response; Interrogative; S (≤30 characters); Accuracy validation"
  },
  // Add the remaining 36 test cases here
];

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(testCases);
XLSX.utils.book_append_sheet(wb, ws, 'TestCases');
XLSX.writeFile(wb, 'IT23222236_TestCases.xlsx');
console.log('Excel file created!');
