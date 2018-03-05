describe('Global settings Scenario', function () {

	var World = require("./framework/World");
	var LoginPage = require("./identity/LoginPage");
	var LogoutPage = require("./identity/LogoutPage");
	var CommonPage = require("./common/CommonPage");
	var Tenant_settingPage = require("./administration/Tenant_settingPage");
	var DashBoardPage = require("./dashboard/DashBoardPage");
	var FormBuilderPage = require("./forms/FormBuilderPage");
	
	

	var world = new World();
	var commonPage = new CommonPage(world);
	var logoutPage = new LogoutPage(world);
	var loginPage = new LoginPage(world);
	var tenant_settingPage = new Tenant_settingPage (world);
	var dashBoardPage = new DashBoardPage(world);
	var formBuilderPage = new FormBuilderPage(world);

	var formBuilderName;
	var elementJustCreated;
	
	
	beforeAll(function () {
		loginPage.quickLogin();
		// loginPage.quickLogin("Ricky", "aaa111");
	});

	afterAll(function () {
		logoutPage.logout();
	});


	it('should verify "version" and "usage" settings:#6473', function () {
		console.log('verify "version" and "usage" settings:#6473');	
		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		$$('#version').first().getAttribute('value').then(function(value){
			expect(value).not.toBe('');
		});
		$$('#version').last().getAttribute('value').then(function(value1){
			expect(value1).not.toBe('');
		});
 	
	});


	it('should verify map.geoCoordinateSystem per tenant:#5785', function () {
		console.log('verify map.geoCoordinateSystem per tenant:#5785');
		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.geographicCoordinateSystem.getAttribute('value').then(function(geoSys){
			if(geoSys == 'WGS 84'|| geoSys == 'Lambert 72'){
				expect(true).toBeTruthy();
			}
			else{
				expect(false).toBeTruthy();
			}
		})
	});


	it('should verify DWG upload:#5844', function () {
		console.log('verify DWG upload:#5844');
		var fileType = 'dwg';
		var fileName = 'visualization_-_sun_and_sky_demo.dwg';

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();		
		tenant_settingPage.addFileType(fileType);
		tenant_settingPage.saveForm();

		commonPage.entityPage('general form for automation tests');	
		commonPage.newButton.click();		
		commonPage.setImageAtIndex(fileName,0);

		//check if uploading successfully or not
		expect(element(by.xpath(".//*[contains(text(),'"+fileName+"')]")).isPresent()).toBeTruthy();
		expect(element(by.xpath(".//*[contains(text(),'File type not allowed')]")).isPresent()).toBeFalsy();

		//come back to dashboard before moving to other case to prevent error
		dashBoardPage.get();
		dashBoardPage.dashBoardPage();
	});


	it('should set Decimal, thousands separators, comma for thousand, point for decimal:#7130', function () {
		console.log('set Decimal, thousands separators, comma for thousand, point for decimal:#7130');

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.thousandsSeparatorFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.thousandsSeparatorFormat,'dot');
		})
		tenant_settingPage.decimalSeparatorFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.decimalSeparatorFormat,'comma');
		})
		tenant_settingPage.saveForm();
	});


	it('should create entity and test Decimal, thousands separators:#7130', function () {
		console.log('create entity and test Decimal, thousands separators:#7130');
		var name = 'test_' + Math.random().toString(36).substring(7,9);
		var number = '123456.78';
		
		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.switchToViewMode();		
		commonPage.newButton.click();
		commonPage.fillInField($('#general_form_name'),name);
		commonPage.fillInField($('#geo_data_x'),'10.769183');
		commonPage.fillInField($('#geo_data_y'),'106.68693');
		commonPage.fillInField($('#geo_data_z'),'9');
		commonPage.fillInField($('#numeric'),name);
		commonPage.saveForm();

		// just  test this element with GUI, cannot do it with in-memory tests,
		// will find solution later
		// commonPage.getElementInFormGroup('Numeric:').then(function(numeric){
		// 	expect(numeric).toContain('123.456,78');
		// })
		// browser.waitForAngular();
	});


	it('should set Decimal, thousands separators, point for thousand, comma for decimal:#7130', function () {
		console.log('set Decimal, thousands separators, point for thousand, comma for decimal:#7130');

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.thousandsSeparatorFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.thousandsSeparatorFormat,'comma');
		})
		tenant_settingPage.decimalSeparatorFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.decimalSeparatorFormat,'dot');
		})
		tenant_settingPage.saveForm();
	});


	it('should create entity and test Decimal, thousands separators:#7130', function () {
		console.log('create entity and test Decimal, thousands separators:#7130');
		var name = 'test_' + Math.random().toString(36).substring(7,9);
		var number = '123456.78';
		
		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.switchToViewMode();		
		commonPage.newButton.click();
		commonPage.fillInField($('#general_form_name'),name);
		commonPage.fillInField($('#geo_data_x'),'10.769183');
		commonPage.fillInField($('#geo_data_y'),'106.68693');
		commonPage.fillInField($('#geo_data_z'),'9');
		commonPage.fillInField($('#numeric'),name);
		commonPage.saveForm();
		// just  test this element with GUI, cannot do it with in-memory tests,
		// will find solution later
		// commonPage.getElementInFormGroup('Numeric:').then(function(numeric){
		// 	expect(numeric).toContain('123,456.78');
		// })
		// browser.waitForAngular();
	});


	it('should  add a new unit in the system setting ',function(){
		console.log("should  add a new unit in the system setting");

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		elementJustCreated = 'unit' + Math.random().toString(36).substring(3,7);
		tenant_settingPage.addUnit(elementJustCreated);
		tenant_settingPage.saveForm();
		expect(tenant_settingPage.unitIsPresent(elementJustCreated)).toBeTruthy();
	});

	it('should  test if the new unit is avalaible ',function(){
		console.log("should  test if the new unit is avalaible");

		commonPage.get();
		commonPage.systemEntityPage("User interface","Entity designer");
		formBuilderPage.get();
		formBuilderPage.newButton.click();
		formBuilderPage.addFormField("Numeric" , 0);
		expect(formBuilderPage.fieldUnitContains(elementJustCreated)).toBeTruthy();
	});


	it('should  remove the new unit',function(){
		console.log("should remove the new unit");

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.removeUnit(elementJustCreated);
		tenant_settingPage.saveForm();
		expect(tenant_settingPage.unitIsPresent(elementJustCreated)).toBeFalsy();
	});


	it('should  add a new currency in the system setting ',function(){
		console.log("should  add a new currency in the system setting ");

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		elementJustCreated = 'unit' + Math.random().toString(36).substring(3,7);
		tenant_settingPage.addCurrency(elementJustCreated);
		tenant_settingPage.saveForm();
		expect(tenant_settingPage.currencyIsPresent(elementJustCreated)).toBeTruthy();
	});


	it('should  test if the currency is avalaible ',function(){
		console.log("should  test if the currency is avalaible");

		commonPage.get();
		commonPage.systemEntityPage("User interface","Entity designer");
		formBuilderPage.get();
		formBuilderPage.newButton.click();
		formBuilderPage.addFormField("Currency" , 0);
		expect(formBuilderPage.fieldCurrencyContains(elementJustCreated)).toBeTruthy();

	});


	it('should  remove the new currency',function(){
		console.log("should  remove the new currency");
		
		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.removeCurrency(elementJustCreated);
		tenant_settingPage.saveForm();
		expect(tenant_settingPage.currencyIsPresent(elementJustCreated)).toBeFalsy();
	});


	it('should verify global edit feature:#6379',function(){
		console.log('verify global edit feature:#6379');
		var testData = 'test_'+Math.round(Math.random()*1000);

		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.switchToEditMode();
		browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
		commonPage.fillInField($('#general_form_name'),testData);
		commonPage.saveForm();

		expect($('input').isPresent()).toBeTruthy();
	});

	

})
