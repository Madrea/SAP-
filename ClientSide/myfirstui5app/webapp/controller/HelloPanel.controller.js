sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
 ], function (Controller, MessageToast, Fragment) {
    "use strict";
    return Controller.extend("Quickstart.controller.HelloPanel", {
       onPress: function(){
        MessageToast.show("This is the controller of app");
        // read msg from i18n model
        var oBundle = this.getView().getModel("i18n").getResourceBundle();
        var sRecipient = this.getView().getModel().getProperty("/recipient/name");
        var sMsg = oBundle.getText("helloMsg", [sRecipient]);
        // show message
        MessageToast.show(sMsg);
    },
    onOpenDialog : function () {
       var oView = this.getView();

       // create dialog lazily
       if (!this.pDialog) {
          this.pDialog = Fragment.load({
             id: oView.getId(),
             name: "Quickstart.view.HelloDialog",
             controller: this
          }).then(function (oDialog) {
             // connect dialog to the root view of this component (models, lifecycle)
             oView.addDependent(oDialog);
             return oDialog;
          });
       } 
       this.pDialog.then(function(oDialog) {
          oDialog.open();
       });
    },

    onCloseDialog : function () {
       // note: We don't need to chain to the pDialog promise, since this event-handler
       // is only called from within the loaded dialog itself.
       this.byId("helloDialog").close();
    },
    onOpenDialog : function () {
      this.getOwnerComponent().openHelloDialog();
   }
    });
 });