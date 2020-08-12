// Collect the command-line arguments

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

function printErrorAndAbort(errMessage)
{
    console.log(errMessage + '\n\nAborting application.');
    process.exit();
}
