describe('General Scenario', function () {

	var World = require("./framework/World");
	var LoginPage = require("./identity/LoginPage");
	var LogoutPage = require("./identity/LogoutPage");
	var CommonPage = require("./common/CommonPage");
	var FormBuilderPage = require("./forms/FormBuilderPage");
	var FormField = require("./forms/component/FormField");
	var Tenant_settingPage = require("./administration/Tenant_settingPage");
	var DashBoardPage = require("./dashboard/DashBoardPage");
	

	var world = new World();
	var commonPage = new CommonPage(world);
	var logoutPage = new LogoutPage(world);
	var formBuilderPage = new FormBuilderPage(world);
	var tenant_settingPage = new Tenant_settingPage (world);
	var dashBoardPage = new DashBoardPage(world);
	
	
	
	beforeAll(function () {
		new LoginPage(world).quickLogin();
		// loginPage.quickLogin("Ricky","aaa111");
	});

	afterAll(function () {
		logoutPage.logout();
	});

	it('should hide "Hide create icon" in widget settings when read only is true:#6896', function () {
		console.log('hide "Hide create icon" in widget settings when read only is true:#6896');
		commonPage.get();
		commonPage.systemEntityPage("User interface","Entity designer");
		formBuilderPage.get();
		formBuilderPage.loadDetail('general form for automation tests');
		formBuilderPage.openExistingLayout('test layout');
		var editIcon = element.all(by.model('layout.column2.panels')).get(0).$('.fa-pencil');
		browser.executeScript("arguments[0].click();", editIcon.getWebElement());
		formBuilderPage.setReadOnly(true);

		//verify "Hide create icon" hidden
		expect(formBuilderPage.hideCreateIcon.isPresent()).toBeFalsy();
		formBuilderPage.form.dialogBox.$('.btn-primary').click();
	});

	it('should hide "+" icon in widget when read only is true:#6897', function () {
		console.log('hide "+" icon in widget when read only is true:#6897');
		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.switchToViewMode();
		var firstRow = commonPage.rows.first();
		browser.executeScript("arguments[0].click();", firstRow.$('a').getWebElement());
		commonPage.edit();
		commonPage.getPanel('form one').then(function(panel){
			expect(panel.$('.box-header').$('.fa-plus').isPresent()).toBeFalsy();
			expect(panel.$('.box-footer').$('.fa-plus').isPresent()).toBeFalsy();
			expect(panel.$('.box-header').$('.fa-upload').isPresent()).toBeFalsy();
			expect(panel.$('.box-header').$('.fa-link').isPresent()).toBeFalsy();
		})
	});


	it('should hide "+" icon in widget when setting "hide create icon":#6897', function () {
		console.log('hide "+" icon in widget when setting "hide create icon":#6897');
		commonPage.get();
		commonPage.systemEntityPage("User interface","Entity designer");
		formBuilderPage.get();
		formBuilderPage.loadDetail('general form for automation tests');
		formBuilderPage.openExistingLayout('test layout');
		var editIcon = element.all(by.model('layout.column2.panels')).get(0).$('.fa-pencil');
		browser.executeScript("arguments[0].click();", editIcon.getWebElement());
		formBuilderPage.setReadOnly(false);
		formBuilderPage.setHideCreateIcon(true);
		formBuilderPage.form.dialogBox.$('.btn-primary').click();
		commonPage.saveForm();

		//test plus icon hidden on widget in edit and global edit mode
		commonPage.entityPage('general form for automation tests');
		commonPage.switchToViewMode();
		var firstRow = commonPage.rows.first();
		browser.executeScript("arguments[0].click();", firstRow.$('a').getWebElement());
	
		//check plus icon hidden in normal edit mode
		commonPage.edit();
		commonPage.getPanel('form one').then(function(panel){
			expect(panel.$('.box-header').$('.fa-plus').isPresent()).toBeFalsy();
			expect(panel.$('.box-footer').$('.fa-plus').isPresent()).toBeFalsy();
		})

		//check plus icon hidden in GEM
		commonPage.switchToEditMode();
		commonPage.getPanel('form one').then(function(panel){
			expect(panel.$('.box-header').$('.fa-plus').isPresent()).toBeFalsy();
			expect(panel.$('.box-footer').$('.fa-plus').isPresent()).toBeFalsy();
		})
	});

	it('should display "+" icon when setting editable in grid:#6898', function () {
		console.log('display "+" icon when setting editable in grid:#6898');
		commonPage.get();

		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();
		formBuilderPage.loadDetail('test form one for Ricky test');
		var lastField = element.all(by.repeater('field in form.form_fields')).last();
		browser.executeScript("arguments[0].click();", lastField.getWebElement());
		formBuilderPage.setEditableInGrid(true);
		formBuilderPage.saveForm();
		commonPage.clickOnButton('Cancel');

		formBuilderPage.loadDetail('general form for automation tests');
		formBuilderPage.openExistingLayout('test layout');
		var editIcon = element.all(by.model('layout.column2.panels')).get(0).$('.fa-pencil');
		browser.executeScript("arguments[0].click();", editIcon.getWebElement());
		formBuilderPage.setReadOnly(false);
		formBuilderPage.setHideCreateIcon(false);
		formBuilderPage.form.dialogBox.$('.btn-primary').click();
		commonPage.saveForm();

		commonPage.entityPage('general form for automation tests');
		//first test in view mode
		commonPage.switchToViewMode();
		//select first row in list for test
		var firstRow = commonPage.rows.first();
		browser.executeScript("arguments[0].click();", firstRow.$('a').getWebElement());
		commonPage.edit();
		//verify "+" for add line in widget visible in edit mode
		//the panels are set with editable in grid in '1create_neccessary_forms_tests-spec'
		commonPage.getPanel('form one').then(function(panel1){
			var bottomPlusIcon = panel1.$('.box-footer').$('.fa-plus');
			expect(bottomPlusIcon.isPresent()).toBeTruthy();
			commonPage.saveForm();
			//verify "+" for add line in widget visible in GEM
			commonPage.switchToEditMode();
			expect(bottomPlusIcon.isPresent()).toBeTruthy();
		})
	});

	
})
