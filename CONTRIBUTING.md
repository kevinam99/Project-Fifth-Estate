# Contributing to the project

The branch management is as follows  
- [master](https://github.com/kevinam99/Project-Fifth-Estate):  
Branch for initial stages of development. Here you will find a lot of test codes we wrote and used while we were still setting up the project. This is **defunct**. Feel free to expeiment yourself.
- [firebase](https://github.com/kevinam99/Project-Fifth-Estate/tree/firebase):  
THis branch was created to test flows using Firebase over MongoDB. We found out that the implementation is rather simpler, efficient and straightforward when using MongoDB. **Defunct**
- [heroku](https://github.com/kevinam99/Project-Fifth-Estate/tree/heroku):  
This, here, is the *prod* branch where the backend of the project lives on Heroku. This contains the second-most updated state of the repo. This is an **active** branch.
- [ignoreGregFilter](https://github.com/kevinam99/Project-Fifth-Estate/tree/ignoreGregFilter):  
This branch was created to test flows wherein we would **NOT** look for the #greg in the Facebook posts that we would extract. Flows are explained further in the README.
- [restructure](https://github.com/kevinam99/Project-Fifth-Estate/tree/restructure):  
This branch has the most updated version of the code. This was first created because there was a need to restructure the project directory and then eventually, this was used to push the updated code. **Active**

Any other branches are just created to test approaches, features etc and are in no way related to the above branches yet.

This is the most updated branch. After a few features are built, they will be merged to the [Heroku](https://github.com/kevinam99/Project-Fifth-Estate/tree/heroku) branch which will trigger a build on Travis and upon passing the build, it will be deployed to Heroku.
The [src/services](./src/services/) folder contains the codes that perform the actions.

We don't intend to continue developing this project further since all of us working full time jobs, however, PRs are always welcome 🎉. Please email any one of us when you do open a PR.