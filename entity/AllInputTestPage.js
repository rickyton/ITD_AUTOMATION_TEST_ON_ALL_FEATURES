
var AllInputTestPage = function(world) {
	this.world = world;

	this.allInputTest = {};

};

//this TestingPage is link with the testOfInput-spec.js scenario.
// it is based on the entity called (allInputTest) (create every time the scenario test is launche)
// This entity contains all the field available in COS to test each one.

var imageToUpload = "hochiminh-nightlife.jpg";
var fileToUpload = "testFileUpload.txt";

AllInputTestPage.prototype.get = function() {
	
	this.allInputTest.menu = element(by.css(".content-actionbar"));
	this.newButton = element.all(by.css(".btn-primary")).get(0);
	this.saveForm = element.all(by.css(".btn-primary")).get(0);
	this.editForm = element.all(by.css(".btn-primary")).get(0);

	this.allInputTest.table = $('#viewTable') ;
	this.allInputTest.title = element(by.css("h1"));
	this.allInputTest.vBar = element(by.css('.vertical-nav'));
	this.allInputTest.mainBox = element(by.css(".box-body"));


	//all Field Created
	this.allInputTest.GeoDataX = element.all(by.id("test3_x"));
	this.allInputTest.GeoDataY = element.all(by.id("test3_y"));
	this.allInputTest.GeoDataZ = element.all(by.id("test3_z"));
	this.allInputTest.GeoDataSystem = element.all(by.id("test3_system"));

	this.allInputTest.Numeric = element(by.id("test4"));
	this.allInputTest.Currency = element(by.id("test5"));

	this.allInputTest.Terminology = element.all(by.css(".selectize-input")).get(0);
	this.allInputTest.TerminologyChoice= this.allInputTest.mainBox.all(by.css(".ui-select-choices")).get(0); 

	this.allInputTest.ImageAdd = this.allInputTest.mainBox.all(by.css(".fileinput-button"));
	this.allInputTest.ImageUpload = this.allInputTest.mainBox.all(by.css(".btn-primary")).first();
	this.allInputTest.ImageAllDeleteButton = this.allInputTest.mainBox.all(by.css(".btn-danger"));
	this.allInputTest.ImageAllCancelButton = this.allInputTest.mainBox.all(by.css(".btn-warning"));
	
	this.allInputTest.ImageUploadInput = element.all(by.css('input[type="file"]')).first();
	

	this.allInputTest.FileAdd = this.allInputTest.mainBox.all(by.css(".fileinput-button"));
	this.allInputTest.FileUpload = this.allInputTest.mainBox.all(by.css(".btn-primary")).last();
	this.allInputTest.FileUploadInput =element.all(by.css('.fa-plus')).last();
	
	this.allInputTest.FileUploadInput =element.all(by.css('input[type="file"]')).last();
	
	

	this.allInputTest.Boolean = this.allInputTest.mainBox.all(by.css(".iCheck-helper")).get(0);
	this.allInputTest.RadioButtonsList = this.allInputTest.mainBox.all(by.css(".radio"));
	
	this.allInputTest.DateTime = element.all(by.css(".ng-valid-date")).get(1);
	this.allInputTest.DateTimeButton = element.all(by.css(".fa-calendar")).get(0);
	this.allInputTest.DateTimePickerDropDown = element.all(by.css(".ng-valid-date-disabled")).get(0);
	
	
	
	
	this.allInputTest.Date = element.all(by.css(".ng-valid-date")).get(2);
	this.allInputTest.DateButton = element.all(by.css(".fa-calendar")).get(1);
	this.allInputTest.DatePickerDropDown = element.all(by.css(".ng-valid-date-disabled")).get(0);
	
	
	this.allInputTest.TextArea = element.all(by.id("test10"));
	this.allInputTest.DropdownList = $("#test13");
	this.allInputTest.Password = element.all(by.id("test15"));
	this.allInputTest.Email = element.all(by.id("test16"));
	this.allInputTest.Textfield = element.all(by.id("test17"));


	this.allInputTest.childTextField = $('#textfield');

	
	this.allInputTest.closeButton = this.allInputTest.menu.element(by.css(".btn-default"));
};



/**
 * 
 * Create a new entity
 */
AllInputTestPage.prototype.submit = function( ) {

	this.newButton.click();
	
	this.setGeoData(10,10, 10);
	this.setNumeric(23);
	this.setCurrency(200);
	this.setTerminology();
	this.setImage(imageToUpload);
	this.setFile(fileToUpload);
	this.setBoolean(true);
	this.setRadioButtonList();
	this.setTextArea("textArea");
	this.setDropDownList();
	this.setPassword("pwd");
	this.setEmail("Ricky"+Math.random().toString(36).substring(7,9)+"@it-development.com");
	this.setTextField("textField");
	
	this.saveForm.click();

};





/**
 * Enter in edit mode when you are in entity detail
 */
AllInputTestPage.prototype.enterEditMode = function(){
	element.all(by.css('.btn-primary')).then(function(items) {	
		items[0].click();
	});
}

/**
 * load the detail of the entity (call when you are in list view)
 * @param name
 */
AllInputTestPage.prototype.loadDetail = function( name ) {	
	entity = element(by.xpath("//*[contains(text(),'"+name+"')]"));
	entity.click();

};



/**
 * return if the vertical bar is present or not 
 * @returns
 */
AllInputTestPage.prototype.vbarIsPresent = function(  ) {
	return this.allInputTest.vBar.isPresent();
}


/**
 * Set the geoData 
 * @param x
 * @param y
 * @param z
 */
AllInputTestPage.prototype.setGeoData = function(x,y,z  ) {
	this.allInputTest.GeoDataX.sendKeys(x);
	this.allInputTest.GeoDataY.sendKeys(y);
	this.allInputTest.GeoDataZ.sendKeys(z);
}

/**
 * Set the numeric field
 * @param value
 */
AllInputTestPage.prototype.setNumeric = function(value) {
	this.allInputTest.Numeric.sendKeys(value);
}

/**
 * Set the currency field
 * @param value
 */
AllInputTestPage.prototype.setCurrency = function(value) {
	this.allInputTest.Currency.sendKeys(value);
}


/**
 * Set the terminology field
 */
AllInputTestPage.prototype.setTerminology = function() {
	browser.executeScript("arguments[0].click();", this.allInputTest.Terminology.getWebElement());
	browser.executeScript("arguments[0].click();", this.allInputTest.TerminologyChoice.$$(".ui-select-choices-row").get(0).getWebElement());
}

/**
 * Set an image and upload it 
 * @param value
 */
AllInputTestPage.prototype.setImage = function(value) {
	var absolutePath = require("path").resolve(__dirname, value);
	var ele = this.allInputTest.ImageUploadInput;
	browser.actions().mouseMove(ele).perform();
	ele.sendKeys(absolutePath);
	browser.executeScript("arguments[0].click();", this.allInputTest.ImageUpload.getWebElement());
	//wait for uploading
	browser.sleep(20000);
}

/**
 * Set the image without uploading it
 * @param value
 */
AllInputTestPage.prototype.setImageWithoutUploadingIt = function(value) {
	
	  var absolutePath = require("path").resolve(__dirname, value);
	  this.allInputTest.ImageUploadInput.sendKeys(absolutePath);
	
}

/**
 * upload a .txt in an image input
 */
AllInputTestPage.prototype.submitBadImageFormat = function( ) {
	this.newButton.click();
	this.setImage(fileToUpload);

}

/**
 *provide a wrong url for the image to upload
 */
AllInputTestPage.prototype.submitWrongUrlImage = function( ) {

	this.newButton.click();
	this.setImage("");

}

/**
 * Upload a file for the file input field
 * @param value
 */
AllInputTestPage.prototype.setFile = function(value) {
	var absolutePath = require("path").resolve(__dirname, value);
	var ele1 = this.allInputTest.FileUploadInput;
	browser.actions().mouseMove(ele1).perform();
	ele1.sendKeys(absolutePath);
	browser.executeScript("arguments[0].click();", this.allInputTest.FileUpload.getWebElement());
	browser.sleep(20000);
}

/**
 * Fill the boolean input field (if paramater = true then check the checkbox)
 * @param value
 */
AllInputTestPage.prototype.setBoolean = function(value) {
	if(value==true)
		browser.executeScript("arguments[0].click();", this.allInputTest.Boolean.getWebElement());
}


/**
 * This function will check the first option in a list of radioButton
 */
AllInputTestPage.prototype.setRadioButtonList = function() {
	browser.executeScript("arguments[0].click();", this.allInputTest.RadioButtonsList.get(0).$(".iCheck-helper").getWebElement());
}

/**
 * Set a random date in datePicker (between all the date proprose by the datePicker (current month and 2 week in next month))
 * For field dateTime
 */
AllInputTestPage.prototype.setDateTime = function() {
	browser.executeScript("arguments[0].click();", this.allInputTest.DateTimeButton.getWebElement());
	
	this.allInputTest.DateTimePickerDropDown.$$(".ng-valid-date-disabled").then(function(all){
		all[0].$$(".btn-sm").then(function(allDay){
			browser.executeScript("arguments[0].click();", allDay[Math.floor((Math.random() * (allDay.length-1)))].getWebElement());
		});
	})
}

/**
 * Set a random date in datePicker (between all the date proprose by the datePicker (current month and 2 week in next month))
 * For field date
 */
AllInputTestPage.prototype.setDate = function() {
	browser.executeScript("arguments[0].click();", this.allInputTest.DateButton.getWebElement());

	this.allInputTest.DatePickerDropDown.$$(".ng-valid-date-disabled").then(function(all){
		all[0].$$(".btn-sm").then(function(allDay){
			browser.executeScript("arguments[0].click();", allDay[Math.floor((Math.random() * (allDay.length-1)))].getWebElement());
		});
	})
}

/**
 * Set the value of the textArea field
 * @param value
 */
AllInputTestPage.prototype.setTextArea = function(value) {	
	this.allInputTest.TextArea.sendKeys(value);
}

/**
 * Select the first value of the select field
 */
AllInputTestPage.prototype.setDropDownList = function() {
	browser.executeScript("arguments[0].click();", this.allInputTest.DropdownList.getWebElement());
	browser.executeScript("arguments[0].click();", this.allInputTest.DropdownList.$$('option').get(1).getWebElement());
}

/**
 * Set the value of the password field
 * @param value
 */
AllInputTestPage.prototype.setPassword = function(value) {
	this.allInputTest.Password.sendKeys(value);
}

/**
 * set the value of the email field
 * @param value
 */
AllInputTestPage.prototype.setEmail = function(value) {
	this.allInputTest.Email.sendKeys(value);
}

/**
 * Set the value of the textField
 * @param value
 */
AllInputTestPage.prototype.setTextField = function(value) {
	this.allInputTest.Textfield.sendKeys(value);
}



module.exports = AllInputTestPage;