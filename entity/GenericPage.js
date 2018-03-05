//this page is a generic page for entity , this function works for most of entity 
var GenericPage = function(world) {
	
	
		this.world = world;
		this.generic = {};
	
};

GenericPage.prototype.get = function(url) {
	//url = this.world.defaultBase() + "#!/entity/" + url;
	//browser.get(url);
	this.newButton = element(by.css(".btn-primary"));
	this.saveForm = element(by.css(".btn-primary"));
	this.editButton = element(by.css(".btn-primary"));
	this.generic.table = $('#viewTable') ;
	this.generic.title = element(by.css("h1"));
	this.generic.ecosystemData = element.all(by.css(".box")).get(3);
	this.generic.userInterface = element.all(by.css(".box")).get(1);
	this.generic.system = element.all(by.css(".box")).get(2);
	this.generic.identity = element.all(by.css(".box")).get(0);
	this.generic.allEntity = this.generic.ecosystemData.all(by.repeater('form in forms'));
	this.generic.allBox = element.all(by.css('.box'));
	this.generic.dialogBox=element(by.css('.modal-dialog'));
	this.generic.link = element.all(by.css('.fa-link'));
	this.generic.dialogBox=element(by.css(".modal-content"));
	
};


/**
 * Get the Number of elements of an entity (using the H1 title)
 * @returns
 */
GenericPage.prototype.getNbElement = function(){

	var nbElement = this.generic.title.getText().then(function(str){
		var res = str.split("(");
		var nbElement =  res[res.length-1];
		nbElement = nbElement.substring(0,nbElement.length-1);
		nbElement = parseInt(nbElement);
		return 	isNaN(nbElement) ?  0 : nbElement;
	})
	return nbElement;	
}


/**
 * function which said if an element is a typeOf a css class
 */
var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
        
        
    });
};

/**
 * get value of an input by his id
 * @param name
 * @returns
 */
GenericPage.prototype.getValueOf = function(id){
	return element(by.id(id)).getAttribute('value');
	
}




//delete Part

/**
 * Click on delete for an entity provides in parameter (on a list view)
 */
GenericPage.prototype.clickOnDelete = function(elementName){
	entity = element(by.xpath("//*[contains(text(),'"+elementName+"')]"));
	//have to find a better solution to do it 
	var row = entity.element(by.xpath("../../../.."));
	var button = row.element(by.css('.btn'));
	browser.actions().mouseMove(element(protractor.By.xpath("//*[contains(text(),'"+elementName+"')]"))).perform();		
	button.click();
}

/**
 * Click on the confirm button of the popup which appears when you want delete a entity
 */
GenericPage.prototype.validationDelete = function() {
	
	var buttonConfirm = this.generic.dialogBox.element(by.css('.btn-danger'));

	buttonConfirm.click()
}





/**
 * Create a new entity
 */
GenericPage.prototype.newGeneric = function( ) {

	this.newButton.click();
	this.fillInput();
	//this.saveForm.click();
};



//adding Part
/**
 * Fill all the input of an entity when you create it
 */
GenericPage.prototype.fillInput = function( ) {
	this.generic.allBox.each(function(box, index) {
		var inputs = box.all(by.css("input[type='text']"));
		//var inputs = box.all(by.css("input"));
		inputs.each(function(input, index){
			//input.getOuterHtml().then(function (text) {
				//    console.log(index, text);
			 //});
			input.isDisplayed().then(function(result) {
				if(result){
					hasClass(input, 'ng-valid-date').then(function(isDate){
						if(!isDate){
							input.clear();
							input.sendKeys( 'selenium' + Math.random().toString(36).substring(7));
						}
					});
				}
			});
		})
			  
	})
	//manage some particular case 
	this.particularCase();
	
	
};




/**
 * Handles some particulare case due to specific input (date) or due to some validation
 */
var cpt=0;
GenericPage.prototype.particularCase = function(  ) {
	var self = this;
	browser.getCurrentUrl().then(function(currentUrl) {
		var res = currentUrl.split("/");
		switch (res[res.length-2]) {
			case "assets":
				self.particulareCaseAssets();
				break;
	    	case "access_sheets":
	    		element(by.model("$select.search")).isPresent().then(function(result) {
	    		    if ( result ) {
	    		    	var accessSheetVisitingHour = element(by.model("$select.search"));
	    		    	accessSheetVisitingHour.clear();
	    				element(by.model("$select.search")).click();
	    				element(by.id("ui-select-choices-row-2-0")).click();
	    		    } 
	    		});
	    		break;
	    	case "entity_check_1":
	    		element.all(by.css(".ui-select-choices-row-inner")).then(function(items){   			
	    			items[1].click();
	    		});
	    		break;
	    	case "layout_rules":
	    		element(by.id("layout")).click();
	    		element(By.id("layout")).all(by.repeater('option in field.field_options')).then(function(allOption){
	    			allOption[0].click();
	    		});
	    		break;
	    	case "leases":
//	    		cpt++;
//	    		if(cpt==2){
//	    			browser.pause();
//	    		}
	    		browser.executeScript('window.scrollTo(0,0);').then(function () {
	    			element(by.id("lease_type")).click();
	    			element(By.id("lease_type")).all(by.repeater('option in field.field_options')).then(function(allOption){
		    			allOption[0].click();
		    		});
	    		})
	    		break;
	    	case "task":
	    		element.all(by.css(".glyphicon-chevron-down")).then(function(array){
					array[0].click();
					array[1].click();
					array[3].click();
					
				});
				
				element.all(by.css(".glyphicon-chevron-up")).then(function(array){
					array[2].click();
					array[1].click();
					array[3].click();
					
				});
				
	    		 element.all(by.css('.fa-link')).then(function(items) {			
	    			items[0].element(by.xpath('ancestor::button')).click();
	    		});
	    		 element.all(by.repeater('row in entity.data')).each(function(row){
	    			 row.element(by.css(".pointer")).getText().then(function(text){
	    				 if(text=="System"){
	    					 row.element(by.css(".pointer")).click();
	    				 }
	    			 })
	    		 }).then(function(){
	    			 element(by.css('[ng-click="ok()"]')).click();
	    		 })
	    		
	    		 
	    		
	    		break;
	    	default: 
	    		return;
		}
	  });
};



GenericPage.prototype.particulareCaseAssets = function(  ) {
	this.generic.link.then(function(items) {			
		items[0].element(by.xpath('ancestor::button')).click();
	});
	//select the first element of the list which appears
	 element.all(by.repeater('row in entity.data')).first().element(by.css(".pointer")).click();
	 element(by.css('[ng-click="ok()"]')).click();
	
};
	

//Load a generic
/**
 * Load detail of an entity in a entity list
 */
GenericPage.prototype.loadDetail = function( name ) {
	entity = element(by.xpath("//*[contains(text(),'"+name+"')]"));
	var row = entity.element(by.xpath("../../../.."));
	var link = row.element(by.css('a'));

	browser.actions().mouseMove(link);
	link.click();
	
	/*
	entity = element(by.xpath("//*[contains(text(),'"+name+"')]"));
	entity.click();*/
};


//Edit Part
/**
 * Edit an entity field
 */
GenericPage.prototype.editAGeneric = function( entityToEdit , FieldToeditname, value ) {
	this.loadDetail(entityToEdit);
	this.editButton.click();
	element(by.id(FieldToeditname)).clear();
	element(by.id(FieldToeditname)).sendKeys(value);
	this.saveForm.click();

};


/**
 * Add a relation to an entity (It will add the first relation possible)
 */
GenericPage.prototype.addArelation = function(){
	var self= this;
	var nbRelationBefore = 0;
	element.all(by.css('.fa-plus')).then( function(adds){
		if(adds.length>=2){
			 element.all(by.css(".fa-remove")).then(function(items){
				 nbRelationBefore = items.length;
				 adds[1].click();
				 self.fillInput();
				 self.saveForm.click();
				 self.saveForm.click();
				 self.editButton.click();
				 element.all(by.css(".fa-remove")).then(function(nbrel){
					 expect( nbRelationBefore+1 == nbrel.length).toBe(true); 
				 });
			 });
		}
		else
			return ;
	});
};

/**
 * Add a relation if there is we cant link any relation
 * @param box
 * @param self
 */
GenericPage.prototype.addArelationAfterFailLink = function(box,self){
	 var cancel = dialogBox.all(by.css(".btn-flat")).then(function(btn){
		 btn[1].click();
	 }).then(function(){
		 box.element("fa-plus").click();
		 self.fillInput();
		 self.saveForm.click();
		 self.saveForm.click();
		 self.editButton.click();
	 })
};

/**
 * link a entity to another (first possible)
 */
GenericPage.prototype.linkRelation = function(){
	var needToAddOne = false;
	var self= this;
	var nbRelationBefore = 0;
	var alreadySelected = false;
	var box;
	element.all(by.css('.fa-link')).then( function(adds){
		if(adds.length>=1){
			 box = adds[0].element(by.xpath("../../../.."));
			 box.all(by.css(".fa-remove")).then(function(items){
				 nbRelationBefore = items.length;
			 }).then(function(){
				 adds[0].click(); 
				 dialogBox=element(by.css(".modal-content"));
					
					var promise =  dialogBox.all(by.css("a")).each(function(links,index){
						 links.getText().then(function(text){
							 if(text.trim() != ""){
								 if(!alreadySelected)
									 links.click();
								 alreadySelected=true;
							 }
						 })
					 }).then(function(){
						 if(alreadySelected){
							 var validation = dialogBox.element(by.css(".btn-flat")).click();
							 self.saveForm.click();
							 self.editButton.click();
						}
						else{
							//self.addArelationAfterFailLink(box,self);
							needToAddOne = true;
						}
					 });
			 })
		}
		else
			return ;
	}).then(function(){
		if(needToAddOne){
			var cancel = dialogBox.all(by.css(".btn-flat")).then(function(btn){
				 btn[1].click();
				 self.addArelation();
			 })
			
		}
		else{
			element.all(by.css('.fa-link')).then( function(adds){
				if(adds.length>=1){
					 box = adds[0].element(by.xpath("../../../.."));
					 box.all(by.css(".fa-remove")).then(function(nbrel){
						 expect( nbRelationBefore+1 == nbrel.length).toBe(true); 
					 });
				}
				
			})
		}
	});
	
};

/**
 * Unlink a relation
 */
GenericPage.prototype.unlinkRelation = function(){
	var self= this;
	var nbRelationBefore = 0;
	var alreadySelected = false;
	var box;
	element.all(by.css('.fa-link')).then( function(adds){
		if(adds.length>=1){
			 box = adds[0].element(by.xpath("../../../.."));
			 box.all(by.css(".fa-remove")).then(function(items){
				 
				 nbRelationBefore = items.length;
				 if(nbRelationBefore==0){
					 return ;
				 }
				 else{
					 items[0].click();
				 }
			 })
		}
		else
			return ;
	}).then(function(){
		 self.saveForm.click();
		 self.editButton.click();
		element.all(by.css('.fa-link')).then( function(adds){
			if(adds.length>=1){
				 box = adds[0].element(by.xpath("../../../.."));
				 box.all(by.css(".fa-remove")).then(function(nbCurrentrel){
					 expect( nbRelationBefore == nbCurrentrel.length +1).toBe(true); 
				 });
			}
			
		})
	});
}



module.exports = GenericPage;