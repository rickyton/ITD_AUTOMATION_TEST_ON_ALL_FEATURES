 var CommonPage = require("../../common/CommonPage");
 var World = require("../../framework/World");

var FormField = function(index) {
    this.index = index;

    this.field = element(by.css(".box-group")).all(by.css(".area__formbuilder__field")).get(index);

    this.properties = {};
    this.fieldType = this.field.element(by.model("field.field_type"));
    this.fieldTitle = this.field.element(by.model("field.field_title"));
    this.longList = this.field.element(by.model("field.show_in_lists"));
    this.shortList = this.field.element(by.model("field.show_in_lists_short"));
    this.cardView = this.field.element(by.model("field.show_in_card_view"));
    this.detail = this.field.element(by.model("field.show_in_details"));
    this.editMode = this.field.element(by.model("field.can_edit"));
    this.editable = this.field.element(by.model("field.editable_in_grid"));
    this.terminology = this.field.element(by.id("fieldTerminology"));
    this.multiSelect = this.field.element(by.model("field.multiple"));
    this.facet = this.field.element(by.model("field.show_in_filters"));
    this.field_key = this.field.element(by.model("field.field_key"));
    this.addOtpionButton = this.field.element(by.css(".btn-primary"));
    this.optionTittleList = this.field.all(by.model("option.option_title"));
    this.fieldCurrency = this.field.element(by.id("fieldCurrency"));
    this.radioButton = this.field.all(by.css(".iradio_minimal-blue"));
    this.unit = this.field.$('#fieldUnit');
    this.min = this.field.$('#fieldNumMin');
    this.max = this.field.$('#fieldNumMax');
};


/**
 * 
 * Return a promise, it has to be waited, terminology is always present that why we have to use display
 * @returns a
 */
FormField.prototype.terminologyIsDisplayed = function() {
	return this.terminology.isDisplayed();
};

/**
 * This method will add some option (usefull with Dropdown list for example)
 * @param value
 * @returns
 */
FormField.prototype.addOption = function(value) {

	browser.executeScript('arguments[0].scrollIntoView(false)', this.addOtpionButton.getWebElement());
	this.addOtpionButton.click();
	
	
	this.optionTittleList.then(function(options){
		browser.executeScript('arguments[0].scrollIntoView(false)', options[options.length-1].getWebElement());
		options[options.length-1].sendKeys(value);
	});
	
};

FormField.prototype.addLinkFieldReference = function(relation,reference){
	var world = new World();
	var commonPage = new CommonPage(world);
	commonPage.get();
	var ele = $('[ng-click="openReferenceBuilder(field)"]');
	browser.executeScript("arguments[0].click();", ele.getWebElement());
	commonPage.selectItem($('.modal-content'),'span',relation);
	commonPage.selectItem($('.modal-content'),'span',reference);
	var save = $('.modal-footer').$('[ng-click="ok()"]');
	browser.executeScript("arguments[0].click();", save.getWebElement());
};

FormField.prototype.addLinkFieldConstraint = function(constraint){
	var world = new World();
	var commonPage = new CommonPage(world);
	commonPage.get();
	var ele = $('[ng-click="openConstraintReferenceBuilder(field)"]');
	browser.executeScript("arguments[0].click();", ele.getWebElement());
	commonPage.selectItem($('.modal-content'),'span',constraint);
	var save = $('.modal-footer').$('[ng-click="ok()"]');
	browser.executeScript("arguments[0].click();", save.getWebElement());
};


FormField.prototype.setCurrency = function(value) {
	browser.executeScript('arguments[0].scrollIntoView(false)', this.fieldCurrency.getWebElement());
	this.fieldCurrency.click();
	this.fieldCurrency.all(by.css("option")).each(function(option){
		option.getText().then(function(text){
			if(text==value){
				optionToClick=option;
			}
		});
	}).then(function(){
		optionToClick.click();
	})

	
};

FormField.prototype.setTerminology = function(value) {
	browser.executeScript('arguments[0].scrollIntoView(false)', this.terminology.getWebElement());
	this.terminology.click();
	this.terminology.all(by.css("option")).each(function(option){
		option.getText().then(function(text){
			if(text==value){
				optionToClick=option;
			}
		});
	}).then(function(){
		optionToClick.click();
	})



	// browser.executeScript("arguments[0].click();", this.terminology.getWebElement()).then(function(){
	// 	self.terminology.$$('option').each(function(option){
	// 		option.getText().then(function(optionName){
	// 			if(optionName==value){
	// 				optionToClick = option;
	// 			}

	// 		})
	// 	}).then(function(){
	// 		browser.executeScript("arguments[0].click();", optionToClick.getWebElement());
	// 	})
	// })
};



/*FormField.prototype.setTerminology = function(value) {
	this.terminology.sendKeys(value);
};*/

/**
 * 
 * Return a promise, it has to be waited
 * @returns
 */
FormField.prototype.longListIsPresent = function() {
	return this.longList.isPresent();
};


FormField.prototype.editModeIsPresent = function() {
	return this.editMode.isPresent();
};

FormField.prototype.editableIsPresent = function() {
	return this.editable.isPresent();
};


/**
 * 
 * Return a promise, it has to be waited
 * @returns
 */
FormField.prototype.longListIsAlreadyClicked = function() {
	return this.longList.isSelected();
};

FormField.prototype.editModeIsAlreadyClicked = function() {
	return this.editMode.isSelected();
};

FormField.prototype.editableIsAlreadyClicked = function() {
	return this.editable.isSelected();
};


/**
 * 
 * Return a promise, it has to be waited
 * @returns
 */
FormField.prototype.shortListIsAlreadyClicked = function() {
	return this.shortList.isSelected();
};

FormField.prototype.cardViewIsAlreadyClicked = function() {
	return this.cardView.isSelected();
};

FormField.prototype.detailIsAlreadyClicked = function() {
	return this.detail.isSelected();
};

FormField.prototype.multiSelectIsAlreadyClicked = function() {
	return this.multiSelect.isSelected();
};

FormField.prototype.facetIsAlreadyClicked = function() {
	return this.facet.isSelected();
};


FormField.prototype.setLongList = function(value) {
	var self = this;
	if(value==true){
		this.longListIsAlreadyClicked().then(function(isAlreadySelected){
			if(!isAlreadySelected)
				self.longList.click();
		})
	}
	
};

FormField.prototype.setEditMode = function(value) {
	var self = this;
	if(value==true){
		this.editModeIsAlreadyClicked().then(function(isAlreadySelected){
			if(!isAlreadySelected)
				self.editMode.click();
		})
	}
};

FormField.prototype.setEditableMode = function(value) {
	var self = this;
	if(value==true){
		this.editableIsAlreadyClicked().then(function(isAlreadySelected){
			if(!isAlreadySelected)
				self.editable.click();
		})
	} else {
		this.editableIsAlreadyClicked().then(function(isAlreadySelected){
			if(isAlreadySelected)
				self.editable.click();
		})
	}
};

FormField.prototype.setCardView = function(value) {
	var self = this;
	if(value==true){
		this.cardViewIsAlreadyClicked().then(function(isAlreadySelected){
			if(!isAlreadySelected)
				browser.executeScript("arguments[0].click();", self.cardView.getWebElement());
		})
	}
	else{
		this.cardViewIsAlreadyClicked().then(function(isAlreadySelected){
			if(isAlreadySelected)
				browser.executeScript("arguments[0].click();", self.cardView.getWebElement());
		})
	}
	
};



FormField.prototype.setDetail = function(value) {
	var self = this;
	if(value==true){
		this.detailIsAlreadyClicked().then(function(isAlreadySelected){
			if(!isAlreadySelected)
				browser.executeScript("arguments[0].click();", self.detail.getWebElement());
		})
	}
};


FormField.prototype.setMultiSelect = function(value) {
	var self = this;
	if(value==true){
		this.multiSelectIsAlreadyClicked().then(function(isAlreadySelected){
			if(!isAlreadySelected)
				self.multiSelect.click();
		})
	}
};


FormField.prototype.setFacet = function(value) {
	var self = this;
	if(value==true){
		this.facetIsAlreadyClicked().then(function(isAlreadySelected){
			if(!isAlreadySelected)
				self.facet.click();
		})
	}
};



FormField.prototype.setRadio = function() {
	this.radioButton.first().click();
};


/**
 * 
 * Return a promise, it has to be waited
 * @returns
 */
FormField.prototype.shortListIsPresent = function() {
	return this.shortList.isPresent();
};

FormField.prototype.setShortList = function(value) {
	var self=this;
	if(value==true){
		this.shortListIsAlreadyClicked().then(function(isAlreadySelected){
			if(!isAlreadySelected){
				browser.executeScript("arguments[0].click();", self.shortList.getWebElement());
			}
		});	
	}
};


FormField.prototype.setFieldKey= function(value){
	this.field_key.sendKeys(value);
};


FormField.prototype.setTitle = function(value) {
	this.fieldTitle.sendKeys(value);
};

FormField.prototype.setType = function(value) {
	this.fieldType.sendKeys(value);
};


FormField.prototype.getDetailWebelement = function(){
	return this.detail;
}



/**
 * Currently sets only elements that accept key-ed input.
 *
 * @param json Object where key is key of a property element and value is value to be set
 */
FormField.prototype.setProperties = function(json) {
//this.setProperties = function(json) {
    var keys = Object.keys(json);

    for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = json[key];
        var propertyElement = this.properties[key];
        if (propertyElement == null || propertyElement == undefined) {
            console.log("No property element for key = " + key);
            continue;
        }

        propertyElement.sendKeys(value);
    }
};

FormField.prototype.selectUnit = function(uni){
	var ele = this.unit.element(by.cssContainingText('option',uni));
	browser.actions().mouseMove(ele).perform();
	ele.click();
}


FormField.prototype.selectUnitField = function(uni){
	var self = this;
	browser.executeScript("arguments[0].click();", this.unit.getWebElement()).then(function(){
		self.selectUnit(uni);
	});
}

FormField.prototype.fillInField = function(fieldSelected,content){
	browser.executeScript("arguments[0].click();", fieldSelected.getWebElement()).then(function(){
		fieldSelected.clear();
		fieldSelected.sendKeys(content);
	});
}


module.exports = FormField;