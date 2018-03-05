var Relation = function(index) {
    this.index = index;

    this.box = element.all(by.css(".box-solid")).get(index);

    this.properties = {};
    
    this.elementLinkedInDetailMode = this.box.all(by.repeater("row in entityData"));
    this.popup = element(by.css(".modal-dialog"));
    this.searchInPopup = this.popup.element(by.id('search'));
    this.searchButton = this.popup.element(by.css('[ng-click="search()"]'));
    
    this.popupCloseButton = this.popup.all(by.css(".btn-default")).get(2);
	this.popupAddButton = this.popup.all(by.css(".btn-default")).get(1);
	this.menberGrid = this.popup.all(by.repeater('row in entity.data'));
	
	this.linkElementButton=this.box.element(by.css('.fa-link'));
	this.linkElementListInput = this.box.element(by.model('$select.search'));
	this.memberList = this.box.all(by.repeater('option in $select.items'));
	this.addElementButton = this.box.element(by.css(".fa-plus"));
	this.saveForm = element.all(by.css(".btn-primary")).get(0);
	this.linkElementList = this.box.all(by.repeater('$item in $select.selected'));
	
    
};

Relation.prototype.clickOnAddRelation = function() {
	var self = this;
	this.isAddElementPresent().then(function(pres){
		if(pres==true){
			self.addElementButton.click();
		}
		else{
			expect("Can't add relation with list widget").toBe("ko");
		}
	})
	
};

Relation.prototype.isLinkedElementPresent = function(){
	return this.


	Button.isPresent();
}

Relation.prototype.isAddElementPresent = function(){
	return this.addElementButton.isPresent();
}

Relation.prototype.saveChange = function(  ) {
	this.saveForm.click();
};


Relation.prototype.containsElement = function( elementName ) {
	return this.box.element(by.xpath(".//a[contains(text(),'"+elementName+"')]")).isPresent();
};

Relation.prototype.unlinkElement = function( elementNameList , elementNameGrid  ) {
	if (typeof elementNameGrid === 'undefined') { elementNameGrid =elementNameList ; }
	var self = this;
	this.linkElementButton.isPresent().then(function(isPres){
		if(isPres){
			self.unlinkElementGrid(elementNameGrid);
		}
		else{
			self.unlinkElementList(elementNameList);
		}
	/*}).then(function(){
		self.validateDelete();*/
	})
};

Relation.prototype.unlinkElementWithValidation = function( elementNameList , elementNameGrid  ) {
	if (typeof elementNameGrid === 'undefined') { elementNameGrid =elementNameList ; }
	var self = this;
	this.linkElementButton.isPresent().then(function(isPres){
		if(isPres){
			self.unlinkElementGrid(elementNameGrid);
		}
		else{
			self.unlinkElementList(elementNameList);
		}
	}).then(function(){
		self.validateDelete();
	})
};

Relation.prototype.unlinkElementList = function( elementName ) {
	var self = this;
	this.linkElementList.each(function(ele){		
		ele.element(by.css(".ng-binding")).getText().then(function(text){			
			if(text==elementName){			
				ele.element(by.css(".close")).click();
			}
		})
	})
};


Relation.prototype.unlinkElementGrid = function( elementName ) {
	var buttonToClick;
	this.elementLinkedInDetailMode.each(function(row){
		row.all(by.css("td")).get(0).getText().then(function(text){
			if(text==elementName){
				buttonToClick=row.all(by.css('a')).get(1);
			}
		})
	}).then(function(){
		buttonToClick.click();
	})
};

Relation.prototype.linkElement = function(elementNameList , elementNameGrid){
	if (typeof elementNameGrid === 'undefined') { elementNameGrid =elementNameList ; }
	var self = this;
	this.linkElementButton.isPresent().then(function(isPres){
		if(isPres){
			self.linkElementGrid(elementNameGrid);
		}
		else{
			self.linkUserList(elementNameList);
		}
	})	
}

Relation.prototype.linkUser = function(name){
	var self = this;
	this.linkElementButton.click();
	this.searchInPopup.click().then(function(){
		self.searchInPopup.sendKeys(name).then(function(){
			self.searchButton.click();
		});	
	});
	this.menberGrid.all(by.cssContainingText("a",name)).first().click();
	this.popupAddButton.click();
}

/**
 * Link a relation to an element provide in parameter in case of Grid layout
 * @param userName
 */
Relation.prototype.linkElementGrid = function(elementName){
	//we save before 
	this.saveChange();
	//enter edit mode
	this.saveChange();
	this.linkElementButton.click();
	var self=this;
	this.menberGrid.each(function(row){
		 row.element(by.css(".pointer")).getText().then(function(text){
			 if(text==elementName){
				 row.element(by.css(".pointer")).click();
			 }
		 })
	 }).then(function(){	
		 self.popupAddButton.click();
	 })
}

/**
 * Link a relation to an element provide in parameter in case of list layout
 * @param userName
 */
Relation.prototype.linkUserList = function(elementName){
	var elementToclick;
	this.linkElementListInput.click();
	this.memberList.each(function(row){
		 row.element(by.css(".ui-select-choices-row-inner")).getText().then(function(text){
			 if(text==elementName){
				 elementToclick =  row.element(by.css(".ui-select-choices-row-inner"));
			 }
		 })
	}).then(function(){
		elementToclick.click();
	})
}


Relation.prototype.getSize = function(){
	return this.elementLinkedInDetailMode.then(function(items) {	
		return items.length;
	})
}


Relation.prototype.clickOnLinkedElement = function(elementNameList,elementNameGrid){
	if (typeof elementNameGrid === 'undefined') { elementNameGrid =elementNameList ; }
	var self = this;
	this.addElementButton.isPresent().then(function(isPres){
		if(isPres){
			self.clickOnElementGrid(elementNameGrid);
		}
		else{
			self.clickOnElementList(elementNameList);
		}
	})
}

Relation.prototype.clickOnElementGrid = function(elementNameGrid){
	this.elementLinkedInDetailMode.each(function(row){
		row.all(by.css("td")).get(0).getText().then(function(text){
			if(text==elementNameGrid){
				buttonToClick=row.all(by.css('a')).get(0);
			}
		})
	}).then(function(){
		buttonToClick.click();
	})
}

Relation.prototype.clickOnElementList = function(elementNameList){
	
}



Relation.prototype.clickOnFirstLinkedElement = function (){
	this.elementLinkedInDetailMode.then(function(row){
		buttonToClick=row[0].all(by.css('a')).get(0).click();
	});
}


Relation.prototype.validateDelete = function(){
	$(".modal-dialog").$(".btn-danger").click();
	browser.sleep(1500);
}





module.exports = Relation;