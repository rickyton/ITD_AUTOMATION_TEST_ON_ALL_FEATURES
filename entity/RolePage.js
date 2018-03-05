var Relation = require("../common/Relation");
var RolePage = function(world) {
	this.world = world;
	this.role = {};
};

RolePage.prototype.get = function() {
	
	//Buttons
	this.newButton = element.all(by.css(".btn-primary")).get(0);
	this.saveFormButton = element.all(by.css(".btn-primary")).get(0);
	this.editButton = element.all(by.css(".btn-primary")).get(0);

	//tables
	this.table = $('#viewTable') ;

	//fields
	this.role_name = $('#role_name');
	this.system_name = $('#system_name');
	
	//objects
	this.privilegeLinked =  new Relation(1);
	this.userLinked =  new Relation(2);	
};



RolePage.prototype.setRoleName= function(role_name){
	this.role_name.clear();
	this.role_name.sendKeys(role_name);
}

RolePage.prototype.setRoleSystemName= function(system_name){
	this.system_name.clear();
	this.system_name.sendKeys(system_name);
}


RolePage.prototype.saveForm = function(){
	this.saveFormButton.click();
	browser.sleep(1000);
}


RolePage.prototype.submit = function( role_name,system_name ) {
	this.newButton.click();
	this.setRoleName(role_name);
	this.setRoleSystemName(system_name);
	this.saveForm();
};


RolePage.prototype.linkPrivilege = function(privilegeName){
	this.editButton.click();
	this.privilegeLinked.linkElement(privilegeName);
	this.saveForm();
	
//	this.editButton.click();
//	element.all(by.css('.fa-link')).then(function(items) {	
//		
//		items[0].element(by.xpath('ancestor::button')).click();
//		
//	});
//
//	//select the first element of the list which appears
//	 element.all(by.repeater('row in entity.data')).first().element(by.css(".pointer")).click();
//	 element(by.css('[ng-click="ok()"]')).click();
//	 this.saveForm();
		
}


RolePage.prototype.linkUser = function(userName){
	
	this.editButton.click();
	this.userLinked.linkElement(userName);
	this.saveForm();
	
//	this.editButton.click();
//	
//	this.role.userBox.all(by.css('.fa-link')).then(function(items) {	
//		
//		items[0].element(by.xpath('ancestor::button')).click();
//		
//	});
//
//	//select the first element of the list which appears
//	 element.all(by.repeater('row in entity.data')).first().element(by.css(".pointer")).click();
//	 element(by.css('[ng-click="ok()"]')).click();
//	 this.saveForm.click();
		
}

RolePage.prototype.getSizeOfPrivilegeList = function(){
	return this.privilegeLinked.getSize();	
}


RolePage.prototype.unlinkPrivilege = function(privilegeName){
	this.editButton.click();
	this.privilegeLinked.unlinkElementWithValidation(privilegeName);
	this.saveForm();	
}

RolePage.prototype.unlinkUser = function(userName){
	this.editButton.click();
	this.userLinked.unlinkElementWithValidation(userName);
	this.saveForm();
}


RolePage.prototype.getSizeOfUserList = function(){
	return this.userLinked.getSize();
}

RolePage.prototype.roleContainsUser = function(userName){
	return element(by.xpath(".//a[contains(text(),'"+userName+"')]")).isPresent();

}



module.exports = RolePage;