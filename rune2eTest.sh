#!/bin/bash

echo "================================ CoS Client E2E test Suite ClickOnsite========="

cd ~
cd git_sources/newcos/cos-client/

echo "================================ Step 1: Pull new source from BitBucket ========"
git checkout develop
git pull

echo "================================ Step 2: Kill selenium server if it was existed ========"
HOSTNAME=${hostname}
curl -s -L http://$HOSTNAME:4444/selenium-server/driver?cmd=shutDownSeleniumServer > /dev/null 2>&1
echo "Should be kill"

echo "================================ Step 3: Execute npm and bower install ========"
npm install
bower install

echo "================================ Step 4: Check protractor and chrome version ========"
./node_modules/.bin/protractor --version
google-chrome --version

#echo "Starting X virtual framebuffer (Xvfb) in background..."
#Xvfb :99 -ac -screen 0 1024x768x8 &
#Xvfb :99 -screen 0 1152x900x8 &
#export DISPLAY=:99

echo "================================ Step 5: Update webdriver-manager to getting latest of chrome-driver ========"
# Problem with chrome-driver version if we always run webdriver-manager update. Should only run for first times. Please do not run for next times.
./node_modules/.bin/webdriver-manager update --standalone

echo "================================ Step 6: Start webdriver-manager, server selenium driver ========"
npm run-script webdriver &
sleep 15

echo "================================ Step 7: Check status webdriver-manager ========"
./node_modules/.bin/webdriver-manager status

echo "================================ Step 8: Execute script e2e in-memory with headless browser by xvfb ========"
#xvfb-run npm run-script e2e
xvfb-run npm run-script e2e-headless

echo "================================ Step 9: Shutdown selenium-server on port 4444 ========"
lsof -t -i :4444 | xargs kill
#npm run-script webdriver-shutdown

echo "================================ Step 10: Shutdown webdriver-manager ========"
./node_modules/.bin/webdriver-manager shutdown
