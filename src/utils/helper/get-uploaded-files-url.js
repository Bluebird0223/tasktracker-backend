async function getUploadedFilesUrl(files, fieldsObject = []) {
    try {
        files?.forEach((file) => {
            const splitUrlArray = file?.destination?.split("/");
            const filteredUrl = splitUrlArray[splitUrlArray.length - 3] + '/' + splitUrlArray[splitUrlArray.length - 2] + '/' + splitUrlArray[splitUrlArray.length - 1] + file.filename;
            if (file?.mimetype?.startsWith('image/')) {
                const documentData = {
                    fieldName: file.fieldname,
                    documentName: file.originalname,
                    fileUrl: filteredUrl,
                    type: file?.mimetype?.startsWith('image/') ? "image" : file?.mimetype?.startsWith('application/') ? "pdf" : "video"
                };

                fieldsObject?.push(documentData)
            } else {
                const documentData = {
                    fieldName: file.fieldname,
                    documentName: file.originalname,
                    fileUrl: filteredUrl,
                    type: file?.mimetype?.startsWith('image/') ? "image" : file?.mimetype?.startsWith('application/') ? "pdf" : "video"
                };
                fieldsObject?.push(documentData)
            }
        })
        return fieldsObject
    } catch (error) {
        throw error;
    }
}

module.exports = getUploadedFilesUrl;