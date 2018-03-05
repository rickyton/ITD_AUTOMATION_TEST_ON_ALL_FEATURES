describe('user profile Scenario', function () {

	var World = require("./framework/World");
	var LoginPage = require("./identity/LoginPage");
	var LogoutPage = require("./identity/LogoutPage");
	var UserProfilePage = require("./user/UserProfilePage");
	const dropFile = require("./framework/drop-file.js");

	var world = new World();
	var profilePage = new UserProfilePage(world);


	beforeAll(function () {
		new LoginPage(world).quickLoginWithAnotherAccount();
		// new LoginPage(world).quickLogin("minhsonton", "aaa111");
	});

	afterAll(function () {
		new LogoutPage(world).logout();
	});


	it('should update email and first Name of user Profile',function(){
		console.log("should update email and first Name of user Profile");
		
		var email = "ricky.tonminh"+"+1"+"@it-development.com";
		var email1 = "ricky.tonminh"+"+2"+"@it-development.com";

		profilePage.get();
		profilePage.goToUserProfile();
		profilePage.setEmail(email);
		profilePage.setFirstName("john new firstName");
		profilePage.setLastName("Smith new lastName");
		profilePage.saveForm();
		profilePage.closeProfile();
		profilePage.goToUserProfile();
		expect(profilePage.getEmail()).toBe(email);
		expect(profilePage.getFirstName()).toBe("john new firstName");
		expect(profilePage.getLastName()).toBe("Smith new lastName");

		//We set back the original data
		profilePage.setEmail(email1);
		profilePage.setFirstName("MinhSon");
		profilePage.setLastName("Ton");
		profilePage.saveForm();
		profilePage.closeProfile();
		profilePage.goToUserProfile();
		expect(profilePage.getEmail()).toBe(email1);
		expect(profilePage.getFirstName()).toBe("MinhSon");
		expect(profilePage.getLastName()).toBe("Ton");

	});

	it('should update the password of an user Profile',function(){
		console.log("should update the password of an user Profile");

		profilePage.get();
		profilePage.goToUserProfile();
		profilePage.goToChangePasswordProfile();
		profilePage.changePwd("aaa111", "aaa222","aaa222");
		new LogoutPage(world).logout();
		new LoginPage(world).quickLoginForTest("minhsonton", "aaa222");
		profilePage.goToChangePasswordProfile();
		profilePage.changePwd("aaa222", "aaa111","aaa111");
	});


	it('should refuse to change pwd in case of bad input',function(){
		console.log("should refuse to change pwd in case of bad input");

		profilePage.get();
		profilePage.goToUserProfile();
		profilePage.goToChangePasswordProfile();
		profilePage.changePwd("wrongpwd", "aaa222","aaa222");
		expect(profilePage.dangerMenuIsPresent()).toBeTruthy();
		profilePage.closeProfile();
		profilePage.goToChangePasswordProfile();
		profilePage.changePwd("aaa111", "aaa222","aaa333");
		expect(profilePage.dangerMenuIsPresent()).toBeTruthy();

	});

	
  	it('should verify uploading profile image', function() {
		console.log("should verify uploading profile image");

    	profilePage.get();
    	profilePage.goToUserProfile();
    	profilePage.profileImageDisplayed.getAttribute('src').then(function(srcID){
    		//drop an image file on the drop area
   			dropFile(profilePage.dropArea, "./test/entity/saigon-nightlife.jpg");
    		//wait for uploading image
    		browser.sleep(20000);
    	})
  	});

});
