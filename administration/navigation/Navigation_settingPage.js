


var Navigation_settingPage = function(world) {
	this.world = world;

	this.navigation_setting = {};

};

Navigation_settingPage.prototype.get = function() {
	
	// url = this.world.defaultBase() + "#!/administration/navigation/domaindata";
	// browser.get(url);
	this.saveForm = element(by.css(".btn-primary"));
	this.lineInlongList = element.all(by.css(".form-control")).get(0);
	this.lineInShortList = element.all(by.css(".form-control")).get(1);
	
	
	this.topMenu = element(by.css(".navbar-static-top"));
	this.leftMenu = element(by.css(".sidebar-menu"));
	this.QuickAddMenu = this.topMenu.all(by.css(".slimScrollDiv")).get(0);
	this.quickAddMenuButton = this.topMenu.element(by.css(".plus-menu"));
	
	this.leftMenuItemSelect = element.all(by.css(".selectize-input")).get(0);
	this.leftMenuItemSelectChoice = element.all(by.css(".ui-select-dropdown")).get(0);
	
	this.QuickAddItemSelect = element.all(by.css(".selectize-input")).get(1);
	this.QuickAddItemSelectChoice = element.all(by.css(".ui-select-choices-group")).get(1);
	
	this.leftMenuItemTable = element.all(by.css(".ui-table-striped")).get(0);
	this.QuickAddItemTable = element.all(by.css(".ui-table-striped")).get(1);
	
	this.showOrHideLeftMenu = element(by.css(".sidebar-toggle"));
	
	
		
};

Navigation_settingPage.prototype.save = function(){
	this.saveForm.click();
	browser.sleep(3000);
};
/**
 * Add a entity to the left menu
 * @param entityName
 */
Navigation_settingPage.prototype.addLeftMenuItem = function(entityName){
	var optionToClick;
	this.leftMenuItemSelect.click();
	this.leftMenuItemSelectChoice.all(by.css(".ui-select-choices-row")).each(function(option){
		option.getText().then(function(optionName){
			if(optionName==entityName)
				optionToClick=option;
		})
	}).then(function(){
		optionToClick.click();
	})
};

/**
 * edit an entity name in the left menu
 * @param entityName
 */
Navigation_settingPage.prototype.editLeftMenuItem = function(entityName,entityNewName){
	var optionToClick;
	this.leftMenuItemTable.all(by.css(".ui-table-field")).each(function(option){
		option.getText().then(function(optionName){
			if(optionName==entityName)
				optionToClick=option;
		})
	}).then(function(){
		optionToClick.click();
		optionToClick.element(by.css("input")).sendKeys(entityNewName);
	})
};


/**
 * Check if the entity is present on the left menu (return a promise)
 * @param entityName
 * @returns
 */
Navigation_settingPage.prototype.leftMenuContains = function(entityName){
	var entity = this.leftMenu.element(by.xpath(".//span[contains(text(),'"+entityName+"')]"));

	//return false;
	return entity.isPresent();
};

/**
 * Check if the entity is present on the left menu (return a promise)
 * @param entityName
 * @returns
 */
Navigation_settingPage.prototype.leftMenuContainsFirst = function(entityName){
	var allItem = this.leftMenu.all(by.css("a"));
	var firstItem;
	return allItem.then(function(all){
		//have to take the one because 0 is dashboard
		firstItem=all[1];
		
	}).then(function(){
		
		return (firstItem.element(by.xpath(".//span[contains(text(),'"+entityName+"')]")).isPresent());
	});
};

/**
 * Click on item on the left menu (return a promise)
 * @param entityName
 * @returns
 */
Navigation_settingPage.prototype.clickOnLeftMenuItem = function(entityName){
	var self = this;
	this.leftMenuShown().then(function(result){
		if(!result){
			self.showOrHideLeftMenu.click();
		}
	}).then(function(){
		
		browser.actions().mouseMove(self.leftMenu).perform().then(function(){
			var entity = self.leftMenu.element(by.xpath(".//span[contains(text(),'"+entityName+"')]"));
			element(by.css(".slimScrollBar")).getWebElement().scrollTop = entity.getWebElement().offsetTop;
			entity.click();
		});

	});
	
};


Navigation_settingPage.prototype.leftMenuShown = function(entityName){
	var dashBoard = this.leftMenu.all(by.css("li")).get(0);
	return dashBoard.getText().then(function(text){
		console.log(text);
		return text!="";
		
	});
	
	
};




/**
 * put an entity to the top of left menu
 * @param entityName
 */
Navigation_settingPage.prototype.putItemOnTheTopofLeftMenu = function(entityName){
	var optionToMove;
	var firstItem;
	var self = this;
	this.leftMenuItemTable.all(by.css(".ui-table-field")).each(function(option){
		option.getText().then(function(optionName){
			if(optionName==entityName){
				optionToMove=option.element(by.xpath('ancestor::li'));
			}
				
		})
	}).then(function(){
		self.leftMenuItemTable.all(by.css(".ui-table-field")).then(function(all){
			//get first item
			firstItem=all[0].element(by.xpath('ancestor::li'));
			 browser.actions().mouseMove(optionToMove).
		       mouseDown().
		       mouseMove(firstItem).
		       mouseUp().
		       perform();
		});
		 
	})
};


/**
 * remove an entity to the left menu
 * @param entityName
 */
Navigation_settingPage.prototype.removeItemOfTheLeftMenu = function(entityName){
	var optionToClick;
	this.leftMenuItemTable.all(by.css("li")).each(function(option){
		option.element(by.css('.ui-table-field')).getText().then(function(optionName){
			if(optionName==entityName)
				optionToClick=option;
		})
	}).then(function(){
		browser.actions().mouseMove(optionToClick).perform();
		optionToClick.element(by.css(".btn-danger")).click();
	})
}



/*Navigation_settingPage.prototype.removeItemOfTheLeftMenu = function(entityName){
	var optionToClick;
	this.leftMenuItemTable.all(by.css(".ui-table-field")).each(function(option){
		option.getText().then(function(optionName){
			if(optionName==entityName)
				optionToClick=option.element(by.xpath('ancestor::li'));
		})
	}).then(function(){
		
		optionToClick.element(by.css(".btn-danger")).click();
	})
};*/


/**
 * Add a entity to the qui k add menu
 * @param entityName
 */
Navigation_settingPage.prototype.addQuickAddMenuItem = function(entityName){
	var optionToClick;
	this.QuickAddItemSelect.click();
	this.QuickAddItemSelectChoice.all(by.css(".ui-select-choices-row")).each(function(option){
		option.getText().then(function(optionName){
			if(optionName==entityName)
				optionToClick=option;
		})
	}).then(function(){
		optionToClick.click();
	})
};


/**
 * remove an entity to the quick add menu
 * @param entityName
 */
Navigation_settingPage.prototype.editQuickAddMenuItem = function(entityName,entityNewName){
	var optionToClick;
	this.QuickAddItemTable.all(by.css(".ui-table-field")).each(function(option){
		option.getText().then(function(optionName){
			if(optionName==entityName){
				optionToClick=option;
			}
		})
	}).then(function(){
		optionToClick.click();
		optionToClick.element(by.css("input")).sendKeys(entityNewName);
	})
};


/**
 * put an entity to the top of quick add menu
 * @param entityName
 */
Navigation_settingPage.prototype.putItemOnTheTopofQuickAddMenu = function(entityName){
	var optionToMove;
	var firstItem;
	var self = this;
	this.QuickAddItemTable.all(by.css(".ui-table-field")).each(function(option){
		option.getText().then(function(optionName){
			if(optionName==entityName){
				optionToMove=option.element(by.xpath('ancestor::li'));
			}
				
		})
	}).then(function(){
		self.QuickAddItemTable.all(by.css(".ui-table-field")).then(function(all){
			//get first item
			firstItem=all[0].element(by.xpath('ancestor::li'));
			 browser.actions().mouseMove(optionToMove).
		       mouseDown().
		       mouseMove(firstItem).
		       mouseUp().
		       perform();
		});
		 
	})
};


/**
 * Check if the entity is present on the quick add menu (return a promise)
 * @param entityName
 * @returns
 */
Navigation_settingPage.prototype.QuickMenuContains = function(entityName){
	var entity = this.QuickAddMenu.element(by.xpath(".//h4[contains(text(),'"+entityName+"')]"));

	return entity.isPresent();
};

/**
 * Click on item on the quick add menu (return a promise)
 * @param entityName
 * @returns
 */
Navigation_settingPage.prototype.clickOnQuickAddMenuItem = function(entityName){
	var entity = this.QuickAddMenu.element(by.xpath(".//h4[contains(text(),'"+entityName+"')]"));
	var scrollDiv = this.QuickAddMenu.element(by.xpath(".."));
	this.quickAddMenuButton.click();
	scrollDiv.getWebElement().scrollTop = entity.getWebElement().offsetTop;
	browser.executeScript('arguments[0].scrollIntoView(false)',entity.getWebElement());
	entity.click();
	
};


/**
 * remove an entity to the quick add menu
 * @param entityName
 */
Navigation_settingPage.prototype.removeItemOfQuickAddMenu = function(entityName){
	var optionToClick;
	this.QuickAddItemTable.all(by.css("li")).each(function(option){
		option.element(by.css('.ui-table-field')).getText().then(function(optionName){
			if(optionName==entityName){
				optionToClick=option;
			}
		})
	}).then(function(){
		browser.actions().mouseMove(optionToClick).perform();
		optionToClick.element(by.css(".btn-danger")).click();
	})
};



/*Navigation_settingPage.prototype.removeItemOfQuickAddMenu = function(entityName){
	var optionToClick;
	this.QuickAddItemTable.all(by.css(".ui-table-field")).each(function(option){
		option.getText().then(function(optionName){
			if(optionName==entityName){
				optionToClick=option.element(by.xpath('ancestor::li'));
			}
		})
	}).then(function(){
		b
		optionToClick.element(by.css(".btn-danger")).click();
	})
};*/



/**
 * Check if the entity is present on the left menu (return a promise)
 * @param entityName
 * @returns
 */
Navigation_settingPage.prototype.QuickAddMenuContainsFirst = function(entityName){
	var allItem = this.QuickAddMenu.all(by.css("li"));
	var firstItem;
	return allItem.then(function(all){
		firstItem=all[0];
		
	}).then(function(){
		return (firstItem.element(by.xpath(".//h4[contains(text(),'"+entityName+"')]")).isPresent());
		
	});
};



module.exports = Navigation_settingPage;