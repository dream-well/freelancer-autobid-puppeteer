const axios = require('axios')
const { userAgents }  = require('../consts')
const URLs = require('../consts/urls')

const defaultHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36', 
    'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-fetch-dest': 'document', 
    'sec-fetch-mode': 'navigate', 
    'sec-fetch-site': 'same-origin', 
    'sec-fetch-user': '?1', 
    'upgrade-insecure-requests': '1', 
    'accept-language': 'en-US,en;q=0.9,ko;q=0.8', 
    'cache-control': 'max-age=0', 
}

Object.assign(axios.defaults.headers, defaultHeaders)

function setHeaders(headers){
    Object.assign(axios.defaults.headers, headers)
}

async function get(url, options){
    const request = axios.get(url, options)
    try{
        const response = await request
        console.log(request)
        return response.data
    }catch(e){
        console.error(`Error Getting: ${url}`)
        console.error(e)
    }
}

async function getProjectDetails(limit, offset){
    const url = generateProjectUrl(limit, offset)
    const projects = await get(url)
    return projects || {}
}

async function getClientInfo(clients){
    const url = `https://www.freelancer.com/api/users/0.1/users`
    const params = {
        avatar: true,
        cover_image: true,
        display_info: true,
        country_details: true,
        jobs: true,
        portfolio_details: true,
        preferred_details: true,
        profile_description: true,
        qualification_details: true,
        recommendations: true,
        responsiveness: true,
        status: true,
        users: clients,
        webapp: 1,
        compact: true,
        new_errors: true,
        new_pools: true,
    }
    const request = axios.get(url, {params})
    try{
        const response = await request
        return response.data.result.users
    }catch(e){
        console.error(e)
        return {}
    }
}

function generateProjectUrl(limit, offset){
    return `https://www.freelancer.com/api/projects/0.1/projects/active?limit=${limit}&offset=${offset}&full_description=true&job_details=true&local_details=true&location_details=true&upgrade_details=true&user_country_details=true&user_details=true&user_employer_reputation=true&jobs%5B%5D=9&jobs%5B%5D=13&jobs%5B%5D=292&jobs%5B%5D=500&jobs%5B%5D=588&jobs%5B%5D=759&jobs%5B%5D=913&jobs%5B%5D=979&jobs%5B%5D=989&jobs%5B%5D=1088&jobs%5B%5D=1094&jobs%5B%5D=1199&jobs%5B%5D=2060&languages%5B%5D=en&sort_field=submitdate&webapp=1&compact=true&new_errors=true&new_pools=true`
}

module.exports = {
    setHeaders,
    get,
    getProjectDetails,
    getClientInfo
}