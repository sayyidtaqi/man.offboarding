sap.ui.define([
	"smm/hcmapp/man/offboarding/controller/BaseController",
	"sap/ui/core/Fragment",
	"smm/hcmapp/man/offboarding/utils/formatter",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Fragment, f, J, M, F, O) {
	"use strict";

	return Controller.extend("smm.hcmapp.man.offboarding.controller.Overview", {
		formatter: f,

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf smm.hcmapp.man.project.view.Overview
		 */

		onInit: function () {
			var d = new Date();
			this._oView = this.getView();
			this._oOverviewModel = new J({
				reqCount: 0,
				projCount: 0,
				reqStartDate: d,
				projStartDate: d,
				reqBusy: false,
				projBusy: false
			});
			this.setModel(this._oOverviewModel, "overview");
			this.setModel(new J(), "create");
			this._oBusy = new sap.m.BusyDialog();
			this.getRouter().getRoute("overview").attachPatternMatched(this._onOverviewRouteMatched, this);
		},

		_onOverviewRouteMatched: function (oEvent) {
			// var oBinding = this.byId("projectTable").getBinding("items"),
			// 	aHelpStatus = [{
			// 		key: "1",
			// 		text: "In Progress"
			// 	}, {
			// 		key: "2",
			// 		text: "Completed"
			// 	}, {
			// 		key: "W",
			// 		text: "Status Update Approval"
			// 	}];

			// oBinding.aFilters = [];
			// this.getModel("valueHelpStatus").setData({
			// 	data: aHelpStatus
			// });

			this._getInitialData();
			// this._loadReq(this._oOverviewModel.getProperty("/reqStartDate"));
			// this._loadProject(this._oOverviewModel.getProperty("/projStartDate"));
		},

		_getInitialData: function () {
			var sPath = "/EmployeeDetailSet",
				sXp = "",
				oEmpModel = this.getModel("employee"),
				oParamModel = this.getModel("appParams");
			// if (oParamModel.getProperty("/InitialLoaded") === false) {
			this._oOverviewModel.setProperty("/projBusy", true);
			this._oBusy.open();
			this.readEntity(sPath, sXp, []).then(function (result) {
				if (result.results.length === 0) {
					M.error("You are not authorized to use this app", {
						actions: ["Exit"],
						onClose: function (sAction) {
							this._navBack();
						}.bind(this)
					});
				}
				oEmpModel.setData(result.results[0]);
				console.log(result);
				oParamModel.setProperty("/InitialLoaded", true);
				this._oBusy.close();
				this._oOverviewModel.setProperty("/projBusy", false);
				this.getModel("employee").setData(result);
			}.bind(this));

			// }
		},

		onCreateReq: function () {
			this.getRouter().navTo("create", {});
		},

		onNavBack: function () {
			this._navBack();
		},

		_navBack: function () {
			this._oView.setBindingContext(null);
			var p = sap.ui.core.routing.History.getInstance().getPreviousHash(),
				i = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService("CrossApplicationNavigation");
			if (p !== undefined) {
				if (i && !i.isInitialNavigation()) {
					i.historyBack(1);
				} else {
					window.history.go(-1);
				}
			} else {
				i.toExternal({
					target: {
						shellHash: "#"
					}
				});
			}
		}
	});
});