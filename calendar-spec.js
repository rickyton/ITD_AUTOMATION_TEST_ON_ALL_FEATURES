describe('Calendar in entities Scenario', function () {

	var World = require("./framework/World");
	var LoginPage = require("./identity/LoginPage");
	var LogoutPage = require("./identity/LogoutPage");
	var CommonPage = require("./common/CommonPage");
	var FormBuilderPage = require("./forms/FormBuilderPage");
	
	
	var world = new World();
	var commonPage = new CommonPage(world);
	var loginPage = new LoginPage(world);
	var logoutPage = new LogoutPage(world);
	var formBuilderPage = new FormBuilderPage(world);
	


	beforeAll(function () {
		loginPage.quickLogin();
		// loginPage.quickLogin("Ricky", "aaa111");
	});

	afterAll(function () {
		logoutPage.logout();
	});


	it('should verify calendar full displayed in task details',function(){
		console.log('verify calendar full displayed in task details');		
		commonPage.get();
		commonPage.entityPage('Task');
		commonPage.newButton.click();
		browser.executeScript("arguments[0].click();", commonPage.calendar.get(1).getWebElement());

		//check if whole calendar with function buttons in task details are displayed or not
		commonPage.dateButtons.each(function(date){
			browser.actions().mouseMove(date).perform();
			expect(date.isDisplayed()).toBeTruthy();
		});
		expect($('.uib-datepicker-current').isDisplayed()).toBeTruthy();
		expect($('.uib-clear').isDisplayed()).toBeTruthy();
		commonPage.clickOnButton('Close');
	});


	

});
