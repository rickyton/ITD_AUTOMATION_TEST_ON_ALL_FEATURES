var getAbsoluteXPath = function (element) {
    return browser.executeScript(
        "function absoluteXPath(element) {" +
        "var comp, comps = [];" +
        "var parent = null;" +
        "var xpath = '';" +
        "var getPos = function(element) {" +
        "var position = 1, curNode;" +
        "if (element.nodeType == Node.ATTRIBUTE_NODE) {" +
        "return null;" +
        "}" +
        "for (curNode = element.previousSibling; curNode; curNode = curNode.previousSibling) {" +
        "if (curNode.nodeName == element.nodeName) {" +
        "++position;" +
        "}" +
        "}" +
        "return position;" +
        "};" +

        "if (element instanceof Document) {" +
        "return '/';" +
        "}" +

        "for (; element && !(element instanceof Document); element = element.nodeType == Node.ATTRIBUTE_NODE ? element.ownerElement : element.parentNode) {" +
        "comp = comps[comps.length] = {};" +
        "switch (element.nodeType) {" +
        "case Node.TEXT_NODE:" +
        "comp.name = 'text()';" +
        "break;" +
        "case Node.ATTRIBUTE_NODE:" +
        "comp.name = '@' + element.nodeName;" +
        "break;" +
        "case Node.PROCESSING_INSTRUCTION_NODE:" +
        "comp.name = 'processing-instruction()';" +
        "break;" +
        "case Node.COMMENT_NODE:" +
        "comp.name = 'comment()';" +
        "break;" +
        "case Node.ELEMENT_NODE:" +
        "comp.name = element.nodeName;" +
        "break;" +
        "}" +
        "comp.position = getPos(element);" +
        "}" +

        "for (var i = comps.length - 1; i >= 0; i--) {" +
        "comp = comps[i];" +
        "xpath += '/' + comp.name.toLowerCase();" +
        "if (comp.position !== null) {" +
        "xpath += '[' + comp.position + ']';" +
        "}" +
        "}" +

        "return xpath;" +

        "} return absoluteXPath(arguments[0]);", element);
}


function absoluteXPath(element) {
    var comp, comps = [];
    var parent = null;
    var xpath = '';
    var getPos = function (element) {
        var position = 1, curNode;
        if (element.nodeType == Node.ATTRIBUTE_NODE) {
            return null;
        }
        for (curNode = element.previousSibling; curNode; curNode = curNode.previousSibling) {
            if (curNode.nodeName == element.nodeName) {
                ++position;
            }
        }
        return position;
    };

    if (element instanceof Document) {
        return '/';
    }

    for (; element && !(element instanceof Document); element = element.nodeType == Node.ATTRIBUTE_NODE ? element.ownerElement : element.parentNode) {
        comp = comps[comps.length] = {};
        switch (element.nodeType) {
            case Node.TEXT_NODE:
                comp.name = 'text()';
                break;
            case Node.ATTRIBUTE_NODE:
                comp.name = '@' + element.nodeName;
                break;
            case Node.PROCESSING_INSTRUCTION_NODE:
                comp.name = 'processing-instruction()';
                break;
            case Node.COMMENT_NODE:
                comp.name = 'comment()';
                break;
            case Node.ELEMENT_NODE:
                comp.name = element.nodeName;
                break;
        }
        comp.position = getPos(element);
    }

    for (var i = comps.length - 1; i >= 0; i--) {
        comp = comps[i];
        xpath += '/' + comp.name.toLowerCase();
        if (comp.position !== null) {
            xpath += '[' + comp.position + ']';
        }
    }

    return xpath;

}

var World = function () {
    // this.host = browser.baseUrl;
};

/**
 * Helper function to wrap a function into Control Flow so it is part of WebDriver queue for promise chain.
 *
 * @param f
 * @returns {Function}
 */
World.prototype.wrapFlow = function (f) {
    return function () {
        var flow = browser.controlFlow();
//        flow.execute(f(arguments));
        // console.log(f);
        flow.execute(f());
    }
};

/**
 * Usually called in "afterEach" to write all console logs of the browser to the cmdline console where the test was executed.
 */
World.prototype.writeBrowserConsole = function () {
    browser.manage().logs().get('browser').then(function (browserLog) {
        //expect(browserLog.length).toEqual(0);
        //Uncomment to actually see the log.
        // console.log('log: ' + require('util').inspect(browserLog));
    });
};

World.prototype.getHost = function () {
    return this.host;
};



World.prototype.tenantBase = function (tenant) {
    //return "http://" + this.host + "/" + tenant + "/";
    return tenant + "/";
};

World.prototype.defaultBase = function () {
    // return this.tenantBase("qacme");
    // return this.tenantBase("acme");
    // return this.tenantBase("fetest");
};

World.prototype.highlight = function (locator) {
    var xPaths = [];
    var cssBorders = [];

    return browser.findElements(locator).then(function (arr) {
        for (var i = 0; i < arr.length; ++i) {
            getAbsoluteXPath(arr[i]).then(function (result) {
                xPaths.push(result);
            });

            arr[i].getCssValue("border").then(function (val) {
                cssBorders.push(val);
            });
        }

        if (arr.length == 0) {
            return "No elements found.";
        }
    }).then(function () {
        var timesFlashed = 10;
        var waitTime = 500;

        for (var t = 0; t < timesFlashed; t++) {
            var borderValue = "5px inset rgb(256, 0, 0)";
            if (t % 2 == 1) {
                borderValue = "5px inset rgb(256, 256, 0)";
            }
            for (var i = 0; i < xPaths.length; i++) {
                browser.executeScript("var x = document.evaluate('" + xPaths[i] + "', document, null, XPathResult.ANY_TYPE, null); var xx = x.iterateNext(); xx.style.border = '" + borderValue + "';");
            }

            browser.sleep(waitTime);
        }
    }).then(function () {
        for (var j = 0; j < cssBorders.length; j++) {
            browser.executeScript("var x = document.evaluate('" + xPaths[j] + "', document, null, XPathResult.ANY_TYPE, null); var xx = x.iterateNext(); xx.style.border = '" + cssBorders[j] + "';");
        }

        return "Highlighting Completed.";
    });
};

//World.prototype.waitForUrl = function(expectedUrl) {
//            browser.driver.wait(function() {
//    console.log("current browser url is = " + browserurl + ", expected = " + expectedUrl);
//browser.sleep(500);
//return true;

//return browser.driver.getCurrentUrl().then(function(browserurl) {
//    console.log("current browser url is = " + browserurl + ", expected = " + expectedUrl);
//    return expectedUrl == browserurl;
//}, 3000);

//};

module.exports = World;