/**
 * Slantapp code and properties {www.slantapp.io}
 */
//json parser function
const PrintRest = (m, s, d) => ({message: m, status: s, data: d});
//ascii code generator
const AsciiCodes = function generateChar(length) {
    //populate and store ascii codes
    let charArray = [];
    let code = [];
    for (let i = 33; i <= 126; i++) charArray.push(String.fromCharCode(i));
    //do range random here
    for (let i = 0; i <= length; i++) {
        code.push(charArray[Math.floor(Math.random() * charArray.length - 1)]);
    }
    return code.join("");
}
export default {PrintRest, AsciiCodes}
