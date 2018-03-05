describe('Identity Scenario', function () {

	var World = require("./framework/World");
	var LoginPage = require("./identity/LoginPage");
	var LogoutPage = require("./identity/LogoutPage");
	var CommonPage = require("./common/CommonPage");
	var Tenant_settingPage = require("./administration/Tenant_settingPage");
	var DashBoardPage = require("./dashboard/DashBoardPage");
	var FormBuilderPage = require("./forms/FormBuilderPage");
	var UserPage = require("./entity/UserPage");
	var TeamPage = require("./entity/TeamPage");
	var RolePage = require("./entity/RolePage");
	
	
	var world = new World();
	var commonPage = new CommonPage(world);
	var logoutPage = new LogoutPage(world);
	var loginPage = new LoginPage(world);
	var tenant_settingPage = new Tenant_settingPage (world);
	var dashBoardPage = new DashBoardPage(world);
	var formBuilderPage = new FormBuilderPage(world);
	var userPage = new UserPage(world);
	var teamPage = new TeamPage(world);
	var rolePage = new RolePage(world);

	var firstnameCreated;
	var teamCreated;
	var firstnameCreated2;
	var roleNameCreated;
	
	
	beforeAll(function () {
		loginPage.quickLogin();
	});

	afterAll(function () {
		logoutPage.logout();
	});


	it('should create a new User', function () {
		console.log("create a new User");
		firstnameCreated = 'selenium_first' + Math.random().toString(36).substring(7,9);

		commonPage.get();
		commonPage.systemEntityPage("Identity","Users");
		commonPage.switchToViewMode();		
		userPage.get();
		userPage.submit('selenium_User' + Math.random().toString(36).substring(7,9),
				firstnameCreated,
				'selenium_last' + Math.random().toString(36).substring(7,9),
				'Ricky'+Math.random().toString(36).substring(7,9)+'@it-development.com',$('.ui-select-search'),'div','ROLE_USER');
		
		// check, if entity was been created
		commonPage.clickOnButton('Close');
		expect(commonPage.isPresentInList(firstnameCreated)).toBeTruthy();
	});


	it('should edit the username of user' , function(){
		console.log("Edit the username of user");
		
		commonPage.get();		
		commonPage.systemEntityPage("Identity","Users");
		commonPage.switchToViewMode();
		userPage.get();
		commonPage.loadDetail(firstnameCreated);
		userPage.editLastName("Selenium-NewLastname");
		commonPage.clickOnButton('Close');
		expect(commonPage.isPresentInList(firstnameCreated)).toBeTruthy();	
	});


	it('should delete a user' , function(){
		console.log("delete a user");

		commonPage.get();
		commonPage.systemEntityPage("Identity","Users");
		commonPage.clickOnDelete(firstnameCreated);
		commonPage.validationDelete();
	})

	it('should create a new Team', function () {
		console.log("create new team");
		var name = 'selenium_team' + Math.random().toString(36).substring(7,10);
		teamCreated = name;

		commonPage.get();
		commonPage.systemEntityPage("Identity","Teams");
		commonPage.switchToViewMode();
		teamPage.get();
		teamPage.newTeam(name,'team_test_ricky');
		commonPage.clickOnButton('Close');	
		expect(commonPage.isPresentInList(name)).toBeTruthy();
	});
	
	//probem with popup search
	// it('should add a member to an existing team' , function(){
	// 	console.log("add a member to an existing team");
	// 	firstnameCreated2 = 'MinhSon';
	// 	commonPage.get();
	// 	commonPage.systemEntityPage("Identity","Teams");
	// 	commonPage.switchToViewMode();
	// 	teamPage.get();
	// 	commonPage.loadDetail(teamCreated);
	// 	commonPage.edit();
	// 	commonPage.clickOnAddRelation('Members',true);
	// 	commonPage.searchPopup(firstnameCreated2);
	// 	teamPage.saveForm();
	// 	expect(teamPage.teamContainsUser(firstnameCreated2)).toBeTruthy();
	// });

	// problem with popup search
	// it('should delete a user from an existing Team' , function(){
	// 	console.log("delete a user from an existing Team");

	// 	commonPage.get();
	// 	commonPage.systemEntityPage("Identity","Teams");
	// 	commonPage.switchToViewMode();
	// 	teamPage.get();
	// 	commonPage.loadDetail(teamCreated);
	// 	teamPage.unlinkUser(firstnameCreated2);
	// })

	it('should delete a team' , function(){
		console.log("delete a team");
		commonPage.get();
		commonPage.systemEntityPage("Identity","Teams");
		commonPage.clickOnDelete(teamCreated);
		commonPage.validationDelete();
	})


	it('should create a new role', function () {
		console.log("create a new role");

		roleNameCreated = 'selenium_role' + Math.random().toString(36).substring(2,4);
		commonPage.get();
		commonPage.systemEntityPage("Identity","Roles");
		commonPage.switchToViewMode();	
		rolePage.get();		
		rolePage.submit(roleNameCreated,'test_ricky');
		commonPage.clickOnButton('Close');
		// check, if entity was been created
		expect(commonPage.isPresentInList(roleNameCreated)).toBeTruthy();
	});


	// problem with popup search
	// it('should add a privilege to an existing role' , function(){
	// 	console.log("add a privilege to an existing role");

	// 	commonPage.get();
	// 	commonPage.systemEntityPage("Identity","Roles");
	// 	commonPage.switchToViewMode();
	// 	rolePage.get();
	// 	commonPage.loadDetail(roleNameCreated);
	// 	commonPage.edit();
	// 	commonPage.clickOnAddRelation('privileges',true);
	// 	var firstElement = $('.modal-dialog').all(by.repeater('row in entity.data')).first().$('a');
	// 	browser.executeScript("arguments[0].click();", firstElement.getWebElement());
	// 	commonPage.dialogBox.element(by.xpath('.//*[.="Save"]')).click();
	// 	commonPage.saveForm();
	// 	// commonPage.searchPopup('View essential reports');
	// 	rolePage.getSizeOfPrivilegeList().then(function(value){
	// 		expect(value).toBe(1);
	// 	})	
	// })
		
	// problem with popup search
	// it('should unlink a privilege to an existing role' , function(){
	// 	console.log("unlink a privilege to an existing role");

	// 	commonPage.get();
	// 	commonPage.systemEntityPage("Identity","Roles");
	// 	commonPage.switchToViewMode();
	// 	rolePage.get();
	// 	commonPage.loadDetail(roleNameCreated);
	// 	commonPage.edit();
	// 	var firstRemoveIconInPrivilegePanel = $$('.box-solid').get(1).all(by.repeater('row in entityData')).first().$('.fa-remove');
	// 	browser.executeScript("arguments[0].click();", firstRemoveIconInPrivilegePanel.getWebElement());
	// 	commonPage.validationDelete();
	// 	// rolePage.unlinkPrivilege("View essential reports");
	// 	rolePage.getSizeOfPrivilegeList().then(function(value){
	// 		expect(value).toBe(0);
	// 	})		
	// })

	// problem with popup search
	// it('should add a user to an existing role' , function(){
	// 	console.log("add an user to an existing role");

	// 	commonPage.get();
	// 	commonPage.systemEntityPage("Identity","Roles");
	// 	commonPage.switchToViewMode();
	// 	rolePage.get();
	// 	commonPage.loadDetail(roleNameCreated);
	// 	commonPage.edit();
	// 	commonPage.clickOnAddRelation('users',true);
	// 	commonPage.searchPopup("Ricky");	
	// 	rolePage.getSizeOfUserList().then(function(value){
	// 		expect(value).toBe(1);
	// 	})	
	// })
	
	// problem with popup search
	// it('should unlink a user to an existing role' , function(){
	// 	console.log("unlink a user to an existing role");

	// 	commonPage.get();
	// 	commonPage.systemEntityPage("Identity","Roles");
	// 	commonPage.switchToViewMode();
	// 	rolePage.get();
	// 	commonPage.loadDetail(roleNameCreated);	
	// 	rolePage.unlinkUser("Ricky");
	// 	rolePage.getSizeOfUserList().then(function(value){
	// 		expect(value).toBe(0);
	// 	})		
	// })
	
	it('should delete a role' , function(){
		console.log("delete a role");

		commonPage.get();
		commonPage.systemEntityPage("Identity","Roles");
		commonPage.clickOnDelete(roleNameCreated);
		commonPage.validationDelete();
	})

	
	it('should verify search field in popup when adding link:#5456', function () {
		console.log('verify search field in popup when adding link:#5456');

		var users =['John','Radka','Miguel','BPM'];

		commonPage.get();
		rolePage.get();
		commonPage.systemEntityPage("Identity","Roles");
		commonPage.newButton.click();
		users.forEach(function(user){
			commonPage.clickOnAddRelation('users',true);			
			commonPage.searchPopup(user);
			//check if the selected users are displayed in user panel
			expect(commonPage.isPresentInPanel('users',user,1)).toBeTruthy();
		});
		browser.waitForAngular();		
	});


	

})
