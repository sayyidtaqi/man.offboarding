sap.ui.define([], function () {
	"use strict";
	return {
		itemCountFormatter: function (c) {
			return this.getResourceBundle().getText("items", [c]);
		},

		dialogTitleFormatter: function (m) {
			switch (m) {
				case "C": //Create
					return this.getResourceBundle().getText("addProjectTooltip");
				case "S": //Update Status
					return this.getResourceBundle().getText("updateProjectTooltip");
				case "U": //Update
					return this.getResourceBundle().getText("editProjectTooltip");
				case "R": //Read (Display)
					return this.getResourceBundle().getText("displayProjectTooltip");
			}
		},

		formatReqNumber: function (n) {
			if (n === "000000000000") {
				return "#DUMMY";
			} else {
				return n;
			}
		},

		formatStatus: function (s) {
			switch (s) {
				case "D":
				case "1":
				case "S":
					return sap.ui.core.ValueState.Warning;
				case "R":
				case "V":
					return sap.ui.core.ValueState.Error;
				default:
					return sap.ui.core.ValueState.Success;
			}
		},

		formatValidity: function (b, e) {
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd/MM/YYYY"
			}),
				B = dateFormat.format(b),
				E = dateFormat.format(e);
			return B + " - " + E;
		},

		formatApproverName: function (n, a) {
			if (a) {
				switch (a) {
					case "MGR":
						return n + " (Manager)";
					case "SPMO":
						return n + " (SPMO)";
					case "HRTL":
						return n;
					case "DEP":
						return n + " (Dep. Head)";
					case "DIV":
						return n + " (Div. Head)";
					case "FIN_HEAD":
						return n + " (Head of Finance)";
					case "TREAT":
						return n + " (Treasury)";
					default:
						return n + " (" + a + ")";
				}
			}
			return n;
		},

		formatApproverType: function (a) {
			if (a) {
				switch (a) {
					case "MGR":
						return "Manager";
					case "HRTL":
						return "Talent";
					case "DEP":
						return "Dep. Head";
					case "DIV":
						return "Div. Head";
					case "FIN_HEAD":
						return "Head of Finance";
					case "TREAT":
						return "Treasury";
					default:
						return a;
				}
			}
			return a;
		},

		// eslint-disable-next-line consistent-return
		formatTime: function (t) {
			var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
				pattern: "HH:mm"
			}),
				TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
			if (t) {
				return timeFormat.format(new Date(t.ms + TZOffsetMs));
			}
		}


	};
});