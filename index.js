const path = require('path')
const fs = require('fs')
const stripJsonComments = require('strip-json-comments')

module.exports = options => (req, res, next) => {
    const jsFilePath = path.resolve(options.root, `./${req.method.toLowerCase()}`, `./${req.path}`, 'data.js')
    if(!fs.existsSync(jsFilePath)){
        console.log('data from js')
        return res.status(200).json(require(jsFilePath)(req))
    }

    const filePath = path.resolve(options.root, `./${req.method.toLowerCase()}`, `./${req.path}`, 'data.json')
    
    if(!fs.existsSync(filePath)) return next()
    fs.readFile(filePath, (err, data) => {
        if(err) return console.log(err)
        res.status(200).json(JSON.parse(stripJsonComments(data.toString())))
    });
}