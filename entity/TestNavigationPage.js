var Relation = require("../common/Relation");

var TestNavigationPage = function(world) {
	this.world = world;

	this.testNavigation = {};
	this.testNavigation.user = {};
	this.testNavigation.user.field = {};
};


TestNavigationPage.prototype.get = function() {

	this.menu = $(".content-actionbar");
	this.newButton = $$(".btn-primary").get(0);
	this.saveForm = $$(".btn-primary").get(0);
	this.editButton = $$(".btn-primary").get(0);

	this.table = $('#viewTable') ;
	this.firstName = $('#firstname');
	this.lastName = $('#lastname');
	this.title = $("h1");
	this.vBar = $('.vertical-nav');
	
	
	this.childTextField = $('#textfield');
	
	
	this.linkBox = new Relation(1);
	this.childBox = new Relation(2);
	this.closeButton = this.menu.$$(".btn-default").get(0);
};

TestNavigationPage.prototype.setFirstName= function(firstName) {
	this.firstName.clear();
	this.firstName.sendKeys(firstName);
}

TestNavigationPage.prototype.setLastName= function(lastName) {
	this.lastName.clear();
	this.lastName.sendKeys(lastName);
}

TestNavigationPage.prototype.saveChange = function(){
	this.saveForm.click();
}

/**
 * 
 * Create a new entity
 */
TestNavigationPage.prototype.submit = function( firstName , lastName ) {

	this.newButton.click();
	this.setFirstName(firstName);
	this.setLastName(lastName);
	this.saveForm.click();

};

/**
 *  Fill the new entity form but without saving
 */
TestNavigationPage.prototype.fillNewEntityForm = function( firstName , lastName ) {

	this.newButton.click();
	this.setFirstName(firstName);
	this.setLastName(lastName);
};


/**
 * begin the creation of an entity but cancel it 
 * @param testNavigationName
 * @param systemName
 */
TestNavigationPage.prototype.cancelThecreation = function( firstName , lastName ) {

	this.newButton.click();
	
	this.setFirstName(firstName);
	this.setLastName(lastName);
	
	this.closeButton.click();

};


/**
 * Add a child entity 
 * @param value
 */
TestNavigationPage.prototype.addChild = function(value){

	this.childBox.clickOnAddRelation();
	this.childTextField.sendKeys(value);
	this.saveForm.click();
}



/**
* Enter in edit mode when you are in entity detail
*/
TestNavigationPage.prototype.enterEditMode = function(){
	this.editButton.click();
}

/**
 * Add a child but don't save it
 * @param value
 */
TestNavigationPage.prototype.addChildWithoutSavingTheEntity = function(value){

	this.enterEditMode();
	this.childBox.clickOnAddRelation();
	this.childTextField.sendKeys(value);
	
}


/**
 * Add a linked entity (have to be call in edit mode in detail of an entity)
 * @param value
 */
TestNavigationPage.prototype.addLinked = function(value){
	this.linkBox.clickOnAddRelation();
	this.childTextField.sendKeys(value);
	this.saveChange();
}

/**
 * Edit the name of the entity
 * @param name
 */
TestNavigationPage.prototype.editName = function(name){
	this.enterEditMode();
	this.setFirstName(name);
	this.saveForm.click();
	
}


/**
 * Open the detail of the first linked Entity
 */
TestNavigationPage.prototype.openLinkedDetail = function(){
	
	
	this.linkBox.clickOnFirstLinkedElement();
	
	
}

/**
 * open the detail of the child specified in parameter
 * @param linkName
 */
TestNavigationPage.prototype.openSpecificChildDetail = function(linkName){
	
	this.childBox.clickOnLinkedElement(linkName);
	
	
}




/**
 * return if the vertical bar is present or not 
 * @returns
 */
TestNavigationPage.prototype.vbarIsPresent = function(  ) {
	return this.vBar.isPresent();
	
}

TestNavigationPage.prototype.closeEntity = function(  ) {
	this.closeButton.click();
	
}


TestNavigationPage.prototype.saveForm = function(  ) {
	this.saveForm.click();
	
}



module.exports = TestNavigationPage;