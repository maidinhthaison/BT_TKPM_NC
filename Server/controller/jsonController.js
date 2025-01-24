const fs = require('fs');
const path = require('path');

var pathFile = path.join('Tra_cuu_Nhan_vien_Du_lieu', 'Du_lieu', 'Nhan_vien');
var jsonPathFile  = "db.json";

const createJson = async (req, res, next) => {
    try{
        
        let files = fs.readdirSync(`./${pathFile}`).filter(file => 
            { return file.includes('.json')});
        let array=[];
        files.forEach(file => {
            let fileContent=fs.readFileSync(`./${pathFile}/${file}`, 'utf8');
            array.push(JSON.parse(fileContent));
        })
        const json = JSON.stringify(array, null, 2);
        try {
            fs.writeFileSync(`./${pathFile}/${jsonPathFile}`, json, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing to file', err);
                    res.status(200).send(`Error writing to file ${err}`);
                } else {
                    console.log('Data written to file');
                    res.status(200).send(json); 
                }
            });
        } catch (err) {
            console.error(err);
        }
        
    }catch{
        console.log(res.status);
        res.status(400).send(error.message);
    }
}

const parseJson = () => {
    let fileContent=fs.readFileSync(`./${pathFile}/${jsonPathFile}`, 'utf8');
    return JSON.parse(fileContent);
}

module.exports = { createJson, parseJson }