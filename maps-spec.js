describe('Maps Scenario', function () {

	var World = require("./framework/World");
	var LoginPage = require("./identity/LoginPage");
	var LogoutPage = require("./identity/LogoutPage");
	var CommonPage = require("./common/CommonPage");
	
	var world = new World();
	var commonPage = new CommonPage(world);
	var logoutPage = new LogoutPage(world);
	
	var filterName;
	var layerName;
	var layerName1;
	var zoneLayerName;
	var zoneLayerName1;


	beforeEach(function () {
		new LoginPage(world).quickLogin();
		// loginPage.quickLogin("Ricky", "aaa111");
	});

	afterEach(function () {
		logoutPage.logout();
	});

	//test when having process attachech already
	it('should verify "Start process" disappeared on map view :#5989',function(){
		console.log('verify "Start process" disappeared on map view :#5989');
		commonPage.get();
		//test on Site entity
		commonPage.entityPage('Site');
		commonPage.mapMode();
		expect(element(by.xpath(".//*[contains(text(),'Start process')]")).isPresent()).toBeFalsy();
	});


	it('should verify entity collection on Map:#5984 #5985',function(){
		console.log('verify entity collection on Map:#5984 #5985');
		var title = 'test_'+Math.round(Math.random()*100);
		var title1 = 'Collection_Ricky_'+Math.round(Math.random()*100);
		filterName = title;
		layerName = title1;
		var entity = 'general form for automation tests';

		commonPage.get();
		commonPage.entityPage(entity);
		commonPage.addingFilter(title,'Creator','is','Son Minh Ton');
		commonPage.listMode();
		browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
		commonPage.edit();
		commonPage.collectionMapLayer(title1,100000,entity,title,false);
		expect($('#legend-tab').element(by.xpath(".//*[contains(text(),'"+layerName+"')]")).isPresent()).toBeTruthy();
	});

	it('should delete entity collection test data :#5984 #5985',function(){
		console.log('delete entity collection test data :#5984 #5985');
		
		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.listMode();
		browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
		commonPage.deleteMapLayer(layerName);	
		commonPage.clickOnButton('Close');
		commonPage.deleteFilter(filterName);	
	});

	it('should verify connected entities on Map:#5986',function(){
		console.log('verify connected entities on Map:#5986');
		var title = 'test_'+Math.round(Math.random()*100);//delete
		var title = 'Connection_Ricky_'+Math.round(Math.random()*100);
		layerName1 = title;
		var relation = 'general form for automation tests contain many test form one for Ricky test'
		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.listMode();
		browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
		commonPage.connectionMapLayer(layerName1,relation,false,'',true);
		expect($('#legend-tab').element(by.xpath(".//*[contains(text(),'"+layerName1+"')]")).isPresent()).toBeTruthy();
	});

	it('should delete connected entities test data :#5986',function(){
		console.log('delete connected entities test data :#5986');
		
		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.listMode();
		browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
		commonPage.deleteMapLayer(layerName1);
	});


	it('should verify map on entity details:#5445',function(){
		console.log('verify map on entity details:#5445');

		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.listMode();
		//check the page is in list mode or map mode
		browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
		commonPage.detailMapView();		
		//check if details pane and map are displayed
		expect(commonPage.detailsInMapView.isPresent()).toBeTruthy();
	});


	

});
