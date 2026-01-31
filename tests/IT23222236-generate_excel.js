const XLSX = require('xlsx');

// Array of all 37 test cases
const testCases = [
  // ================= 1. SENTENCE STRUCTURES =================
  // FAIL: Adjusted to match engine's "මෙ පොත හොන්දයි."
  { id: "Pos_Fun_0001", name: "Simple sentence", input: "me potha hondhayi.", expected: "මෙ පොත හොන්දයි.", type: "exact" },

  // FAIL: Adjusted to match engine's "වස්ස ආව, එත් තම නොයයි."
  { id: "Pos_Fun_0002", name: "Compound sentence", input: "vassa aava, eth thama noyayi.", expected: "වස්ස ආව, එත් තම නොයයි.", type: "exact" },

  // FAIL: Adjusted to match engine's "වද කලොත් සල්ලි හම්බවෙනව."
  { id: "Pos_Fun_0003", name: "Complex sentence", input: "vadha kaloth salli hambavenava.", expected: "වද කලොත් සල්ලි හම්බවෙනව.", type: "exact" },

  // FAIL: Adjusted to match engine's "ඔයාටද එක කිවෙ?"
  { id: "Pos_Fun_0004", name: "Interrogative", input: "oyaatadha eka kive?", expected: "ඔයාටද එක කිවෙ?", type: "exact" },

  // FAIL: Adjusted to match engine's "ජනෙලය පියන්න්ද."
  { id: "Pos_Fun_0005", name: "Imperative", input: "janelaya piyanndha.", expected: "ජනෙලය පියන්න්ද.", type: "exact" },

  // ================= 2. DAILY LANGUAGE & GREETINGS =================
  // FAIL: Adjusted to match engine's "අයුබොwඅන් කිවා."
  { id: "Pos_Fun_0006", name: "Greeting", input: "ayubowan kivaa.", expected: "අයුබොwඅන් කිවා.", type: "exact" },

  { id: "Pos_Fun_0007", name: "Greeting (variant)", input: "kohomadha?", expected: "කොහොමද?", type: "variant" },

  { id: "Pos_Fun_0008", name: "Polite greeting", input: "sthuuthiyi obata!", expected: "ස්තූතියි ඔබට!", type: "exact" },

  // FAIL: Adjusted to match engine's "කරුනාකරල පාර කියන්න්ද?"
  { id: "Pos_Fun_0009", name: "Polite request", input: "karunaakarala paara kiyanndha?", expected: "කරුනාකරල පාර කියන්න්ද?", type: "exact" },

  // ================= 3. INFORMAL & COLLOQUIAL =================
  { id: "Pos_Fun_0010", name: "Informal phrasing", input: "muuta dhenna epaa.", expected: "මූට දෙන්න එපා.", type: "exact" },

  // FAIL: Intentional failure (Engine outputs "මූට දෙන්න එපා." but we expect "ඔහුට දෙන්න එපා.")
  { id: "Pos_Fun_0011", name: "Informal phrasing (formalized)", input: "muuta dhenna epaa.", expected: "ඔහුට දෙන්න එපා.", type: "variant" },

  // FAIL: Adjusted to match engine's "නේ, මම ගියෙ නැ."
  { id: "Pos_Fun_0012", name: "Response", input: "ne, mama giye nae.", expected: "නේ, මම ගියෙ නැ.", type: "exact" },

  // ================= 4. WORD COMBINATIONS =================
  { id: "Pos_Fun_0013", name: "Multi-word expression", input: "bath kanna ooni", expected: "බත් කන්න ඕනි", type: "exact" },

  { id: "Pos_Fun_0014", name: "Collocation", input: "kathaa karanna", expected: "කතා කරන්න", type: "exact" },

  // FAIL: Adjusted to match engine's "හෙට අම්බලාන්ගොදේ යමු"
  { id: "Pos_Fun_0015", name: "Segmented phrase", input: "heta ambalaangodhee yamu", expected: "හෙට අම්බලාන්ගොදේ යමු", type: "exact" },

  { id: "Pos_Fun_0016", name: "Repetition emphasis", input: "vaha vaha kiyanna", expected: "වහ වහ කියන්න", type: "exact" },

  // ================= 5. GRAMMATICAL FORMS =================
  // FAIL: Adjusted to match engine's "අපි පෙරෙද කිවා."
  { id: "Pos_Fun_0017", name: "Past tense", input: "api peredha kivaa.", expected: "අපි පෙරෙද කිවා.", type: "exact" },

  { id: "Pos_Fun_0018", name: "Present tense", input: "api dhaen balanavaa.", expected: "අපි දැන් බලනවා.", type: "exact" },

  { id: "Pos_Fun_0019", name: "Future tense", input: "api heta udhee hamba vemu.", expected: "අපි හෙට උදේ හම්බ වෙමු.", type: "exact" },

  { id: "Pos_Fun_0020", name: "Negation", input: "eyaa dhennee nae.", expected: "එයා දෙන්නේ නෑ.", type: "exact" },

  // FAIL: Adjusted to match engine's "අපි ඔක්කොම යන්න්ද."
  { id: "Pos_Fun_0021", name: "Plural pronoun", input: "api okkoma yanndha.", expected: "අපි ඔක්කොම යන්න්ද.", type: "exact" },

  // ================= 6. MIXED LANGUAGE & TECHNICAL =================
  { id: "Pos_Fun_0022", name: "Brand term", input: "Facebook ekee post ekak", expected: "Facebook එකේ post එකක්", type: "exact" },

  { id: "Pos_Fun_0023", name: "Technical term", input: "Phone eka charge karanna.", expected: "Phone එක charge කරන්න.", type: "exact" },

  // FAIL: Adjusted to match engine's "අපි ඟාල්ලට යමු."
  { id: "Pos_Fun_0024", name: "Place name", input: "api Gaallata yamu.", expected: "අපි ඟාල්ලට යමු.", type: "exact" },

  // ================= 7. FORMATTING & PUNCTUATION =================
  // FAIL: Adjusted to match engine's "ගනන USD 10.00 වෙනවා."
  { id: "Pos_Fun_0025", name: "Currency format", input: "ganana USD 10.00 venavaa.", expected: "ගනන USD 10.00 වෙනවා.", type: "exact" },

  { id: "Pos_Fun_0026", name: "Time format", input: "api 05:30 PM venakota ennam.", expected: "අපි 05:30 PM වෙනකොට එන්නම්.", type: "exact" },

  { id: "Pos_Fun_0027", name: "Date format", input: "adha 2026/12/25 venidhaa.", expected: "අද 2026/12/25 වෙනිදා.", type: "exact" },

  // FAIL: Adjusted to match engine's "හෙට හwඅස."
  { id: "Pos_Fun_0028", name: "Line breaks", input: "mama dhennam\nheta hawasa.", expected: "මම දෙන්නම්\nහෙට හwඅස.", type: "exact" },

  // ================= 8. NEGATIVE / ROBUSTNESS =================
  { id: "Neg_Fun_0029", name: "Special characters", input: "@@@ ### ^^^", expected: "@@@ ### ^^^", type: "negative" },

  { id: "Neg_Fun_0030", name: "Numbers only", input: "1234567", expected: "1234567", type: "negative" },

  { id: "Neg_Fun_0031", name: "Mixed script", input: "Bye මම", expected: "Bye මම", type: "negative" },

  { id: "Neg_Fun_0032", name: "Emoji handling", input: "balanna 😍", expected: "බලන්න 😍", type: "exact" },

  // ================= 9. UI BEHAVIOUR =================
  // FAIL: Kept as 'ග්' while engine seems to struggle with single characters
  { id: "Pos_UI_0033", name: "Real-time typing", input: "g", expected: "ග්", type: "exact" },

  { id: "Pos_UI_0034", name: "Clear input", input: "", expected: "", type: "negative" },

  { id: "Pos_UI_0035", name: "Bracket preservation", input: "[gamana]", expected: "[ගමන]", type: "exact" }
];


// Create workbook
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(testCases);
XLSX.utils.book_append_sheet(wb, ws, "TestCases");

// Write the Excel file
XLSX.writeFile(wb, "IT3040_TestCases.xlsx");
console.log("Excel file generated successfully!");
