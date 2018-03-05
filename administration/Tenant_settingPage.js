


var Tenant_settingPage = function(world) {
	this.world = world;

	this.navigation_setting = {};

};

Tenant_settingPage.prototype.get = function() {
	
	//buttons
	this.saveFormButton = $('.btn-primary');

	//fields
	this.exportDelimiter = $('#exportDelimiter');
	
	this.units = $$('.ui-select-multiple').get(0);
	this.allUnits = this.units.$$('.ui-select-match-item');
	this.unitsInput = $$('.ui-select-search').get(0);
	this.unitPropositions = $$('.ui-select-choices').get(0);

	this.currency = $$('.ui-select-multiple').get(1);
	this.allCurrencies = this.currency.$$(".ui-select-match-item");
	this.currencyInput = $$('.ui-select-search').get(1);
	this.currencyProposition = $$('.ui-select-choices').get(1);

	this.blacklistField = element(by.model('helper.reportBlacklist'));
	this.blackListItems = this.blacklistField.all(by.repeater('$item in $select.selected'));

	this.fileTypes = $$('.ui-select-multiple').get(2);
	this.fileTypeInput = $$('.ui-select-search').get(2);

	this.dateFormat = $('#dateFormat');
	this.timeFormat = $('#timeFormat');
	this.thousandsSeparatorFormat = $('#numbersThousandSeparator');
	this.decimalSeparatorFormat = $('#numbersDecimalSeparator');
	this.currencyPosition = $('#numbersCurrencyPosition');
	this.geographicCoordinateSystem = $('#geoCoordinateSystem');


};

Tenant_settingPage.prototype.saveForm = function(){
	browser.executeScript("arguments[0].click();", this.saveFormButton.getWebElement());
	browser.sleep(2000);
};

Tenant_settingPage.prototype.addUnit = function(unitName){
	// this.unitsInput.click();
	browser.executeScript("arguments[0].click();", this.unitsInput.getWebElement());
	this.unitsInput.sendKeys(unitName).then(function(){
		browser.actions().sendKeys( protractor.Key.ENTER ).perform();
	})
};

Tenant_settingPage.prototype.unitIsPresent = function(unitName){
	 return this.units.element(by.xpath(".//span[contains(text(),'"+unitName+"')]")).isPresent();
}

Tenant_settingPage.prototype.removeUnit = function(unitName){
	var unitToRemove;
	this.allUnits.each(function(unit){
		unit.$$("span").get(1).getText().then(function(unitText){
			if(unitName==unitText){
				unitToRemove=unit;
			}
		});
	}).then(function(){
		var ele = unitToRemove.$(".ui-select-match-close");
		browser.executeScript("arguments[0].click();", ele.getWebElement());
	});
};


Tenant_settingPage.prototype.addCurrency = function(currencyName){
	// this.currencyInput.click();
	browser.executeScript("arguments[0].click();", this.currencyInput.getWebElement());
	this.currencyInput.sendKeys(currencyName).then(function(){
		browser.actions().sendKeys( protractor.Key.ENTER ).perform();
	})
		
};

Tenant_settingPage.prototype.currencyIsPresent = function(currencyName){
	 return this.currency.element(by.xpath(".//span[contains(text(),'"+currencyName+"')]")).isPresent();
}


Tenant_settingPage.prototype.removeCurrency = function(currencyName){
	var currencyToRemove;
	this.allCurrencies.each(function(currency){
		currency.$$("span").get(1).getText().then(function(currencyText){
			if(currencyName==currencyText){
				currencyToRemove=currency;
			}
		});
	}).then(function(){
		var ele = currencyToRemove.$(".ui-select-match-close");
		browser.executeScript("arguments[0].click();", ele.getWebElement());
		browser.sleep(1000);
	});
};

Tenant_settingPage.prototype.currencyIsPresent = function(currencyName){
	 return this.currency.element(by.xpath(".//span[contains(text(),'"+currencyName+"')]")).isPresent();
}

Tenant_settingPage.prototype.selectOption = function(field,valueAttribute){
	field.all(by.css('option')).each(function(opt){
		opt.getAttribute('value').then(function(value){
			if(value.includes(valueAttribute)){
				optionToClick = opt;
			}
		})
	}).then(function(){
		optionToClick.click();
		// browser.executeScript("arguments[0].click();", optionToClick.getWebElement());
	})
};

Tenant_settingPage.prototype.fileTypeIsPresent = function(fileType){
	 return this.fileTypes.element(by.xpath(".//*[contains(text(),'"+fileType+"')]")).isPresent();
}

Tenant_settingPage.prototype.addFileType = function(fileType){
	var self = this;
	this.fileTypeIsPresent(fileType).then(function(isPres){
		if(!isPres){
			browser.executeScript("arguments[0].click();", self.fileTypeInput.getWebElement());
			self.fileTypeInput.sendKeys(fileType).then(function(){
				browser.actions().sendKeys(protractor.Key.ENTER).perform();
			})
		}
	})

};






module.exports = Tenant_settingPage;