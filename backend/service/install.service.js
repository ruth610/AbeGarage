const DbConnection = require('../config/dbConfig');
const fs = require('fs');


async function install(){
    // sql queries path
    const sqlFilePath = __dirname + '/sql/initial-queries.sql'
    //  a variable which we use to store the message of the completion of the installation
    let finalMessage = {};
    // a variable we use to store the queries
    let queryList = [];
    //  a variable we use to read every line of the sql file
    let tempLine = '';
    //  real the sql file
    const lines =  await fs.readFileSync(sqlFilePath, 'utf8').split('\n');
    //  create a promise to handle the aync reading of the file
    const readFilePromise = new Promise((resolve, reject) => {
        //  read the file line by line
        lines.forEach((line) => {
            //  check if the line is not empty
            if (line.trim() === '' || line.trim().startsWith('--')) {
                //  if the line is empty or a comment, skip it
                return
            }
            tempLine += line;
            if (line.trim().endsWith(';')) {
                //  if the line ends with a semicolon, it is a complete query
                const query = tempLine.trim();
                queryList.push(query);
                tempLine = '';
            }
        });
        //  resolve the promise
        resolve("queries are added to the list");
    });
    
    // loop through the queries
    for (let i = 0; i < queryList.length; i++) {
        //  check if the query is not empty
        if (queryList[i].trim() === '') {
            //  if the query is empty, skip it
            continue;
        }
        //  execute the query
        await DbConnection.query(queryList[i])
            .then((result) => {
                //  if the query is successful, add it to the final message
                console.log('all tables are created');
            })
            .catch((error) => {
                //  if the query fails, add it to the final message
                finalMessage.message = 'no all tables are created';
            });
    }
    if(!finalMessage.message){
        finalMessage.message = 'all tables are created';
        finalMessage.status = 201;
    }
    else{
        finalMessage.status = 500;
    }
    return finalMessage;
}

module.exports = { install };
// // this function is used to install the database

