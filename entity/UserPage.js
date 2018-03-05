var Relation = require("../common/Relation");
var UserPage = function(world) {
	this.world = world;

	this.user = {};
};

UserPage.prototype.get = function() {
	
	//Buttons
	this.button = $$('.btn');
	this.newButton = $$('.btn-primary').get(0);
	this.saveFormButton = $$('.btn-primary').get(0);
	this.editButton = $$('.btn-primary').get(0);

	//fields
	this.username = $('#username');
	this.username = $('#username');
	this.firstName = $('#firstname');
	this.lastName = $('#lastname');
	this.email = $('#email');

};


UserPage.prototype.setUserName = function(userName){
	this.username.clear();
	this.username.sendKeys(userName);
}

UserPage.prototype.setFirstName = function(firstName){
	this.firstName.clear();
	this.firstName.sendKeys(firstName);
}

UserPage.prototype.setLastName = function(lastName){
	this.lastName.clear();
	this.lastName.sendKeys(lastName);
}

UserPage.prototype.setEmail = function(email){
	this.email.clear();
	this.email.sendKeys(email);
}

UserPage.prototype.saveForm = function(){
	this.saveFormButton.click();
	browser.sleep(1000);
}

UserPage.prototype.selectItemType1 = function(type,item){
	var ele = element(by.xpath('.//'+type+'[.="'+item+'"]'));
	browser.actions().mouseMove(ele).perform();
	ele.click();
}

UserPage.prototype.selectItemInFieldType1 = function(field,type,item){
	var self = this;
	field.click().then(function(){
		self.selectItemType1(type,item);
	});
}

UserPage.prototype.submit = function( username , firstName , lastName , email,field,type,item) {

	this.newButton.click();
	
	this.setUserName(username);
	this.setFirstName(firstName);
	this.setLastName(lastName);
	this.setEmail(email);
	this.selectItemInFieldType1(field,type,item);
	this.saveForm();

};

UserPage.prototype.editLastName = function( newLastName ) {
	this.editButton.click();
	this.setLastName(newLastName);
	this.saveForm();

};




module.exports = UserPage;