const scrapper = require('./scrapper')
const fs = require('fs-extra')

void async function main(){
    const projects = await scrapper.getProjectDetails(100, 0)
    console.log(projects)
    fs.writeJsonSync('./data/projects.json', projects)   
}()