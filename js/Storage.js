var Storage = (function() {

  var data = {};

  var to2DigitString = function(n) {
    return (n < 10) ? '0' + n : String(n);
  };

  function Storage() {}

  Storage.prototype.add = function(transaction) {
    var transaction = new Transaction(transaction);
    var month = to2DigitString(transaction.getMonth());
    if (!data[month]) data[month] = [];
    data[month].push(transaction);
  };

  Storage.prototype.update = function(transaction) {
    var transaction = new Transaction(transaction);
    var month = shared.to2DigitString(transaction.getMonth());
    var monthData = data[month];
    for (var i = 0; i < monthData.length; i++) {
      if (monthData[i].cmpIds(transaction)) {
        console.log(monthData[i], transaction);
        monthData[i] = transaction;
        console.log(monthData[i], transaction);
      }
    }
  };

  Storage.prototype.loadYearData = function(year) {
    var name = 'WIT' + year;
    var jsonString;
    try {
      // Get json string of transactions from local storage
      if (localStorage[name]) {
        jsonString = localStorage[name];
      }
    } catch(e) {
      alert('Error loading from local storage: ' + e);
    }

    if (jsonString) {
      var parsedString = JSON.parse(jsonString);
      for (var month in parsedString) {
        transactions = parsedString[month];
        data[month] = [];
        for (var i = 0; i < transactions.length; i++) {
          data[month].push(new Transaction(transactions[i]));
        }
      }
    }

    return data;
  };

  Storage.prototype.saveYearData = function(year) {
    var name = 'WIT' + year;
    try {
      // Convert transactions to JSON string and save to local storage
      localStorage[name] = JSON.stringify(data);
    } catch(e) {
      alert('Error saving to local storage: ' + e);
    }
  }

  Storage.prototype.loadTestData = function() {
    this.saveYearData(2016);
    return this.loadYearData(2016);
  };

  return Storage;

})();