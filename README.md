# hack-excel-sheet
This is a tool used to solve Excel sheet write protection

## Installation

```sh
npm install -g hack-excel-sheet
```

## Usage

```sh
node sheet.js srcExcelFile destExcelFile
```

## Principle

First introduced, EXCEL and XLSX and DOCX the same text. Are using the compressed archive tool to package the directory as a compressed package, and then replace the file extension. As shown above, the XLSX file extracts the directory structure from the ZIP file. And XLSX core data in the XL / worksheet / sheet1.xml.

The sheet.xml is described in the openxml markup language. You can open it directly through a modern browser can see the Format after the xml file. Sheet.xml contents. The file is opened with a browser, it is easy to find the label locked sheet.

```flow
st=>start: unzip xlsx file
e=>end: zip dir to xlsx
e1=>operation: Traversal xlsx/xl/worksheets
e2=>operation: replace tag sheetProtection

st(right)->e1
e1(right)->e2
e2(right)->e
```

## License
[MIT](http://opensource.org/licenses/MIT)

