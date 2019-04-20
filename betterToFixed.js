// Original Code:
// var toFixed = lib.toFixed = function(value, precision) {
//   precision = checkPrecision(precision, lib.settings.number.precision);
//   var power = Math.pow(10, precision);
//
//   // Multiply up by precision, round accurately, then divide and use native toFixed():
//   return (Math.round(lib.unformat(value) * power) / power).toFixed(precision);
// };

// TWIST on toFixed:
function toFixed(value, precision) {
  if (arguments.length < 2 || precision === 0) {
    return Math.round(value).toString();
  }

  var valAsString = value.toString();
  var decimal = valAsString.indexOf('.');
  var valAsArray = valAsString.split('');
  var startingSpliceIndex = decimal + precision + 1;

  // If startingSpliceIndex is greater than valAsArray.length, need to add zeros
  if (startingSpliceIndex > valAsArray.length) {
    while (startingSpliceIndex + 1 > valAsArray.length) {
      valAsArray.push('0');
    }
  }

  // Puts decimal point at provided precision
  valAsArray.splice(startingSpliceIndex, 0, '.');

  // Removes original decimal point
  valAsArray.splice(decimal, 1);

  // Turns array back to string, removes unneccessary zeros not immediately before decimal pts.
  valAsArray = Number(valAsArray.join(''));

  //Round number, put back to string
  valAsArray = Math.round(valAsArray).toString(); // rounded 0.615 to 1 in (0.615, -1)


  // Put decimal point back to original place.
  // If precision >= val.length, need to add 0. to beginging of number.
  if (precision >= valAsArray.length) {
    valAsArray = valAsArray.split('');
    valAsArray.unshift('.');
    if (valAsArray[0] !== '0') {
      valAsArray.unshift('0');
    }
    valAsArray = valAsArray.join('');
    return valAsArray;
  }

  // Add decimal to end of number if precision < number length
  if (precision < valAsArray.length) {
    valAsArray = valAsArray.split('');
    var lastChar = valAsArray[valAsArray.length - 1];
    valAsArray[valAsArray.length - 1] = '.';
    valAsArray.push(lastChar);
    valAsArray = valAsArray.join('');
    return valAsArray;
  }
}