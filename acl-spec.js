describe('ACL Scenario', function () {

	var World = require("./framework/World");
	var LoginPage = require("./identity/LoginPage");
	var LogoutPage = require("./identity/LogoutPage");
	var TeamPage = require("./entity/TeamPage");
	var CommonPage = require("./common/CommonPage");
	var FormBuilderPage = require("./forms/FormBuilderPage");

	var world = new World();
	
	var teamPage = new TeamPage(world);;
	var commonPage = new CommonPage(world);
	var loginPage = new LoginPage(world);
	var logoutPage = new LogoutPage(world); 
	var formBuilderPage = new FormBuilderPage(world);

	var fatherTeamName = 'Ricky_Father_Team';
	var childTeamName = 'Ricky_Child_Team';
	var model = 'Model' +Math.random().toString(36).substring(7,9);
	var price = Math.round(Math.random()*1000);
	

	beforeAll(function () {
		loginPage.quickLogin();
		// loginPage.quickLogin("Ricky", "aaa111");
	});

	afterAll(function () {
		logoutPage.logout();
	});

	it('should test ACL propagation on entities:#5443 #5939', function () {
		console.log('test ACL propagation on entities:#5443 #5939');

		commonPage.get();
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();
		formBuilderPage.loadDetail('general form for automation tests');
		commonPage.clickOnButton('Access');
		commonPage.setACL('first',true,true,false,false,true);
		element.all(by.repeater('authority in authorities.selected')).last().$$('td').get(0).getText().then(function(auth){
			commonPage.setAclExistingEntities(true);
			commonPage.setRecursivelyToChildren(true);
			commonPage.clickOnButton('Close');
			commonPage.saveForm();

			commonPage.entityPage('general form for automation tests');
			commonPage.switchToViewMode();
			browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
			commonPage.edit();
			var AclAccess = commonPage.aclAccess;
			commonPage.actionToExecute(AclAccess,'Access Control List');

			if(auth.includes(',')){
				auth1 = auth.replace(',','').trim();
			} else{
				auth1 = auth;
			}
			//verify acl propagation to existing entities
			var role = $('.table-responsive').element(by.xpath('.//*[.="'+auth1+'"]')); 
			
			expect(role.isPresent()).toBeTruthy();
			expect(commonPage.isAclSelected(auth1,'read')).toBeTruthy();
			expect(commonPage.isAclSelected(auth1,'write')).toBeTruthy();
			expect(commonPage.isAclSelected(auth1,'delete')).toBeFalsy();
			expect(commonPage.isAclSelected(auth1,'administer')).toBeFalsy();
			
			commonPage.setACL('last',true,true,true,false);
			element.all(by.repeater('authority in authorities.selected')).last().$$('td').get(0).getText().then(function(auth2){
				$('[ng-click="closeModalDialog()"]').click();
				commonPage.saveForm();
				commonPage.clickElementInPanel('child form','first');
				commonPage.edit();
				commonPage.actionToExecute(AclAccess,'Access Control List');

				var auth3 = auth2.replace(',','').trim();
				var role1 = $('.table-responsive').element(by.xpath('.//*[.="'+auth3+'"]')); 
				
				expect(role1.isPresent()).toBeTruthy();
				expect(commonPage.isAclSelected(auth3,'read')).toBeTruthy();
				expect(commonPage.isAclSelected(auth3,'write')).toBeTruthy();
				expect(commonPage.isAclSelected(auth3,'delete')).toBeTruthy();
				expect(commonPage.isAclSelected(auth3,'administer')).toBeFalsy();

				//delete test data
				$('[ng-click="closeModalDialog()"]').click();
				commonPage.clickOnButton('Cancel');
				commonPage.clickOnButton('Close');
				commonPage.edit();
				commonPage.actionToExecute(AclAccess,'Access Control List');

				var rows = element.all(by.repeater('authority in authorities.selected'));
				commonPage.rowDeletion(rows,auth2);
				$('[ng-click="closeModalDialog()"]').click();
				commonPage.saveForm();

				commonPage.systemEntityPage('User interface','Entity designer');
				formBuilderPage.get();
				formBuilderPage.loadDetail('general form for automation tests');
				commonPage.clickOnButton('Access');
				
				commonPage.rowDeletion(rows,auth);
				$('[ng-click="closeModalDialog()"]').click();
				commonPage.saveForm();
			})
		})
	});


	// Problem with search popup to select member/user, so it causes fail testscript, will test
	// later after being fixed

	// it('should verify teams of teams for ACL, candidate in tasks, roles:#5354',function(){
	// 	console.log('create father team:#5354');
	// 	teamPage.get();
	// 	commonPage.get();
	// 	commonPage.systemEntityPage('Identity','Teams');
	// 	commonPage.switchToViewMode();
	// 	commonPage.deleteEntity(fatherTeamName);

	// 	//create a father team for test
	// 	teamPage.newTeam(fatherTeamName,fatherTeamName);
	// 	commonPage.edit();
	// 	commonPage.clickOnAddRelation('Assigned to roles',true);
	// 	commonPage.searchPopup('first');
	// 	commonPage.saveForm();
	// })

	// Problem with search popup
	// it('should verify teams of teams for ACL, candidate in tasks, roles:#5354',function(){
	// 	console.log('create child team:#5354');	
	// 	//create a child team that is child for father team

	// 	teamPage.get();
	// 	commonPage.get();
	// 	commonPage.systemEntityPage('Identity','Teams');
	// 	commonPage.switchToViewMode();
	// 	commonPage.deleteEntity(childTeamName);

	// 	//cannot search "abs"
	// 	//create a father team for test
	// 	teamPage.newTeam(childTeamName,childTeamName);
	// 	commonPage.edit();
	// 	commonPage.clickOnAddRelation('Members',true);
	// 	commonPage.searchPopup('abs');
	// 	commonPage.clickOnAddRelation('parent team',true);
	// 	commonPage.searchPopup(fatherTeamName);
	// 	commonPage.saveForm();
	// })

	// Problem with search popup
	// it('should verify teams of teams for ACL, candidate in tasks, roles:#5354',function(){
	// 	console.log('create entity and data for test, set authorized read for user:#5354');
	// 	//create a laptop entity for test
	// 	laptopPage.get();
	// 	commonPage.get();
	// 	commonPage.entityPage('general form for automation tests');
	// 	commonPage.switchToViewMode();
	//  browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
	//  //edit data for the laptop entity 	
	//  commonPage.edit();
	//  var AclAccess = commonPage.aclAccess;
	// 	commonPage.actionToExecute(AclAccess,'Access Control List');
	//  commonPage.setACL(fatherTeamName,true,false,false,false);
	//  $('[ng-click="closeModalDialog()"]').click();
	//  commonPage.saveForm();
	// })

	// Problem with search popup
	// it('should verify teams of teams for ACL, candidate in tasks, roles:#5354',function(){
	// 	console.log('test read authorized for user:#5354');
	//  	//login with the user who belongs to child team
	//  	logoutPage.logout();
	// 		loginPage.quickLoginWithAnotherAccount();
	//  	//loginPage.quickLoginWithAnotherAccount("minhsonton", "aaa111");
	//  	commonPage.get();
	//  	commonPage.entityPage('general form for automation tests');
	// 	    //commonPage.entityPageFromSideBar('general form for automation tests');
	//  	commonPage.switchToViewMode();
	//  	//check if delete button is hidden in the list (cannot allow to delete the entity) - not delete 
	//  	expect(commonPage.isDeleteButtonPresent('first')).toBeFalsy();
	//  	browser.refresh();
	//  	browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
	//  	//check if edit button is hidden (cannot allow to edit the details) - not edit
	//  	expect(commonPage.isElementPresent('Edit')).toBeFalsy();	
	// })

	// Problem with search popup
	// it('should verify teams of teams for ACL, candidate in tasks, roles:#5354',function(){
	// 	console.log('set read and write authorized for user:#5354');
	//  	//login with admin user
	//  	logoutPage.logout();
	// 		loginPage.quickLogin();
	//  	//loginPage.quickLogin("Ricky", "aaa111");
	//  	laptopPage.get();
	// 		commonPage.get();
	// 		commonPage.entityPage('general form for automation tests'); 
	// 		commonPage.switchToViewMode();	
	//  	browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
	//  	commonPage.edit();
	//  	var AclAccess = commonPage.aclAccess;
	// 		commonPage.actionToExecute(AclAccess,'Access Control List');
	//  	commonPage.setACLWOCreate(fatherTeamName,true,true,false,false);
	//  	$('[ng-click="closeModalDialog()"]').click();
	//  	commonPage.saveForm();
	// })	

	// Problem with search popup
	// it('should verify teams of teams for ACL, candidate in tasks, roles:#5354',function(){
	// 	console.log('test read and write authorized for user:#5354');
	//  	//login with the abs user
	//  	logoutPage.logout();
	// 		loginPage.quickLoginWithAnotherAccount();
	//  	//loginPage.quickLoginWithAnotherAccount("minhsonton", "aaa111");
	//  	commonPage.get();
	//  	commonPage.entityPage('general form for automation tests');
	//  	//commonPage.entityPageFromSideBar('general form for automation tests');
	//  	commonPage.switchToViewMode();

	//  	//check if delete button is hidden (cannot allow to delete the entity)- not delete
	//  	expect(commonPage.isDeleteButtonPresent('first')).toBeFalsy();
	//  	browser.refresh();
	//  	browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
	//  	//check if the edit button is visible (allow to edit the details)- can write
	//  	expect(commonPage.isElementPresent('Edit')).toBeTruthy();
	//  	commonPage.edit();
	//  	//check if ACL button is hidden (cannot allow to change) - not administer
	//  	expect(commonPage.isCaretPresent('Activity','span')).toBeFalsy(); 	
	// })


	// Problem with search popup
	// it('should verify teams of teams for ACL, candidate in tasks, roles:#5354',function(){
	// 	console.log('set read, write and delete authorized for user:#5354');
	//  	//login with admin user
	//  	logoutPage.logout();
	// 		loginPage.quickLogin();
	//  	//loginPage.quickLogin("Ricky", "aaa111");
	//  	laptopPage.get();
	// 		commonPage.get();
	// 		commonPage.entityPage('general form for automation tests');
	// 		commonPage.switchToViewMode();	
	//  	browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
	//  	commonPage.edit();
	//  	var AclAccess = commonPage.aclAccess;
	// 		commonPage.actionToExecute(AclAccess,'Access Control List');
	//  	commonPage.setACLWOCreate(fatherTeamName,true,true,true,false);
	//  	$('[ng-click="closeModalDialog()"]').click();
	//  	commonPage.saveForm();
	 	
	// })

	// Problem with search popup
	// it('should verify teams of teams for ACL, candidate in tasks, roles:#5354',function(){
	// 	console.log('test read, write and delete authorized for user:#5354');
	//  	//login with abs user
	//  	logoutPage.logout();
	// 		loginPage.quickLoginWithAnotherAccount();
	//  	//loginPage.quickLoginWithAnotherAccount("minhsonton", "aaa111");
	//  	commonPage.get();
	//  	commonPage.entityPage('general form for automation tests');
	//  	//commonPage.entityPageFromSideBar('general form for automation tests');
	//  	commonPage.switchToViewMode();
	//  	//check if delete button is hidden (cannot allow to delete the entity)- not delete
	//  	expect(commonPage.isDeleteButtonPresent('first')).toBeTruthy();
	//  	browser.refresh();
	//  	browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
	//  	//check if the edit button is visible (allow to edit the details)- can write
	//  	expect(commonPage.isElementPresent('Edit')).toBeTruthy();
	//  	commonPage.edit();
	//  	//check if ACL button is hidden (cannot allow to change) - not administer
	//  	expect(commonPage.isCaretPresent('Activity','span')).toBeFalsy();
	// })

	// Problem with search popup
	// it('should verify teams of teams for ACL, candidate in tasks, roles:#5354',function(){
	// 	console.log('set read, write, delete, administer authorized for user:#5354');
	//  	//login with admin user
	//  	logoutPage.logout();
	// 		loginPage.quickLogin();
	//  	//loginPage.quickLogin("Ricky", "aaa111");
	//  	laptopPage.get();
	// 		commonPage.get();
	// 		commonPage.entityPage('general form for automation tests');
	// 		commonPage.switchToViewMode();
	//  	browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
	//  	commonPage.edit();
	//  	var AclAccess = commonPage.aclAccess;
	// 		commonPage.actionToExecute(AclAccess,'Access Control List');
	//  	commonPage.setACLWOCreate(fatherTeamName,true,true,true,true);
	//  	$('[ng-click="closeModalDialog()"]').click();
	//  	commonPage.saveForm();	 	
	// })

	// Problem with search popup
	// it('should verify teams of teams for ACL, candidate in tasks, roles:#5354',function(){
	// 	console.log('test read, write, delete, administer authorized for user:#5354');
	//  	//login with abs user
	//  	logoutPage.logout();
	// 		loginPage.quickLoginWithAnotherAccount();
	//  	//loginPage.quickLoginWithAnotherAccount("minhsonton", "aaa111");
	//  	commonPage.get();
	//  	commonPage.entityPage('general form for automation tests');
	//  	//commonPage.entityPageFromSideBar('general form for automation tests');
	//  	commonPage.switchToViewMode();

	//  	//check if delete button is hidden (cannot allow to delete the entity)- not delete
	//  	expect(commonPage.isDeleteButtonPresent('first')).toBeTruthy();
	//  	browser.refresh();
	//  	browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
	//  	//check if the edit button is visible (allow to edit the details)- can write
	//  	expect(commonPage.isElementPresent('Edit')).toBeTruthy();
	//  	commonPage.edit();
	//  	//check if ACL button is hidden (cannot allow to change) - not administer
	//  	expect(commonPage.isCaretPresent('Activity','span')).toBeTruthy();	
	// })

	// Problem with search popup
	// it('should verify teams of teams for ACL, candidate in tasks, roles:#5354',function(){
	// 	console.log('delete test data:#5354');
	// 		//login with admin user
	// 		logoutPage.logout();
	// 		loginPage.quickLogin();
	//  	//loginPage.quickLogin("Ricky", "aaa111");
	//  	//delete father team after test
	//  	commonPage.get();
	// 		commonPage.systemEntityPage('Identity','Teams');
	//  	commonPage.clickOnDelete(fatherTeamName);
	// 		commonPage.validationDelete();
	// 		//delete child team after test
	// 		browser.refresh();
	// 		commonPage.clickOnDelete(childTeamName);
	// 		commonPage.validationDelete();
	// });





});