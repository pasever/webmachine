/////////////////////////////////////////////////////////
////// Netlify Deployment and Maintenance functions /////
/////////////////////////////////////////////////////////


'use strict';

const recursiveReadSync =       require('recursive-readdir-sync');
const sha1 =                    require('sha1');
const axios =                   require('axios');
const config =                  require('../../config').init();
const Client =                  require('./db');
const fs =                      require('fs');


let replaceableTokens = [
    "!!-- NAME --!!",
    "!!-- CTA --!!",
    "!!-- SHORTDESCRIPTION --!!",
    "!!-- LONGDESCRIPTION --!!"
];

let files = [];


const getDirectoryFiles = (readDir) => {
    try {
        files = recursiveReadSync(readDir);
    } catch(err) {
        if(err.errno === 34) {
            console.log("Path does not exist");
        } else {
            console.log(":::ERR:::", err);
            throw err;
        }
    }
}

const replaceContent = (content, replacingWith) => {
    let newContent = content;
    if(typeof content === "string") {
        replaceableTokens.forEach((current, index) => {
            if(newContent.indexOf(current) > -1) {
                let regex = new RegExp(current, "g");
                content = content.replace(regex, replacingWith[index]);
            }
        })
    }
    return content;
}

const isImageFile = (fileName) => {
    fileName = fileName.toLowerCase();
    return fileName.indexOf('.jpg') > -1 || 
        fileName.indexOf('.jpeg') > -1 ||
        fileName.indexOf('.gif') > -1 ||
        fileName.indexOf('.bmp') > -1;
}

const readFiles = (replaceDir, replacingWith) => {
    let count = 0;
    let fileData = [];
    return new Promise((resolve, reject) => {
        const handler = (current, err, content, utf=true) => {
            count++;
            if(err) {
                return console.log("ERR in readFiles::::::", err);
            }
            if(utf) {
                content = replaceContent(content, replacingWith);
            }
            fileData.push({ "filename": current.replace(/\\/g, '/').replace(replaceDir, '/'), "content": content, "sha1": sha1(content)});
            if(count === files.length)
                resolve(fileData);
        }
        
        files.forEach((current) => {
            if(isImageFile(current)) {
                fs.readFile(current, (err, content) => { 
                    if(err) throw err;
                    handler(current, err, content, false);
                });
            } else {
                fs.readFile(current, 'utf8', (err, content) => { 
                    if(err) throw err;
                    handler(current, err, content);
                })
            }
        })
    })
}

const deployNetlifySite = (client, templateData) => {
    return new Promise((resolve, reject) => {
        // Builds our files array.
        getDirectoryFiles(templateData.folderLoc);
        // Our Netlify Files dictionary
        let fileDictionary = {};
        let name = client.name.replace(new RegExp(' ', 'g'), "-");
        let uri = `${ name }.netlify.com`.toLowerCase();
        console.log("URI:::::\n" + uri)
        readFiles(templateData.folderReplace, [client.name, client.siteData.callToAction, client.siteData.shortDescription, client.siteData.longDescription]).then(resp => {
            let dataFiles = resp;
            
            // Creates a file dictionary of filename: sha1 --- for netlify deploy.
            dataFiles.map(current => {
                fileDictionary[current.filename] = current.sha1;
            });
            
            axios.post('https://api.netlify.com/api/v1/sites?access_token=' + config.netlify.token + '&name=' + name).then(siteCreateResponse => {
                client.netlifySiteId = siteCreateResponse.data.site_id;
                client.web = "https://" + uri;
                console.log("POSTED WEB:::" + client.web);
                Client.updateClient(client); // we can drop the promise here                
                axios.post('https://api.netlify.com/api/v1/sites/' + uri + '/deploys?access_token=' + config.netlify.token, { "files": fileDictionary }).then(deployResponse => {
                    let deployId = deployResponse.data.id;
                    deployResponse.data.required.forEach(currSha => {
                        dataFiles.map(current => {
                            if(current.sha1 === currSha) {
                                axios({
                                    method: 'PUT',
                                    url: 'https://api.netlify.com/api/v1/deploys/' + deployId + '/files' + current.filename + '?access_token=' + config.netlify.token,
                                    headers: { 'Content-Type': 'application/octet-stream'},
                                    data: current.content}).then(uploadResponse => 
                                        console.log("File deployed!")
                                    ).catch(err => reject(err.data));
                                }
                            }
                        )
                    })
                    resolve(client);
                }).catch(err => reject(err.data));
            }).catch(err => reject(err.data));
        }).catch(err => reject(err.data));

    })
}

exports.deployNetlifySite = deployNetlifySite;