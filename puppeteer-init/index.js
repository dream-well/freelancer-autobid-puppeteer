const puppeteer_original    = require('puppeteer');
const puppeteer             = require('puppeteer-extra');

const StealthPlugin         = require('puppeteer-extra-plugin-stealth')
const { userAgents }        = require('../consts')

puppeteer.use(StealthPlugin())

// fake useragent
function setPageUseragent(browserpage, index = 61)
{
    browserpage.setUserAgent(userAgents[index])
}

async function launchPuppeteer(){
    global.browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: false,
        args: minimal_args,
        ignoreDefaultArgs: ["--enable-automation"]
    });
    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(60000);
    // You can set Request Interception here...
    // await page.setRequestInterception(true);
    setPageUseragent(page);

    return page
}


const minimal_args = [
    '--disable-speech-api',
    '--mute-audio',
    '--no-default-browser-check',
    // '--no-sandbox',
    // '--no-zygote',
    '--no-pings',
    '--disable-sync',
    // '--disable-notifications',
    '--disable-popup-blocking',
    // '--disable-component-update',
    // '--disable-default-apps',
    // '--disable-domain-reliability',
    // '--disable-client-side-phishing-detection',
    // '--disable-breakpad',
    // '--disable-ipc-flooding-protection',
    '--no-first-run',
    '--disable-features=AudioServiceOutOfProcess',
    // '--disable-infobars',
    // '--window-position=0,0',
    '--ignore-certifcate-errors', 
    '--ignore-certifcate-errors-spki-list',
    // '--disable-setuid-sandbox',
    // '--disable-accelerated-2d-canvas',
    // // '--disable-gpu',
    '--window-size=1920,1160',
    // '--start-maximized',
    // // '--hide-scrollbars',
    '--disable-background-networking'
];

module.exports = {
    launchPuppeteer,
    setPageUseragent
}