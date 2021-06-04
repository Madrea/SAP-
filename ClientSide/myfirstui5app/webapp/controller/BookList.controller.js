sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function (Controller, MessageToast, Fragment, ResourceModel, Filter, FilterOperator, Sorter) {
   "use strict";
   return Controller.extend("org.ubb.books.controller.BookList", {

        onInit: function(){
            this.book = {
                Id : 5,
                FirstName:"MMADREA",
                LastName:"MMADREA",
                DateOfCheckout: "2021-05-10T00:00:00",
                DateOfReturn:"2021-05-10T00:00:00",
                Isbn:"",
                Username: "MMADREA",
                Title: "",
                Author: ""
            }
        },

        /*
        * This function is called when the users presses on the "Filter" Button.
        * It takes all the values from the input fields and pushes Filters to the Gateway Service
        */
        onSearchButtonPressed(oEvent){
            // Get the Data from the Inputs
            var isbn = this.byId("inputISBN").getValue();
            var title = this.byId("inputTitle").getValue();
            var author = this.byId("inputAuthor").getValue();
            var language = this.byId("inputLanguage").getValue();
            var dateStart = this.byId("inputDateStart").getValue();
            var dateEnd = this.byId("inputDateEnd").getValue();

            var aFilter = [];
            var oList = this.getView().byId("idBooksTable");
            var oBinding = oList.getBinding("items");

            // Push set filters
            if (isbn) {
                aFilter.push(new Filter("Isbn", FilterOperator.EQ, isbn))
            }
            if (author) {
                aFilter.push(new Filter("Author", FilterOperator.EQ, author));
            }
            if (title) {
                aFilter.push(new Filter("Title", FilterOperator.EQ, title));
            }
            if (dateStart && dateEnd) {
                var filter = new Filter("PublishDate", FilterOperator.BT, dateStart, dateEnd);
                aFilter.push(filter);
            }
            if (language) {
                aFilter.push(new Filter("Language", FilterOperator.EQ, language));
            }
            oBinding.filter(aFilter);
        },

        /*
        * Opens the Fragment which displays the Sort Options
        */
        onSortButtonPressed(oEvent){
            this._oDialog = sap.ui.xmlfragment("org.ubb.books.view.fragment.sorter", this);
            this.getView().addDependent(this._oDialog);
            this._oDialog.open();
        },

        /*
        * Triggers when the confirm button on the Sort Fragment is pressed
        */
        onConfirmSort(oEvent){
            var oView = this.getView();
            var oTable = oView.byId("idBooksTable");
            var mParams = oEvent.getParameters();
            var oBinding = oTable.getBinding("items");

            // apply the sorter
            var aSorters = [];
            var sPath = mParams.sortItem.getKey();
            var bDescending = mParams.sortDescending;
            aSorters.push(new Sorter(sPath, bDescending));
            oBinding.sort(aSorters);
        },

        onCheckoutBook(oEvent){
            MessageToast.show("Neimplementat!");

        },


    });
});
