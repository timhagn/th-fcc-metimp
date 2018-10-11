/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {

  this.splitNum = function(inputNum) {
    // Do we have a fraction?
    if (inputNum.search('/') >= 0) {
      // Then split the number...
      let splitFraction = inputNum.split('/');
      // ...and test if we don't have a double fraction.
      if (splitFraction.length < 3) {
        // Return the first part divided by the second.
        return Number(splitFraction[0]) / Number(splitFraction[1]);
      }
    }
    // If we don't have a fraction, try to convert the number.
    return Number(inputNum);
  };

  this.getNum = function(input) {
    const invalidNumber = 'invalid number';
    // Define split by number and unit as RegEx.
    const compatibleRegEx = /^(.*)(l|gal|kg|lbs|km|mi)$/gi;
    const lastResortRegEx = /^([\d./]+)/gi;
    // Default result.
    let result = invalidNumber;
    // Split by RegEx.
    let interim = compatibleRegEx.exec(input);
    // Split by last resort RegEx.
    let lastResort = lastResortRegEx.exec(input);

    // Test if we have at least a Unit.
    if (this.getUnit(input) !== 'invalid unit') {
      result = 1;
    }
    // Do we have at least a number?
    if (lastResort && lastResort[1]) {
      result = this.splitNum(lastResort[1]);
    }
    // Do we have a interim result?
    if (interim && interim[1]) {
      result = this.splitNum(interim[1]);
    }
    if (isNaN(Number(result))) {
      // Check again if NaN.
      result = invalidNumber;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    // Define RegEx to get unit.
    const splitUnitRegEx = /(lbs|gal|l|kg|km|mi)$/gi;
    // Default result.
    let result = 'invalid unit';
    // Split with RegEx.
    let interim = splitUnitRegEx.exec(input);
    // Do we have a interim result?
    if (interim && interim[1])
      result = interim[1];
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const returnUnits = {
      'lbs': 'kg',
      'gal': 'l',
      'l': 'gal',
      'kg': 'lbs',
      'km': 'mi',
      'mi': 'km'
    };
    let result = 'invalid unit';
    if (returnUnits.hasOwnProperty(initUnit.toLowerCase())) {
      result = returnUnits[initUnit.toLowerCase()];
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    const returnSpelledUnits = {
      'lbs': 'pounds',
      'gal': 'gallons',
      'l': 'litres',
      'kg': 'kilograms',
      'km': 'kilometers',
      'mi': 'miles'
    };
    let result = 'invalid unit';
    if (returnSpelledUnits.hasOwnProperty(unit.toLowerCase())) {
      result = returnSpelledUnits[unit.toLowerCase()];
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // Return spoken sentence.
    return initNum + ' ' + this.spellOutUnit(initUnit)
        + ' converts to '
        + returnNum + ' ' + this.spellOutUnit(returnUnit);
  };

}

module.exports = ConvertHandler;
