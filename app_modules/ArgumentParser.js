module.exports = { parse };

// Take the Command Line arguments as an array and transform them into an object
// { configFilePath: 'path' }
// If no arguments - return error
// If path to config file not given - return error
function parseArgs(inputArgsArr)
{
    if(inputArgsArr.length === 0) return ErrorEnum.NoInput;
    
    let inputOptions = {};

    for(let i = 0; i < inputArgsArr.length; ++i)
    {
        if(inputArgsArr[i] === '-p'){
            if(inputArgsArr[++i] === undefined || inputArgsArr[i] === '-o' || inputArgsArr[i] === '-p') continue;
            inputOptions.configFilePath = inputArgsArr[i];
            continue;
        }
    }


    if(!Object.keys(inputOptions).includes('configFilePath'))
        return ErrorEnum.NoConfigFilePath;

    return inputOptions;
}

// List of Errors - in the form of an Enum
const ErrorEnum = Object.freeze({
    'NoInput': -1,
    'NoConfigFilePath': -2
});

// Driver function - exported
// Returns the object
// Returns error message if there is error
function parse(inputArgs)
{
    this.inputArgs = inputArgs;
    this.inputOptions = parseArgs(this.inputArgs);

    if(this.inputOptions == ErrorEnum.NoInput)
        return 'Error: Expected input in the form:\nnode (filename).js -p path';
    else if(this.inputOptions == ErrorEnum.NoConfigFilePath)
        return 'Error: It is mandatory to provide the path of config file.';
    else
        return this.inputOptions;
}
