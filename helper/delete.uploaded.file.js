const fs = require('fs');
const path = require('path')

//function to delete the file
async function deleteUploadedFile(file) {
    try {
        const __dirname = path.resolve()
        fs?.unlink(`${__dirname}/${file?.path}`, (err) => {
            if (err) {
                console.log(err);
            }
        })
    } catch (error) {
        throw error
    }
};

module.exports = deleteUploadedFile;