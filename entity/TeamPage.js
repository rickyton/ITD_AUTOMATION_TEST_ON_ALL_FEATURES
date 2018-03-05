var Relation = require("../common/Relation");
var AccessMenu = require("../common/AccessMenu");


var TeamPage = function(world) {
	this.world = world;
	//this.userPage = new UserPage(world);
	this.user = {};
};

TeamPage.prototype.get = function() {

	this.usersLinked =  new Relation(1);
	
	//buttons
	this.newButton = $$(".btn-primary").get(0);
	this.saveFormButton = $$(".btn-primary").get(0);
	this.editButton = $$(".btn-primary").get(0);


	//tables and dialog
	this.tableList = $('#viewTable') ;

	//fields and bars
	this.teamName = $('#team_name');
	this.systemName = $('#system_name');
	
	//user data
	this.user.username=$('#username');
	this.user.firstName=$('#firstname');
	this.user.lastName=$('#lastname');
	this.user.email=$('#email');

	//titles 
	this.title = $('h1');

};


TeamPage.prototype.setTeamName = function( teamName  ) {
	this.teamName.clear();
	this.teamName.sendKeys(teamName);
}


TeamPage.prototype.setTeamSystemName = function( systemName  ) {
	this.systemName.clear();
	this.systemName.sendKeys(systemName);
}


TeamPage.prototype.saveForm = function(  ) {
	this.saveFormButton.click();
	browser.sleep(1500);
}


TeamPage.prototype.setUserName = function(userName){
	this.user.username.clear();
	this.user.username.sendKeys(userName);
}

TeamPage.prototype.setFirstName = function(firstName){
	this.user.firstName.clear();
	this.user.firstName.sendKeys(firstName);
}

TeamPage.prototype.setLastName = function(lastName){
	this.user.lastName.clear();
	this.user.lastName.sendKeys(lastName);
}

TeamPage.prototype.setEmail = function(email){
	this.user.email.clear();
	this.user.email.sendKeys(email);;
}


/**
 * Create a new team
 */
TeamPage.prototype.newTeam = function( teamName , systemName ) {
	this.newButton.click();
	this.setTeamName(teamName);
	this.setTeamSystemName(systemName);
	this.saveForm();
};


TeamPage.prototype.teamContainsUser = function(userName){
	return element(by.xpath(".//a[contains(text(),'"+userName+"')]")).isPresent();

}


TeamPage.prototype.unlinkUser = function(userFirstName){
	var self = this;
	this.editButton.click();
	this.teamContainsUser(userFirstName).then(function(isPres){
		if(isPres){
			self.usersLinked.unlinkElementWithValidation(userFirstName);
		}
	})
	this.saveForm();
}






module.exports = TeamPage;