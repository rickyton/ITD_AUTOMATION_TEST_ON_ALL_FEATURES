var LoginPage = function(world) {
    this.world = world;
};


LoginPage.prototype.get = function() {
    var baseUrl= 'https://cos2.integration.it-development.com/';
    // var baseUrl= 'https://cos2.crashtest.it-development.com/';
    // var baseUrl = 'https://cos2.quality.it-development.com/';
    var tenantName = "acme";
    // var tenantName = "qacme";
    // var tenantName = "fetest";

    var url = baseUrl + tenantName+'/'+ '#!/identity/login';
    console.log("Login Page = " + url);
    browser.get(url);

    this.username = element(by.model("user.username"));
    this.password = element(by.model("user.password"));
    this.submit = element(by.id("loginForm")).element(by.tagName('button'));
};


LoginPage.prototype.login = function() {
    var username = 'Ask Son ???';
    var password = 'Ask Son ???';
   
    this.username.sendKeys(username);
    this.password.sendKeys(password);
    this.submit.click();
    browser.sleep(2000);
    browser.wait(function() {
        return browser.isElementPresent(by.css('.btn__topMenu__userBox'));
    }).then(function(){
        
    });
};

/**
 * Binds navigation to login page and execution of login into one call.
 *
 * @param username
 * @param password
 */

LoginPage.prototype.quickLogin = function() {
    this.get();
    this.login();
};

LoginPage.prototype.quickLoginForTest = function(username, password) {
    this.get();

    this.username.sendKeys(username);
    this.password.sendKeys(password);
    this.submit.click();
    
    browser.sleep(800);
    browser.wait(function() {
        return browser.isElementPresent(by.css('.btn__topMenu__userBox'));
    }).then(function(){
        
    });
};



LoginPage.prototype.quickLoginWithAnotherAccount = function() {
    this.get();
    var username = 'Ask Son ???';
    var password = 'Ask Son ???';

    this.username.sendKeys(username);
    this.password.sendKeys(password);
    this.submit.click();
    browser.sleep(800);
};


module.exports = LoginPage;