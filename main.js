const { launchPuppeteer, setPageUseragent } = require('./puppeteer-init')
const URLs = require('./consts/urls')
const USER_INFO = require('./consts/user')
const { wait, cookies2string } = require('./utils')
const scrapper = require('./scrapper')
const { URL } = require('url')
const fs = require('fs-extra')

/**
 * Main function
 */
void async function main(){

	const page = await launchPuppeteer()
	await page.goto(URLs['login'], { waitUntil: 'load' })
	console.log("Freelancer Loaded")
	await wait(1000)
	while(true){
		try{
			await passLogin(page)
			break
		}catch(e){
	
		}
	}
	await wait(2000)
	await browseProjects(page)
	await wait(1000)
	await gotoDashboard(page)

}()

async function waitForVisible(page, selector){
	let waitLimit = 5000
	let element
	do{
		await wait(1000)
		waitLimit -= 1000
		element = await page.$(selector)
		console.log(element)
	} while(!element && waitLimit > 0)
	console.log("Time left:", waitLimit)
}

async function passLogin(page){
	await page.click('input[type="email"]')
	await wait(1000)
	await page.keyboard.type(USER_INFO['email'])
	await page.keyboard.press('Tab')
	await wait(100)
	await page.keyboard.type(USER_INFO['password'])
	await wait(100)
	await page.keyboard.press('Enter')
	do{
		await wait(1000)
	}while( URLs['dashboard'] == page.url() );
}

async function gotoDashboard(page){
	await page.goto(URLs['dashboard'], { waitUntil: 'load' })
}

async function browseProjects(page){
	await page.goto(URLs['projects'], { waitUntil: 'load' })
	console.log("Search Projects")
	// Wait till skillset show
	do{
		await wait(1000)
	}while( page.url().indexOf('projectSkills') < 0);
	// scrapper.get('')
	// console.log("Cookie:", cookies2string(await page.cookies()))
	// scrapper.setHeaders({ referer: page.url()})
	const pageUrl = new URL(page.url())
	const skills = pageUrl.searchParams.get("projectSkills")?.split(",")
	console.log("Your skills:", skills)
	const response = await scrapper.get(URLs.api.projects, { params: {
		limit: 100,
		offset: 60,
		full_description: true, 
		job_details: true, 
		local_details: true, 
		location_details: true, 
		upgrade_details: true, 
		user_country_details: true, 
		user_details: true, 
		user_employer_reputation: true, 
		sort_field: "submitdate",
		webapp: 1,
		compact: true,
		new_errors: true,
		new_pools: true,
		jobs: skills
	}})
	let projects = response.result.projects

	console.log("Result: ", projects.map(({ title }) => ({ title })) )
	const client_ids = projects.reduce((a, b) => (a.includes(b.owner_id) ? a : a.concat(b.owner_id+"")), [])
	let clients = await Promise.all(client_ids.map(client_id => scrapper.getClientInfo([client_id])))
	console.log(client_ids)
	console.log(clients)
	clients = clients.reduce((a, b) => Object.assign(a, b), {})
	projects = projects.map(project => ({...project, client: clients[project.owner_id]}))
	fs.writeJsonSync("./data/projects.json", projects, { spaces: 2, EOL: "\n" })
	bidProject(projects[0])
}

async function bidProject(job){
	// ${URLs['project']}/${job.seo_url}

	const page = await browser.newPage()
	await page.setDefaultNavigationTimeout(60000);
	setPageUseragent(page)
	await page.goto(`${URLs['project']}/${job.seo_url}`, { waitUntil: 'networkidle0' })
	console.log("Project Detail\n", job.title)

	const proposal = fs.readFileSync('./templates/default.txt', 'utf-8')
	let waitLimit = 5000
	let descriptionTextArea
	do{
		await wait(1000)
		waitLimit -= 1000
		descriptionTextArea = await page.$('#descriptionTextArea')
	}while(!descriptionTextArea && waitLimit > 0);
	if(waitLimit > 0){
		await page.click('#descriptionTextArea')
		await page.keyboard.type(proposal)
		console.log(`Added Proposal`)
	} else {
		console.log(`You can't bid here`)
	}
	await wait(1000)
	await page.close()
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