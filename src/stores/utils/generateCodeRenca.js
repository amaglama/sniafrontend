function generateRandomChar() {
    const isNumber = Math.random() < 0.5;
    if (isNumber) {
      return Math.floor(Math.random() * 10).toString();
    } else {
      const charCode = Math.floor(Math.random() * 26) + 65;
      return String.fromCharCode(charCode);
    }
  }
function generateCode(typeCode){
    const year = (new Date()).getFullYear();
    return `${year}-${typeCode}${generateRandomChar()}${generateRandomChar()}${generateRandomChar()}${generateRandomChar()}${generateRandomChar()}`;
}

export const generatePersonalCode = ()=> generateCode("U");

export const generateBusinessCode = ()=> generateCode("E");
