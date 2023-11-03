# SAYLESS

A gamified web application connecting people to reduce food wastage by sharing excess food, and providing a platform for inventory management

## Credentials to login to the app:

`Email: demo@gmail.com`
`Password: P@ssw0rd`

##### Feature Includes

- Users can scan supermarket receipts to add items into their food inventory.
- Users can search for recipes based on the ingredients they have in their inventory
- A community sharing page for users to list/get free food items from the community
- They can complete missions to reduce food waste and win vouchers

## Project Links

Deployed to cloud: `http://sayless.space`
Client Git Repo: `https://github.com/SMU-IS/SayLess.git`
Server Git Repo: `https://github.com/SMU-IS/SayLess-Server.git`

##### Tested on

NPM Version - `9.8.0`
Node Version - `v20.5.1`

## To run the front-end app,

1. Clone the project

   ```
   git clone https://github.com/SMU-IS/SayLess.git
   ```

2. Install dependencies

   ```
   npm ci
   ```

3. Update environment variables

   - Create `.env.local` at the project root folder
   - Add in the these lines of code

4. To run the project, enter the command

   ```
   npm run dev
   ```

5. Project running on `localhost:5173` (default)

## To run the back-end app,

Server is currently deployed on AWS EC2 Server
`54.252.152.169`

### To run your own server,

##### Note: Update the base URL for client .env.local file to the respective IP address

1. Clone the project

   ```
   git clone https://github.com/SMU-IS/SayLess-Server.git
   ```

2. Install dependencies

   `npm install`

3. Update environment variables

   - Create `.env` at the project root folder
   - Add in the these lines of code

4. Run the project Locally

   `nodemon index.js`

   or
   Run the project in Deployment

   1. Install PM2 globally
      `npm install pm2 -g`
   2. Create config file
      `eco.config.js`
      `   module.exports = {
apps: [
    {
        name: "wasteless-kitchen",
        script: "index.js", // Replace with the entry point of your Node.js app
        watch: true, // Auto-restart the app on file changes (optional)
        "node_args": "--max_old_space_size=512",
        env: {
        NODE_ENV: "production", // Set the environment variable (optional)
        // PORT: 3000, // Set your application's port (optional)
    }
   }
 ]};
`
   3. Run Server in deployment
      ```
      > pm2 eco.config.js
      ```

5. Project running on `localhost:3000` (default)

6. Refer to API documentation
   `https://documenter.getpostman.com/view/23431593/2s9YJgU1Pv#75b2c1a7-e22b-4c3b-8c21-35789a3b7665`

### G4T7 - Team Details

##### [@Joshua David Ang Chun Xiong - 01404384](https://github.com/joshuadavidang)

##### [@Shawn Ng Yong Han - 01404613](https://github.com/shawnkharece)

##### [@Derrick Lim Kai Hao - 01405417](https://github.com/derrick-lkh)

##### [@Bryan Chua Jia Heng - 01429656](https://github.com/bryantheball)
