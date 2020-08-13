// Obtain the route config object
// Create an object of the type
// { fileName: 'path/filename', content: '' }
module.exports = { fileContentCreator };

function RoutesFileContentCreator(routeConfigObj, fileObj)
{
    let tabWidth = `    `;
    let lineEnd = '';

    if(routeConfigObj.routes.length == 0)
        return ErrorEnum.NoRoutePresent;
    
    if(/^(Unix)/i.test(routeConfigObj['line-ending']) || /^(Linux)/i.test(routeConfigObj['line-ending']))
        lineEnd = `\n`;
    else if(/^Windows/i.test(routeConfigObj['line-ending']))
        lineEnd = `\r\n`;
    else
        return ErrorEnum.NoProperLineEnd;
    
    if(/[\\/]$/.test(routeConfigObj.directory))
        fileObj.fileName = `${routeConfigObj.directory}${routeConfigObj['file-name']}`
    else{
        if(lineEnd === '\n')
            fileObj.fileName = `${routeConfigObj.directory}/${routeConfigObj['file-name']}`
        else
            fileObj.fileName = `${routeConfigObj.directory}\\${routeConfigObj['file-name']}`
    }

    let fileContent = `import { Routes } from '@angular/router';${lineEnd}`

    fileContent += `${lineEnd}export const routes: Routes = [${lineEnd}`
    for(let i = 0; i < routeConfigObj.routes.length; ++i)
    {
        let route = routeConfigObj.routes[i];
        fileContent += `${tabWidth}{${lineEnd}`;
        try{ 
            fileContent += `${tabWidth}${tabWidth}path:'${route.pathName}',${lineEnd}`;
            fileContent += `${tabWidth}${tabWidth}loadChildren: () => import('${route.path}').then(m => m.${route.moduleName})${lineEnd}`;
        }
        catch(err)
        {
            return ErrorEnum.RouteError;
        }
        fileContent += `${tabWidth}}`;

        if(i != routeConfigObj.routes.length - 1)
            fileContent += `,${lineEnd}`;
        else
            fileContent += `${lineEnd}`;
    }
    fileContent += `];`;
    
    fileObj.content = fileContent;

    return fileObj;
}

const ErrorEnum = Object.freeze({
    'NoRoutePresent': -1,
    'NoProperLineEnd': -2,
    'RouteError': -3
});

function fileContentCreator(routeConfigObj)
{
    this.fileObj = {};
    this.fileObj = RoutesFileContentCreator(routeConfigObj, this.fileObj);

    if(this.fileObj == ErrorEnum.NoRoutePresent)
        return 'Error: No routes present in the JSON file.';
    if(this.fileObj == ErrorEnum.NoProperLineEnd)
        return 'Error: Please define a Line end type (Unix/Windows) in JSON file.';
    if(this.fileObj == ErrorEnum.RouteError)
        return 'Error while reading the routes.'
    
    return this.fileObj;
}
