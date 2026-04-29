const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

function getDirectoryStructure(dirPath) {
    const stats = fs.statSync(dirPath);

    if (stats.isFile()) {
        return {
            name: path.basename(dirPath),
            type: "file"
        };
    }

    const children = fs.readdirSync(dirPath);

    return {
        name: path.basename(dirPath),
        type: "directory",
        children: children.map(child =>
            getDirectoryStructure(path.join(dirPath, child))
        )
    };
}

router.get('/', (req, res) => {
    const directoryPath = "../music"; 

    try {
        const structure = getDirectoryStructure(directoryPath);
        res.json(structure);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


module.exports = router