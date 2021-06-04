sap.ui.define([], function () {
	"use strict";
	return {
		stockText: function (sStock) {
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			
            if(sStock<10)
                return resourceBundle.getText("bookA");
            else if(sStock>10 & parseInt(sStock)<30)
                return resourceBundle.getText("bookB");
            else if(sStock>30)
                return resourceBundle.getText("bookC");
            else
                return sStock;
			
		}
	};
});