(function() {
  'use strict';

  angular.module('CalculatorApp', [ 'smart-table' ]).controller('TabController', TabController)
      .controller('LoansController', LoansController).controller('ContractsController', ContractsController)
      .controller("TradesController", TradesController).controller("EventsController", EventsController)
      .controller("ContractEventsController", ContractEventsController)
      .controller("TextModelController", TextModelController).controller("CashflowsController", CashflowsController)
      .service("CalculatorService", CalculatorService);

  TabController.$inject = [ '$scope' ]

  function TabController($scope) {
    var tabs = this;

    tabs.setActiveTab = function(value) {
      tabs.activeTab = value;
      $scope.$broadcast("calculator:tabSelected", value);
    }

    tabs.getActiveTab = function() {
      return tabs.activeTab;
    }

    tabs.FacilityTypes = [ "Term", "Revolving", "DelayedDraw", "LetterOfCredit" ];
    tabs.Currencies = [ "USD" ];
    tabs.AccrualTypes = [ "FixedRateAccrual", "FloatingRateAccrual" ];
    tabs.IborTerms = [ "USD-LIBOR-1M", "USD-LIBOR-3M" ];
    tabs.DayCounts = [ "Act/360", "Act/365" ];
    tabs.ContractEventTypes = [ "Borrowing", "Repayment" ];
    tabs.PaymentFrequencies = [ "P1M", "P3M" ];
    tabs.Boolean = [ true, false ];
    tabs.FacilityEventTypes = [ "CommitmentAdjustment" ];
    tabs.BuySell = [ "Buy", "Sell" ];
    tabs.Associations = [ "LSTA", "LMA" ];
    tabs.FormOfPurchase = [ "Assignment", "Participation" ];
    tabs.DocType = [ "Par", "Distressed" ];
    tabs.TradeType = [ "Primary", "Secondary" ];
    tabs.AccrualSettlementTypes = [ "SettledWithoutAccrued", "SettledWithAccrued", "Flat" ];
  }

  LoansController.$inject = [ 'CalculatorService', '$scope' ]

  function LoansController(CalculatorService, $scope) {
    var loans = this;
    var service = CalculatorService;

    service.getLoans().then(function(data) {
      loans.data = data;
      $scope.$broadcast("calculator:loansLoaded", loans.data);
    });

    loans.setSelected = function(loan) {
      console.log("loan " + loan.id.value + " isSelected=" + loan.isSelected);
      if (loan.isSelected) {
        loans.selected = loan;
        service.setSelectedLoan(loan);
      } else {
        delete loans.selected;
        service.setSelectedLoan(undefined);
      }

      $scope.$broadcast("calculator:loanSelected", loan);
    }

    $scope.$on('calculator:modelUpdated', function(event, data) {
      if (loans.selected) {
        loans.selected.isSelected = false;
        loans.setSelected(loans.selected);
      }

      loans.data = data;
    });
  }

  EventsController.$inject = [ 'CalculatorService', '$scope' ]

  function EventsController(CalculatorService, $scope) {
    var events = this;
    var service = CalculatorService;

    $scope.$on('calculator:loanSelected', function(event, loan) {
      if (events.selected) {
        events.selected.isSelected = false;
        events.setSelected(events.selected);
      }

      if (loan.isSelected) {
        events.data = loan.events;
      } else {
        delete events.data;
      }
    });

    events.setSelected = function(event) {
      if (event.isSelected) {
        events.selected = event;
        service.setSelectedEvent(event);
      } else {
        delete events.selected;
        service.setSelectedEvent(undefined);
      }

      $scope.$broadcast("calculator:eventSelected", event);
    }
  }

  ContractsController.$inject = [ 'CalculatorService', '$scope' ]

  function ContractsController(CalculatorService, $scope) {
    var contracts = this;
    var service = CalculatorService;

    $scope.$on('calculator:loanSelected', function(event, loan) {
      if (contracts.selected) {
        contracts.selected.isSelected = false;
        contracts.setSelected(contracts.selected);
      }

      if (loan.isSelected) {
        contracts.data = loan.contracts;
      } else {
        delete contracts.data;
      }
    });

    contracts.setSelected = function(contract) {
      console.log("contract " + contract.id.value + " isSelected=" + contract.isSelected);
      if (contract.isSelected) {
        contracts.selected = contract;
        service.setSelectedContract(contract);
      } else {
        delete contracts.selected;
        service.setSelectedContract(undefined);
      }

      $scope.$broadcast("calculator:contractSelected", contract);
    }
  }

  ContractEventsController.$inject = [ 'CalculatorService', '$scope' ]

  function ContractEventsController(CalculatorService, $scope) {
    var contractEvents = this;
    var service = CalculatorService;

    $scope.$on('calculator:contractSelected', function(event, contract) {
      console.log("contractEventsController, contract selected");
      if (contractEvents.selected) {
        conractEvents.selected.isSelected = false;
        contractEvents.setSelected(contractEvents.selected);
      }

      if (contract.isSelected) {
        contractEvents.data = contract.events;
        console.log(JSON.stringify(contractEvents.data));
      } else {
        delete contractEvents.data;
      }
    });

    contractEvents.setSelected = function(contractEvent) {
      if (contractEvent.isSelected) {
        contractEvents.selected = contractEvent;
        service.setSelectedContractEvent(contractEvent);
      } else {
        delete contractEvents.selected;
        service.setSelectedContractEvent(undefined);
      }

      $scope.$broadcast("calculator:contractEventSelected", contractEvent);
    }
  }

  TradesController.$inject = [ 'CalculatorService', '$scope' ]

  function TradesController(CalculatorService, $scope) {
    var trades = this;
    var service = CalculatorService;

    $scope.$on('calculator:loanSelected', function(event, loan) {
      if (trades.selected) {
        trades.selected.isSelected = false;
        trades.setSelected(trades.selected);
      }

      if (loan.isSelected) {
        trades.data = loan.trades;
      } else {
        delete trades.data;
      }
    });

    trades.setSelected = function(trade) {
      console.log("trade " + trade.info.id.value + " isSelected=" + trade.isSelected);
      if (trade.isSelected) {
        trades.selected = trade;
        service.setSelectedTrade(trade);
      } else {
        delete trades.selected;
        service.setSelectedTrade(undefined);
      }

      $scope.$broadcast("calculator:tradeSelected", trade);
    }

    trades.calculateProceeds = function() {
      service.calculateProceeds().then(function(data) {
        trades.selected.tradeProceeds = data;
        delete trades.error;
      }, function(error) {
        trades.error = error;
        delete trades.selected.tradeProceeds;
      });
    }
  }

  TextModelController.$inject = [ 'CalculatorService', '$scope' ]

  function TextModelController(CalculatorService, $scope) {
    var textmodel = this;
    var service = CalculatorService;

    $scope.$on('calculator:loansLoaded', function(event, data) {
      textmodel.prettymodel = service.prettymodel;
    });

    textmodel.update = function() {
      service.update(textmodel.prettymodel);
      $scope.$emit("calculator:modelUpdated", service.uimodel);
    };
  }

  CashflowsController.$inject = [ 'CalculatorService', '$scope' ]

  function CashflowsController(CalculatorService, $scope) {
    var cashflows = this;
    var service = CalculatorService;

    $scope.$on('calculator:tabSelected', function(event, tab) {
      console.log("tab=" + tab);
      if (tab == 'cash flows') {
        service.calculateCashflows().then(function(data) {
          cashflows.data = data;
          console.log("cashflows: " + JSON.stringify(data, undefined, 2));
        });
      }
    });

    cashflows.isAccrualSelected = function() {
      return cashflows.selected && (cashflows.selected.type == 'Interest' || cashflows.selected.type == 'PikInterest' || cashflows.selected.type == 'DelayedCompensation');
    }

    cashflows.isCostOfFundedSelected = function() {
      return cashflows.selected && cashflows.selected.type == 'CostOfFunded';
    }

    cashflows.setSelected = function(cashflow) {
      if (cashflow.isSelected) {
        cashflows.selected = cashflow;
      } else {
        delete cashflows.selected;
      }
    }

  }

  // Calculator service. This service encapsulates the loansum data model and
  // all interactions with the loansum application service.

  CalculatorService.$inject = [ '$http', '$q' ]

  function CalculatorService($http, $q) {
    var service = this;

    // Public functions used by Controllers.

    service.getLoans = function() {
      var deferred = $q.defer();

      if (service.uimodel != undefined) {
        deferred.resolve(service.uimodel);
      } else {
        $http.get("includes/model.json").then(function(response) {
          service.model = response.data;
          service.prettymodel = pretty(service.model);
          service.uimodel = model2ui(service.model);
          deferred.resolve(service.uimodel);
        });
      }

      return deferred.promise;
    }

    service.update = function(data) {
      service.model = JSON.parse(data);
      service.prettymodel = JSON.stringify(service.model, undefined, 2);
      service.uimodel = model2ui(service.model);
      console.log("service.update: uimodel=" + JSON.stringify(service.uimodel, undefined, 2));
    }

    service.calculateProceeds = function() {
      var deferred = $q.defer();
      var filter = [ {
      loan : service.selectedLoan.id,
      trades : [ service.selectedTrade.info.id ]
      } ];
      var model = ui2model(filterui(service.uimodel, filter));
      var trade = model[0];

      $http.post("loansum-service/loansum/calculateProceeds", trade).then(function(response) {
        var proceeds = response.data;
        if (proceeds.message) {
          deferred.reject(proceeds.message);
        } else {
          service.selectedTrade.tradeProceeds = new TradeProceeds(proceeds);
          deferred.resolve(service.selectedTrade.tradeProceeds);
        }
      });

      return deferred.promise;
    }

    service.calculateCashflows = function() {
      var deferred = $q.defer();

      if (!service.selectedLoan) {
        deferred.resolve([]);
      } else {
        var filter = [ {
        loan : service.selectedLoan.id,
        trades : []
        } ];

        for ( var i in service.selectedLoan.trades) {
          filter[0].trades.push(service.selectedLoan.trades[i].info.id);
        }

        var model = ui2model(filterui(service.uimodel, filter));

        $http.post("loansum-service/loansum/calculateCashflows", model[0]).then(function(response) {
          var cashflows = response.data;
          if (cashflows.message) {
            deferred.reject(cashflows.message);
          } else {
            console.log("service raw cashflows: " + JSON.stringify(cashflows, undefined, 2));
            var cashFlows = [];
            for ( var i in cashflows.cashFlows) {
              cashFlows.push(new TradeCashflow(cashflows.cashFlows[i]));
            }
            service.selectedLoan.cashflows = cashFlows;
            deferred.resolve(cashFlows);
          }
        });
      }

      return deferred.promise;
    }

    service.setSelectedLoan = function(loan) {
      service.selectedLoan = loan;
    }

    service.getSelectedLoan = function() {
      return service.selectedLoan;
    }

    service.getEvents = function() {
      return service.selectedLoan.events;
    }

    service.setSelectedEvent = function(event) {
      service.selectedEvent = event;
    }

    service.getSelectedEvent = function() {
      return service.selectedEvent;
    }

    service.getContracts = function() {
      return service.selectedLoan.contracts;
    }

    service.setSelectedContract = function(contract) {
      service.selectedContract = contract;
    }

    service.getSelectedContract = function() {
      return service.selectedContract;
    }

    service.getContractEvents = function() {
      return service.selectedContract.events;
    }

    service.setSelectedContractEvent = function(contractEvent) {
      service.selectedContractEvent = contractEvent;
    }

    service.getSelectedContractEvent = function() {
      return service.selectedContractEvent;
    }

    service.getTrades = function() {
      return service.selectedLoan.trades;
    }

    service.setSelectedTrade = function(trade) {
      service.selectedTrade = trade;
    }

    service.getSelectedTrade = function() {
      return service.selectedTrade;
    }

    // Private content.

    // Constants.

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const currencyAmountRegex = /^USD [\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/;
    const standardIdRegex = /.*~.*/;
    const prunable = [ "isSelected", "pctShare", "totalCommitmentSchedule", "pikProjection", "paymentProjection", "cashflows" ]

    // Objects.

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
      for ( var i in proceeds.cashFlows) {
        var s = proceeds.cashFlows[i].cashFlow.forecastValue;

        if (currencyAmountRegex.test(s)) {
          var type = proceeds.cashFlows[i].annotation.type;
          type = type.substring(0, 1).toLowerCase() + type.substring(1);
          this[type] = new CurrencyAmount(s.substring(0, 3), parseFloat(s.substring(4)));
        }
      }
    }

    function TradeCashflow(cashflow) {
      var s = cashflow.cashFlow.forecastValue;

      if (cashflow.annotation.source) {
        this.sourceType = cashflow.annotation.source.replace(/~.*$/, "");
        this.sourceId = cashflow.annotation.source.replace(/^.*~/, "")
      }

      this.currency = s.substring(0, 3);
      this.amount = parseFloat(s.substring(4));
      this.type = cashflow.annotation.type;
      this.paymentDate = new Date(cashflow.cashFlow.paymentDate);
      this.payingCounterparty = cashflow.annotation.payingCounterparty.replace(/^.*~/, "");
      this.receivingCounterparty = cashflow.annotation.receivingCounterparty.replace(/^.*~/, "");
      this.uncertain = cashflow.annotation.uncertain;
      this.explains = [];

      if (cashflow.annotation.explains) {
        if (this.type == 'Interest' || this.type == 'PikInterest' || this.type == 'DelayedCompensation') {
          for ( var i in cashflow.annotation.explains.map.CashFlow.value) {
            this.explains.push(new AccrualExplain(cashflow.annotation.explains.map.CashFlow.value[i]));
          }
        } else if (this.type == 'CostOfFunded') {
          for ( var i in cashflow.annotation.explains.map.CashFlow.value) {
            this.explains.push(new CostOfFundedExplain(cashflow.annotation.explains.map.CashFlow.value[i]));
          }
        }
      }
    }

    function AccrualExplain(explain) {
      this.shareNotional = parseFloat(explain.map["Share Not"]);
      this.dayCount = explain.map["Day Cnt"].value;
      this.startDate = new Date(explain.map["Start"].value);
      this.endDate = new Date(explain.map["End"].value);
      this.days = parseInt(explain.map["Days"]);
      this.daysInYear = parseFloat(explain.map["DIY"]);
      this.allInRate = parseFloat(explain.map["All-in Rt"]);
      this.shareAmount = parseFloat(explain.map["Share Amt"]);
      this.formula = explain.map["Formula"];
    }

    function CostOfFundedExplain(explain) {
      this.shareNotional = parseFloat(explain.map["Share Not"]);
      this.price = parseFloat(explain.map["Price"]);
      this.shareAmount = parseFloat(explain.map["Share Amt"]);
      this.settPerPik = parseFloat(explain.map["Sett Per PIK"]);
      this.formula = explain.map["Formula"];
    }

    // Utility functions.

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
  }

})();
