
const jsforce = require('jsforce')

const {
    PROD,
    SF_URL,
    SF_USER,
    SF_PASS,
    SF_TOKEN,
} = process.env;

const SF_ROOT = PROD ? "https://login.salesforce.com" : "https://test.salesforce.com"

const recent = { instanceUrl:'', accessToken:'', time: '' }

console.log(`\n Initializing Salesforce API \n Root: ${SF_ROOT} \n User: ${SF_USER} `)

module.exports = {

    /**
     * @description basic Salesforce connection with user pass+token
     * 
     * @returns jsforce.Connection {Object}
     */
    connect,
        
    /**
     * @name logger
     * 
     * @description Send a log out to Salesforce sobject
     * 
     * @param log Object containing Status and Body
     * 
     * @returns Promise
     */
    logger,
}



/**
 * @description basic Salesforce connection with user pass+token
 * 
 * @returns jsforce.Connection {Object}
 */
function connect(old_con){
    
    return new Promise((resolve, reject) => {

        const conn = old_con ? old_con : new jsforce.Connection({
            instanceUrl: SF_URL,
            loginUrl: SF_ROOT
        })

        conn.login(SF_USER, SF_PASS+SF_TOKEN, (err, userInfo) => {
            
            console.log( `\n Logged in as ${JSON.stringify(userInfo)}`)

            recent.instanceUrl = conn.instanceUrl
            recent.accessToken = conn.accessToken
            recent.time = new Date().getTime()
            
            err ? reject(err) : resolve(conn)
        })
    })
}



/**
 * @name logger
 * 
 * @description Send a log out to Salesforce sobject
 * 
 * @param log {Object} containing Status and Body
 * @param con {Object} connection to use
 * 
 * 
 *  const log = {
 *      Status__c: 'Success',
 *      Body__c: JSON.stringify( { Results } )
 *  }
 * 
 *  const result = await Salesforce.logger( log )
 * 
 * @returns Promise
 */
async function logger(log, old_con) {

    const con = old_con ? await connect(old_con) : await connect()
    
    return new Promise((resolve, reject) => {
        
        con.sobject( 'Log__c' )
        .insert(log, (error, result) => {
            
            error ? reject(error) : resolve(result)
        })
    })
}
