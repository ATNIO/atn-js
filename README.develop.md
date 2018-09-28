##  npm package steps
   This file introduce how to publish the dist package module. If you have change the src code files context,you should follow the steps

### step 1 
  Login in your npm account (if you are the member and you want to use the accout , contact @echo)
  ````
  npm login
  ````
   
   
### step 2
   
  Before you build the src files , you should use tslint to check your coding standards. [What is tslint](https://www.npmjs.com/package/tslint)
  Using the following command
  ```
  npm run lint
  ```
   
  Rebuild your src files 
  
  ```
  npm run build
  ```
  
### step 3
  
  Publish your dist 
  ```
 npm publish 
  ```
