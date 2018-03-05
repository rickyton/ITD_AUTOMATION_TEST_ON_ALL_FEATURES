describe('Date Scenario', function () {

	var World = require("./framework/World");
	var LoginPage = require("./identity/LoginPage");
	var LogoutPage = require("./identity/LogoutPage");
	var Tenant_settingPage = require("./administration/Tenant_settingPage");
	var DashBoardPage = require("./dashboard/DashBoardPage");
	var TaskPage = require("./entity/TaskPage");
	var ReportPage = require("./entity/ReportPage");
	var CommonPage = require("./common/CommonPage");


	var world = new World();
	var tenant_settingPage = new Tenant_settingPage (world);
	var dashBoardPage = new DashBoardPage(world);
	var taskPage = new TaskPage(world);
	var reportPage = new ReportPage(world);
	var commonPage = new CommonPage(world);

	beforeAll(function () {
		new LoginPage(world).quickLogin();
		// new LoginPage(world).quickLogin("Ricky", "aaa111");
	});

	afterAll(function () {
		new LogoutPage(world).logout();
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

	it('should set dmydash format for tests:#5444',function(){
		console.log("should set dmydash format for tests:#5444");

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.dateFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.dateFormat,'dmydash');
		})
		tenant_settingPage.timeFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.timeFormat,'twelve');
		})
		tenant_settingPage.saveForm();
	});


	it('should test date input/display dmydash format with Dashboard:#5444',function(){
		console.log("should test date input/display dmydash format with Dashboard:#5444");

		dashBoardPage.get();
		dashBoardPage.dashBoardPage();
		dashBoardPage.timeLabel.each(function(label){
			label.getText().then(function(timeLine){
				//check date format for dashboard
				expect(timeLine).toContain('-');
				dd = parseInt(timeLine.split('-')[0].trim(),10);
				mm = parseInt(timeLine.split('-')[1].trim(),10);
				expect(dd).toBeLessThan(32);
				expect(mm).toBeLessThan(13);
			})
		})
	});


	it('should set dmydot format for tests:#5444',function(){
		console.log("should set dmydot format for tests:#5444");

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.dateFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.dateFormat,'dmydot');
		})
		tenant_settingPage.timeFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.timeFormat,'twelve');
		})
		tenant_settingPage.saveForm();
	});


	it('should test date input/display dmydot format with Dashboard:#5444',function(){
		console.log("should test date input/display dmydot format with Dashboard:#5444");

		dashBoardPage.get();
		dashBoardPage.dashBoardPage();
		dashBoardPage.timeLabel.each(function(label){
			label.getText().then(function(timeLine){
				//check date format for dashboard
				expect(timeLine).toContain('.');
				dd = parseInt(timeLine.split('.')[0].trim(),10);
				mm = parseInt(timeLine.split('.')[1].trim(),10);
				expect(dd).toBeLessThan(32);
				expect(mm).toBeLessThan(13);
			})
		})
	});


	it('should set mdyslash format for tests:#5444',function(){
		console.log("should set mdyslash format for tests:#5444");

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.dateFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.dateFormat,'mdyslash');
		})
		tenant_settingPage.timeFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.timeFormat,'twentyfour');
		})
		tenant_settingPage.saveForm();
	});


	it('should test date input/display mdyslash format with Dashboard:#5444',function(){
		console.log("should test date input/display mdyslash format with Dashboard:#5444");

		dashBoardPage.get();
		dashBoardPage.dashBoardPage();
		dashBoardPage.timeLabel.each(function(label){
			label.getText().then(function(timeLine){
				//check date format for dashboard
				expect(timeLine).toContain('/');
				dd = parseInt(timeLine.split('/')[1].trim(),10);
				mm = parseInt(timeLine.split('/')[0].trim(),10);
				expect(dd).toBeLessThan(32);
				expect(mm).toBeLessThan(13);
			})
		})
	});


	it('should set mdydash format for tests:#5444',function(){
		console.log("should set mdydash format for tests:#5444");

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.dateFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.dateFormat,'mdydash');
		})
		tenant_settingPage.timeFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.timeFormat,'twelve');
		})
		tenant_settingPage.saveForm();
	});


	it('should test date input/display mdydash format with Dashboard:#5444',function(){
		console.log("should test date input/display mdydash format with Dashboard:#5444");

		dashBoardPage.get();
		dashBoardPage.dashBoardPage();
		dashBoardPage.timeLabel.each(function(label){
			label.getText().then(function(timeLine){
				//check date format for dashboard
				expect(timeLine).toContain('-');
				dd = parseInt(timeLine.split('-')[1].trim(),10);
				mm = parseInt(timeLine.split('-')[0].trim(),10);
				expect(dd).toBeLessThan(32);
				expect(mm).toBeLessThan(13);
			})
		})
	});


	it('should set mdydot format for tests:#5444',function(){
		console.log("should set mdydot format for tests:#5444");

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.dateFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.dateFormat,'mdydot');
		})
		tenant_settingPage.timeFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.timeFormat,'twelve');
		})
		tenant_settingPage.saveForm();
	});


	it('should test date input/display mdydot format with Dashboard:#5444',function(){
		console.log("should test date input/display mdydot format with Dashboard:#5444");

		dashBoardPage.get();
		dashBoardPage.dashBoardPage();
		dashBoardPage.timeLabel.each(function(label){
			label.getText().then(function(timeLine){
				//check date format for dashboard
				expect(timeLine).toContain('.');
				dd = parseInt(timeLine.split('.')[1].trim(),10);
				mm = parseInt(timeLine.split('.')[0].trim(),10);
				expect(dd).toBeLessThan(32);
				expect(mm).toBeLessThan(13);
			})
		})
	});


	it('should set ymdslash format for tests:#5444',function(){
		console.log("should set ymdslash format for tests:#5444");

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.dateFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.dateFormat,'ymdslash');
		})
		tenant_settingPage.timeFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.timeFormat,'twentyfour');
		})
		tenant_settingPage.saveForm();
	});


	it('should test date input/display ymdslash format with Dashboard:#5444',function(){
		console.log("should test date input/display ymdslash format with Dashboard:#5444");

		dashBoardPage.get();
		dashBoardPage.dashBoardPage();
		dashBoardPage.timeLabel.each(function(label){
			label.getText().then(function(timeLine){
				//check date format for dashboard
				expect(timeLine).toContain('/');
				dd = parseInt(timeLine.split('/')[2].trim(),10);
				mm = parseInt(timeLine.split('/')[1].trim(),10);
				expect(dd).toBeLessThan(32);
				expect(mm).toBeLessThan(13);
			})
		})
	});


	it('should set ymddash format for tests:#5444',function(){
		console.log("should set ymddash format for tests:#5444");

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.dateFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.dateFormat,'ymddash');
		})
		tenant_settingPage.timeFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.timeFormat,'twelve');
		})
		tenant_settingPage.saveForm();
	});


	it('should test date input/display ymddash format with Dashboard:#5444',function(){
		console.log("should test date input/display ymddash format with Dashboard:#5444");

		dashBoardPage.get();
		dashBoardPage.dashBoardPage();
		dashBoardPage.timeLabel.each(function(label){
			label.getText().then(function(timeLine){
				//check date format for dashboard
				expect(timeLine).toContain('-');
				dd = parseInt(timeLine.split('-')[2].trim(),10);
				mm = parseInt(timeLine.split('-')[1].trim(),10);
				expect(dd).toBeLessThan(32);
				expect(mm).toBeLessThan(13);
			})
		})
	});


	it('should set ymddot format for tests:#5444',function(){
		console.log("should set ymddot format for tests:#5444");

		commonPage.get();
		commonPage.systemEntityPage("System","Settings");
		tenant_settingPage.get();
		tenant_settingPage.dateFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.dateFormat,'ymddot');
		})
		tenant_settingPage.timeFormat.click().then(function(){
			tenant_settingPage.selectOption(tenant_settingPage.timeFormat,'twelve');
		})
		tenant_settingPage.saveForm();
	});


	it('should test date input/display ymddot format with Dashboard:#5444',function(){
		console.log("should test date input/display ymddot format with Dashboard:#5444");

		dashBoardPage.get();
		dashBoardPage.dashBoardPage();
		dashBoardPage.timeLabel.each(function(label){
			label.getText().then(function(timeLine){
				//check date format for dashboard
				expect(timeLine).toContain('.');
				dd = parseInt(timeLine.split('.')[2].trim(),10);
				mm = parseInt(timeLine.split('.')[1].trim(),10);
				expect(dd).toBeLessThan(32);
				expect(mm).toBeLessThan(13);
			})
		})
	});


});
