const validateInput = require("./src/validateInput.js");
const checkData = require("./src/checkData.js");

const validateData = validateInput();

validateData ? checkData(validateData.url, validateData.outputPath) : "Error";

module.exports = checkData;