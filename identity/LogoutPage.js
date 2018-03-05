var LogoutPage = function(world) {
	this.world = world;
};


LogoutPage.prototype.logout = function() {
	console.log("Logout sequence");
	
		
	this.userBox = element(by.css(".btn__topMenu__userBox"));
	this.logoutButton = element(by.css(".btn__topMenu__userBox__logout"));

	
	browser.executeScript("arguments[0].click();", this.userBox.getWebElement());
	browser.executeScript("arguments[0].click();", this.logoutButton.getWebElement());
	browser.sleep(1000);
};

module.exports = LogoutPage;