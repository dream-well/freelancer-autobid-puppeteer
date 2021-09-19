const axios = require('axios')
const { userAgents }  = require('../consts')
const URLs = require('../consts/urls')

const defaultHeaders = {
    'User-Agent': userAgents, 
    'Origin': URLs['freelancer']
}

Object.assign(axios.defaults.headers, defaultHeaders)

function setHeaders(headers){
    Object.assign(axios.defaults.headers, headers)
}

async function get(url){
    const request = axios.get(url)
    try{
        const response = await request
        return response.data
    }catch(e){
        console.error(`Error Getting: ${url}`)
    }
}

async function getProjectDetails(limit, offset){
    const url = generateUrl(limit, offset)
    const projects = await get(url)
    return projects
}

function generateUrl(limit, offset){
    `https://www.freelancer.com/api/projects/0.1/projects/active?limit=${limit}&offset=${offset}&full_description=true&job_details=true&local_details=true&location_details=true&upgrade_details=true&user_country_details=true&user_details=true&user_employer_reputation=true&jobs%5B%5D=9&jobs%5B%5D=13&jobs%5B%5D=292&jobs%5B%5D=500&jobs%5B%5D=588&jobs%5B%5D=759&jobs%5B%5D=913&jobs%5B%5D=979&jobs%5B%5D=989&jobs%5B%5D=1088&jobs%5B%5D=1094&jobs%5B%5D=1199&jobs%5B%5D=2060&languages%5B%5D=en&sort_field=submitdate&webapp=1&compact=true&new_errors=true&new_pools=true`
}

module.exports = {
    setHeaders,
    get
}