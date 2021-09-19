const { launchPuppeteer } = require('./puppeteer-init')
const URLs = require('./consts/urls')
const USER_INFO = require('./consts/user')
const { wait, cookies2string } = require('./utils')
const scrapper = require('./scrapper')

/**
 * Main function
 */
void async function main(){
	const page = await launchPuppeteer()
	await page.goto(URLs['login'], { waitUntil: 'load' })
	console.log("Freelancer Loaded")
	await wait(1000)
	await passLogin(page)
	await wait(1000)
	await gotoDashboard(page)
	await wait(1000)
	browseProjects(page)
	console.log("Login Success")

}()

async function passLogin(page){
	await page.click('input[type="email"]');
	await page.keyboard.type(USER_INFO['email'])
	await page.keyboard.press('Tab')
	await wait(100)
	await page.keyboard.type(USER_INFO['password'])
	await wait(100)
	await page.keyboard.press('Enter')
}

async function gotoDashboard(page){
	await page.goto(URLs['dashboard'], { waitUntil: 'load' })
}

async function browseProjects(page){
	await page.goto(URLs['projects'], { waitUntil: 'load' })
	console.log("Browse Project")
	await wait(1000)
	// scrapper.get('')
	console.log("Cookie:", cookies2string(await page.cookies()))
	scrapper.setHeaders({ referer: page.url(), Cookie: cookies2string(await page.cookies())})
	const projects = scrapper.get(URLs[''])

	console.log(projects)

}

async function listJobs(){
	await puppetPage.click('.MuiFormControlLabel-root input');
	await puppetPage.keyboard.press('Tab');
	await puppetPage.keyboard.press('Tab');
	await wait(1000)
	await puppetPage.keyboard.press('Enter');
	
	await Promise.all([
			puppetPage.keyboard.press("Enter"),
			puppetPage.waitForNavigation2({ waitUntil: 'networkidle0' }),
	]);	        
	await wait(1250);
}