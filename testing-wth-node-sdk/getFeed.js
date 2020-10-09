require('dotenv').config()
const FB = require('fb').default;
// const secrets = require('../testing-stuff/secrets.json')
FB.extend({appId: process.env.APP_ID, appSecret: process.env.APP_SECRET})
let page_access_token = process.env.PAGE_ACCESS_TOKEN
let groupId = 210553450180199

FB.setAccessToken(page_access_token)

const options = {
					"fields":`description,
							  full_picture,
							  message,
							  message_tags,
							  story_tags,
							  created_time,
							  coordinates,
							  name,
							  link,
							  place,
							  picture,
							  status_type,
							  type,
							  attachments{media},
							  comments{message_tags}`
				}

FB.api(`/${groupId}/feed`, 'GET', options, res => {
      if(res.error)
      {
        console.error(res.error)
      }
      else{
        console.log(res.data.length)
        try {
          // writing feed to file
            const fs = require('fs')
            let path = "./file.json"
            fs.writeFileSync(path, JSON.stringify(res, null, 4))
          } 
        catch (err){
          console.error(err)
        }
      }
    }
  )
