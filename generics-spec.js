describe('generic Scenario', function () {

	var World = require("./framework/World");
	var LoginPage = require("./identity/LoginPage");
	var LogoutPage = require("./identity/LogoutPage");
	var GenericPage = require("./entity/GenericPage");
	var SitePage = require("./entity/SitePage");
	
	
	var world = new World();

	var genericPage;
	var elementJustCreated;
	
	var sitePage;
	
	
	//tittle = name of the entity
	//name = field that it is use to retrieve the entity
	//editField = field we will edit
	//link = if it possible to link the object to another one
	//linkObject = entity with will be the link (just use for the name of the function, the first entity will always be use ))
	
	
	var testParams = [	//{title: 'access_sheets',  },
	                  	//{title: 'addresses', name: 'address_1' , editField:'residence_name' },
	                  	//{title: 'assets', name: 'tag_number' , editField:'serial_number' },
	                  	//{title: 'calendar_period', name: 'timezone' , editField:'calendar_period_type' },
	                  	//{title: 'car', name: 'plate',editField:'plate',link:'yes' , linkObject : 'contact'},
	                  	//{title: 'catalogue_items', name: 'part_number' , editField:'part_number' },
	                  	//{title: 'cells', name: 'lac' , editField:'cell_name' },
	                  	//{title: 'civil_work', },
	                  	//{title: 'contacts', name: 'first_name' , editField:'last_name',link:'yes' , linkObject : 'address' },
	                  	//{title: 'contact_media', name: 'contact_info' , editField:'contact_info' },
	                  	//{title: 'feature', name: 'name' , editField:'system_name' },
	                  	//{title: 'geographic_coordinates', name: 'x_longitude' , editField:'y_latitude' },
	                  	//{title: 'feeders', name: 'name' , editField:'sector' },
	                  	//{title: 'hour_period',	 name: 'start_hour' , editField:'end_hour' },
	                  	//{title: 'layout_rules', name: 'field_1' , editField:'field_2' },
	                  	//{title: 'leases', name: 'lease_ref' , editField:'termination_notice_for_the_tenant' },
	                  //{title: 'orders', name: 'pr_number' , editField:'po_number',link:'yes' , linkObject : 'beneficiary' },
	                  //{title: 'power_contracts', name: 'contract_number' , editField:'cil_number',link:'yes' , linkObject : 'related parties' },
	                  //{title: 'purchase_request', name: 'file_number' , editField:'offer_reference',link:'yes' , linkObject : 'related parties' },
	                  //{title: 'radio',  },
	                  //{title: 'radio_antennas', },
	                  //{title: 'radio_antenna_bands', name: 'sector' , editField:'sector' },
	                  //{title: 'related_parties', name: 'name' , editField:'identification_number',link:'yes' , linkObject : 'address' },
	                  //{title: 'resources', name: 'name' , editField:'place',link:'yes' , linkObject : 'catalogue item' },
	                  //{title: 'role', name: 'role_name' , editField:'system_name' ,link:'yes' , linkObject : 'Privileges'},
//task a assigner	                  {title: 'task', },	
	                  //{title: 'team', name: 'team_name' , editField:'system_name',link:'yes' , linkObject : 'Members' },
	                  //{title: 'tower', },
	                  //{title: 'transactions', name: 'file_number' , editField:'invoice_number' },
	                  //{title: 'transmission', },
	                  	//{title: 'transmission_antennas', name: 'name' , editField:'support_number',link:'yes' , linkObject : 'Catalogue Item'  },
	                  	//{title: 'transmission_links', name: 'link_id' , editField:'configuration',link:'yes' , linkObject : 'Connected sites'  },
	       ];
	

	

	beforeEach(function () {
		new LoginPage(world).quickLogin("admin", "aaa111");
	});

	afterEach(function () {
		new LogoutPage(world).logout();
	});
	
	/*
	for (var i = 0; i < testParams.length; i++) {
		  (function (testSpec) {
			  var canBeDeleted = testSpec.name!=null;
			  var canBeEdited = testSpec.editField!=null;
			  var canBeLinked = testSpec.link!=null;
			  
			  
		    it('should create a new '+ testSpec.title , function () {
		    	genericPage = new GenericPage(world);
				genericPage.get(testSpec.title);
				genericPage.getNbElement().then(function(nbElementBefore){
					genericPage.newGeneric();
					if(canBeDeleted){
						genericPage.getValueOf(testSpec.name).then(function(value){
							elementJustCreated=value;
						});
					}
					genericPage.saveForm.click();
					
					genericPage.getNbElement().then(function(nbElementAfter){
						expect(nbElementAfter).toBe(nbElementBefore+1);
					});
				})
		    });
			
		    if(canBeEdited){
			    it('should edit a/an ' + testSpec.title, function (){
		    		genericPage = new GenericPage(world);
		    		genericPage.get(testSpec.title);
		    		//genericPage.loadDetail(elementJustCreated,"tmp");
		    		var newValue = 'selenium' + Math.random().toString(36).substring(7);
		    		genericPage.editAGeneric(elementJustCreated, testSpec.editField, newValue);
		    		genericPage.editButton.click();
		    		if(testSpec.name==testSpec.editField)
		    			elementJustCreated=newValue;
		    		genericPage.getValueOf(testSpec.editField).then(function(value){
		    			expect(value).toBe(newValue);
		    		});
		    	});
		    }
		    
		    
		    if(canBeLinked){
		    	it('should link a/an  '+ testSpec.linkObject+ ' to a '+ testSpec.title, function (){
		    		
		    		genericPage = new GenericPage(world);
		    		genericPage.get(testSpec.title);
		    		genericPage.loadDetail(elementJustCreated);
		    		genericPage.editButton.click();
		    		genericPage.linkRelation();
		    		
		    	});
		    	
		    	
		    	it('should unlink a/an  '+ testSpec.linkObject+ ' to a '+ testSpec.title, function (){
		    		
		    		genericPage = new GenericPage(world);
		    		genericPage.get(testSpec.title);
		    		genericPage.loadDetail(elementJustCreated);
		    		genericPage.editButton.click();
		    		genericPage.unlinkRelation();
		    		
		    	});
		    	
		    }
		    
		    if(canBeDeleted){
		    	it('should delete a/an ' + testSpec.title, function (){
		    		
		    		genericPage = new GenericPage(world);
		    		genericPage.get(testSpec.title);
		    		genericPage.getNbElement().then(function(nbElementBefore){
		    			
		    			genericPage.clickOnDelete(elementJustCreated);
		    			genericPage.validationDelete();
		    			genericPage.getNbElement().then(function(nbElementAfter){
		    				expect(nbElementAfter).toBe(nbElementBefore-1);
		    			});
		    			
		    		});
		    	});
		    }
		  })(testParams[i]);
	};
	*/

});