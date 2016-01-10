var editView = (function() {

  var displayContent = function(index, type) {
    var container = $('.edit-view');
    var script = $('#edit-script').html();
    var template = Handlebars.compile(script);
    var data = {
      'heading': shared.translateType(type),
      'month': shared.getMonthName(index),
      'type': shared.translateType(type).replace('e', '')+'a'
    };
    container.html(template(data));
  }

  var handleSubmit = function(storage, index, transaction) {
    var name = $('#edit-name').val();
    var amount = $('#edit-amount').val();
    var transaction = {'name': name, 'amount': amount, 'type': transaction.getType(), 'date': '2016-'+index, 'id': transaction.getId()};
    storage.update(transaction);
    storage.saveYearData(2016);
  };

  var init = function(index, type, tid) {
    // Display content
    displayContent(index, type);
    // Get data
    var storage = new Storage();
    var data = storage.loadYearData(2016);
    var monthData = data[index];
    // Display transaction info
    var transaction;
    for (var i = 0; i < monthData.length; i++) {
      if (monthData[i].getId() === parseInt(tid)) {
        transaction = monthData[i];
        $('#edit-name').val(transaction.getName());
        $('#edit-amount').val(transaction.getAmount());
      }
    }
    // Setup button
    $('#edit-submit').click(function(e) {
      e.preventDefault();
      handleSubmit(storage, index, transaction);
      window.location.hash = '#month/' + index;
    });
    var cancel = $('#edit-cancel').click(function(e) {
      e.preventDefault();
      window.location.hash = '#month/' + index;
    });
    // Something went wrong with finding the id
    if (!transaction) cancel.trigger('click');
  };

  return {
    init: init
  };

})();