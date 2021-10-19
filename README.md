# Project-Fifth-Estate

This is the backend repo that contains the implementation of our ([Aditya](https://github.com/adityachanekar), [Minal](https://github.com/Minal72/) and [Kevin](https://github.com/kevinam99)) final year engineering project, a social media based complaint tracking and aggregation system. a.k.a Greg.

Find the UI repo [here](https://github.com/Minal72/Front-end-vue).

## About the project
Social media is known to be a powerful tool used to amplify and empower just about anyone from anywhere and hence, it solves several problems and use cases. 

The use case we're approaching is about public grievance registration with government departments (Transport, Education, Health etc.). With the current systems in place, the process is long and cumbersome to register a complaint and the public is hardlyh aware of the complaint's status.

We're solving both these problems by:
- picking up complaints straight from Facebook posts
- using a public dashboard that gives an overview of the total complaints received and then graphs regarding the aggregated number of complaints according to their status

## Flow
1. A user joins the Facebook group that is montitored by this system.
2. They write a post along with #greg and #Goa<dept_name> so that the system can identify it as a relevant post and determine the appropriate department. They also tag the appropriate location that concerns the post. However, we're ignoring #greg. We did this to have a version that doesn't rely on the #, though, this branch isn't updated.
3. We run sentiment analysis over the text of the post to ascertain if the post is a positive feedback or a complaint and then it gets aprropriately segregated.

## Setting up the project
1. Clone the repo.
2. Create the .env file with the relevant variables. Be sure to have access to the Facebook group that you intend to extract the posts.
3. Run `npm install` to download the dependencies.
4. Start the project on a dev server by running `npm run start` on port `5000`.

## Stack
- Node.js
- Express.js
- Facebook Graph API
- MongoDB Atlas

We don't intend to continue developing this project further since all of us working full time jobs, however, PRs are always welcome 🎉. Please email any one of us when you do open a PR.


## License
MIT License

Copyright (c) 2021 Project Fifth Estate

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
