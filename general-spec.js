describe('General Scenario', function () {

	var World = require("./framework/World");
	var LoginPage = require("./identity/LoginPage");
	var LogoutPage = require("./identity/LogoutPage");
	var CommonPage = require("./common/CommonPage");
	var FormBuilderPage = require("./forms/FormBuilderPage");
	var FormField = require("./forms/component/FormField");
	var Tenant_settingPage = require("./administration/Tenant_settingPage");
	var DashBoardPage = require("./dashboard/DashBoardPage");
	var TaskPage = require("./entity/TaskPage");
	
	

	var world = new World();
	var commonPage = new CommonPage(world);
	var logoutPage = new LogoutPage(world);
	var formBuilderPage = new FormBuilderPage(world);
	var tenant_settingPage = new Tenant_settingPage (world);
	var dashBoardPage = new DashBoardPage(world);
	var taskPage = new TaskPage(world);
	
	
	beforeEach(function () {
		new LoginPage(world).quickLogin();
		// loginPage.quickLogin("Ricky","aaa111");
	});

	afterEach(function () {
		logoutPage.logout();
	});


	it('should verify creating attached entity in layout using association:#7148', function () {
		console.log('verify creating attached entity in layout using association:#7148');
		var form1Name = 'form1_'+Math.round(Math.random()*1000);
		var form2Name = 'form2_'+Math.round(Math.random()*1000);
		var form1Name1 = 'form1_'+Math.round(Math.random()*1000);
		var form2Name1 = 'form2_'+Math.round(Math.random()*1000);

		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.switchToViewMode();
		var firstRow = commonPage.rows.first().$('a');
		browser.executeScript("arguments[0].click();", firstRow.getWebElement());
		commonPage.edit();

		//create new entity with using "+" icon for adding line in the panel of first related entity
		commonPage.getPanel('form one').then(function(panel1){
			var bottomPlusIcon1 = panel1.$('.box-footer').$('.fa-plus');
			bottomPlusIcon1.isPresent().then(function(isPres){
				if(!isPres){
					commonPage.systemEntityPage('User interface','Entity designer');
					formBuilderPage.get();
					formBuilderPage.loadDetail('test form one for Ricky test');
					var firstField = element.all(by.repeater('field in form.form_fields')).first();
					browser.executeScript("arguments[0].click();", firstField.getWebElement());
					formBuilderPage.setEditableInGrid(true);
					formBuilderPage.saveForm();
					commonPage.entityPage('general form for automation tests');
					var firstRow = commonPage.rows.first().$('a');
					browser.executeScript("arguments[0].click();", firstRow.getWebElement());
					commonPage.edit();
				}
				browser.executeScript("arguments[0].click();", bottomPlusIcon1.getWebElement());
				commonPage.fillInField($$('#form_one_name').last(),form1Name);
			})
			
		})

		//create new entity with using "+" icon for adding line in the panel of second related entity
		commonPage.getPanel('form two').then(function(panel2){
			var bottomPlusIcon2 = panel2.$('.box-footer').$('.fa-plus');
			browser.executeScript("arguments[0].click();", bottomPlusIcon2.getWebElement());
			commonPage.fillInField($$('#form_two_name').last(),form2Name);
		})
		commonPage.saveForm();

		//go to first related entity list to check relations between entities in panel 1 and panel 2
		commonPage.getPanel('form one').then(function(panel1){
			browser.executeScript("arguments[0].click();", panel1.$('a').getWebElement());
			commonPage.getPanel('form two').then(function(panel2){
				expect(panel2.getText()).toContain(form2Name);
			})
		})
		commonPage.clickOnButton('Close');

		//go to second related entity list to check relations between entities in panel 1 and panel 2
		commonPage.getPanel('form two').then(function(panel2){
			browser.executeScript("arguments[0].click();", panel2.$('a').getWebElement());
			commonPage.getPanel('form one').then(function(panel1){
				expect(panel1.getText()).toContain(form1Name);
			})
		})
		commonPage.clickOnButton('Close');

		//create new entity with using "+" icon at top in the panel of first related entity
		commonPage.edit();
		commonPage.getPanel('form one').then(function(panel1){
			var topPlusIcon = panel1.$('.box-header').$('.fa-plus');
			browser.executeScript("arguments[0].click();", topPlusIcon.getWebElement());
			commonPage.fillInField($('#form_one_name'),form1Name1);
			commonPage.fillInField($('#geo_data_x'),'10.748832');
			commonPage.fillInField($('#geo_data_y'),'106.66627');
			commonPage.fillInField($('#geo_data_z'),'6');
		})
		commonPage.saveForm();

		//create new entity with using "+" icon at top in the panel of second related entity
		commonPage.edit();
		commonPage.getPanel('form two').then(function(panel2){
			var topPlusIcon = panel2.$('.box-header').$('.fa-plus');
			browser.executeScript("arguments[0].click();", topPlusIcon.getWebElement());
			commonPage.fillInField($('#form_two_name'),form2Name1);
		})
		commonPage.saveForm();

		//go to first related entity list to check relations between entities in panel 1 and panel 2
		commonPage.getPanel('form one').then(function(panel1){
			browser.executeScript("arguments[0].click();", panel1.$$('a').last().getWebElement());
			commonPage.getPanel('form two').then(function(panel2){
				expect(panel2.getText()).toContain(form2Name1);
			})
		})
		commonPage.clickOnButton('Close');

		//go to second related entity list to check relations between entities in panel 1 and panel 2
		commonPage.getPanel('form two').then(function(panel2){
			browser.executeScript("arguments[0].click();", panel2.$$('a').last().getWebElement());
			commonPage.getPanel('form one').then(function(panel1){
				expect(panel1.getText()).toContain(form1Name1);
			})
		})
	});


	it('should verify Entity association management for relations:#6470', function () {
		console.log('verify Entity association management for relations-use case 1:#6470');
		
		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.switchToViewMode();
		browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
		commonPage.edit();
		commonPage.selectRandomItemInField(0,'form1');
	 	commonPage.saveForm();
	});


	// // bug with search in popup, that cause fail this case
	// // it('should verify Entity association management for relations - use case 2:#6470', function () {
	// // 	console.log('verify Entity association management for relations-use case 2:#6470');
	// // 	commonPage.get();
	// // 	commonPage.entityPage('general form for automation tests');
	// // 	commonPage.switchToViewMode();
	// // 	commonPage.listMode();
	// // 	browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
	// // 	commonPage.edit();
	// // 	commonPage.getPanel('form one').then(function(panel){
	// // 		panel.$$('#form_one_name').count().then(function(nb){
	// // 			commonPage.getRowNumberInSearchField(0,'form1').then(function(itemNumber){
	// // 				// expect(nb).toBe(itemNumber);
	// // 			})
	// // 		})
	// // 	})		
	// // });

	// // // bug with searching in popup, it cause fail
	// // it('should verify Entity association management for relations - use case 3:#6470', function () {
	// // 	console.log('verify Entity association management for relations-use case 3:#6470');
		
	// // 	commonPage.get();
	// // 	commonPage.entityPage('general form for automation tests');
	// // 	commonPage.switchToViewMode();
	// // 	commonPage.listMode();
	// // 	browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
	// // 	commonPage.edit();
		
	// // 	commonPage.clickOnAddRelation('form one',true);
	// // 	commonPage.selectRowInPopup(0);
		
	// // 	commonPage.clickOnAddRelation('form two',true);
	// // 	commonPage.selectRowInPopup(0);

	// // 	commonPage.saveForm();

	// // 	commonPage.getPanel('form two').then(function(panel2){
	// // 		panel2.$$('tr').last().$('a').getText().then(function(txt){
	// // 			commonPage.getPanel('form one').then(function(panel1){
	// // 				browser.executeScript("arguments[0].click();", panel1.$$('tr').last().$('a').getWebElement());
	// // 				commonPage.getPanel('form two').then(function(pnel2){
	// // 					pnel2.getText().then(function(content){
	// // 						expect(content).toContain(txt);
	// // 					})
	// // 				})
	// // 			})
	// // 		})
	// // 	})
	// // });


	
	it('should disable editing in historic version:#7163', function () {
		console.log('disable editing in historic version:#7163');

		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.switchToViewMode();
		commonPage.listMode();
		browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
		commonPage.clickOnButton('Activity');

		$$('.activity-log-panel').count().then(function(nb){
			for(var i=0;i<nb;i++){
				var historicalVersion = $$('.activity-log-panel').get(i).$('a');
				browser.executeScript("arguments[0].click();", historicalVersion.getWebElement());

				expect($('[ng-click="editButton()"]').isPresent()).toBeFalsy();
				expect($('[ng-click="save();"]').isPresent()).toBeFalsy();
				expect($('.selectize-input').isPresent()).toBeFalsy();

				if(i!== nb-1){
					commonPage.clickOnButton('Activity');
				};
			}
			browser.waitForAngular();
		})
	});

	//edit data already in the '1create_neccessary_forms_for_tests' spec
	it('should verify filtering activity for historic version:#7137', function () {
		console.log('verify filtering activity for historic version:#7137');
		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.switchToViewMode();
		commonPage.listMode();
		var firstRow = commonPage.rows.first().$('a');
		browser.executeScript("arguments[0].click();", firstRow.getWebElement());
		commonPage.clickOnButton('Activity');
		browser.executeScript("arguments[0].click();", $('.fa-filter').getWebElement());

		$('#filterUserId').click().then(function(){
			$('#filterUserId').$$('[label="Son Minh Ton"]').first().click();
		})
		$('#filterField').click().then(function(){
			commonPage.selectOption($('#filterField'),'label','Geo data');
		})
		expect($('.activity-log-changes-list').getText()).toContain('Geo data set to');
	});


	it('should verify text area working:#6895', function () {
		console.log('verify text area working:#6895');
		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.listMode();
		var firstRow = commonPage.rows.first().$('a');
		browser.executeScript("arguments[0].click();", firstRow.getWebElement());
		commonPage.switchToViewMode();
		commonPage.edit();
		$('#text_area').getAttribute('value').then(function(text){
			commonPage.saveForm();
			$$('.form-group').get(8).$('p').getText().then(function(txt){
				expect(text).toEqual(txt);
			})
		})
	});


	it('should verify Back/Close Button:#5990', function () {
		console.log('verify Back/Close Button:#5990');
		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.listMode();
		browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
		commonPage.switchToViewMode();
		
		//verify "Close" button visible on map and details
		expect(commonPage.isElementPresent('Close')).toBeTruthy();
		commonPage.clickOnButton('Map');
	
		//coming back to list after clicking "Close" button
		commonPage.clickOnButton('Close');
		expect(commonPage.tableList.isPresent()).toBeTruthy();
	});

	
	it('should verify boxes minimized when empty or no content:#5745', function () {
		console.log('verify boxes minimized when empty or no content:#5745');
		
		commonPage.get();		
		commonPage.entityPage('general form for automation tests');
		commonPage.switchToViewMode();
		commonPage.listMode();
		commonPage.newButton.click();
		
		commonPage.box.each(function(box){		
			box.isDisplayed().then(function(isDisp){
				if(isDisp){
					//test all visible boxes except panels
					box.$('[ng-show="panel.panelName || panel.icon"]').isPresent().then(function(isPres1){
						if(!isPres1){
							//test all visible boxes except panels and tabs
							box.$('.nav-tabs-custom').isPresent().then(function(isPres2){
								if(!isPres2){
									//verify all visible boxes not contain box body when content is empty
									expect(box.$('.box-body').isPresent()).toBeFalsy();
								}
							})
						}
					})
				}
			})
			
		})
	});

	
	it('should verify entities count number:#5843', function () {
		console.log('verify entities count number:#5843');
		var entityName = ['general form for automation tests'];
		var testData = 'general_form_'+Math.round(Math.random()*1000);
		
		//test samples listed in entityName array
		entityName.forEach(function(name){
			commonPage.get();
			commonPage.entityPage(name);
			commonPage.listMode();
			commonPage.switchToViewMode();
			commonPage.getNbElement().then(function(numberOfEntities){
				var entitiesPerPage = 25;
				//scroll down specific times depending on the number of pages
				var numberOfPage = Math.ceil(numberOfEntities/entitiesPerPage);
				var scrollDownLimit = numberOfPage+2;

				for(var currentPage=1;currentPage <= scrollDownLimit;currentPage++){
					//scroll bottom (1200) per page, specifying the bottom based on 
					//the currentPage mutiply by 1200
					browser.executeScript('window.scrollTo(0,'+1200*currentPage+');');
					//wait for pages load
					browser.sleep(1500);
				};

				commonPage.rows.count().then(function(numberOfRows){
					//check if the number of entities matching the all the number ofrows displayed in the screen
					expect(numberOfEntities).toBe(numberOfRows);
				})
				commonPage.newButton.click();
				commonPage.selectDateOnCalendar(0,11,01,2018);
				commonPage.fillInField($('#general_form_name'),testData);
				commonPage.fillInField($('#geo_data_x'),'10.756121');
				commonPage.fillInField($('#geo_data_y'),'106.679138');
				commonPage.fillInField($('#geo_data_z'),'9');
				commonPage.fillInField($('#numeric'),'1234');
				commonPage.fillInField($('#text_area'),'We are not the best \n We are not the winner');
				browser.executeScript("arguments[0].click();", $('[ng-click="$select.activate()"]').getWebElement()).then(function(){
					var firstOption = element.all(by.repeater('option in $select.items')).first();
					browser.executeScript("arguments[0].click();", firstOption.getWebElement());
				})
				commonPage.saveForm();
				commonPage.clickOnButton('Close');
				expect(commonPage.getNbElement()).toBe(numberOfEntities+1);
				var firstRow = commonPage.rows.first();
				browser.executeScript("arguments[0].click();", firstRow.$('.fa-remove').getWebElement());
				commonPage.validationDelete();
				commonPage.searchInList(' ');
				expect(commonPage.getNbElement()).toBe(numberOfEntities);
			})
		})
	});

	

	it('should verify displaying radio button labels in read mode:#6894', function () {
		console.log('verify displaying radio button labels in read mode:#6894');
		commonPage.get();
		commonPage.entityPage('child form ricky');
		commonPage.switchToViewMode();
		commonPage.listMode();
		var firstRow = commonPage.rows.first();
		//Select first row
		browser.executeScript("arguments[0].click();", firstRow.$('a').getWebElement());
		
		//Check radio button labels visible in view mode
		expect($$('.form-group').get(7).$('label').getText()).toBe('Radio:');

		//check radio button labels visible after clicking edit button
		commonPage.edit();
		expect($$('.form-group').get(7).$('label').getText()).toBe('Radio:');
		
		//check radio button labels visible when GEM activated
		commonPage.saveForm();
		commonPage.switchToEditMode();
		expect($$('.form-group').get(7).$('label').getText()).toBe('Radio:');
	});


	it('should verify card view:#5447', function () {
		console.log('verify card view:#5447');

		var fields = element.all(by.repeater('field in form.form_fields'));		
		var formBuilderName = 'child form ricky';

		commonPage.get();
		commonPage.systemEntityPage("User interface","Entity designer");

		formBuilderPage.get();
		formBuilderPage.loadDetail(formBuilderName);

		fields.count().then(function(nb){
			console.log(nb);
			for(var i=0;i<nb;i++){
				browser.executeScript("arguments[0].click();", fields.get(i).$('a').getWebElement());
				var field = new FormField(i);
				field.setCardView(false);
			}
		});
		formBuilderPage.saveForm();		
		commonPage.entityPage(formBuilderName);
		commonPage.switchToViewMode();
		expect(commonPage.cardMode.isPresent()).toBeFalsy();
		commonPage.systemEntityPage("User interface","Entity designer");
		formBuilderPage.loadDetail(formBuilderName);
		fields.count().then(function(nb){
			for(var i=0;i<nb && i<4;i++){
				browser.executeScript("arguments[0].click();", fields.get(i).$('a').getWebElement());
				var field = new FormField(i);
				field.setCardView(true);
			};
		});
		formBuilderPage.saveForm();	
		commonPage.entityPage(formBuilderName);
		expect(commonPage.cardMode.isPresent()).toBeTruthy();
		browser.executeScript("arguments[0].click();", commonPage.cardMode.getWebElement());
		expect(commonPage.rows.first().$('img').isPresent()).toBeTruthy();
	});

	// //problem with "save and add' button display when maximum target is not reached
	// it('should verify "save & add" button when max target not be reached:#5743 #5983', function () {
	// 	console.log('verify "save & add" button when max target not be reached:#5743 #5983');
	// 	var maxTarget = 3; //set before test
	// 	var testData = 'Form1_'+Math.round(Math.random()*100);
	// 	var entityName = 'test form one for Ricky test';
		
	// 	commonPage.get();
	// 	commonPage.entityPage(entityName);
	// 	commonPage.switchToViewMode();
	// 	commonPage.newButton.click();
	// 	commonPage.fillInField($('#form_one_name'),testData);
	// 	commonPage.fillInField($('#geo_data_x'),'10.748832');
	// 	commonPage.fillInField($('#geo_data_y'),'106.66627');
	// 	commonPage.fillInField($('#geo_data_z'),'6');

	// 	commonPage.saveForm();
	// 	commonPage.edit();
	// 	commonPage.clickOnAddRelation('form two',false);
		
	//	//verify 'Save and add' button displayed when numbers of relation are under maximum value
	//	//maximum in this case is set 3, and an existing entity was created in spec '1create_necces...'
	// 	expect(commonPage.isElementPresent('Save and add')).toBeTruthy();
	// 	for (var i=0;i<2;i++){
	// 		commonPage.fillInField($('#form_two_name'),'Form2_'+Math.round(Math.random()*100));
	// 		commonPage.clickOnButton('Save and add');
	// 	}
			
	// 	commonPage.fillInField($('#form_two_name'),'Form2_'+Math.round(Math.random()*100));

	// 	//verify 'Save and add' button hidden when number is reached at max value
	// 	expect(commonPage.isElementPresent('Save and add')).toBeFalsy();
	// 	commonPage.saveForm();

	// 	commonPage.edit();
	// 	commonPage.getPanel('form two').then(function(panel){
	// 		expect(panel.$('.box-header').$('.fa-plus').isDisplayed()).toBeFalsy();
	// 		expect(panel.$('.box-footer').$('.fa-plus').isPresent()).toBeFalsy();
	// 		expect(panel.$('.box-header').$('.fa-upload').isPresent()).toBeFalsy();
	// 		expect(panel.$('.box-header').$('.fa-link').isDisplayed()).toBeFalsy();
	// 	})
	// });

	it('should verify autocomplete in widget link dialog:#5744', function () {
		console.log('verify autocomplete in widget link dialog:#5744');

		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.switchToViewMode();
		commonPage.listMode();
		browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
		commonPage.edit();

		//access widget link dialog
		commonPage.clickOnAddRelation('form one',true);
		commonPage.searchPopupWOSaveNClick('for');		
		element.all(by.repeater('option in $select.items')).each(function(option){
			option.getText().then(function(optionName){
				optionName = optionName.toLowerCase().trim();
				// check if all options (autocomplete) listed for suggestion related to key input
				expect(optionName).toContain('for');
			})				
		});

		var cancel = $('.modal-content').element(by.xpath('.//*[.="Cancel"]'));
		browser.actions().mouseMove(cancel).perform();
		cancel.click();		
	});

	
	it('should verify all fields displaying in "Available fields" section in creating new layout:#7355', function () {
		console.log('verify all fields displaying in "Available fields" section in creating new layout:#7355');

		var form = 'test_displaying_fields';
		var formType = 'test_available_fields';
		var layoutName1 = 'layout_first';
		var resoureName1 = 'layout_first';

		commonPage.get();
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();
		formBuilderPage.createFormName(form,formType);
		browser.executeScript("arguments[0].click();", formBuilderPage.listFilter.getWebElement());
		formBuilderPage.addFormField('Textfield','Textfield',0,true);
		formBuilderPage.addFormField ('Geo data','Geo data',0);
		formBuilderPage.addFormField ('Text Area','Text Area',0);
		formBuilderPage.addFileFormField ('File');
		formBuilderPage.addFormField ('Date','Date',0);
		formBuilderPage.addNumericField ('Numeric',true,true);
		formBuilderPage.addTerminologyField ('Terminology','Band');
		formBuilderPage.addFormField ('Creator','Creator',0);
		formBuilderPage.openNewLayoutOrEditLayout(layoutName1,resoureName1);
		for(var i=0;i<3;i++){
			formBuilderPage.addPanel();
		}
		formBuilderPage.addTextFieldToPanel();
		commonPage.saveForm();
		commonPage.clickOnButton('Cancel');
		var addNewLayoutButton = formBuilderPage.form.menu.$('.btn');
		browser.executeScript("arguments[0].click();", addNewLayoutButton.getWebElement());
		expect($$('.available-fields').count()).toBe(8);
		commonPage.clickOnButton('Designer');
		commonPage.clickOnButton('Cancel');
		formBuilderPage.clickOnDelete(form);
		formBuilderPage.validationDelete();
	});

	
})
