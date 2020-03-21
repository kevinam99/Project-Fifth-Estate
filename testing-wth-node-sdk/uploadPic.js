const FB = require('fb').default;
const secrets = require('../testing-stuff/secrets.json');
const fs = require('fs');

FB.options({version: 'v6.0'});

let app = FB.extend({appId: secrets.app.id, appSecret: secrets.app.secret})
let access_token = secrets.page.access_token;
let groupId = secrets.groups.kevin;

FB.setAccessToken(access_token);

let imgPath = '/home/kevin/Pictures/Selection_015.png';
let imgCaption = 'Trying to upload using the SDK module';

FB.api(`${groupId}/photos`, 'post', { 
    source: fs.createReadStream(imgPath), 
    caption: imgCaption,
    alt_text_custom: `P5E weekly report`,
    place: "693912274113140"
    }
    , function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.post_id);
});














// FB.api('me/photos', 'post', { source: { value: photoBuffer, options: { filename: 'upload.jpg', contentType: 'image/jpeg' } }, caption: 'My vacation' }, function (res) {
//   if(!res || res.error) {
//     console.log(!res ? 'error occurred' : res.error);
//     return;
//   }
//   console.log('Post Id: ' + res.post_id);
// });