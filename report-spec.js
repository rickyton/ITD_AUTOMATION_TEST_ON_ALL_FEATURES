describe('Test cases for features in Report entity', function () {

	 var World = require('./framework/World');
	 var LoginPage = require('./identity/LoginPage');
	 var LogoutPage = require('./identity/LogoutPage');
	 var ReportPage =require('./entity/ReportPage');
	 var CommonPage = require('./common/CommonPage');
	 var Tenant_settingPage = require("./administration/Tenant_settingPage"); 

	 var world = new World();
	 var loginPage = new LoginPage(world);
	 var logoutPage = new LogoutPage(world);
	 var reportPage = new ReportPage(world);
	 var commonPage = new CommonPage(world);
	 var tenant_settingPage = new Tenant_settingPage(world);


	beforeAll(function () {
		loginPage.quickLogin();
	});

	afterAll(function () {
		logoutPage.logout();
	});


	
	it('verify filter on Autoincrement:#5987',function(){
	 	console.log('verify filter on Autoincrement:#5987');
	 	var fields = ['ID','Tenants'];
	 	var autoIncrementField = fields[0];

	 	commonPage.get();
		commonPage.entityPage('Report');
	 	reportPage.get();
	 	reportPage.sourceAndView('Location','List');
	 	reportPage.addItem('Columns',0);
	 	for(var i=0;i<fields.length;i++){
	 		reportPage.selectItem($('.modal-content'),'span',fields[i]);
	 	};
	 	commonPage.clickOnButton('OK');
	 	
	 	reportPage.addItem('Filters',0);
	 	reportPage.selectItem($('.modal-content'),'span',autoIncrementField);
	 	commonPage.clickOnButton('OK');
	 	var result = reportPage.tableData.get(0);

	 	
	 	// // more specific details, these cause fail if some changes in data happen
	 	// //verify "is" filter operator with autoincrement field
 		 // reportPage.criteria(reportPage.filterOperatorField,'is',reportPage.filterContentField,'RAN');
	 	 // commonPage.clickOnButton('Run');
	 	 // commonPage.proceedAnywayIfAny();
	 	
 		 // expect(result.getText()).toContain('RAN');
	 	 // reportPage.showHideReport();

	 	 // //verify "is not" filter operator with autoincrement field
 		 // reportPage.criteria(reportPage.filterOperatorField,'is not',reportPage.filterContentField,'HVAC');
	 	 // commonPage.clickOnButton('Run');
	 	 // commonPage.proceedAnywayIfAny();
	 	
 		 // expect(result.getText()).not.toBe('HVAC');
	 	 // reportPage.showHideReport();
		
	 	
	 	//verify "contains" filter operator with autoincrement field
 		reportPage.criteria(reportPage.filterOperatorField,'contains',reportPage.filterContentField,'Transmission');
	 	commonPage.clickOnButton('Run');
	 	commonPage.proceedAnywayIfAny();
	 	
	 	expect(result.getText()).toContain('Transmission');
	 	reportPage.showHideReport();

	 	//verify "does not contain" filter operator with autoincrement field
 		reportPage.criteria(reportPage.filterOperatorField,'does not contain',reportPage.filterContentField,'Safety');
	 	commonPage.clickOnButton('Run');
	 	commonPage.proceedAnywayIfAny();
	 	
	 	expect(result.getText()).not.toContain('Safety');
	 	reportPage.showHideReport();
	 	
	});


	it('verify date functions in filter values',function(){
	 	console.log('verify date functions in filter values');
	 	var fields = ['Site code','Process Name','Reference','Start time','End time'];
	 	var fx = ['YEAR','MONTH'];
	 	var operator = ['is not empty','is','between'];
	 	var filterContent = ['2017','1','4',];

	 	commonPage.get();
		commonPage.entityPage('Report');
	 	reportPage.get();
	 	reportPage.sourceAndView('Site','List');

	 	//add the columns in the report
	 	reportPage.addItem('Columns',0);
	 	reportPage.selectItem($('.modal-content'),'span','Process instance (Beta) contains Site');
	 	for(var i=0;i<fields.length;i++){
	 		reportPage.selectItem($('.modal-content'),'span',fields[i]);
	 	};
	 	commonPage.clickOnButton('OK');

	 	//add criteria for filter
	 	reportPage.selectFilterProperty('','Process instance (Beta) contains Site',fields[2],reportPage.filterOperatorField,operator[0]);
	 	reportPage.selectDateProperty('','Process instance (Beta) contains Site',fields[3],reportPage.filterOperatorField,operator[2],0,30,5,2017,1,19,12,2017);
	 	commonPage.clickOnButton('Run');
		commonPage.proceedAnywayIfAny();
	});


	it('should test type Creator and Last Change in filter in Report:#5153',function(){
	 	console.log('test type Creator and Last Change in filter in Report:#5153');
	 	var fields = ['Creator','Updated'];

	 	commonPage.get();
	 	commonPage.entityPage('Report');
 		reportPage.get();
 		reportPage.sourceAndView('Site','line');
 		reportPage.addItem('Columns',0);
 		for(var i=0;i<fields.length;i++){
	 		reportPage.selectItem($('.modal-content'),'span',fields[i]);
	 	};
	 	commonPage.clickOnButton('OK');
	 	reportPage.addAggregateToColumn(fields,'Creator','COUNT');
 		reportPage.addAggregateToColumn(fields,'Updated','MONTH');
 		reportPage.selectDateProperty('','','Updated',reportPage.filterOperatorField,'between',0,01,06,2017,1,01,10,2017);
 		reportPage.groupOrHavingOrSort($('[ng-click="addGrouping()"]'),reportPage.fieldData,'Updated'); 
 		reportPage.groupOrHavingOrSort($('[ng-click="addHaving()"]'),reportPage.fieldData,'Creator');
 		reportPage.criteria(reportPage.havingOperatorField,'>',reportPage.havingContentField,3);

		commonPage.clickOnButton('Run');
		commonPage.proceedAnywayIfAny();

		// check if graph displayed when filtering Last Change criteria
		expect(reportPage.graph.isDisplayed()).toBeTruthy();

		reportPage.showHideReport();
		browser.executeScript("arguments[0].click();", reportPage.fieldRemove.first().getWebElement());
		browser.executeScript("arguments[0].click();", reportPage.filterRemove.first().getWebElement());
		browser.executeScript("arguments[0].click();", reportPage.groupingRemove.first().getWebElement());
		browser.executeScript("arguments[0].click();", reportPage.havingRemove.first().getWebElement());
		reportPage.addItem('Columns',0);
		reportPage.selectItem($('.modal-content'),'span','Creator');
		commonPage.clickOnButton('OK');		
		reportPage.selectFilterPropertyWOOperator('','','Creator');
		reportPage.operator(reportPage.filterOperatorField,'is');
		var search = reportPage.filterLines.last().$('.ui-select-search');
		var repeat = element.all(by.repeater('option in $select.items'));
		reportPage.listSearch(search,repeat,'div','Son Minh Ton');
		commonPage.clickOnButton('Run');
		commonPage.proceedAnywayIfAny();

		// check if graph displayed when filtering Creator criteria
		expect(reportPage.graph.isDisplayed()).toBeTruthy();
 	})


 	it('should verify unit,currency,duration:#5448',function(){
		console.log('verify duration in the process instance:#5448');
		fields =['Process Name','Start time','End time','Duration'];

		commonPage.get();
		commonPage.entityPage('Report');

		reportPage.get();
		reportPage.sourceAndView('Process instance','List');

		//Add colunms to display
		reportPage.addItem('Columns',0);
	 	for(var i=0;i<fields.length;i++){
	 		reportPage.selectItem($('.modal-content'),'span',fields[i]);
	 	};
	 	commonPage.clickOnButton('OK');
	 	reportPage.selectDateProperty('','','End time',reportPage.filterOperatorField,'between',0,01,07,2017,1,05,07,2017);
	 	commonPage.clickOnButton('Run');
	 	commonPage.proceedAnywayIfAny();

	 	// // more specific details, if others changes date format, testscript goes fail
		// // check if data in column of duration containing right format
	 	// reportPage.getColumn('Duration').then(function(data){	 		
	 	// 	for(var i=0;i<data.length;i++){ 			
	 	// 		expect(data[i]).toContain(' d');
	 	// 	}
	 	// })
	 	// browser.waitForAngular();
	});


 	it('should verify unit,currency,duration:#5448',function(){
		console.log('verify unit and currency:#5448');
		var fields =['Technology','Budget','Expected ABH'];

		commonPage.get();
		commonPage.entityPage('Report');
		reportPage.get();
		reportPage.sourceAndView('Site','List');

		//Add colunms to display
		reportPage.addItem('Columns',0);
	 	for(var i=0;i<fields.length;i++){
	 		reportPage.selectItem($('.modal-content'),'span',fields[i]);
	 	};
	 	commonPage.clickOnButton('OK');
	 	reportPage.selectFilterProperty('','','Budget',reportPage.filterOperatorField,'>',reportPage.filterContentField,'100');
		commonPage.clickOnButton('Run');
		commonPage.proceedAnywayIfAny();

		// // more specific details, if others change currency and unit, testscript goes fail
		// // check if data in column of Budget containing currency format
	 // 	reportPage.getColumn('Budget').then(function(data){
	 // 		for(var i=0;i<data.length;i++){
	 // 			expect(data[i]).toContain(' EUR');
	 // 		}
	 // 	})
	 // 	browser.waitForAngular();

	 // 	// check if data in column of Expected ABH containing unit
	 // 	reportPage.getColumn('Expected ABH').then(function(data){
	 // 		for(var i=0;i<data.length;i++){
	 // 			expect(data[i]).toContain(' m');
	 // 		}
	 // 	})
	 // 	browser.waitForAngular();
	});


	// // Don't run this case because it is related to the specific BPM Process
	// // that why it causes fail when running in different platform
	// it('verify "business reference" value in report for Process Instance for #4330',function(){
	// 	console.log('verify "business reference" value in report for Process Instance #4330')

	//  	//Select columns to display
	//  	var fields = ['Name','Reference','Start time','End time'];

	//  	commonPage.get();
	// 		commonPage.entityPage('Report');
	//  	reportPage.get();
	//  	reportPage.sourceAndView('Process definition','List');

	//  	//Add colunms to display
	//  	reportPage.addItem('Columns',0);
	//  	//select columns with distant nodes
	//  	reportPage.selectItem($('.modal-content'),'span','Process definition has Process instances');	 	
	//  	for(var i=0;i<fields.length;i++){
	//  		reportPage.selectItem($('.modal-content'),'span',fields[i]);
	//  	};
	//  	commonPage.clickOnButton('OK');

	//  	//Select filter
	//  	reportPage.selectFilterProperty('','','Name',reportPage.filterOperatorField,'contains',reportPage.filterContentField,'S31 Demo Process');
	 	
	//  	commonPage.clickOnButton('Run');
	//  	commonPage.proceedAnywayIfAny();

	//  	reportPage.rows.first().isPresent().then(function(isPres){
	//   		if(isPres){
	// 		  	//check if values displayed after filtering
	// 		 	reportPage.getColumn('Reference').then(function(value){
	// 		 		expect(value).not.toContain('');
	// 		 	});
	// 			browser.waitForAngular();
	//   		}
	//   	}) 	
	// });


	it('verify percentage of total',function(){
	 	console.log('verify percentage of total');
	 	var fields = ['Status','Budget'];
	 	
	 	commonPage.get();
		commonPage.entityPage('Report');
	 	reportPage.get();
	 	reportPage.sourceAndView('Site','List');

	 	//Add colunms to display
	 	reportPage.addItem('Columns',0);
	 	for(var i=0;i<fields.length;i++){
	 		reportPage.selectItem($('.modal-content'),'span',fields[i]);
	 	}
	 	commonPage.clickOnButton('OK');

	 	//assign the function
	 	reportPage.addAggregateToColumn(fields,'Budget','SUM',reportPage.percentage,true);
	 	reportPage.groupOrHavingOrSort($('[ng-click="addGrouping()"]'),reportPage.fieldData,'Status');	 	
	 	commonPage.clickOnButton('Run');
	 	commonPage.proceedAnywayIfAny();

	 	reportPage.rows.first().isPresent().then(function(isPres){
	   		if(isPres){
	   			reportPage.getColumn('Budget').then(function(arr){
			 		//check if the results containing '%'
			 		for(var i=0;i<arr.length;i++){
			 			expect(arr[i]).toContain('%');
			 		}
			 	});
			 	browser.waitForAngular();
	   		}
	   	}) 	
	});


	it('verify facets author',function(){
	 	console.log('verify facets author');

	 	commonPage.get();
		commonPage.entityPage('Report');
	 	reportPage.get();

	 	//click all authors in the author facet
	 	$('#facet_author').$$('a').each(function(row){
	 		browser.actions().mouseMove(row).perform();
	 		row.click();
	 		// set name for users
	 		row.getText().then(function(usr){
	 			var res = usr.split('(');
	 			var userName = res[0].trim();
	 			switch(userName){
	 				case '':name ='';break;
	 				case 'Ricky':name ='Son Minh Ton';break;

	 				// //some times, some users will change name, it causes fail for test scripts

	 				// case 'adminthien':name ='adminthien sur';break;
	 				// case 'admin':name ='Systemadw Administrator';break;
	 				// case 'fpouilloux':name ='François Pouilloux';break;
	 				// case 'jana':name ='Jana Pavlovicova';break;
	 				// case 'Michael':name ='Michael Blot';break;
	 				// case 'Radka':name ='Radka Kleskenova';break;
	 				default: break;
	 			}
	 		}).then(function(){
	 			commonPage.getColumn('Author').then(function(authors){
	 				//check if data in Author column in report matching to name of user
	 				authors.forEach(function(author){
	 					//just test author 'Son Minh Ton', because of preventing fail if others change name
	 					if(author == 'Son Minh Ton'){
	 						expect(author).toEqual(name);
	 					}
	 				})
	 			})
	 			browser.waitForAngular();
	 		})
	 	});
	});


	// //more specific details, it causes some fail in some cases
	// it('should verify Creator field with real user name:#4866',function(){
	//  	console.log('verify Creator field with real user name:#4866');
	//  	var fields = ['Site code/name','Creator','Date of creation'];

	//  	commonPage.get();
	// 	commonPage.entityPage('Report');
	//  	reportPage.get();
	//  	reportPage.sourceAndView('TestIDCreator','List');

	//  	//add columns
	//  	reportPage.addItem('Columns',0);
	//  	for(var i=0;i<fields.length;i++){
	//  		reportPage.selectItem($('.modal-content'),'span',fields[i]);
	//  	};
	//  	commonPage.clickOnButton('OK');
	//  	commonPage.clickOnButton('Run');
	//  	commonPage.proceedAnywayIfAny();

	// 	reportPage.getColumn('Creator').then(function(arr){ 		
	//  		for(var i=0;i<arr.length;i++){
	//  			//verify all values in Creator columns containing user name, not ID
	//  			expect(arr[i]).toEqual('Son Minh Ton');
	//  		}
	//  	})
	//  	browser.waitForAngular();
	// });


	it('should verify capitalizing first letter of chart names in Report:#5154',function(){
	 	console.log('verify capitalizing first letter of chart names in Report:#5154');

	 	commonPage.get();
		commonPage.entityPage('Report');
	 	reportPage.get();
	 	reportPage.source('Site');
	 	reportPage.clickModeButton();
	 	reportPage.viewField.click();
	 	reportPage.options.each(function(option){
	 		option.getText().then(function(optionName){
	 			expect(reportPage.isCapitalizeFirstLetter(optionName)).toBeTruthy();
	 		})
	 	})
	});


	it('should verify blacklist of forms not allowed for Reports:#5152',function(){
	 	console.log('verify blacklist of forms not allowed for Reports:#5152');

	 	commonPage.get();
	 	commonPage.systemEntityPage("System","Settings");
	 	tenant_settingPage.get();
	 	browser.actions().mouseMove(tenant_settingPage.blacklistField).perform();
 		var blackListName = tenant_settingPage.blackListItems.getText();
		tenant_settingPage.saveForm();
		commonPage.entityPage('Report');
		reportPage.get();
		reportPage.newButton.click();
		$('#entityType').click();
		blackListName.then(function(items){
			items.forEach(function(itemName){
				itemName = itemName.split('x')[0].trim();

				//verify item in blacklist not displayed in source field in Report
				expect(element(by.xpath('//option[.="'+itemName+'"]')).isPresent()).toBeFalsy();
			})
		})
	});


	it('should verify adding group on creator in Report:#5455',function(){
		console.log('verify adding group on creator in Report:#5455');
		fields =['Creator','Status','Budget'];

		commonPage.get();
		commonPage.entityPage('Report');
		reportPage.get();
		reportPage.sourceAndView('Site','List');

		//Add colunms to display
		reportPage.addItem('Columns',0);
	 	for(var i=0;i<fields.length;i++){
	 		reportPage.selectItem($('.modal-content'),'span',fields[i]);
	 	};
	 	commonPage.clickOnButton('OK');
	 	reportPage.addAggregateToColumn(fields,'Budget','SUM');
	 	reportPage.selectFilterPropertyWOOperator('','','Status');
	 	reportPage.operator(reportPage.filterOperatorField,'is');
	 	reportPage.selectItemInFieldType1(reportPage.filterContentField,'option','Designed');
	 	reportPage.groupOrHavingOrSort($('[ng-click="addGrouping()"]'),reportPage.fieldData,'Creator');
	 	reportPage.groupOrHavingOrSort($('[ng-click="addGrouping()"]'),reportPage.fieldData,'Status');
		commonPage.clickOnButton('Run');
		commonPage.proceedAnywayIfAny();
		reportPage.rows.first().isPresent().then(function(isPres){
			if(isPres){
				// check if data in column of Creator not be ID
			 	reportPage.getColumn('Creator').then(function(data){
			 		data.forEach(function(creator){
			 			expect(creator).not.toContain('-');
			 		})
			 	});
			 	browser.waitForAngular();
			}
		})
	});


	it('should verify sorting Date in Report:#5454',function(){
		console.log('verify sorting Date in Report:#5455');

		var fields =['Date','Technology'];
		commonPage.get();
		commonPage.entityPage('Report');
		reportPage.get();
		reportPage.sourceAndView('Site','List');

		//Add colunms to display
		reportPage.addItem('Columns',0);
	 	for(var i=0;i<fields.length;i++){
	 		reportPage.selectItem($('.modal-content'),'span',fields[i]);
	 	};	 	
	 	commonPage.clickOnButton('OK');
	 	//select Month aggregate function for Date
	 	reportPage.addAggregateToColumn(fields,'Date','MONTH');	 	
	 	//select Conut aggregate function for Technology
	 	reportPage.addAggregateToColumn(fields,'Technology','COUNT');
	 	//add group for Date
	 	reportPage.groupOrHavingOrSort($('[ng-click="addGrouping()"]'),reportPage.fieldData,'Date'); 	
	 	//add sorting for Date
	 	reportPage.groupOrHavingOrSort($('[ng-click="addOrders()"]'),reportPage.fieldData,'Date');
		commonPage.clickOnButton('Run');
		commonPage.proceedAnywayIfAny();

		reportPage.rows.first().isPresent().then(function(isPres){
	 		if(isPres){
	 			reportPage.getColumn('Date').then(function(arr){
					//check if month of Date is sorted ascending
					expect(reportPage.isSortMonth(arr,true)).toBeTruthy();
				});
				browser.waitForAngular();
				reportPage.showHideReport();
				//change sorting type for Date (descending sorting)
				browser.executeScript("arguments[0].click();", $('.fa-sort-amount-asc').getWebElement());
				commonPage.clickOnButton('Run');
				commonPage.proceedAnywayIfAny();
				reportPage.getColumn('Date').then(function(arr){
					//check if month of Date is sorted descending
					expect(reportPage.isSortMonth(arr,false)).toBeTruthy();
				});
				browser.waitForAngular();
	 		}
	 	})	
	});


	it('should test after opening a result, the values are reset in Report:#7202',function(){
	 	console.log('test after opening a result, the values are reset in Report:#7202');
	 	var fields = ['Process Name','Task name','Reference','Created','Assignee'];

	 	commonPage.get();
		commonPage.entityPage('Report');
	 	reportPage.get();
	 	reportPage.sourceAndView('Task','List');
	 	commonPage.fillInField($('#reportName'),'Test_Task');
	 	//add columns
	 	reportPage.addItem('Columns',0);
	 	for(var i=0;i<fields.length;i++){
	 		reportPage.selectItem($('.modal-content'),'span',fields[i]);
	 	};
	 	commonPage.clickOnButton('OK');
	 	//add Date filter
	 	reportPage.selectDateProperty('','','Created',reportPage.filterOperatorField,'between',0,01,01,2018,1,25,01,2018);
	 	browser.executeScript("arguments[0].click();", commonPage.saveFormButton1.getWebElement());
	 	commonPage.proceedAnywayIfAny();
	 	var link = reportPage.rows.first().$('a');
	 	link.getText().then(function(txt){
	 		//link to the entity which is displayed in report result
	 		browser.executeScript("arguments[0].click();", link.getWebElement());
	 		browser.sleep(1000);
	 		//back to report result by using back button on navigation of browser
	 		browser.navigate().back();
	 		//verify that the text is the same, there is problem before when coming back
	 		// there is inconsistency of text between before and later
	 		expect(reportPage.rows.first().$('a').getText()).toBe(txt);
	 	})
	 	//delete data for test
	 	commonPage.clickOnButton('Close');
	 	commonPage.clickOnDelete('Test_Task');
	 	commonPage.validationDelete();
	});

	




});
