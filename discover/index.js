const path = require('path'),
    fs = require('fs'),
    config = require('../config');



function walk(callback) {

    fs.readdir(config.startDirectory, function (err, files) {
        if (!err) {
            files.array.forEach(function (file) {
                var filepath = path.join(config.baseDirectory)
                fs.stat(filepath, function (err, stats) {
                    if (!err) {
                        if (stats.isDirectory()) {
                            walk(callback);
                        } else if (stats.isFile()) {
                            let ext = path.extname(filepath).replace(".", "");
                            let isWanted = config.extensions.find(wanted => wanted === ext);
                            if (isWanted) callback(filepath);
                        }
                    }
                })
            });
        }
    });
}