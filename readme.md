# Backend Todo

This a simple backend service for todo App.

### Tech

This app uses a number of open source projects to work properly:

* NodeJs
* ExpressJs
* Sequelize 
* Serverless
* Mocha
* Chai

### Installation

This app running well in local & cloud. If you want run locally, try this command:

With Serverless framework: 
```sh
$ sls offline start 
```

With Express Js: 

```sh
$ npm install
$ npm run local
```

If you want see API in cloud, just hit the base url:

```sh
https://pcdp2m10n8.execute-api.ap-southeast-1.amazonaws.com/dev/
example: 
https://pcdp2m10n8.execute-api.ap-southeast-1.amazonaws.com/dev/api/user-management/login
```
If you need API documentation, you can find postman collection in postman folder.

### Test
This repo contain some test case with mocha.
```sh
$ npm run test
```

Thanks



