describe('testOfInput Scenario', function () {

	var World = require("./framework/World");
	var LoginPage = require("./identity/LoginPage");
	var LogoutPage = require("./identity/LogoutPage");
	var FormBuilderPage = require("./forms/FormBuilderPage");
	var FormField = require("./forms/component/FormField");
	var CommonPage = require("./common/CommonPage");
	var AllInputTestPage = require("./entity/AllInputTestPage");
	

	var world = new World();
	var logoutPage = new LogoutPage(world);
	var loginPage = new LoginPage(world);
	var formBuilderPage = new FormBuilderPage(world);
	var commonPage = new CommonPage(world);
	var allInputTestPage = new AllInputTestPage(world);

	var entityName = 'general form for automation tests';
	
	
	beforeAll(function () {
		loginPage.quickLogin();
		// loginPage.quickLogin("Ricky", "aaa111");
	});

	afterAll(function () {
		logoutPage.logout();
	});



	it("should test numeric field", function(){
		console.log("should test numeric field");
		var data1 = '123';
		var data2 = 'abc';
		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.switchToViewMode();
		commonPage.newButton.click();
		commonPage.fillInField($('#numeric'),data1);		
		expect($('#numeric').getAttribute('ng-value')).toBe(data1);
		browser.refresh();
		commonPage.fillInField($('#numeric'),data2);		
		expect($('#numeric').getAttribute('ng-value')).toBe('');
	})


	it("should test currency field", function(){
		console.log("should test currency field");
		var data1 = '123';
		var data2 = 'abc';
		commonPage.get();
		commonPage.entityPage('child form ricky');
		commonPage.switchToViewMode();
		commonPage.newButton.click();
		commonPage.fillInField($('#currency'),data1);		
		expect($('#currency').getAttribute('ng-value')).toBe(data1);
		browser.refresh();
		commonPage.fillInField($('#currency'),data2);		
		expect($('#currency').getAttribute('ng-value')).toBe('');
	})

	
	it("should test to add a non email to email field", function(){
		console.log("should test to add a non email to email field");
		var data1 = '123';
		var data2 = 'abc';
		commonPage.get();
		commonPage.entityPage('child form ricky');
		commonPage.switchToViewMode();
		commonPage.newButton.click();
		commonPage.clickElementInFormGroup('Auto:','first');
		commonPage.fillInField($('#email'),data1);		
		expect(commonPage.saveFormButton.isEnabled()).toBeFalsy();
		browser.refresh();
		commonPage.clickElementInFormGroup('Auto:','first');
		commonPage.fillInField($('#email'),data2);		
		expect(commonPage.saveFormButton.isEnabled()).toBeFalsy();
		browser.refresh();
		commonPage.clickElementInFormGroup('Auto:','first');
		commonPage.fillInField($('#email'),'test@gmail.com');		
		expect(commonPage.saveFormButton.isEnabled()).toBeTruthy();
	})


	it("should delete the upload of an image" , function(){
		console.log("should delete the upload of an image");
		
		if(browser.params.mobile!=true){
			commonPage.get();
			commonPage.entityPage('child form ricky');
			commonPage.newButton.click();		
			commonPage.setImageAtIndex("saigon-nightlife.jpg",0);
			expect($('[data-ng-repeat="file in queue"]').isPresent()).toBeTruthy();
			browser.executeScript("arguments[0].click();", $('.btn-danger').getWebElement());
			expect($('[data-ng-repeat="file in queue"]').isPresent()).toBeFalsy();
		}
	})


	it("should cancel the upload of an image" , function(){
		console.log("should cancel the upload of an image");
		
		if(browser.params.mobile!=true){
			commonPage.get();
			commonPage.entityPage('child form ricky');
			allInputTestPage.get();
			commonPage.newButton.click();
			allInputTestPage.setImageWithoutUploadingIt("testImageUpload.png");
			expect($('[data-ng-repeat="file in queue"]').isPresent()).toBeTruthy();
			browser.executeScript("arguments[0].click();", $('[data-ng-click="file.$cancel()"]').getWebElement());
			expect($('[data-ng-repeat="file in queue"]').isPresent()).toBeFalsy();	
		}
	})

	it("should cancel the upload of all image" , function(){
		console.log("should cancel the upload of all image");
		
		if(browser.params.mobile!=true){
			commonPage.get();
			commonPage.entityPage('child form ricky');
			allInputTestPage.get();
			commonPage.newButton.click();
			allInputTestPage.setImageWithoutUploadingIt("testImageUpload.png");
			expect($('[data-ng-repeat="file in queue"]').isPresent()).toBeTruthy();
			browser.executeScript("arguments[0].click();", $('[data-ng-click="cancelAll()"]').getWebElement());
			expect($('[data-ng-repeat="file in queue"]').isPresent()).toBeFalsy();
		}
	})


	it('create new form to test numeric field:#7196',function(){
		console.log("create new form to test numeric field:#7196");
		var form = 'test numeric field';
		var formType = 'test_numeric_field_ricky';
		var labelTitle = 'form name';

		//create form with constraints for numeric field
		commonPage.get();
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();
		formBuilderPage.createFormName(form,formType);
		browser.executeScript("arguments[0].click();", formBuilderPage.listFilter.getWebElement());
		formBuilderPage.addFormField('Textfield',labelTitle,0,true);
		formBuilderPage.addNumericField ('Numeric',false,false,'','1','8');


		//test constraints for numeric field
		commonPage.entityPage(form);
		commonPage.switchToViewMode();
		commonPage.newButton.click();
		commonPage.fillInField($('#numeric'),'6');		
		expect($('#numeric').getAttribute('ng-value')).toBe('6');
		expect(commonPage.saveFormButton.isEnabled()).toBeTruthy();
		browser.refresh();
		commonPage.fillInField($('#numeric'),'9');		
		expect($('#numeric').getAttribute('ng-value')).toBe('');
		expect(commonPage.saveFormButton.isEnabled()).toBeFalsy();
		browser.refresh();
		commonPage.fillInField($('#numeric'),'0');		
		expect(commonPage.saveFormButton.isEnabled()).toBeFalsy();
		browser.refresh();
		commonPage.fillInField($('#numeric'),'e');		
		expect(commonPage.saveFormButton.isEnabled()).toBeFalsy();
		browser.refresh();
		commonPage.fillInField($('#numeric'),'.');		
		expect(commonPage.saveFormButton.isEnabled()).toBeFalsy();

		//delete form
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.deleteForm(form);
	});

});