// Take the path
// Go to path and fetch the json
// Deserialize the json
module.exports = { parse };

function openAndReadFile(path)
{
    let fs = require('fs');
    let fileContent = '';
    try{
        fileContent = fs.readFileSync(path).toString();
    }
    catch(err){
        return ErrorEnum.ReadError;
    }

    return fileContent;
}

function parseToJSON(data)
{
    let routesConfigObj = [];
    try{
        routesConfigObj = JSON.parse(data);
    }
    catch(err)
    {
        return ErrorEnum.ParseError;
    }

    return routesConfigObj;
}

const ErrorEnum = Object.freeze({
    'ReadError': -1,
    'ParseError': -2
})

function parse(pathToConfig)
{
    this.fileContent = openAndReadFile(pathToConfig);
    if(this.fileContent == ErrorEnum.ReadError)
    {
        return `Error: Couldn't find the file ${pathToConfig}`; 
    }
    
    this.routesConfigObj = parseToJSON(this.fileContent);
    if(this.routesConfigObj == ErrorEnum.ParseError)
    {
        return `Error: Couldn't parse the JSON file`;
    }

    return this.routesConfigObj;
}
