var monthView = (function() {

  var displayMonthName = function(index) {
    var nav = $('#month-nav');
    var script = $('#month-name').html();
    var template = Handlebars.compile(script);
    nav.html(template({'name':shared.getMonthName(index)}));
  };

  var getPrevious = function(prevMonth, currTrans) {
    var previous = 0;
    for (var i = 0; i < prevMonth.length; i++) {
      if (prevMonth[i].cmpNames(currTrans) && prevMonth[i].cmpTypes(currTrans)) {
        previous = prevMonth[i].getAmount();
      }
    }
    return previous;
  };

  var calcSum = function(data) {
    var currSum = 0, prevSum = 0;
    for (var i = 0; i < data.length; i++) {
      currSum += data[i].current;
      prevSum += data[i].previous;
    }
    data['sum'] = {'current': currSum, 'previous': prevSum};
    return data;
  };

  var getDisplayData = function(data, index) {
    if (data[index]) {
      var income = [], expenses = [];
      var current, previous;
      for (var i = 0; i < data[index].length; i++) {
        current = data[index][i];
        var prevIndex = shared.to2DigitString(index-1);
        if (index-1 && data[prevIndex]) {
          previous = getPrevious(data[prevIndex], current);
        } else {
          previous = 0;
        }

        var display = {
          'id':current.getId(),
          'name':current.getName(),
          'current':current.getAmount(),
          'previous':previous,
          'type':current.getType()
        };
        (current.getType() === 'income') ? income.push(display) : expenses.push(display);
      }
      return {'income': calcSum(income), 'expenses': calcSum(expenses)};
    }
    return {'income': [], 'expenses': []};
  };

  var loadIncome = function(data) {
    var tbody = $('table#income>tbody');
    var script = $('#wit-body').html();
    var template = Handlebars.compile(script);
    tbody.html(template(data));
  };

  var loadIncomeSum = function(data) {
    var tfoot = $('table#income>tfoot');
    var script = $('#wit-foot').html();
    var template = Handlebars.compile(script);
    tfoot.html(template(data));
  };

  var loadExpenses = function(data) {
    var tbody = $('table#expenses>tbody');
    var script = $('#wit-body').html();
    var template = Handlebars.compile(script);
    tbody.html(template(data));
  };

  var loadExpensesSum = function(data) {
    var tfoot = $('table#expenses>tfoot');
    var script = $('#wit-foot').html();
    var template = Handlebars.compile(script);
    tfoot.html(template(data));
  };

  var loadViewData = function(data) {
    loadIncome(data['income']);
    loadIncomeSum(data['income']);
    loadExpenses(data['expenses']);
    loadExpensesSum(data['expenses']);
  };

  var initEvents = function(data, index, storage) {
    // Activate navigation
    $('#prev-month').click(function(e) {
      e.preventDefault();
      if (parseInt(index)-1) window.location.hash = '#month/' + shared.to2DigitString(parseInt(index)-1);
    });
    $('#next-month').click(function(e) {
      e.preventDefault();
      if (parseInt(index)+1 < 13) window.location.hash = '#month/' + shared.to2DigitString(parseInt(index)+1);
    });
    // Activate add buttons
    $('#add-income').click(function(e) {
      e.preventDefault();
      window.location.hash = '#add-income/' + index;
    });
    $('#add-expense').click(function(e) {
      e.preventDefault();
      window.location.hash = '#add-expense/' + index;
    });
    // Activate delete and update button
    $('[id^="remove-"]').click(function(e) {
      e.preventDefault;
      var tid = $(this).attr('id').split('remove-')[1].trim();
      var monthData = data[index];
      for(var i = 0; i < monthData.length; i++) {
        if (monthData[i].getId() === parseInt(tid)) {
          console.log(monthData[i].getName());
          monthData.splice(i, 1);
          storage.saveYearData(2016);
        }
      }
      $(window).trigger('hashchange');
    });
    $('[id^="edit-"]').click(function(e) {
      e.preventDefault();
      var typeid = $(this).attr('id').split('edit-')[1].trim();
      var type = typeid.substring(0, typeid.indexOf('-'));
      var tid = typeid.substring(typeid.indexOf('-')+1);
      window.location.hash = '#edit-' + type + '/' + index + '/' + tid;
    });
  };

  var loadStatus = function(incomeSum, expenseSum) {
    var container = $('#status');
    var script = $('#status-script').html();
    var template = Handlebars.compile(script);
    // Calculate status
    var isPositive = (incomeSum - expenseSum >= 0) ? true : false;
    var data = { isPositive: isPositive, status: (incomeSum - expenseSum) };
    container.html(template(data));
  };

  var init = function(index) {
    // Display month name
    displayMonthName(index);
    // Get data from local storage
    var storage = new Storage();
    // var data = storage.loadTestData();
    var data = storage.loadYearData(2016);
    // Get income/expense data
    var display = getDisplayData(data, index);
    loadViewData(display);
    // Display status
    var income = 0, expenses = 0;
    if (display.income.length > 0) {
      income = display.income.sum.current;
    }
    if (display.expenses.length > 0) {
      expenses = display.expenses.sum.current;
    }
    loadStatus(income, expenses);
    // Init events
    initEvents(data, index, storage);
  };

  return {
    init: init
  };

})();