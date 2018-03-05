var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var ScreenShotReporter = require('protractor-screenshot-reporter');
var RemoveFile = require('./framework/RemoveDownloadFile');


var removeFile = new RemoveFile();


exports.config = {
    // directConnect: true,
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub'
    ,specs: ['*-spec.js']
    // ,specs: ['general-spec.js']
    ,exclude:[
        'generics-spec.js'
    ]
     ,framework: 'jasmine2'
     //,chromeOnly: true
     ,multiCapabilities: [
         {
             'browserName': 'chrome'
             ,'chromeOptions': {

                 prefs: {
                     download: {
                         'prompt_for_download': false
                         ,'default_directory': 'test/Downloads'
                         ,'directory_upgrade': true
                     }
                 }
             }
         }
        // {
        //     'browserName': 'firefox'
        // }
     ]
     ,maxSessions: 1
     ,allScriptsTimeout: 1000000
     ,defaultTimeoutInterval: 1000000
     ,getPageTimeout: 1000000

     ,jasmineNodeOpts: {defaultTimeoutInterval: 1000000}
     //,verbose: true

     ,onPrepare: function() {
         browser.driver.manage().window().maximize();
         var reporters = require('jasmine-reporters');
         jasmine.getEnv().addReporter(
             new reporters.JUnitXmlReporter());

         jasmine.getEnv().addReporter(new HtmlScreenshotReporter(
             {
                 dest: 'build/html-screenshots',
                 filename: 'e2e-test-report.html'
             }
         ));

         jasmine.getEnv().addReporter(new ScreenShotReporter(
             {
                 baseDirectory: 'build/screenshots'
             }
         ));

         removeFile.rmDir('test/Downloads');
         var width = 1700;
         var height = 1400;
         // browser.driver.manage().window().setSize(width, height);
        browser.driver.manage().window().maximize();
        // browser.driver.get("https://cos2.quality.it-development.com/qacme/#!/identity/login");
        // element(by.model("user.username")).sendKeys("Ricky");
        // element(by.model("user.password")).sendKeys("aaa111");
        // element(by.id("loginForm")).element(by.tagName('button')).click();
        // browser.sleep(1000);
        // browser.waitForAngular();
          // var  window = browser.manage().window();

 //        browser.getCapabilities().then(function (capabilities) {
 //             browserName = capabilities.get('browserName');
 //             platform = capabilities.get('platform');
 //        }).then(function getCurrentWindowSize() {
 //            return window.getSize();
 //        }).then(function setWindowSize(dimensions) {
 //            var windowWidth = 1980,
 //            windowHeight = 1200;

 //            return window.setSize(windowWidth, windowHeight);
 //        }).then(function getUpdatedWindowSize() {
 //            return window.getSize();
//        //Add a comment to this line
 //        }).then(function showWindowSize(dimensions) {
 //            console.log('Browser:',  dimensions.width + 'x' + dimensions.height);
 //            console.log('Running e2e tests...');
 //        });


 // when we have problem on launch about jenkins
 // connect to jenkins server then go to docker container
 //docker exec -ti itdtools_jenkinsslavejs_1  bash
 // and run this command Xvfb :99 &
 //export DISPLAY=:99
 // if it is happen a lot maybe include it in launching script  ?
     }
     // ,onComplete: function() {
     //    browser.waitForAngular();
     //    element(by.css(".btn__topMenu__userBox")).click();
     //    element(by.css(".btn__topMenu__userBox__logout")).click();
     //    browser.sleep(1000);
     // }
 };
