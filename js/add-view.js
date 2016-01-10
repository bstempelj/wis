var addView = (function() {

  var displayContent = function(index, type) {
    var container = $('.add-view');
    var script = $('#add-script').html();
    var template = Handlebars.compile(script);
    var data = {
      'heading': shared.translateType(type),
      'month': shared.getMonthName(index),
      'type': shared.translateType(type).replace('e', '')+'a'
    };
    container.html(template(data));
  }

  var handleSubmit = function(storage, index, type) {
    var name = $('#add-name').val();
    var amount = $('#add-amount').val();
    var transaction = {'name': name, 'amount': amount, 'type': type, 'date': '2016-'+index};
    storage.add(transaction);
    storage.saveYearData(2016);
  };

  var init = function(index, type) {
    // Display content
    displayContent(index, type);
    // Get data
    var storage = new Storage();
    storage.loadYearData(2016);
    // Setup button
    $('#add-submit').click(function(e) {
      e.preventDefault();
      handleSubmit(storage, index, type);
      window.location.hash = '#month/' + index;
    });
    $('#add-cancel').click(function(e) {
      e.preventDefault();
      window.location.hash = '#month/' + index;
    });
  };

  return {
    init: init
  };

})();