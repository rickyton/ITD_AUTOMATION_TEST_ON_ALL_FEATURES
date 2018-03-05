describe('create all neccessary for tests', function () {

	var World = require("./framework/World");
	var LoginPage = require("./identity/LoginPage");
	var LogoutPage = require("./identity/LogoutPage");
	var CommonPage = require("./common/CommonPage");
	var FormBuilderPage = require("./forms/FormBuilderPage");
	var FormField = require("./forms/component/FormField");

	var world = new World();
	var commonPage = new CommonPage(world);
	var formBuilderPage = new FormBuilderPage(world);

	var form;
	var form1;
	var form2;
	var labelTitle1;

	// // with these new forms and entities created below we can test all platforms
	// // without depending on any data from specific ones

	beforeEach(function () {
		// new LoginPage(world).quickLogin("Ricky", "aaa111");
		new LoginPage(world).quickLogin();
	});

	afterEach(function () {
		new LogoutPage(world).logout();
	});

	
	it('delete general form if existing',function(){
		console.log("delete general form");
		form = 'general form for automation tests';
		//check existing form, delete it if available
		commonPage.get();
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();
		formBuilderPage.checkAndDeleteForm(form);
	});

	it('delete form one if existing',function(){
		console.log("delete form one if existing");

		form1 = 'test form one for Ricky test';
		//check existing form, delete it if available
		commonPage.get();
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();
		formBuilderPage.checkAndDeleteForm(form1);
	});

	it('delete form two if existing',function(){
		console.log("delete form two if existing");

		form2 = 'test form two for Ricky test';
		//check existing form, delete it if available
		commonPage.get();
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();
		formBuilderPage.checkAndDeleteForm(form2);
	});

	it('delete child form if existing',function(){
		console.log("delete child form if existing");

		//check existing form, delete it if available
		commonPage.get();
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();
		formBuilderPage.checkAndDeleteForm('child form ricky');
	});


	it('create form one to connect with general form',function(){
		console.log("create form one to connect with general form");
		
		var formType1 = 'test_form_one_ricky';
		labelTitle1 = 'form one name';

		commonPage.get();
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();
		formBuilderPage.createFormName(form1,formType1);
		browser.executeScript("arguments[0].click();", formBuilderPage.listFilter.getWebElement());
		formBuilderPage.addFormField('Textfield',labelTitle1,0,true);
		formBuilderPage.addFormField ('Geo data','Geo_data',0);
	});

	it('create form two to connect with general form and form one',function(){
		console.log("create form two to connect with general form and form one");
		
		var formType2 = 'test_form_two_ricky';
		var labelTitle2 = 'form two name';
		//relation group
		// var source1 = form1;//delete
		source1 = 'test form one for Ricky test';
		var relationType1= 'Link';
		// var target1= form2;//delete
		var target1= 'test form two for Ricky test';
		var relationLabel1= 'contains';
		var resourceName1= 'form_one_contains_form_two';

		commonPage.get();
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();
		// formBuilderPage.createFormName(form2,formType2);
		formBuilderPage.createFormName('test form two for Ricky test',formType2);//delete
		browser.executeScript("arguments[0].click();", formBuilderPage.listFilter.getWebElement());
		formBuilderPage.addFormField('Textfield',labelTitle2,0,true);
		formBuilderPage.createRelation(source1,relationType1,target1,resourceName1,relationLabel1,'0','3');
		formBuilderPage.saveForm();
	});

	it('create general form to test all test cases',function(){
		console.log("create general form to test all test cases");
		form = 'general form for automation tests';//delete
		var formType = 'general_form_ricky';
		var labelTitle = 'general form name';
		var addedPanelNumber = 4;

		//relation group 1
		// var source1= form;
		var source1= 'general form for automation tests';//delete
		var relationType1= 'Link';
		// var target1= form1;
		var target1= 'test form one for Ricky test';//delete
		var relationLabel1= 'contain many';
		var resourceName1= 'general_contains_many_form_one';
		
		//relation group 2
		// var source2= form;
		var source2= 'general form for automation tests';//delete
		var relationType2 = relationType1;
		// var target2= form2;
		var target2= 'test form two for Ricky test';//delete
		var relationLabel2= 'contains';
		var resourceName2= 'general_contains_form_two';

		//relation group 3
		// var source3= form;
		var source3= 'general form for automation tests';//delete
		var relationType3 = relationType1;
		// var target3= form1; 
		var target3= 'test form one for Ricky test';//delete
		var relationLabel3= 'contains only one';
		var resourceName3= 'general_contains_only_one_form_one';

		//reference
		var linkLabelTitle = 'general link to form one';
		var relation = source3 + ' '+ relationLabel3 + ' '+ target3;
		//var reference = labelTitle1;
		var reference = 'form one name';//delete

		//constraint
		var constraint = source1 + ' '+ relationLabel1 + ' '+ target1;

		//layout
		var layoutName = 'test layout';
		var resoureName = 'test_layout';
		var gridListWidget = 'Related entities as grid/list';
		
		//panel 1
		var panelName1 = 'form one'
		var relation1 = constraint;

		//panel 2
		var panelName2 = 'form two'
		var relation2 = source2 + ' '+ relationLabel2 + ' '+ target2;

		commonPage.get();
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();

		// create form to be sure that the form with all neccessary field types,
		// fields we need to test
		formBuilderPage.createFormName(form,formType);
		browser.executeScript("arguments[0].click();", formBuilderPage.listFilter.getWebElement());
		formBuilderPage.addFormField('Textfield',labelTitle,0,true);

		// create relations needed to other forms for tests
		formBuilderPage.createRelation(source1,relationType1,target1,resourceName1,relationLabel1);
		formBuilderPage.createRelation(source2,relationType2,target2,resourceName2,relationLabel2);
		formBuilderPage.createRelation(source3,relationType3,target3,resourceName3,relationLabel3,'0','1');
		formBuilderPage.saveForm();

		//add link field for test
		formBuilderPage.addLinkField(linkLabelTitle,relation,reference,constraint);
		formBuilderPage.addFormField ('Geo data','Geo data',0);
		formBuilderPage.addFormField ('Text Area','Text Area',0);
		formBuilderPage.addFileFormField ('File');
		formBuilderPage.addFormField ('Date','Date',0);
		formBuilderPage.addNumericField ('Numeric',true,true);
		formBuilderPage.addTerminologyField ('Terminology','Band');
		formBuilderPage.addFormField ('Creator','Creator',0);

		// create new layout
		formBuilderPage.openNewLayoutOrEditLayout(layoutName,resoureName);
		for(var i=0;i<addedPanelNumber;i++){
			formBuilderPage.addPanel();
		}
		formBuilderPage.addTextFieldToPanel();
		
		formBuilderPage.addGridListWidget(panelName1,relation1,'Grid');
		formBuilderPage.addGridListWidget(panelName2,relation2,'Grid');
		formBuilderPage.setAssociation(0,true);
		commonPage.saveForm();
		commonPage.clickOnButton('Designer');
		formBuilderPage.linkToLayout(layoutName);
		formBuilderPage.referenceField(labelTitle);
		formBuilderPage.saveForm();
	});

	
	it('add layout to form one',function(){
		console.log("add layout to form one");
		var layoutName1 = 'test layout one';
	 	var resoureName1 = 'test_layout_one';

	 	//panel 1
		var panelName1 = 'form two';	
		// var relation1 = form1 + ' contains '+ form2;
		var relation1 = 'test form one for Ricky test' + ' contains '+ 'test form two for Ricky test';//delete

		//panel 2
		var panelName2 = 'general form'
		//var relation2 = form + ' contain many '+form1;
		var relation2 = 'general form for automation tests' + ' contain many '+'test form one for Ricky test';//delete
		commonPage.get();
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();
		// formBuilderPage.loadDetail(form1);
		formBuilderPage.loadDetail('test form one for Ricky test');//delete
		formBuilderPage.openNewLayoutOrEditLayout(layoutName1,resoureName1);
		formBuilderPage.addTextFieldToPanel();
		formBuilderPage.addGridListWidget(panelName1,relation1,'Grid');
		formBuilderPage.addGridListWidget(panelName2,relation2,'Grid');
		commonPage.saveForm();
		commonPage.clickOnButton('Designer');
		formBuilderPage.linkToLayout(layoutName1);
		formBuilderPage.saveForm();
	});

	it('add layout to form two',function(){
		console.log("add layout to form two");
		var layoutName2 = 'test layout two';
	 	var resoureName2 = 'test_layout_two';

	 	//panel 1
		var panelName1 = 'form one';
		// var relation1 = form1 + ' '+ 'contains' + ' '+ form2;
		var relation1 = 'test form one for Ricky test' + ' '+ 'contains' + ' '+ 'test form two for Ricky test';//delete

		//panel 2
		var panelName2 = 'general form'
		// var relation2 = form + ' contains '+ form2;
		var relation2 = 'general form for automation tests' + ' contains '+ 'test form two for Ricky test';//delete

		commonPage.get();
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();
	 	// formBuilderPage.loadDetail(form2);
		formBuilderPage.loadDetail('test form two for Ricky test');//delete
		formBuilderPage.openNewLayoutOrEditLayout(layoutName2,resoureName2);
		formBuilderPage.addTextFieldToPanel();
		formBuilderPage.addGridListWidget(panelName1,relation1,'Grid');
		formBuilderPage.addGridListWidget(panelName2,relation2,'Grid');
		commonPage.saveForm();
		commonPage.clickOnButton('Designer');
		formBuilderPage.linkToLayout(layoutName2);
		formBuilderPage.saveForm();
	});


	it('create child form to test parent-child and other fields',function(){
		console.log("create child form to test parent-child and other fields");

		var formName = 'child form ricky';
		var formType = 'child_form_ricky';
		var labelTitle = 'child form name';
		var addedPanelNumber = 3;

		//relation group
		var source= 'general form for automation tests';//delete
		var relationType= 'Parent-Child';
		var target= 'child form ricky';//delete
		var relationLabel= 'covers';
		var resourceName= 'general_covers_child_form';

		//layout
		var layoutName = 'child layout';
		var resoureName = 'child_layout';
		var gridListWidget = 'Related entities as grid/list';
		
		//panel 
		var panelName = 'general form';
		var relation = 'general form for automation tests covers child form ricky';

		commonPage.get();
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();
		// formBuilderPage.loadDetail('child form ricky'); //just for test
		// create form to be sure that the form with all neccessary field types,
		// fields we need to test
		formBuilderPage.createFormName(formName,formType);
		browser.executeScript("arguments[0].click();", formBuilderPage.listFilter.getWebElement());
		formBuilderPage.addFormField('Textfield',labelTitle,0,true);
		formBuilderPage.addFormField ('Email','Email',0);
		formBuilderPage.addFormField ('Password','Password',0);
		formBuilderPage.addRadioDropdownFieldSample ('Radio Buttons', 'Radio');
		formBuilderPage.addRadioDropdownFieldSample ('Dropdown List', 'Dropdown');
		formBuilderPage.addAutoIncrementField('Auto','last','terminology','Band');
		formBuilderPage.addCurrencyField('Currency','last');
		formBuilderPage.addImageFormField('Image','image',true);

		// create relations needed to other forms for tests
		formBuilderPage.createRelation(source,relationType,target,resourceName,relationLabel);
		formBuilderPage.saveForm();

		// create new layout
		formBuilderPage.openNewLayoutOrEditLayout(layoutName,resoureName);
		for(var i=0;i<addedPanelNumber;i++){
			formBuilderPage.addPanel();
		}
		formBuilderPage.addTextFieldToPanel();
		formBuilderPage.addGridListWidget(panelName,relation,'Grid');
		formBuilderPage.addImageGallery('Image gallery');
		commonPage.saveForm();
		commonPage.clickOnButton('Designer');
		formBuilderPage.linkToLayout(layoutName);
		formBuilderPage.referenceField(labelTitle);
		formBuilderPage.saveForm();
	});

	
	it('add child grid widget to general form layout',function(){
		console.log("add child grid widget to general form layout");
		var relation = 'general form for automation tests covers child form ricky';
		var relation1 = 'general form for automation tests contain many test form one for Ricky test';
		var subRelation = 'test form one for Ricky test contains test form two for Ricky test';
			
		commonPage.get();
		commonPage.systemEntityPage('User interface','Entity designer');
		formBuilderPage.get();
		formBuilderPage.loadDetail('general form for automation tests');
		formBuilderPage.openExistingLayout('test layout');
		formBuilderPage.addGridListWidget('child form',relation,'Grid');
		commonPage.saveForm();
	});


	it('create entities for general form',function(){
		console.log("create entities for general form");
			
		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.switchToViewMode();
		
		commonPage.newButton.click();
		commonPage.selectDateOnCalendar(0,15,01,2018);
		commonPage.fillInField($('#general_form_name'),'General_Form_1');
		commonPage.fillInField($('#geo_data_x'),'10.769183');
		commonPage.fillInField($('#geo_data_y'),'106.68693');
		commonPage.fillInField($('#geo_data_z'),'9');
		commonPage.fillInField($('#numeric'),'4679.87');
		commonPage.fillInField($('#text_area'),'We are the one \n We are winner');
		browser.executeScript("arguments[0].click();", $('[ng-click="$select.activate()"]').getWebElement()).then(function(){
			var firstOption = element.all(by.repeater('option in $select.items')).first();
			browser.executeScript("arguments[0].click();", firstOption.getWebElement());
		})
		commonPage.saveForm();
		
		commonPage.edit();
		commonPage.clickOnAddRelation('form one',false);
		commonPage.fillInField($('#form_one_name'),'Form1_1');
		commonPage.fillInField($('#geo_data_x'),'10.748832');
		commonPage.fillInField($('#geo_data_y'),'106.66627');
		commonPage.fillInField($('#geo_data_z'),'6');	
		commonPage.saveForm();

		commonPage.edit();
		commonPage.clickOnAddRelation('form two',false);
		commonPage.fillInField($('#form_two_name'),'Form2_1');		
		commonPage.saveForm();

		commonPage.edit();
		commonPage.clickOnAddRelation('child form',false);
		commonPage.clickElementInFormGroup('Auto:','first');
		commonPage.fillInField($('#child_form_name'),'child_name_1');
		commonPage.fillInField($('#currency'),'5987.98');
		commonPage.setImageAtIndex('../entity/hochiminh-nightlife.jpg',0);
		//save 2 times to go to List
		commonPage.saveForm();
		commonPage.saveForm();
	});

	it('edit entities for general form',function(){
		console.log("edit entities for general form");
			
		commonPage.get();
		commonPage.entityPage('general form for automation tests');
		commonPage.switchToViewMode();
		browser.executeScript("arguments[0].click();", commonPage.rows.first().$('a').getWebElement());
		commonPage.edit();
		commonPage.fillInField($('#geo_data_x'),'10.770587');
		commonPage.fillInField($('#geo_data_y'),'106.692579');
		commonPage.fillInField($('#geo_data_z'),'13');
		commonPage.fillInField($('#numeric'),'4321');
		commonPage.fillInField($('#text_area'),'We are not the one \n We are loser');
		commonPage.saveForm();
	});

	





});
