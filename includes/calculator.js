var app = angular.module('calculator', [ 'smart-table' ]);
app
        .controller(
                'calculatorCtrl',
                function($scope) {

                    // To do: initialize table with the loans, create init and
                    // look at ng-init

                    $scope.loans = [ {
                        loanId : "LOAN1",
                        borrower : "BORROWER",
                        agent : "AGENT",
                        facilityType : "TERM",
                        identifiers : [ "LXID~LX123456", "CUSIP~012345678", "BLOOMBERGID~BB12345678" ],
                        originalCommitmentAmount : 441000000.00,
                        startDate : new Date(2017, 0, 24),
                        maturityDate : new Date(2022, 08, 14),
                        currency : 'USD',
                        contracts : [ {
                            "id" : "contract~1a",
                            "accrual" : {
                                "@bean" : "FloatingRateAccrual",
                                "startDate" : new Date(2017, 0, 24),
                                "endDate" : new Date(2017, 02, 16),
                                "allInRate" : 4.25,
                                "pikSpread" : 0.0,
                                "accrualAmount" : 1598500000,
                                "dayCount" : "ACT/360",
                                "paymentFrequency" : "QUARTERLY",
                                "baseRate" : 0.012583,
                                "spread" : 3.25
                            },
                            "paymentDate" : new Date(2017, 2, 16),
                            "type" : 'FLOATING',
                            "index" : 'LIBOR',
                            "currency" : 'USD',
                            "events" : [ {
                                "type" : 'Repayment',
                                "effectiveDate" : new Date(2017, 05, 30),
                                "amount" : 4558012.17,
                                "interestOnPaydown" : false,
                                "price" : 1.0
                            }, {
                                "type" : 'Repayment',
                                "effectiveDate" : new Date(2017, 05, 30),
                                "amount" : 3508012.17,
                                "interestOnPaydown" : true,
                                "price" : 1.0
                            } ]
                        }, {
                            "id" : "contract~2a",
                            "accrual" : {
                                "@bean" : "FloatingRateAccrual",
                                "startDate" : new Date(2017, 02, 16),
                                "endDate" : new Date(2017, 03, 20),
                                "allInRate" : 4.25,
                                "pikSpread" : 0.0,
                                "accrualAmount" : 1600000,
                                "dayCount" : "ACT/360",
                                "baseRate" : 0.012583,
                                "spread" : 3.25
                            },
                            "paymentDate" : new Date(2017, 04, 26),
                            "type" : 'FLOATING',
                            "index" : 'LIBOR',
                            "currency" : 'USD',
                            "events" : [ {
                                "type" : 'Repayment',
                                "effectiveDate" : new Date(2017, 05, 30),
                                "amount" : 4558012.17,
                                "interestOnPaydown" : false,
                                "price" : 1.0
                            }, {
                                "type" : 'Repayment',
                                "effectiveDate" : new Date(2017, 05, 30),
                                "amount" : 3508012.17,
                                "interestOnPaydown" : true,
                                "price" : 1.0
                            } ]
                        }, {
                            "id" : "contract~3a",
                            "accrual" : {
                                "@bean" : "FloatingRateAccrual",
                                "startDate" : new Date(2017, 03, 26),
                                "endDate" : new Date(2017, 06, 26),
                                "allInRate" : 4.25,
                                "pikSpread" : 0.0,
                                "accrualAmount" : 19850000.00,
                                "dayCount" : "ACT/360",
                                "baseRate" : 0.012583,
                                "spread" : 3.25
                            },
                            "paymentDate" : new Date(2017, 07, 26),
                            "type" : 'FLOATING',
                            "index" : 'LIBOR',
                            "currency" : 'USD',
                            "events" : [ {
                                "type" : 'Repayment',
                                "effectiveDate" : new Date(2017, 05, 30),
                                "amount" : 4558012.17,
                                "interestOnPaydown" : false,
                                "price" : 1.0
                            }, {
                                "type" : 'Repayment',
                                "effectiveDate" : new Date(2017, 05, 30),
                                "amount" : 3508012.17,
                                "interestOnPaydown" : true,
                                "price" : 1.0
                            } ]
                        } ],
                        trades : [ {
                            tradeId : "16602",
                            "buySell" : "BUY",
                            "buyer" : "cpty~BUYER",
                            "seller" : "cpty~SELLER",
                            "amount" : 3000000.0,
                            "currency" : "USD",
                            "price" : 1.01125,
                            "expectedSettlementDate" : new Date(2017, 02, 30),
                            "delayedCompensationFlag" : true,
                            "association" : "LSTA",
                            "formOfPurchase" : "ASSIGNMENT",
                            "documentationType" : "PAR",
                            "tradeType" : "SECONDARY",
                            "whenIssuedFlag" : false,
                            "commitmentReductionCreditFlag" : true,
                            "paydownOnTradeDate" : false,
                            "adjustmentOnTradeDate" : false,
                            "accrualSettlementType" : "SETTLEDWITHOUTACCRUED",
                            "averageLibor" : 0.009834,
                            "info" : {
                                "tradeDate" : new Date(2017, 02, 21),
                                "settlementDate" : new Date(2017, 03, 10),
                                "attributes" : {}
                            },
                            tradeProceeds : {
                            // "costOfFunded": 0,
                            // "benefitOfUnfunded": 0,
                            // "delayedCompensation": 0,
                            // "costOfCarry": 0,
                            // "economicBenefit": 0,
                            // "totalRemittance": 0,
                            }
                        } ]
                    }, {
                        "loanId" : 'UI202',
                        borrower : 'ANCESTRY.COM',
                        agent : 'CHASE NY',
                        facilityType : 'TERM',
                        originalCommitmentAmount : 1386000000.00,
                        startDate : new Date(2017, 0, 19),
                        maturityDate : new Date(2021, 01, 01),
                        currency : 'USD',
                    }, {
                        loanId : 'UI203',
                        borrower : 'ANCESTRY.COM',
                        agent : 'CHASE NY',
                        facilityType : 'TERM',
                        originalCommitmentAmount : 5450000000.00,
                        startDate : new Date(2017, 0, 19),
                        maturityDate : new Date(2021, 01, 01),
                        currency : 'USD'
                    }, {
                        loanId : 'UI304',
                        borrower : 'ACCESS CIG',
                        agent : 'DEUTSCHE NY',
                        facilityType : 'TERM',
                        originalCommitmentAmount : 732448600.00,
                        startDate : new Date(2016, 9, 14),
                        maturityDate : new Date(2023, 9, 14),
                        currency : 'USD',
                    } ];

                    $scope.JSONfacilityType = {
                        "TERM" : "Term",
                        "REVOLVING" : "Revolving",
                        "DELAYED DRAW" : "DelayedDraw",
                        "LETTER OF CREDIT" : "LetterOfCredit"
                    };
                    $scope.JSONcontractAccrualType = {
                        "FIXED" : "FixedRateAccrual",
                        "FLOATING" : "FloatingRateAccrual"
                    };
                    $scope.JSONcontractIndex = {
                        "LIBOR" : "USD-LIBOR-3M",
                        "PRIME" : "USD-LIBOR-3M" /*
                                                     * update this when get info
                                                     * from John
                                                     */
                    };
                    $scope.JSONcontractFrequency = {
                        "MONTHLY" : "P1M",
                        "QUARTERLY" : "P3M"
                    };
                    $scope.JSONformOfPurchase = {
                        "ASSIGNMENT" : "Assignment",
                        "PARTICIPATION" : "Participation"
                    };
                    $scope.JSONdocumentationType = {
                        "PAR" : "Par",
                        "DISTRESSED" : "Distressed"
                    };
                    $scope.JSONtradeType = {
                        "PRIMARY" : "Primary",
                        "SECONDARY" : "Secondary"
                    };
                    $scope.JSONaccrualSettlementType = {
                        "SETTLEDWITHOUTACCRUED" : "SettledWithoutAccrued",
                        "SETTLEDWITHACCRUED" : "SettledWithAccrued",
                        "FLAT" : "Flat"
                    };

                    $scope.Contract = function Contract() {
                        this.id = "";
                        this.accrual = {
                            "@bean" : "",
                            "startDate" : "",
                            "endDate" : "",
                            "allInRate" : 0,
                            "pikSpread" : 0,
                            "accrualAmount" : "",
                            "dayCount" : "",
                            // "paymentFrequency": "",
                            // "paymentProjection": "",
                            // "pikProjection": "",
                            "index" : {
                                "@type" : "com.opengamma.strata.basics.index.IborIndex",
                                "value" : ""
                            },
                            "baseRate" : 0,
                            "spread" : 0
                        };
                        this.paymentDate = "";
                        this.events = [];
                    };

                    $scope.createTradeJSON = function createTradeJSON() {
                        $scope.tradeJSON = {
                            "@bean" : "com.syndloanhub.loansum.product.facility.LoanTrade",
                            "buySell" : $scope.selectedTrade.buySell,
                            "buyer" : $scope.selectedTrade.buyer,
                            "seller" : $scope.selectedTrade.seller,
                            "amount" : $scope.selectedTrade.amount,
                            "currency" : $scope.selectedTrade.currency,
                            "price" : $scope.selectedTrade.price,
                            "expectedSettlementDate" : $scope.selectedTrade.expectedSettlementDate.toJSON()
                                    .slice(0, 10),
                            "delayedCompensationFlag" : $scope.selectedTrade.delayedCompensationFlag,
                            "association" : $scope.selectedTrade.association,
                            "formOfPurchase" : $scope.JSONformOfPurchase[$scope.selectedTrade.formOfPurchase],
                            "documentationType" : $scope.JSONdocumentationType[$scope.selectedTrade.documentationType],
                            "tradeType" : $scope.JSONtradeType[$scope.selectedTrade.tradeType],
                            "whenIssuedFlag" : $scope.selectedTrade.whenIssuedFlag,
                            "commitmentReductionCreditFlag" : $scope.selectedTrade.commitmentReductionCreditFlag,
                            "paydownOnTradeDate" : $scope.selectedTrade.paydownOnTradeDate,
                            "adjustmentOnTradeDate" : $scope.selectedTrade.adjustmentOnTradeDate,
                            "accrualSettlementType" : $scope.JSONaccrualSettlementType[$scope.selectedTrade.accrualSettlementType],
                            "averageLibor" : $scope.selectedTrade.averageLibor,
                            "info" : {
                                "id" : "user~" + $scope.selectedTrade.tradeId,
                                "tradeDate" : $scope.selectedTrade.info.tradeDate.toJSON().slice(0, 10),
                                "settlementDate" : $scope.selectedTrade.info.settlementDate.toJSON().slice(0, 10),
                                "attributes" : $scope.selectedTrade.info.attributes
                            },
                            "product" : {
                                "id" : "user~" + $scope.selectedLoan.loanId,
                                "borrower" : "user~" + $scope.selectedLoan.borrower,
                                "agent" : "user~" + $scope.selectedLoan.agent,
                                "facilityType" : $scope.JSONfacilityType[$scope.selectedLoan.facilityType],
                                "identifiers" : $scope.selectedLoan.identifiers,
                                "originalCommitmentAmount" : $scope.selectedLoan.currency + " "
                                        + $scope.selectedLoan.originalCommitmentAmount,
                                "startDate" : $scope.selectedLoan.startDate.toJSON().slice(0, 10),
                                "maturityDate" : $scope.selectedLoan.maturityDate.toJSON().slice(0, 10),
                                "contracts" : [],
                                "fees" : [],
                                "totalCommitmentSchedule" : {
                                    "@bean" : "com.opengamma.strata.collect.timeseries.SparseLocalDateDoubleTimeSeries",
                                    "dates" : {
                                        "@meta" : "java.time.LocalDate[]",
                                        "value" : []
                                    },
                                    "values" : ""
                                },
                                "events" : []
                            }
                        // product
                        };

                        for (i in $scope.selectedLoan.contracts) { // or switch
                            // to a for
                            // loop, not
                            // for in

                            $scope.tradeJSON.product.contracts[i] = new $scope.Contract();

                            $scope.tradeJSON.product.contracts[i].id = $scope.selectedLoan.contracts[i].id;
                            $scope.tradeJSON.product.contracts[i].accrual["@bean"] = $scope.JSONcontractAccrualType[$scope.selectedLoan.contracts[i].type];
                            $scope.tradeJSON.product.contracts[i].accrual.startDate = $scope.selectedLoan.contracts[i].accrual.startDate
                                    .toJSON().slice(0, 10);
                            $scope.tradeJSON.product.contracts[i].accrual.endDate = $scope.selectedLoan.contracts[i].accrual.endDate
                                    .toJSON().slice(0, 10);
                            $scope.tradeJSON.product.contracts[i].accrual.allInRate = $scope.selectedLoan.contracts[i].accrual.allInRate;
                            $scope.tradeJSON.product.contracts[i].accrual.pikSpread = $scope.selectedLoan.contracts[i].accrual.pikSpread;
                            $scope.tradeJSON.product.contracts[i].accrual.accrualAmount = $scope.selectedLoan.contracts[i].currency
                                    + " " + $scope.selectedLoan.contracts[i].accrual.accrualAmount;
                            $scope.tradeJSON.product.contracts[i].accrual.dayCount = $scope.selectedLoan.contracts[i].accrual.dayCount;
                            $scope.tradeJSON.product.contracts[i].accrual.paymentFrequency = $scope.JSONcontractFrequency[$scope.selectedLoan.contracts[i].accrual.paymentFrequency];
                            $scope.tradeJSON.product.contracts[i].accrual.index.value = $scope.JSONcontractIndex[$scope.selectedLoan.contracts[i].index];
                            $scope.tradeJSON.product.contracts[i].accrual.baseRate = $scope.selectedLoan.contracts[i].accrual.baseRate;
                            $scope.tradeJSON.product.contracts[i].accrual.spread = $scope.selectedLoan.contracts[i].accrual.spread;
                            $scope.tradeJSON.product.contracts[i].paymentDate = $scope.selectedLoan.contracts[i].paymentDate
                                    .toJSON().slice(0, 10);
                            // $scope.tradeJSON.product.contracts[i].type =
                            // $scope.JSONcontractAccrualType[$scope.selectedLoan.contracts[i].type];
                            /*
                             * do these events next
                             * $scope.tradeJSON.product.contracts[i].events[] =
                             * $scope.selectedLoan.contracts[i].events;
                             */
                        }
                    };

                    $scope.calculateProceeds = function calculateProceeds() {

                        $scope.createTradeJSON();

                        var xhr = new XMLHttpRequest();
                        // var url =
                        // "http://localhost:8080/loansum-service/loansum/calculateProceeds";
                        var url = "loansum-service/loansum/calculateProceeds";

                        xhr.open("POST", url, true);
                        xhr.setRequestHeader("Content-type", "application/json");
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState === 4 && xhr.status === 200) {
                                $scope.data = JSON.parse(xhr.responseText);
                                if ($scope.data.message) {
                                    alert($scope.data.message);
                                } else {
                                    $scope.selectedTrade.tradeProceeds.costOfFunded = 0;
                                    $scope.selectedTrade.tradeProceeds.benefitOfUnfunded = 0;
                                    $scope.selectedTrade.tradeProceeds.delayedCompensation = 0;
                                    $scope.selectedTrade.tradeProceeds.costOfCarry = 0;
                                    $scope.selectedTrade.tradeProceeds.economicBenefit = 0;
                                    for (i in $scope.data.cashFlows) { // switch
                                        // to
                                        // for
                                        // loop?
                                        if ($scope.data.cashFlows[i].annotation.type == "CostOfFunded") {
                                            $scope.selectedTrade.tradeProceeds.costOfFunded = numeral(
                                                    $scope.data.cashFlows[i].cashFlow.forecastValue).value();
                                        } else if ($scope.data.cashFlows[i].annotation.type == "BenefitOfUnfunded") {
                                            $scope.selectedTrade.tradeProceeds.benefitOfUnfunded = numeral(
                                                    $scope.data.cashFlows[i].cashFlow.forecastValue).value();
                                        } else if ($scope.data.cashFlows[i].annotation.type == "DelayedCompensation") {
                                            $scope.selectedTrade.tradeProceeds.delayedCompensation = numeral(
                                                    $scope.data.cashFlows[i].cashFlow.forecastValue).value();
                                        } else if ($scope.data.cashFlows[i].annotation.type == "CostOfCarry") {
                                            $scope.selectedTrade.tradeProceeds.costOfCarry = numeral(
                                                    $scope.data.cashFlows[i].cashFlow.forecastValue).value();
                                        } else if ($scope.data.cashFlows[i].annotation.type == "EconomicBenefit") {
                                            $scope.selectedTrade.tradeProceeds.economicBenefit = numeral(
                                                    $scope.data.cashFlows[i].cashFlow.forecastValue).value();
                                        }

                                    }
                                    ;
                                    /*
                                     * angular.forEach(data.cashFlows,){} for
                                     * (i=0, i < data.cashFlows.length, i++){
                                     * switch(data.cashFlows[i].annotation.type){
                                     * case "CostOfFunded":
                                     * $scope.selectedTrade.tradeProceeds.costOfFunded =
                                     * data.cashFlows[i].cashFlow.forecastValue;
                                     * break; case "benefitOfUnfunded":
                                     * $scope.selectedTrade.tradeProceeds.benefitOfUnfunded =
                                     * data.cashFlows[i].cashFlow.forecastValue;
                                     * break; case "delayedCompensation":
                                     * $scope.selectedTrade.tradeProceeds.delayedCompensation =
                                     * data.cashFlows[i].cashFlow.forecastValue;
                                     * break; case "CostOfCarry":
                                     * $scope.selectedTrade.tradeProceeds.costOfCarry =
                                     * data.cashFlows[i].cashFlow.forecastValue;
                                     * break; case "economicBenefit":
                                     * $scope.selectedTrade.tradeProceeds.economicBenefit =
                                     * data.cashFlows[i].cashFlow.forecastValue; } }
                                     */
                                    $scope.selectedTrade.tradeProceeds.totalRemittance = $scope.selectedTrade.tradeProceeds.costOfFunded
                                            + $scope.selectedTrade.tradeProceeds.benefitOfUnfunded
                                            + $scope.selectedTrade.tradeProceeds.delayedCompensation
                                            + $scope.selectedTrade.tradeProceeds.costOfCarry
                                            + $scope.selectedTrade.tradeProceeds.economicBenefit;
                                }
                            }
                        };

                        xhr.send(JSON.stringify($scope.tradeJSON));

                    };

                    $scope.calculateCashFlows = function calculateCashFlows() {

                    };

                    $scope.selectLoan = function selectLoan(row) {
                        if ($scope.lastSelectedLoan) {
                            if ($scope.lastSelectedContract) {
                                $scope.loans[$scope.selectedLoanIndex].contracts[$scope.selectedContractIndex].isSelected = false;
                                $scope.selectedContract = "";
                                $scope.selectedContractIndex = -1;
                                $scope.lastSelectedContract = false;
                            }
                            if ($scope.lastSelectedTrade) {
                                $scope.loans[$scope.selectedLoanIndex].trades[$scope.selectedTradeIndex].isSelected = false;
                                $scope.selectedTrade = "";
                                $scope.selectedTradeIndex = -1;
                                $scope.lastSelectedTrade = false;
                            }
                            $scope.loans[$scope.selectedLoanIndex].isSelected = false;
                        }
                        index = $scope.loans.indexOf(row);
                        if ($scope.loans[index].isSelected) {
                            $scope.selectedLoan = row;
                            $scope.selectedLoanIndex = index;
                            $scope.lastSelectedLoan = true;
                            // $scope.contracts =
                            // $scope.loans[$scope.selectedLoanIndex].contracts;
                        } else {
                            $scope.selectedLoan = "";
                            $scope.selectedLoanIndex = -1;
                            $scope.lastSelectedLoan = false;
                            // $scope.contracts ="";
                        }

                    };

                    $scope.selectContract = function selectContract(contract) {
                        if ($scope.lastSelectedContract) {
                            $scope.loans[$scope.selectedLoanIndex].contracts[$scope.selectedContractIndex].isSelected = false;
                        }
                        index = $scope.loans[$scope.selectedLoanIndex].contracts.indexOf(contract);
                        if ($scope.loans[$scope.selectedLoanIndex].contracts[index].isSelected) {
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
                            $scope.loans[$scope.selectedLoanIndex].trades[$scope.selectedTradeIndex].isSelected = false;
                        }
                        index = $scope.loans[$scope.selectedLoanIndex].trades.indexOf(trade);
                        if ($scope.loans[$scope.selectedLoanIndex].trades[index].isSelected) {
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
                        index = $scope.loans.length - 1;
                        $scope.loans[index].isSelected = true;
                        $scope.selectLoan($scope.loans[index]);
                        displayedIndex = $scope.displayedCollection.indexOf($scope.loans[index]) + 1;
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
                        $scope.loans.push(newLoan);
                        // index = $scope.loans.length - 1;
                        // $scope.loans[index].isSelected = true;
                        // $scope.selectRow($scope.loans[index],index);
                    };
                    $scope.scrollContract = function() {
                        index = $scope.loans[$scope.selectedLoanIndex].contracts.length - 1;
                        $scope.loans[$scope.selectedLoanIndex].contracts[index].isSelected = true;
                        $scope.selectContract($scope.loans[$scope.selectedLoanIndex].contracts[index]);
                        displayedIndex = $scope.displayedContracts
                                .indexOf($scope.loans[$scope.selectedLoanIndex].contracts[index]) + 1;
                        $("#contractTable tr:eq(" + displayedIndex + ")").scrollintoview();
                    };
                    $scope.addContract = function addContract() {
                        newContract = {
                            id : 'Contract1',
                            amount : 1000,
                            currency : 'USD'
                        }; // , isSelected: true};
                        $scope.loans[$scope.selectedLoanIndex].contracts.push(newContract);
                    };

                    $scope.scrollEvent = function() {
                        index = $scope.loans[$scope.selectedLoanIndex].contracts[$scope.selectedContractIndex].events.length - 1;
                        displayedIndex = $scope.displayedEvents
                                .indexOf($scope.loans[$scope.selectedLoanIndex].contracts[$scope.selectedContractIndex].events[index]) + 3;
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

                    $scope.scrollTrade = function() {
                        index = $scope.loans[$scope.selectedLoanIndex].trades.length - 1;
                        $scope.loans[$scope.selectedLoanIndex].trades[index].isSelected = true;
                        $scope.selectTrade($scope.loans[$scope.selectedLoanIndex].trades[index]);
                        displayedIndex = $scope.displayedTrades
                                .indexOf($scope.loans[$scope.selectedLoanIndex].trades[index]) + 1;
                        $("#tradeTable tr:eq(" + displayedIndex + ")").scrollintoview();
                    };
                    $scope.addTrade = function addTrade() {
                        newTrade = {
                            tradeId : 'Trade1',
                            currency : 'USD',
                            delayedCompensationFlag : false
                        }; // , isSelected: true};
                        $scope.loans[$scope.selectedLoanIndex].trades.push(newTrade);
                    };

                    $scope.removeLoan = function removeLoan(row) {
                        if ($scope.lastSelectedContract) {
                            // $scope.loans[$scope.selectedLoanIndex].contracts[$scope.selectedContractIndex].isSelected
                            // = false;
                            $scope.selectedContract = "";
                            $scope.selectedContractIndex = -1;
                            $scope.lastSelectedContract = false;
                        }
                        index = $scope.loans.indexOf(row);
                        if (index !== -1) {
                            $scope.loans.splice(index, 1);
                            $scope.selectedLoan = "";
                            $scope.selectedLoanIndex = -1;
                            $scope.lastSelectedLoan = false;
                        }
                    };

                    $scope.removeContract = function removeContract(contract) {
                        index = $scope.loans[$scope.selectedLoanIndex].contracts.indexOf(contract);
                        if (index !== -1) {
                            $scope.loans[$scope.selectedLoanIndex].contracts.splice(index, 1);
                            $scope.selectedContract = "";
                            $scope.selectedContractIndex = -1;
                            $scope.lastSelectedContract = false;
                        }
                    };

                    $scope.removeEvent = function removeEvent(event) {
                        index = $scope.loans[$scope.selectedLoanIndex].contracts[$scope.selectedContractIndex].events
                                .indexOf(event);
                        if (index !== -1) {
                            $scope.loans[$scope.selectedLoanIndex].contracts[$scope.selectedContractIndex].events
                                    .splice(index, 1);
                        }
                    };

                    $scope.removeTrade = function removeTrade(trade) {
                        index = $scope.loans[$scope.selectedLoanIndex].trades.indexOf(trade);
                        if (index !== -1) {
                            $scope.loans[$scope.selectedLoanIndex].trades.splice(index, 1);
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
