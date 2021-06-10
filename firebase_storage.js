const keyFilename="./firebase_admin.json"; //replace this with api key file
const projectId = "digitalcoursefile-efa96" //replace with your project id
const bucketName = `${projectId}.appspot.com`;
 
const {Storage} = require('@google-cloud/storage');
const gcs = new Storage({
    projectId,
    keyFilename
});
 
const bucket = gcs.bucket(bucketName);

// const filePath = `./package.json`;
// const uploadTo = `subfolder/package.json`;
// const fileMime = mime.getType(filePath);
 
 
// bucket.upload(filePath,{
//     destination:uploadTo,
//     public:true,
//     metadata: {contentType: fileMime,cacheControl: "public, max-age=300"}
// }, function(err, file) {
//     if(err)
//     {
//         console.log(err);
//         return;
//     }
//     console.log(createPublicFileURL(uploadTo));
// });
 
 
function createPublicFileURL(storageName) {
    return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;
}

module.exports = bucket;

