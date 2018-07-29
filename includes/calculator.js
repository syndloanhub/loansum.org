// Global constants

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const currencyAmountRegex = /^USD [\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/;
const standardIdRegex = /.*~.*/;
const prunable = [ "isSelected", "pctShare", "totalCommitmentSchedule", "pikProjection", "paymentProjection" ]

// Global objects and functions

function CurrencyAmount(currency, value) {
  this.currency = currency;
  this.value = value;
}

function StandardId(scheme, value) {
  this.scheme = scheme;
  this.value = value;
}

function LoanTrade(trade) {
  this["@bean"] = "com.syndloanhub.loansum.product.facility.LoanTrade";

  for ( var i in trade) {
    this[i] = trade[i];
  }
}

function TradeProceeds(proceeds) {
  for (i in proceeds.cashFlows) {
    var s = proceeds.cashFlows[i].cashFlow.forecastValue;

    if (currencyAmountRegex.test(s)) {
      var type = proceeds.cashFlows[i].annotation.type;
      type = type.substring(0, 1).toLowerCase() + type.substring(1);
      this[type] = new CurrencyAmount(s.substring(0, 3), parseFloat(s.substring(4)));
    }
  }
}

function formatDate(d) {
  var month = '' + (d.getMonth() + 1);
  var day = '' + d.getDate();
  var year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;

  if (day.length < 2)
    day = '0' + day;

  return [ year, month, day ].join('-');
}

function pretty(obj) {
  return JSON.stringify(obj, undefined, 2);
}

// Recursive function to convert UI objects to strings and delete
// excess attributes attached by client or server code.

function uiobj2str(ui) {
  for ( var i in ui) {
    if (ui[i] instanceof CurrencyAmount) {
      ui[i] = '' + ui[i].currency + ' ' + ui[i].value;
    } else if (ui[i] instanceof StandardId) {
      ui[i] = '' + ui[i].scheme + "~" + ui[i].value;
    } else if (ui[i] instanceof Date) {
      ui[i] = formatDate(ui[i]);
    } else if (ui[i] instanceof TradeProceeds) {
      delete ui[i];
      continue;
    } else if (prunable.includes(i)) {
      delete ui[i];
    }

    if (ui[i] !== null && typeof (ui[i]) == "object") {
      uiobj2str(ui[i]);
    } else if (i == "@type") {
      if (ui[i] == "IborIndex") {
        ui[i] = "com.opengamma.strata.basics.index.IborIndex";
      }
    }
  }
}

// The reviver function for transforming native loansum JSON
// representation to UI model.

function model2uiReviver(key, value) {
  if (typeof value === "string") {
    if (dateRegex.test(value)) {
      value = new Date(value);
    } else if (currencyAmountRegex.test(value)) {
      value = new CurrencyAmount(value.substring(0, 3), parseFloat(value.substring(4)));
    } else if (standardIdRegex.test(value)) {
      value = new StandardId(value.replace(/~.*$/, ""), value.replace(/^.*~/, ""));
    }
  }

  return value;
}

// Convert a loansum server-side exploaded trade list into
// a UI-side loan list.

function model2ui(model) {
  // First, parse data string into object performing certain
  // conversions (see reviver function).
  var loansumModel = JSON.parse(JSON.stringify(model), model2uiReviver);

  // Next, translate exploded collection of trades each
  // containing loan data to array of loans containing trades.
  var loanMap = new Map();

  // An imported model may be a LoanTradeList object with a trades
  // array simply an array of trades.
  if (loansumModel.hasOwnProperty('trades'))
    loansumModel = loansumModel.trades;

  for ( var i in loansumModel) {
    var trade = loansumModel[i];
    var loan = trade.product;
    var mapped = loanMap.get(loan.id.value);

    delete trade.product;

    if (!mapped) {
      loan['trades'] = [];
      loan['currency'] = 'USD';
      loanMap.set(loan.id.value, loan);
    }

    loan = loanMap.get(loan.id.value);
    loan.trades.push(trade);
  }

  return Array.from(loanMap.values());
}

// Convert a UI facility list to a loansum exploaded trade list.

function ui2model(ui) {
  var model = angular.copy(ui);
  var trades = [];

  uiobj2str(model);

  for ( var i in model) {
    var loan = model[i];
    var loanTrades = loan.trades;

    delete loan.trades;
    delete loan.currency;

    for ( var i in loanTrades) {
      var trade = new LoanTrade(loanTrades[i]);

      trade['product'] = loan;
      trades.push(trade);
    }
  }

  return trades;
}

// Given a loan/trade filter, return filtered UI model object. This
// is generally a precursor to converting filtered UI model into loansum
// model prior to posting to the server to get proceeds, cash flows, etc.

function filterui(uimodel, filter) {
  var loans = [];

  for ( var i in uimodel) {
    for ( var j in filter) {
      if (uimodel[i].id.value == filter[j].loan.value) {
        var loan = angular.copy(uimodel[i]);
        var trades = []

        loans.push(loan);

        for ( var k in loan.trades) {
          for ( var l in filter[j].trades) {
            if (loan.trades[k].info.id.value == filter[j].trades[l].value) {
              trades.push(loan.trades[k]);
            }
          }
        }

        loans.trades = trades;
      }
    }
  }

  return loans;
}

// Declare calculator appliication module.

var app = angular.module('calculator', [ 'smart-table' ]);

// Define calculator controller.

app
    .controller(
        'calculatorCtrl',
        function($scope, $http) {

          // On initialization, populate data model from seed examples.

          $http.get("includes/model.json").then(function(response) {
            $scope.model = response.data;
            $scope.prettymodel = JSON.stringify($scope.model, undefined, 2);
            $scope.uimodel = model2ui($scope.model);
          });

          $scope.calculateProceeds = function calculateProceeds() {
            var filter = [ {
              loan : $scope.selectedLoan.id,
              trades : [ $scope.selectedTrade.info.id ]
            } ];
            var model = ui2model(filterui($scope.uimodel, filter));
            var trade = model[0];

            $http.post("loansum-service/loansum/calculateProceeds", trade).then(function(response) {
              var proceeds = response.data;
              // TODO: pretty error handling
              if (proceeds.message) {
                alert(proceeds.message);
              } else {
                $scope.selectedTrade.tradeProceeds = new TradeProceeds(proceeds);
              }
            });
          };

          $scope.calculateCashFlows = function calculateCashFlows() {
          };

          $scope.selectLoan = function selectLoan(row) {
            if ($scope.lastSelectedLoan) {
              if ($scope.lastSelectedContract) {
                $scope.uimodel[$scope.selectedLoanIndex].contracts[$scope.selectedContractIndex].isSelected = false;
                $scope.selectedContract = "";
                $scope.selectedContractIndex = -1;
                $scope.lastSelectedContract = false;
              }
              if ($scope.lastSelectedTrade) {
                $scope.uimodel[$scope.selectedLoanIndex].trades[$scope.selectedTradeIndex].isSelected = false;
                $scope.selectedTrade = "";
                $scope.selectedTradeIndex = -1;
                $scope.lastSelectedTrade = false;
              }
              $scope.uimodel[$scope.selectedLoanIndex].isSelected = false;
            }
            index = $scope.uimodel.indexOf(row);
            if ($scope.uimodel[index].isSelected) {
              $scope.selectedLoan = row;
              $scope.selectedLoanIndex = index;
              $scope.lastSelectedLoan = true;
              // $scope.contracts =
              // $scope.uimodel[$scope.selectedLoanIndex].contracts;
            } else {
              $scope.selectedLoan = "";
              $scope.selectedLoanIndex = -1;
              $scope.lastSelectedLoan = false;
              // $scope.contracts ="";
            }

          };

          $scope.selectContract = function selectContract(contract) {
            if ($scope.lastSelectedContract) {
              $scope.uimodel[$scope.selectedLoanIndex].contracts[$scope.selectedContractIndex].isSelected = false;
            }
            index = $scope.uimodel[$scope.selectedLoanIndex].contracts.indexOf(contract);
            if ($scope.uimodel[$scope.selectedLoanIndex].contracts[index].isSelected) {
              $scope.selectedContract = contract;
              $scope.selectedContractIndex = index;
              $scope.lastSelectedContract = true;
            } else {
              $scope.selectedContract = "";
              $scope.selectedContractIndex = -1;
              $scope.lastSelectedContract = false;
            }

          };

          $scope.selectTrade = function selectTrade(trade) {
            if ($scope.lastSelectedTrade) {
              $scope.uimodel[$scope.selectedLoanIndex].trades[$scope.selectedTradeIndex].isSelected = false;
            }
            index = $scope.uimodel[$scope.selectedLoanIndex].trades.indexOf(trade);
            if ($scope.uimodel[$scope.selectedLoanIndex].trades[index].isSelected) {
              $scope.selectedTrade = trade;
              $scope.selectedTradeIndex = index;
              $scope.lastSelectedTrade = true;
            } else {
              $scope.selectedTrade = "";
              $scope.selectedTradeIndex = -1;
              $scope.lastSelectedTrade = false;
            }

          };

          $scope.scrollLoan = function() {
            index = $scope.uimodel.length - 1;
            $scope.uimodel[index].isSelected = true;
            $scope.selectLoan($scope.uimodel[index]);
            displayedIndex = $scope.displayedCollection.indexOf($scope.uimodel[index]) + 1;
            $("#loanTable tr:eq(" + displayedIndex + ")").scrollintoview();
          };
          $scope.addLoan = function addLoan() {
            newLoan = {
              loanId : 'LOAN1',
              borrower : 'BORROWER',
              agent : 'AGENT',
              facilityType : 'TERM',
              originalCommitmentAmount : 1000,
              startDate : null,
              maturityDate : '',
              currency : 'USD'
            }; // , isSelected: true};
            $scope.uimodel.push(newLoan);
            // index = $scope.uimodel.length - 1;
            // $scope.uimodel[index].isSelected = true;
            // $scope.selectRow($scope.uimodel[index],index);
          };
          $scope.scrollContract = function() {
            index = $scope.uimodel[$scope.selectedLoanIndex].contracts.length - 1;
            $scope.uimodel[$scope.selectedLoanIndex].contracts[index].isSelected = true;
            $scope.selectContract($scope.uimodel[$scope.selectedLoanIndex].contracts[index]);
            displayedIndex = $scope.displayedContracts
                .indexOf($scope.uimodel[$scope.selectedLoanIndex].contracts[index]) + 1;
            $("#contractTable tr:eq(" + displayedIndex + ")").scrollintoview();
          };
          $scope.addContract = function addContract() {
            newContract = {
              id : 'Contract1',
              amount : 1000,
              currency : 'USD'
            }; // , isSelected: true};
            $scope.uimodel[$scope.selectedLoanIndex].contracts.push(newContract);
          };

          $scope.scrollEvent = function() {
            index = $scope.uimodel[$scope.selectedLoanIndex].contracts[$scope.selectedContractIndex].events.length - 1;
            displayedIndex = $scope.displayedEvents
                .indexOf($scope.uimodel[$scope.selectedLoanIndex].contracts[$scope.selectedContractIndex].events[index]) + 3;
            $("#eventTable tr:eq(" + displayedIndex + ")").scrollintoview();
          };
          $scope.addEvent = function addEvent() {
            newEvent = {
              type : "",
              effectiveDate : "",
              amount : "",
              interestOnPaydown : "",
              price : ""
            }; // , isSelected: true};
            $scope.selectedContract.events.push(newEvent);
          };

          $scope.scrollFacilityEvent = function() {
            index = $scope.uimodel[$scope.selectedLoanIndex].events.length - 1;
            displayedIndex = $scope.displayedFacilityEvents
                .indexOf($scope.uimodel[$scope.selectedLoanIndex].events[index]) + 3;
            $("#facilityEventTable tr:eq(" + displayedIndex + ")").scrollintoview();
          };
          $scope.addFacilityEvent = function addFacilityEvent() {
            newEvent = {
              "@bean" : "CommitmentAdjustment",
              effectiveDate : new Date(),
              amount : new CurrencyAmount("USD", 1000000),
              refusalAllowed : true
            };
            $scope.selectedLoan.events.push(newEvent);
          };

          $scope.scrollTrade = function() {
            index = $scope.uimodel[$scope.selectedLoanIndex].trades.length - 1;
            $scope.uimodel[$scope.selectedLoanIndex].trades[index].isSelected = true;
            $scope.selectTrade($scope.uimodel[$scope.selectedLoanIndex].trades[index]);
            displayedIndex = $scope.displayedTrades.indexOf($scope.uimodel[$scope.selectedLoanIndex].trades[index]) + 1;
            $("#tradeTable tr:eq(" + displayedIndex + ")").scrollintoview();
          };
          $scope.addTrade = function addTrade() {
            newTrade = {
              tradeId : 'Trade1',
              currency : 'USD',
              delayedCompensationFlag : false
            }; // , isSelected: true};
            $scope.uimodel[$scope.selectedLoanIndex].trades.push(newTrade);
          };

          $scope.removeLoan = function removeLoan(row) {
            if ($scope.lastSelectedContract) {
              // $scope.uimodel[$scope.selectedLoanIndex].contracts[$scope.selectedContractIndex].isSelected
              // = false;
              $scope.selectedContract = "";
              $scope.selectedContractIndex = -1;
              $scope.lastSelectedContract = false;
            }
            index = $scope.uimodel.indexOf(row);
            if (index !== -1) {
              $scope.uimodel.splice(index, 1);
              $scope.selectedLoan = "";
              $scope.selectedLoanIndex = -1;
              $scope.lastSelectedLoan = false;
            }
          };

          $scope.removeContract = function removeContract(contract) {
            index = $scope.uimodel[$scope.selectedLoanIndex].contracts.indexOf(contract);
            if (index !== -1) {
              $scope.uimodel[$scope.selectedLoanIndex].contracts.splice(index, 1);
              $scope.selectedContract = "";
              $scope.selectedContractIndex = -1;
              $scope.lastSelectedContract = false;
            }
          };

          $scope.removeEvent = function removeEvent(event) {
            index = $scope.uimodel[$scope.selectedLoanIndex].contracts[$scope.selectedContractIndex].events
                .indexOf(event);
            if (index !== -1) {
              $scope.uimodel[$scope.selectedLoanIndex].contracts[$scope.selectedContractIndex].events.splice(index, 1);
            }
          };

          $scope.removeFacilityEvent = function removeFacilityEvent(event) {
            index = $scope.uimodel[$scope.selectedLoanIndex].events.indexOf(event);
            if (index !== -1) {
              $scope.uimodel[$scope.selectedLoanIndex].events.splice(index, 1);
            }
          };

          $scope.removeTrade = function removeTrade(trade) {
            index = $scope.uimodel[$scope.selectedLoanIndex].trades.indexOf(trade);
            if (index !== -1) {
              $scope.uimodel[$scope.selectedLoanIndex].trades.splice(index, 1);
              $scope.selectedTrade = "";
              $scope.selectedTradeIndex = -1;
              $scope.lastSelectedTrade = false;
            }
          };

          $scope.tab = 1;

          $scope.setTab = function(newTab) {
            $scope.tab = newTab;
          };

          $scope.tabIsSet = function(tabNum) {
            return $scope.tab === tabNum;
          };

          $scope.accrualTypeChange = function accrualTypeChange() {
            if ($scope.selectedContract.accrual['@bean'] == 'FixedRateAccrual') {
              console.log("accrualTypeChange to fixed");
              delete $scope.selectedContract.accrual.baseRate;
              delete $scope.selectedContract.accrual.spread;
              delete $scope.selectedContract.accrual.index;
            } else {
              $scope.selectedContract.accrual.index = {
                "@type" : "com.opengamma.strata.basics.index.IborIndex",
                "value" : "USD-LIBOR-1M"
              };
              $scope.selectedContract.accrual.baseRate = 0;
              $scope.selectedContract.accrual.spread = 0;
            }
          };

          $scope.updateUIModel = function updateUIModel() {
            $scope.model = JSON.parse($scope.prettymodel);
            $scope.prettymodel = JSON.stringify($scope.model, undefined, 2);
            $scope.uimodel = model2ui($scope.model);
            console.log("updateUIModel uimodel=" + pretty($scope.uimodel));
          };

          $scope.updateModel = function updateModel() {
            $scope.model = ui2model($scope.uimodel);
            $scope.prettymodel = pretty($scope.model);
            console.log("updateModel model=" + $scope.prettymodel);
          };

          // Select enumerations. TODO: generate from loansum.

          $scope.FacilityTypes = [ "Term", "Revolving", "DelayedDraw", "LetterOfCredit" ];
          $scope.Currencies = [ "USD" ];
          $scope.AccrualTypes = [ "FixedRateAccrual", "FloatingRateAccrual" ];
          $scope.IborTerms = [ "USD-LIBOR-1M", "USD-LIBOR-3M" ];
          $scope.DayCounts = [ "Act/360", "Act/365" ];
          $scope.ContractEventTypes = [ "Borrowing", "Repayment" ];
          $scope.PaymentFrequencies = [ "P1M", "P3M" ];

        }); // controller calculatorCtrl

app.filter('unique', function() {
  return function(arr, field) {
    var o = {}, i, l = arr.length, r = [];
    for (i = 0; i < l; i += 1) {
      o[arr[i][field]] = arr[i];
    }
    for (i in o) {
      r.push(o[i]);
    }
    return r;
  };
})

.directive('stRatio', function() {
  return {
    link : function(scope, element, attr) {
      var ratio = +(attr.stRatio);
      element.css('width', ratio + '%');
    }
  };
});

// .directive('allInRateCalc', function($scope) {
// if ($scope.selectedContract.type = 'FLOATING') {
// $scope.selectedContract.allInRate = $scope.selectedContract.baseRate +
// $scope.selectedContract.spread;
// }
// });
