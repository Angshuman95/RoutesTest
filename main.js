// Collect the command-line arguments
const process = require('process');
const performance = require('perf_hooks').performance;

let t0 = performance.now();
let inputArgs = process.argv.slice(2);

let inputOption = require('./app_modules/ArgumentParser').parse(inputArgs);

if(typeof(inputOption) === 'string')
{
    printErrorAndAbort(inputOption);
}

let routesConfigObj = require('./app_modules/ConfigParser').parse(inputOption.configFilePath); 

if(typeof(routesConfigObj) === 'string')
{
    printErrorAndAbort(routesConfigObj);
}

let filteredConfigObject = require('./app_modules/RouteFilter').filter(routesConfigObj, inputOption.optionName);

if(typeof(filteredConfigObject) === 'string')
{
    printErrorAndAbort(filteredConfigObject);
}

let fileContentObj = require('./app_modules/RoutesFileContentCreator').fileContentCreator(filteredConfigObject);

if(typeof(fileContentObj) === 'string')
{
    printErrorAndAbort(fileContentObj);
}

require('fs').writeFile(`${fileContentObj.fileName}`, `${fileContentObj.content}`, 'utf-8', (err) => {
    if(err){
        return console.log(`Error while saving the file:\n${err}`);
        process.exit();
    }
});
let t1 = performance.now();

console.log(`${fileContentObj.fileName} successfully written.`);
console.log(`All Processes finished in ${(t1 - t0).toFixed(3)}ms.`);

function printErrorAndAbort(errMessage)
{
    console.log(errMessage + '\n\nAborting application.');
    process.exit();
}
