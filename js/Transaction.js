var Transaction = (function() {

  var id = 1;

  function Transaction(data) {
    this.name = data.name;
    this.amount = parseFloat(data.amount);
    this.type = data.type;
    this.date = new Date(data.date);
    if (data.hasOwnProperty('id')) {
      this.id = data.id;
    } else {
      this.id = id++;
    }
  }

  Transaction.prototype.getId = function() {
    return this.id;
  };

  Transaction.prototype.getName = function() {
    return this.name;
  };

  Transaction.prototype.getAmount = function() {
    return this.amount;
  };

  Transaction.prototype.getType = function() {
    return this.type;
  };

  Transaction.prototype.getMonth = function() {
    return this.date.getMonth() + 1;
  };

  Transaction.prototype.cmpIds = function(t) {
    return this.id === t.getId();
  };

  Transaction.prototype.cmpNames = function(t) {
    return this.name === t.getName();
  };

  Transaction.prototype.cmpTypes = function(t) {
    return this.type === t.getType();
  };

  return Transaction;

})();