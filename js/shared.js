var shared = (function() {
  var getMonthName = function(n) {
    switch(n) {
      case '01': return 'januar';
      case '02': return 'februar';
      case '03': return 'marec';
      case '04': return 'april';
      case '05': return 'maj';
      case '06': return 'junij';
      case '07': return 'julij';
      case '08': return 'avgust';
      case '09': return 'september';
      case '10': return 'oktober';
      case '11': return 'november';
      case '12': return 'december';
    }
  };

  var translateType = function(type) {
    return (type === 'income') ? 'prihodek' : 'odhodek';
  };

  var to2DigitString = function(n) {
    return (n < 10) ? '0' + n : String(n);
  };

  return {
    getMonthName: getMonthName,
    translateType: translateType,
    to2DigitString: to2DigitString
  };
})();