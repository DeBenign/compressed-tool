const express = require("express");

const multer = require("multer")
const fs = require("fs");
const path = require("path");
const exp = require("constants");
const admzip = require("adm-zip")

const app = express();

app.use(express.static("public"))

let dir = "public";
let subDirectory = "public/uploads";

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);

    fs.mkdirSync(subDirectory)
}

let storage = multer.diskStorage({
    destination: function( req, file, cb){
        cb(null ,  "public/uploads");
    },
    filename: function( req, file, cb ){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

let maxSize = 500 * 1024 * 1024

let compressFilesUpload = multer({storage: storage, limits: { fileSize: maxSize}});


app.get("/", compressFilesUpload.array('file', 100),( req, res ) => {
    res.sendFile(__dirname + "/index.html")
});


app.post("/compressFiles", compressFilesUpload.array('file', 100),( req, res ) => {
    
    const zip = new admzip()
    if(req.files){
        req.files.forEach(file => {
            zip.addLocalFile(file.path)
        });
        let outputPath = Date.now() + "output.zip"
        fs.writeFileSync(outputPath, zip.toBuffer());
        res.download(outputPath, (err) => {
            res.send("Error in Downloading ZIP File")
        })
        req.files.forEach(file => {
            fs.unlinkSync(file.path)
        })
        fs.unlinkSync(outputPath)
        
    }
});


app.listen( 4000, () => {
    console.log("App is listening on Port 4000")
})