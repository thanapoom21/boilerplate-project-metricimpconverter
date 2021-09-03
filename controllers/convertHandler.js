let numRegex = /[.\d\/]+/g;
let stringRegex = /[a-zA-Z]+/g;

function splitNumString(input) {
  let num = input.match(numRegex) || ["1"];
  let string = input.match(stringRegex)[0];

  return [num[0], string];
}

function verifyFraction(input) {
  let num = input.split("/");

  if (num.length > 2) {
    return false;
  }

  return num;
}

function ConvertHandler() {
  this.getNum = (input) => {
    let result = splitNumString(input)[0];
    let fractionalNum = verifyFraction(result);

    if (!fractionalNum) {
      return undefined;
    }

    let num1 = fractionalNum[0];
    let num2 = fractionalNum[1] || "1";
    result = parseFloat(num1) / parseFloat(num2);

    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }

    return result;
  };

  this.getUnit = (input) => {
    let result = splitNumString(input)[1].toLowerCase();

    switch (result) {
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
  };

  this.getReturnUnit = (initUnit) => {
    let unit = initUnit.toLowerCase();

    switch (unit) {
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "l":
        return "gal";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = (initUnit) => {
    let unit = initUnit.toLowerCase();

    switch (unit) {
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "l":
        return "liters";
      case "kg":
        return "kilograms";
      default:
        return "don't know";
    }
  };

  this.convert = (initNum, initUnit) => {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;

    switch (unit) {
      case "km":
        result = initNum / miToKm;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
