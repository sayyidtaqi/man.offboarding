sap.ui.define([
    "smm/hcmapp/man/offboarding/controller/BaseController",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, J) {
        "use strict";

        return Controller.extend("smm.hcmapp.man.offboarding.controller.App", {
            onInit: function () {
                var p = new J({
                    InitialLoaded: false,
                    IsAuthorized: true
                });
                this.setModel(p, "appParams");
                this.setModel(new J(), "employee");

                this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
            }
        });
    });
