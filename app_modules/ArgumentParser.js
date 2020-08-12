module.exports = { parse };


function parseArgs(inputArgsArr)
{
    if(inputArgsArr.length === 0) return ErrorEnum.NoInput;

    let inputOptions = {};

    for(let i = 0; i < inputArgsArr.length; ++i)
    {
        if(inputArgsArr[i] === '-p' || inputArgsArr[i] === '-P' || inputArgsArr[i] === '--path')
            inputArgsArr.configFilePath = inputArgsArr[++i];

        if(inputArgsArr[i] === '-o' || inputArgsArr[i] === '-O' || inputArgsArr[i] === '--option')
            inputOptions.optionName = inputArgsArr[++i];
    }


    if(!Object.keys(inputOptions).includes('configFilePath'))
        return ErrorEnum.NoConfigFilePath;

    if(!Object.keys(inputOptions).includes('optionName'))
        inputOptions.optionName = undefined;
    
    return inputOptions;
}

const ErrorEnum = Object.freeze({
    'NoInput': -1,
    'NoConfigFilePath': -2
});

function parse(inputArgs)
{
    this.inputArgs = inputArgs;
    this.inputOptions = parseArgs(this.inputArgs);

    if(this.inputOptions == ErrorEnum.NoInput)
        return 'Error: Expected input in the form \nnode main.js -p path [-o option]';
    else if(this.inputOptions == ErrorEnum.NoConfigFilePath)
        return 'Error: It is mandatory to provide the path of config file';
    else
        return this.inputOptions;
}
