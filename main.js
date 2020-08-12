// Collect the command-line arguments

let inputArgs = process.argv.slice(2);

let inputOption = require('./app_modules/ArgumentParser').parse(inputArgs);

if(typeof(inputOption) === 'string')
{
    console.log(inputOption + '\n\nAborting application.');
    process.exit();
}

