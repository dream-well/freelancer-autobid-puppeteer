const util                  = require('util')
const Cookie                = require('tough-cookie')

const wait = util.promisify(setTimeout)

const cookies2string = (cookies) => 
    cookies.map(json => ({
            ...json, 
            key: json.name, 
            expires: json.expires > 0 ? new Date(json.expires * 1000) : 'Infinity'
        }))
        .map(json => Cookie.fromJSON(json).toString())
        .join((a, b) => a + "; " + b)

module.exports = {
    wait,
    cookies2string
}
