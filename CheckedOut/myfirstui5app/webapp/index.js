sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "Quickstart",
		settings : {
			id : "Quickstart"
		},
		async: true
	}).placeAt("content");
});