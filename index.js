const path = require('path')
const fs = require('fs')
const stripJsonComments = require('strip-json-comments')

module.exports = options => (req, res, next) => {
    const filePath = path.resolve(options.root, `./${req.method.toLowerCase()}`, `./${req.path}`, 'data.json')
    
    if(!fs.existsSync(filePath)) return next()
    fs.readFile(filePath, (err, data) => {
        if(err) return console.log(err)
        res.status(200).json(JSON.parse(stripJsonComments(data.toString())))
    });
}