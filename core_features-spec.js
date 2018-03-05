describe('Core Features Scenario', function () {

	var World = require("./framework/World");
	var LoginPage = require("./identity/LoginPage");
	var LogoutPage = require("./identity/LogoutPage");
	var DashBoardPage = require("./dashboard/DashBoardPage");
	var CommonPage = require("./common/CommonPage");
	var Tenant_settingPage = require("./administration/Tenant_settingPage");
	var FormBuilderPage = require("./forms/FormBuilderPage");
	var UserPage = require("./entity/UserPage");
	var TeamPage = require("./entity/TeamPage");
	var RolePage = require("./entity/RolePage");

	var world = new World();
	var dashBoardPage = new DashBoardPage(world);
	var commonPage = new CommonPage(world);
	var tenant_settingPage = new Tenant_settingPage (world);
	var formBuilderPage = new FormBuilderPage(world);
	var userPage = new UserPage(world);
	var teamPage = new TeamPage(world);
	var rolePage = new RolePage(world);


	var elementJustCreated;
	var formBuilderName;
	var formBuilderNameEdited;
	var firstnameCreated;
	var firstnameCreated2;
	var teamCreated;
	var roleNameCreated;
	var entity;
	var entity1;

		

	beforeAll(function () {
		new LoginPage(world).quickLogin();
		// new LoginPage(world).quickLogin("Ricky", "aaa111");
	});

	afterAll(function () {
		new LogoutPage(world).logout();
	});

     
	// test features related to dashboard
	 

	it('should  test the presence of the element of dashboard',function(){
		console.log("should  test the presence of the element of dashboard'");
		
		dashBoardPage.get();
		dashBoardPage.dashBoardPage();

		expect(dashBoardPage.isMapPresent()).toBeTruthy();	
		expect(dashBoardPage.isCalendarPresent()).toBeTruthy();	
		expect(dashBoardPage.isTimelineIsPresent()).toBeTruthy();	
		expect(dashBoardPage.isListOfTaskPresent()).toBeTruthy();	
		expect(dashBoardPage.getNbTaskIcon()).toBe(4);
	});



	it('should verify consistency of dashboard filter - overdue task in dashboard:#5441 #5845',function(){
		console.log("should verify consistency of dashboard filter - overdue task in dashboard:#5441 #5845");

		commonPage.get();
		dashBoardPage.get();
		dashBoardPage.dashBoardPage();
		var nbTaskOverdue = dashBoardPage.getNbSmallIconNumber(0);
		dashBoardPage.clickOnOverdueSmallBox();
		nbTaskOverdue.then(function(value){
			expect(commonPage.getNbElement()).toBe(parseInt(value,10));
		});
	});


	it('should verify consistency of dashboard filter - today in dashboard:#5441 #5845',function(){
		console.log("should verify consistency of dashboard filter - today in dashboard:#5441 #5845");

		commonPage.get();
		dashBoardPage.get();
		dashBoardPage.dashBoardPage();
		dashBoardPage.getNbSmallIconNumber(1).then(function(value){
			dashBoardPage.clickOnTaskToBeDoneTodaySmallBox();
			expect(commonPage.getNbElement()).toBe(parseInt(value,10));
		})	
	});


	it('should verify consistency of dashboard filter - in 7 day in dashboard:#5441 #5845',function(){
		console.log("should verify consistency of dashboard filter - in 7 day in dashboard:#5441 #5845");
		
		commonPage.get();
		dashBoardPage.get();
		dashBoardPage.dashBoardPage();
		dashBoardPage.getNbSmallIconNumber(3).then(function(value){
			dashBoardPage.clickOnTaskToBeDoneInTheWeek();
			expect(commonPage.getNbElement()).toBe(parseInt(value,10));
		})	
	});

	//
	// test features related to global settings
	//

	it('should add admin setting for CSV export separator:#5450',function(){
		console.log('add admin setting for CSV export separator:#5450');
		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		var exportDelimiter = tenant_settingPage.exportDelimiter;
		commonPage.moveToElement(exportDelimiter);
		exportDelimiter.click();
		expect(exportDelimiter.$$('option').getText()).toEqual([';',',','\\t','|'])	
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


	it('should  remove the new currency',function(){
		console.log("should  remove the new currency");
		
		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.removeCurrency(elementJustCreated);
		tenant_settingPage.saveForm();
		expect(tenant_settingPage.currencyIsPresent(elementJustCreated)).toBeFalsy();
	});


	it('should set dmyslash format for tests:#5444',function(){
		console.log("should set dmyslash format for tests:#5444");

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.dateFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.dateFormat,'dmyslash');
		})
		tenant_settingPage.timeFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.timeFormat,'twentyfour');
		})
		tenant_settingPage.saveForm();
	});


	it('should test date input/display dmyslash format with Dashboard:#5444',function(){
		console.log("should test date input/display dmyslash format with Dashboard:#5444");

		dashBoardPage.get();
		dashBoardPage.dashBoardPage();
		dashBoardPage.timeLabel.each(function(label){
			label.getText().then(function(timeLine){
				//check date format for dashboard
				expect(timeLine).toContain('/');
				dd = parseInt(timeLine.split('/')[0].trim(),10);
				mm = parseInt(timeLine.split('/')[1].trim(),10);
				expect(dd).toBeLessThan(32);
				expect(mm).toBeLessThan(13);
			})
		})
	});


	// 
	//   calendar
	// 
	
	it('should verify calendar full displayed in dashboard',function(){
		console.log('verify calendar full displayed in dashboard');

		commonPage.get();		
		dashBoardPage.get();
		dashBoardPage.dashBoardPage();

		//check if whole calendar in dashboard is displayed or not
		commonPage.dateButtons.each(function(date){
			browser.actions().mouseMove(date).perform();
			expect(date.isDisplayed()).toBeTruthy();
		});
	});


	//
	// tasks filter facets 
	//
	
	it('should verify elements in task list', function () {
		console.log('verify elements in task list');

		commonPage.get();
		commonPage.entityPage('Task');
		
		expect(commonPage.filterFacet.isPresent()).toBeTruthy();
		expect(commonPage.filterFacet.element(by.xpath("//*[contains(text(),'My Tasks')]")).isPresent()).toBeTruthy();
		expect(commonPage.filterFacet.element(by.xpath("//*[contains(text(),'Team Tasks')]")).isPresent()).toBeTruthy();
		expect(commonPage.filterFacet.element(by.xpath("//*[contains(text(),'Delegated')]")).isPresent()).toBeTruthy();
		expect(commonPage.filterFacet.element(by.xpath("//*[contains(text(),'Unassigned')]")).isPresent()).toBeTruthy();
		expect(commonPage.filterFacet.$("[ng-click='manageFilters()']").isPresent()).toBeTruthy();
	});

		



});
