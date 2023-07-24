sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	// eslint-disable-next-line valid-jsdoc
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} C 
	 */
	function (C) {
		"use strict";
		return C.extend("smm.hcmapp.man.offboarding.controller.BaseController", {
			getRouter: function () {
				return sap.ui.core.UIComponent.getRouterFor(this);
			},

			getModel: function (n) {
				return this.getView().getModel(n);
			},

			setModel: function (m, n) {
				return this.getView().setModel(m, n);
			},

			getResourceBundle: function () {
				return this.getOwnerComponent().getModel("i18n").getResourceBundle();
			},

			readEntity: function (sPath, sXp, aFilter) {
				return new Promise(function (resolved, rejected) {
					this.getOwnerComponent().getModel().read(sPath, {
						async: false,
						urlParameters: {
							$expand: sXp
						},
						filters: aFilter,
						success: function (oData, response) {
							resolved(oData);
						},
						error: function (oError) {
							if (oError) {
								if (oError.responseText) {
									if (oError.statusCode === 500) {
										rejected("In the context of Data Services an unknown internal server error occurred");
									} else {
										var oErrorMessage = JSON.parse(oError.responseText);
										rejected("Error: " + oErrorMessage.error.message.value);
									}
								}
							}
						}
					});
				}.bind(this));
			},

			formatDateUtc: function (d, m = false) {
				if (d) {
					var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
						pattern: "yyyy-MM-ddTHH:mm:ss"
					}),
						dateVal = new Date(oDateFormat.format(d));
					if (!m) {
						dateVal.setMinutes(dateVal.getTimezoneOffset() * -1);
					} else {
						dateVal.setMinutes(dateVal.getTimezoneOffset() * 1);
					}
					return dateVal;
				} else {
					return "1970-01-01T12:00:00";
				}
			},

			parseGuid: function (g) {
				var lengths = [8, 4, 4, 4, 12],
					parts = [],
					range = 0;
				for (var i = 0; i < lengths.length; i++) {
					parts.push(g.slice(range, range + lengths[i]));
					range += lengths[i];
				}
				return parts.join("-");
			}
		});
	});