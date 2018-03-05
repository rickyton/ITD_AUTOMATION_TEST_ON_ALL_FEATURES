describe('Task and filter Scenario', function () {

	 var World = require("./framework/World");
	 var LoginPage = require("./identity/LoginPage");
	 var LogoutPage = require("./identity/LogoutPage");
	 var CommonPage = require("./common/CommonPage");
	 var TaskPage = require("./entity/TaskPage");
	 var DashBoardPage = require("./dashboard/DashBoardPage");
	 
	 
	 var world = new World();
	 var loginPage = new LoginPage(world);
	 var logoutPage = new LogoutPage(world);
	 var commonPage = new CommonPage(world);
	 var taskPage = new TaskPage(world);
	 var dashBoardPage = new DashBoardPage(world);
	
	

	beforeAll(function () {
		loginPage.quickLogin();
	});

	afterAll(function () {
		logoutPage.logout();
	});


	
   	it('should sort ascending columns: #4134',function(){
	 	console.log("sort ascending columns: #4134");

	 	commonPage.get();
	 	commonPage.entityPage('Task');
	 	taskPage.get();
	 	taskPage.goTolistOfMyTask();
	 	commonPage.rows.first().isPresent().then(function(isPres){
	 		if(isPres){
				commonPage.getColumn('Task name').then(function(arr){
					commonPage.sorting(true);
					commonPage.selectItemInField(commonPage.orderBy,'option','Task name');
					expect(commonPage.getColumn('Task name')).toEqual(commonPage.sortAscend(arr));
				})
				browser.waitForAngular();
		 		
	 		}	
	 	})	
	});


	it('should sort descending columns: #4134',function(){
	 	console.log("sort descending columns: #4134");

	 	commonPage.get();
	 	commonPage.entityPage('Task');
	 	taskPage.get();
	 	taskPage.goTolistOfMyTask();
	 	commonPage.rows.first().isPresent().then(function(isPres){
	  		if(isPres){
				commonPage.getColumn('Task name').then(function(arr){
					commonPage.sorting(false);
					commonPage.selectItemInField(commonPage.orderBy,'option','Task name');
					expect(commonPage.getColumn('Task name')).toEqual(commonPage.sortDescend(arr));
				})
				browser.waitForAngular();
			 	
	  		}
	  	})	 	
	});


	// there is problem here to create test script for this case, the field to add
	// filter criteria takes to long time to manipulate for selecting an option
	// it('should verify filter on list:#4870',function(){
	// 	console.log('verify filter on list:#4870');
	// 	var filterName = 'Creator';
	// 	var operator = 'is';
	// 	var creator = 'Son Minh Ton';
	// 	commonPage.get();
	// 	commonPage.entityPage('general form for automation tests');
	// 	commonPage.listMode();
	// 	commonPage.addingFilter(filterName,filterName,operator,creator);

	// 	expect($('#filter_list').element(by.xpath('.//*[.="'+creator+'"]')).isPresent()).toBeTruthy();

	// 	browser.executeScript("arguments[0].click();", $('#filter_list').element(by.xpath('.//*[.="'+creator+'"]')).getWebElement());

	// 	commonPage.getColumn(filterName).then(function(arr){
	// 		arr.forEach(function(data){
	// 			expect(data).toContain(creator);
	// 		})

	// 	});
	// 	browser.waitForAngular();
	// 	commonPage.deleteFilter(filterName);		
	// })


	// should not run these test scripts below often, it causes fail in some cases because of BPMN settings


	// // should manual test, testcripts often suffer fail when having insufficiency of team task data for test
	// // it relates to process and BPM settings

	// it('should verify mass claim of tasks',function(){
	// 	console.log('verify mass claim of tasks');

	// 	commonPage.get();
	// 	commonPage.entityPage('Task');
	// 	taskPage.get();
	// 	taskPage.goTolistOfMyTask();	
	// 	commonPage.getNbElement().then(function(originalNbElementInMyTasks){
	// 		taskPage.goToTeamTasks();

	// 		// check if first and second row is available to select for test			
	// 		commonPage.rows.get(0).isPresent().then(function(isPres){
	// 			if(isPres){
	// 				commonPage.rows.get(1).isPresent().then(function(isPres1){
	// 					if(isPres1){
	// 						browser.executeScript("arguments[0].click();", commonPage.rows.get(0).$('img').getWebElement());
	// 						browser.executeScript("arguments[0].click();", commonPage.rows.get(1).$('img').getWebElement());
	// 						commonPage.actionToExecute('Claim');
	// 						taskPage.goTolistOfMyTask();
	// 						commonPage.getNbElement().then(function(currentNbElementInMyTasks){
	// 							expect(currentNbElementInMyTasks).toBe(originalNbElementInMyTasks+2)
	// 						})			
	// 					}
	// 				})
	// 			}
	// 		})
	// 	});
	// })


	// // should manual test, testcripts often suffer fail when having insufficiency of my task data for test
	// // it relates to process and BPM settings

	// it('should verify mass unclaim of tasks',function(){
	// 	console.log('verify mass unclaim of tasks');

	// 	commonPage.get();
	// 	commonPage.entityPage('Task');
	// 	taskPage.get();
	// 	taskPage.goToTeamTasks();
	// 	commonPage.getNbElement().then(function(originalNbElementInTeamTasks){
	// 		taskPage.goTolistOfMyTask();			
	 		
	// 		// check if first and second row is available to select for test			
	// 		commonPage.rows.get(0).isPresent().then(function(isPres){
	// 			if(isPres){
	// 				commonPage.rows.get(1).isPresent().then(function(isPres1){
	// 					if(isPres1){
	// 						browser.executeScript("arguments[0].click();", commonPage.rows.get(0).$('img').getWebElement());
	// 						browser.executeScript("arguments[0].click();", commonPage.rows.get(1).$('img').getWebElement());
	// 						commonPage.actionToExecute('Unclaim');
	// 						taskPage.goToTeamTasks();
	// 						commonPage.getNbElement().then(function(currentNbElementInTeamTasks){
	// 							expect(currentNbElementInTeamTasks).toBe(originalNbElementInTeamTasks+2)
	// 						})		
	// 					}
	// 				})
	// 			}
	// 		})		
	// 	});
	// })

	
	// // should manual test, testcripts often suffer fail when having insufficiency of tasks to complete for test
	// // it relates to process and BPM settings

	// it('should verify mass complete of tasks',function(){
	// 	console.log('verify mass complete of tasks');

	// 	logoutPage.logout();
	// 	loginPage.quickLoginWithAnotherAccount();
	// 	//loginPage.quickLoginWithAnotherAccount(anotherUserLogin, passwordLogin);
	// 	commonPage.get();
	// 	commonPage.entityPage('Task');
	// 	taskPage.get();
	// 	taskPage.goTolistOfMyTask();
	// 	commonPage.getNbElement().then(function(originalNbElementInMyTasks){

	// 		// check if first and second row is available to select for test			
	// 		commonPage.rows.get(0).isPresent().then(function(isPres){
	// 			if(isPres){
	// 				commonPage.rows.get(1).isPresent().then(function(isPres1){
	// 					if(isPres1){
	// 						browser.executeScript("arguments[0].click();", commonPage.rows.get(0).$('img').getWebElement());
	// 						browser.executeScript("arguments[0].click();", commonPage.rows.get(1).$('img').getWebElement());
	// 						commonPage.actionToExecute('Complete');
	// 						commonPage.getNbElement().then(function(currentNbElementInMyTasks){
	// 							expect(currentNbElementInMyTasks).toBe(originalNbElementInMyTasks-2)
	// 						})		
	// 					}
	// 				})
	// 			}
	// 		})		
	// 	});
	// })


	// // should manual test, testcripts often suffer fail when having insufficiency of tasks to delegate for test
	// // or switching new platform/tenant without having specific processes and BPM settings

	// it('should verify mass delegate of tasks',function(){
	// 	console.log('verify mass delegate of tasks');

	// 	commonPage.get();
	// 	commonPage.entityPage('Task');
	// 	taskPage.get();
	// 	taskPage.goTolistOfMyTask();
	// 	commonPage.getNbElement().then(function(originalNbElementInMyTasks){
			
	// 		// check if first and second row is available to select for test			
	// 		commonPage.rows.get(0).isPresent().then(function(isPres){
	// 			if(isPres){
	// 				commonPage.rows.get(1).isPresent().then(function(isPres1){
	// 					if(isPres1){
	// 						browser.executeScript("arguments[0].click();", commonPage.rows.get(0).$('img').getWebElement());
	// 						browser.executeScript("arguments[0].click();", commonPage.rows.get(1).$('img').getWebElement());
	// 						commonPage.actionToExecute('Delegate');
	// 						commonPage.searchPopupWOSave('MinhSon');
	// 						commonPage.getNbElement().then(function(currentNbElementInMyTasks){
	// 							expect(currentNbElementInMyTasks).toBe(originalNbElementInMyTasks-2)
	// 						})	
	// 					}
	// 				})
	// 			}
	// 		})			
	// 	});
	// })


	// // should manual test, because sometimes entities unattach the processes or 
	// // have insufficiency of data to test that cause fail for test script
	// it('should verify selecting many entities to start a process:#4874',function(){
	// 	console.log('verify selecting many entities to start a process:#4874');
		
	// 	//get original number of Process Instance
	// 	commonPage.get();
	// 	commonPage.entityPageWithoutRefresh('Process instance');
	// 	var processInstanctNumber = commonPage.getNbElement();
	// 	commonPage.entityPage('Test entity');

	// 	//check if first and second row is available to select for test
	// 	commonPage.rows.get(0).isPresent().then(function(isPres){
	// 		if(isPres){
	// 			commonPage.rows.get(1).isPresent().then(function(isPres1){
	// 				if(isPres1){
	// 					browser.executeScript("arguments[0].click();", commonPage.rows.get(0).$('img').getWebElement());
	// 					browser.executeScript("arguments[0].click();", commonPage.rows.get(1).$('img').getWebElement());
	// 				}
	// 			})
	// 		}
	// 	})

	// 	//check if "start a process" button is present or not, if present click to start the process
	// 	$('.btn-success').isPresent().then(function(isPres){
	// 		if(isPres){
	// 			browser.executeScript("arguments[0].click();", $('.btn-success').getWebElement());
	// 			$$('[ng-click="startProcess(process.key)"]').first().isPresent().then(function(isPres1){
	// 				if(isPres1){
	// 					$$('[ng-click="startProcess(process.key)"]').first().click()
	// 				}
	// 			})
	// 			// come back to process instance to get current number of entities
	// 			commonPage.entityPageWithoutRefresh('Process instance');
	// 			processInstanctNumber.then(function(nbEle1){
	// 				commonPage.getNbElement().then(function(nbEle2){
	// 					expect(nbEle2).toBe(nbEle1+2);
	// 				});
	// 			});
	// 		}
	// 	})
	// });

	// it('should verify unassinged tasks filter and dashboard counter:#6472', function () {
	// 	console.log('verify unassinged tasks filter and dashboard counter:#6472');
	// 	commonPage.get();
	// 	taskPage.get();
	// 	dashBoardPage.get();
	// 	dashBoardPage.dashBoardPage();
	// 	var nbTaskUnassigned = dashBoardPage.getNbSmallIconNumber(2);
	// 	dashBoardPage.clickOnUnassignedSmallBox();
	// 	nbTaskUnassigned.then(function(nb){
	// 		expect(commonPage.getNbElement()).toBe(parseInt(nb,10));

	// 		taskPage.goToUnassignedTasks();
	// 		expect(commonPage.getNbElement()).toBe(parseInt(nb,10));
	// 	})	
	// });



})