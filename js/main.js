$(function() {

  var render = function(url) {
    var keyword = url.split('/')[0];

    $('.content .page').addClass('hidden');

    var views = {
      '#month': function() {
        var index = url.split('#month/')[1].trim();
        renderMonthView(index);
      },
      '#add-income': function() {
        var index = url.split('#add-income/')[1].trim();
        renderAddView(index, 'income');
      },
      '#add-expense': function() {
        var index = url.split('#add-expense/')[1].trim();
        renderAddView(index, 'expense');
      },
      '#edit-income': function() {
        var index = url.substring(url.indexOf('/')+1, url.lastIndexOf('/')).trim();
        var tid = url.substring(url.lastIndexOf('/')+1).trim();
        renderEditView(index, 'income', tid);
      },
      '#edit-expense': function() {
        var index = url.substring(url.indexOf('/')+1, url.lastIndexOf('/')).trim();
        var tid = url.substring(url.lastIndexOf('/')+1).trim();
        renderEditView(index, 'expense', tid);
      }
    };

    // Execute render
    if (views[keyword]) {
      views[keyword]();
    }
  };

  var renderMonthView = function(index) {
    var view = $('.month-view');
    // Setup
    monthView.init(index);
    // Show the view
    view.removeClass('hidden');
  };

  var renderAddView = function(index, type) {
    var view = $('.add-view');
    // Setup
    addView.init(index, type);
    // Show the view
    view.removeClass('hidden');
  };

  var renderEditView = function(index, type, tid) {
    var view = $('.edit-view');
    // Setup
    editView.init(index, type, tid);
    // Show the view
    view.removeClass('hidden');
  };

  $(window).on('hashchange', function(data) {
    render(window.location.hash);
  }).trigger('hashchange');

});