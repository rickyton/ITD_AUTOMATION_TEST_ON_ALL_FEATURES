
var TerminologyPage = function(world) {
	this.world = world;

	this.terminology = {};
};

TerminologyPage.prototype.get = function() {
	// url = this.world.defaultBase() + "#!/terminology";
	
	// browser.get(url);
	
	this.newButton = element(by.css(".btn__terminology__addNew"));
	this.saveForm = element(by.css(".btn__terminology__saveForm"));
	this.dataTable = $('#dataTable') ;
	this.terminology.allItem = element.all(by.model("node.title"));
	this.terminology.errorDisplay = element.all(by.css(".callout-danger")).get(0);
	this.terminology.name = element(by.model("terminology.name"));
	this.terminology.dialogBox=element(by.css('.modal-dialog'));
	this.terminology.itemTree = $("#tree-root");
	this.terminology.title = element(by.css('h1')).element(by.css('span'));
	this.terminology.close = element(by.css('[ng-click="close($index)"]'));
};

/**
 * Create a new terminlogy (no item)
 * @param name
 */
TerminologyPage.prototype.submit = function( name ) {
	this.newButton.click();
	this.terminology.name.click();
	this.terminology.name.clear();
	this.terminology.name.sendKeys(name);
	this.save();
};

TerminologyPage.prototype.save = function( ) {
	this.saveForm.click();
	browser.sleep(3000);
};


/**
 * In the list view will click on delete boutton of the terminology provide by terminologyName
 * @param terminologyName
 */
TerminologyPage.prototype.clickOnDelete = function(terminologyName){
	entity = element(by.xpath("//*[contains(text(),'"+terminologyName+"')]"));
	var row = entity.element(by.xpath('ancestor::tr'));
	var button = row.element(by.css('.btn'));
	
	//move the mouse on the terminology row in order to make the button clickable
	browser.actions().
	mouseMove(element(protractor.By.xpath("//*[contains(text(),'"+terminologyName+"')]"))).perform();
	button.click();
}

/**
 * In the terminology after call click on delete, this function will validate the deletion of terminlogy
 */
TerminologyPage.prototype.validationDelete = function() {
	
	var buttonConfirm = this.terminology.dialogBox.element(by.css('.btn-danger'));

	buttonConfirm.click();
}


/**
 * Will load deatil of the terminlogy provide by name
 * @param name
 */
TerminologyPage.prototype.loadDetail = function( name ) {

	entity = element(by.xpath("//*[contains(text(),'"+name+"')]"));
	browser.executeScript('arguments[0].scrollIntoView(false)', entity.getWebElement());
	browser.actions().mouseMove(entity).perform();
	entity.click();

};


/**
 * Add an element at the end of the element list (lvl 0)
 * @param nameElement
 */
TerminologyPage.prototype.addElement = function(nameElement) {
	
	var  addButton ;
	element.all(by.css('.glyphicon-plus')).then(function(items) {
		
		 items[0].element(by.xpath('ancestor::a')).click();
		  
	});
	
	
	element.all(by.model("node.title")).then(function(items) {
		items[items.length-1].clear();
		items[items.length-1].sendKeys(nameElement);
		
	});
	this.saveForm.click();
}


/**
 * Add an element at the end of the element list (lvl 0); this element will not be selectable in an entity (folder icone selected)
 * @param nameElement
 */
TerminologyPage.prototype.addElementNotSelectable = function(nameElement) {
	element.all(by.css('.glyphicon-plus')).then(function(items) {
		 var  addButton =  items[0].element(by.xpath('ancestor::a'));
		  addButton.click();
	});
	var self = this;
	element.all(by.model("node.title")).then(function(items) {
		items[items.length-1].clear();
		items[items.length-1].sendKeys(nameElement);
	}).then(function(){
		
		var elementTarget = self.getItemByName(nameElement);
		elementTarget.then(function(newItem){
		
			newItem = newItem.element(by.xpath('..'));
			newItem.element(by.css(".glyphicon-folder-open")).element(by.xpath('ancestor::a')).click();
			self.saveForm.click();
		})
		
	});
	
}

/**
 * Will add an item child to the item father
 * @param nameElement
 * @param elementFather
 */
TerminologyPage.prototype.addElementToAnother = function(nameElement,elementFather) {
	elementFather.all(by.css('.glyphicon-plus')).then(function(items) {
		 var  addButton =  items[0].element(by.xpath('ancestor::a'));
		  addButton.click();
	}).then(function(){
		elementFather.all(by.model("node.title")).then(function(items) {
			items[items.length-1].clear();
			items[items.length-1].sendKeys(nameElement);
			
		});
	})
	this.saveForm.click();
	
	
}

TerminologyPage.prototype.getItemByName = function(itemElement) {
	
	var deferred = protractor.promise.defer();
	 
	  this.terminology.allItem.each(function(item) {
			item.getAttribute('value').then(function(text){
				if(text==itemElement){
					deferred.fulfill(item);
				}
	    },
	    function(reason) { deferred.reject(reason); });
	  },
	  function(reason) { deferred.reject(reason); });
	  return deferred.promise;
}


TerminologyPage.prototype.getItemByPosition = function(position) {
	
	var deferred = protractor.promise.defer();
	this.terminology.allItem.then(function(item) {
		deferred.fulfill(item[position]);	
	},function(reason) { deferred.reject(reason); });
	
	return deferred.promise;
}

TerminologyPage.prototype.getListOfItem = function(){
	return this.terminology.allItem;
}


/**
 * Will click on delete button if front of the item provided (If it has child , the child will be delete as well)
 * @param nameElement
 */
TerminologyPage.prototype.removeElement = function(nameElement) {
	var elementToDelete=this.getItemByName(nameElement);

	elementToDelete.then(function(item){
		item.element(by.xpath('ancestor::li')).element(by.css('.btn-danger')).click();
	})
	this.saveForm.click();
}


/**
 * This function move a item to the position provide
 * @param nameElement
 * @param position
 */
TerminologyPage.prototype.moveItemTo = function(nameElement,position) {
	var self = this;
	this.terminology.allItem.then(function(items){
		if(items.length>position){
			var elementSource=self.getItemByName(nameElement);
			var elementTarget = self.getItemByPosition(position);

			elementSource.then(function(itemsource){
				elementTarget.then(function(itemTarget){
//					itemsource=itemsource.element(by.xpath('../..'));
//					itemTarget=itemTarget.element(by.xpath('../..'));
					itemsource=itemsource.element(by.xpath('ancestor::li'));
					itemTarget=itemTarget.element(by.xpath('ancestor::li'));
					
					itemTarget.getText().then(function(text){
						console.log("target " + text);
					})
					
					itemsource.getText().then(function(text){
						console.log("source " + text);
					})
					
					var endPoint=itemTarget.getWebElement().getLocation();
				//	browser.actions().dragAndDrop(itemsource,{ x: endPoint.x, y: endPoint.y }).perform();
					//browser.actions().dragAndDrop(element1.getWebElement(), { x: -500, y: 20 }).perform();
					   browser.actions().mouseMove(itemsource).
		                mouseDown().
		                mouseMove(self.terminology.itemTree, { x: 0, y: 0 }).
		                mouseUp().
		                perform();
				})
			})
		}
		else{
			//throw an error maybe ?
			expect(0).toBe(1);
		}
	})
}


TerminologyPage.prototype.isPresentInList = function( name ) {
	return this.dataTable.element(by.xpath(".//*[contains(text(),'"+name+"')]")).isPresent();
};

TerminologyPage.prototype.getLastItemValue = function( name ) {

	return this.terminology.allItem.then(function(items) {
		return items[items.length-1].getAttribute('value')
		
	});
};

TerminologyPage.prototype.getItemParentByName = function( name ) {
	var elementFather;
	return this.terminology.allItem.each(function(node) {
		node.getAttribute('value').then(function(text){
			if(text=="SeleniumItemFather"){
				elementFather=node.element(by.xpath('../..'));
			}
		});
	}).then(function(){
		return elementFather;
	})
};

TerminologyPage.prototype.getItemListlength = function(){
	return this.terminology.allItem.then(function(allIt){
		return allIt.length;
	});
}

TerminologyPage.prototype.itemIsPresent = function(itemName){
	var bool = false;
	return this.terminology.allItem.each(function(it){
		it.getText().then(function(text){
			if(text==itemName){
				bool=true;
			}
		})
	}).then(function(){
		return bool;
	});
}




module.exports = TerminologyPage;