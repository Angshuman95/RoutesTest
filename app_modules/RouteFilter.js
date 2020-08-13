// Take the config object
// Take the user-option
// Return an object with only the correct option
module.exports = { filter };

function filterConfigObj(configObject, correctOption)
{
    if(correctOption !== undefined)
    {
        if(!Object.keys(configObject.routes).includes(correctOption))
            return ErrorEnum.InputOptionNotMatching;
        configObject.routes = configObject.routes[correctOption];
    }
    else if(correctOption === undefined && configObject.option !== undefined)
    {
        if(!Object.keys(configObject.routes).includes(configObject.option))
            return ErrorEnum.ConfigOptionNotMatching;
        configObject.routes = configObject.routes[configObject.option];
    }
    else
    {
        configObject.routes = configObject.routes[Object.keys(configObject.routes)[0]];
    }
    
    return configObject;
}

const ErrorEnum = Object.freeze({
    'InputOptionNotMatching': -1,
    'ConfigOptionNotMatching': -2
});

function filter(configObject, correctOption)
{
    this.filteredConfigObject = filterConfigObj(configObject, correctOption);
    if(this.filteredConfigObject == ErrorEnum.InputOptionNotMatching)
        return `Error: The option you entered is not present.`
    if(this.filteredConfigObject == ErrorEnum.ConfigOptionNotMatching)
        return `Error: The option present in JSON is not present in the route.`

    return this.filteredConfigObject;
}
