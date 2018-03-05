
var UserProfilePage = function(world) {
	this.world = world;

	this.password = {};
};

UserProfilePage.prototype.get = function() {
	
	this.menuBar = element(by.css(".content-actionbar"));
	this.saveButton = element.all(by.css(".btn-primary")).get(0);
	this.closeButton =  this.menuBar.all(by.css(".btn")).get(1);
		
	this.cancelButton  = element.all(by.css(".btn-default")).get(0);
	this.firstName = element(by.model("profile.data.firstname"));
	this.lastName = element(by.model("profile.data.lastname"));
	this.email = element(by.model("profile.data.email"));
	this.userMenu = element(by.css(".user-menu"));
	this.userBox = this.userMenu.element(by.css(".btn__topMenu__userBox"));
	
	this.profileButton = this.userMenu.element(by.css(".pull-left")).all(by.css(".btn")).get(0);
	this.passwordButton = this.userMenu.element(by.css(".pull-left")).all(by.css(".btn")).get(1);
	
	this.profileImageArea = element.all(by.css('.box-body')).get(1);
	this.dropArea = element(by.css('div [uploader="uploader"]'));
	this.profileImageDisplayed = this.profileImageArea.element(by.css('img'));

	//password page
	this.password.currentPwd = element(by.model("password.currentPassword"));
	this.password.newPwd = element(by.model("password.newPassword"));
	this.password.confirmPwd = element(by.model("password.confirmPassword"));
	this.password.dangerMenu = element(by.css(".callout-danger"));
	
	 

};

UserProfilePage.prototype.closeProfile = function(){
	browser.executeScript("arguments[0].click();", this.closeButton.getWebElement());
	// this.closeButton.click();
};

UserProfilePage.prototype.goToUserProfile = function(){
	// browser.executeScript("arguments[0].click();", this.userBox.getWebElement());
	// browser.executeScript("arguments[0].click();", this.profileButton.getWebElement());
	// browser.actions().mouseMove(this.userBox).perform();
	this.userBox.click();
	this.profileButton.click();
};


UserProfilePage.prototype.goToChangePasswordProfile = function(){
	// browser.executeScript("arguments[0].click();", this.userBox.getWebElement());
	// browser.executeScript("arguments[0].click();", this.passwordButton.getWebElement());
	// browser.actions().mouseMove(this.userBox).perform();
	this.userBox.click();
	this.passwordButton.click();
};

UserProfilePage.prototype.setEmail = function(email){
	this.email.clear();
	this.email.sendKeys(email);
	
}

UserProfilePage.prototype.setFirstName = function(firstName){
	this.firstName.clear();
	this.firstName.sendKeys(firstName);
}

UserProfilePage.prototype.setLastName = function(lastName){
	this.lastName.clear();
	this.lastName.sendKeys(lastName);
	
}


UserProfilePage.prototype.setCurrentPwd = function(currentPwd){
	this.password.currentPwd.clear();
	this.password.currentPwd.sendKeys(currentPwd);

}

UserProfilePage.prototype.setNewPwd = function(newPwd){
	this.password.newPwd.clear();
	this.password.newPwd.sendKeys(newPwd);

}


UserProfilePage.prototype.setConfirmPwd = function(newPwd){
	this.password.confirmPwd.clear();
	this.password.confirmPwd.sendKeys(newPwd);

}



UserProfilePage.prototype.getEmail = function(){
	return this.email.getAttribute('value');	
}

UserProfilePage.prototype.getFirstName = function(){
	return this.firstName.getAttribute('value');	
}

UserProfilePage.prototype.getLastName = function(){
	return this.lastName.getAttribute('value');	
	
}

UserProfilePage.prototype.changePwd = function(currentpwd , newpwd , confirmPwd){
	this.setCurrentPwd(currentpwd);
	this.setNewPwd(newpwd);
	this.setConfirmPwd(confirmPwd);
	this.saveForm();
}


UserProfilePage.prototype.saveForm = function(){
	browser.executeScript("arguments[0].click();", this.saveButton.getWebElement());
	// this.saveButton.click();
	// browser.sleep(1000);
}


UserProfilePage.prototype.dangerMenuIsPresent = function(){
	return this.password.dangerMenu.isPresent();
}

UserProfilePage.prototype.isProfileImageReplaced = function(srcID){
	return this.profileImageDisplayed.getAttribute('src').then(function(sourceID){
		if(sourceID !=srcID){
			return true;
		}
		return false;
	})
}



module.exports = UserProfilePage;