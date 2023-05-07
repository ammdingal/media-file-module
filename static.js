const fs = require('fs');

function getExtensionName(string){
    let extName = "";
    for (let i = 0; i < string.length; i++){
        if (string[i] === "."){
            for (let j = 0; j < string.length - i; j++){
                extName += string[j + i];
            }
        }
    }
    return extName; 
}

function staticFile(request, response){

    const fileName = request.url;
    const fileExtension = getExtensionName(fileName);
    const fileTypes = {
        ".html": { contentType: "text/html", filePath: './views/' + fileName },
        ".css": { contentType: "text/css", filePath: '.' + fileName },
        ".jpg": { contentType: "image/jpg", filePath: '.' + fileName }
    };

    if (fileExtension in fileTypes) {
        const fileInfo = fileTypes[fileExtension];
        fs.readFile(fileInfo.filePath, function (errors, contents){
            response.writeHead(200, { "Content-Type": fileInfo.contentType });
            response.write(contents);
            response.end();
        });
    } else {
        response.writeHead(404);
        response.end("File not found!!!");
        return;
    }
}

module.exports = staticFile;
