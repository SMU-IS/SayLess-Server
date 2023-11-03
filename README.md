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

   ```
    VITE_API_KEY=AIzaSyDK3bNzaTJQur2o-1H1a709cdQS4gwzQy0
    VITE_AUTH_DOMAIN=project-is216-9e085.firebaseapp.com
    VITE_PROJECT_ID=project-is216-9e085
    VITE_STORAGE_BUCKET=project-is216-9e085.appspot.com
    VITE_MESSAGING_SENDER_ID=933793675618
    VITE_APP_ID=1:933793675618:web:d95d1db6ee06af52add43b
    VITE_GET_LISTING=http://54.252.152.169:3000/api/listing/get-listing
    VITE_POST_LISTING=http://54.252.152.169:3000/api/listing/add-food-listings
    VITE_GET_RECIPE=http://54.252.152.169:3000/api/recipe/search-recipe
    VITE_GET_RECIPE_DETAILS=http://54.252.152.169:3000/api/recipe/get-recipe
    VITE_GET_QUEST_DATA=http://54.252.152.169:3000/api/quest/get-quests
    VITE_QUEST_STATUS_COMPLETION_STATUS=http://54.252.152.169:3000/api/quest/update-quests
    VITE_GET_CHATROOM=http://54.252.152.169:3000/api/chatroom/get-chatrooms
    VITE_CREATE_CHATROOM=http://54.252.152.169:3000/api/chatroom/create-chatrooms
    VITE_GET_CHAT=http://54.252.152.169:3000/api/chat/get-chats
    VITE_CREATE_CHAT=http://54.252.152.169:3000/api/chat/create-chat
    VITE_GET_TOKEN=http://54.252.152.169:3000/api/cred/get-token
    VITE_GET_SAMPLE_CHATROOM=http://54.252.152.169:3000/api/chatroom/get-chatrooms
    VITE_GET_USER=http://54.252.152.169:3000/api/user/get-user
    VITE_SET_REQUEST=http://54.252.152.169:3000/api/listing/request-food-listings
    VITE_READ_CHAT=http://54.252.152.169:3000/api/chat/read-chat
    VITE_AUTHENTICATE_USER_RETRIEVE_USER_DATA=http://54.252.152.169:3000/api/user/auth
    VITE_ADD_INVENTORY=http://54.252.152.169:3000/api/inventory/add-inventory
    VITE_GET_INVENTORY=http://54.252.152.169:3000/api/inventory/get-inventory
    VITE_REMOVE_INVENTORY=http://54.252.152.169:3000/api/inventory/delete-inventory
    VITE_SEND_IMAGE_EDEN_AI=http://54.252.152.169:3000/api/file/scan-receipt
    VITE_CLOSE_LISTING=http://54.252.152.169:3000/api/listing/close-food-listings
    VITE_CHAT_SOCKET=ws://54.252.152.169:8887
   ```

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

   ```
   DB_URL=https://project-is216-9e085-default-rtdb.asia-southeast1.firebasedatabase.app
   SERVICE_ACCOUNT={"type": "service_account","project_id": "project-is216-9e085","private_key_id": "a5b61d8736c63941cf9e19b35bae9d4a90129185","private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCSc2MCSeEfEgq3\nbqLj6h2MO3sgx0LPmOaznHlrEbBF8EvIjbmjaSvC2It2NJ4CqPH9RPvJ6iuTpLEm\nIH+EV7SJiQiu6JBp888gBqy6C6rMPEwwzDU73GgOQOaVByKUwrFjtXouT7hwj1iy\ndZ8wb8/aGSzqA1fgagVOLjvrAWlJB14A/Jb2ulFiBOdij7kgUj6b9W7R1vgRlKKx\nCyot4kUH4sAwIVA9DzgSTdAYY/ckgyNAAKaudiv0SDZ+O8KgG+gsXAAUTnuSWUpq\n3O1h/z4FwGdA52ognd1i2NGI1det3skADCCzOGI8v+GWJLimXyUCjhQluGxNQ8al\nUqCst0mfAgMBAAECggEABtOTOwuB/SjGtNGf+rjgINyypAWlxC5bQFQOUELGPvxV\nnkcGE6IyO29xLDA8RCpVAegfj+jAKq484WapQdxHA8tXb7RS64sgsjfCANM6ZlYt\nxLiJPiI5IJ6ssyfw2CUtawvXGZPSTRqYT9SuClv1Cg/SW5GOnMrCEkQA4CSYsqId\neuOLDH0GYYN9APJPqOmhs8F87+P3JSSztQQi8B4EdILors1Vpizsy8/ErYbT1e92\nJlAbuuMMDkKDR9ipk7wXuRy9fLy+aZkrWAPVjx0dQ1UWIvtU5NxU260iqxagO6nA\nom3+bkrDEPNTKmnHVtDUHWasdMsXIL8IyvdRHzz4gQKBgQDN7v889ei5kkuRBiER\nEjhwTGppUqszsAURoqvDgQsNVLW5+BnKJj9IzfCzDs+IWfb3bY7ycwyooZgR5c+3\nBEl5JPBMxtjnvDifavJu0P5P31z/JB0VqyUZKcb4XsI1p4IZqMW5cbibvmnwEALz\ntAIoLOoB3iaGlLFLgssm34pUaQKBgQC2DkO5xemVQJQ0waAevALjgPtN+hE5IXQz\nPyJNUnJ2/DU1YxoEmQnqUifSqES7TCOIVVHVBclHQobU6A/K+hDf/MyMS4xlC/yg\nXY39aNerKuJfrcNAzzQlJOLd7yn09q411pNtmcwWiRnupha0VAmEBa00qKAgTLHc\ndrQ9+AzMxwKBgQCvv8duxEOQlC0PoNZ5lj46gMzUBCx+GTvKODU0zZ2cC+5nvzhr\nUEb0IGXKutoc+QKPWZ4EhnGIPRjmNWYXQH5f+ElojM+yvezpCMHMF2riybK5QJ3d\nz0kC96eKcnx2g/XBZksQn+A4csJAkbmjOL4agXJYk7n3Y1EIK6CrFV4d+QKBgAOO\n+dHqxWsObRcu5bNUF3Zc8gyPI8ELH1tVE5WRU/1xZpTZkAug9imnW3HpqhZDIbqr\neEMCrvF+omYM9yoPgz7tkQ34+BCNkG2OBpV6dCS7XNtj6RoeMrW7J9gQsbBBFhyl\nShJtXCjgmyooAu+ZaOo0tjL+TMr01NErXNCNRarHAoGALk1Ajag63kus7R+wN0tf\n9ZaQvrDOxsL+bQ3cItKmTo0MquypUeXycShF73AZJFoaxe+RPnTYGdK+zltKbERt\nlGHhn0rGmzf1vP/14wvIve2q48V3RRXG9rdcthMa18Nm93ONGlFPTnzxDnwQDZvw\nCog6WUfNTGs7jsH96jFgJ8g=\n-----END PRIVATE KEY-----\n","client_email": "firebase-adminsdk-0wd8a@project-is216-9e085.iam.gserviceaccount.com","client_id": "103194888198755818852","auth_uri": "https://accounts.google.com/o/oauth2/auth","token_uri": "https://oauth2.googleapis.com/token","auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-0wd8a%40project-is216-9e085.iam.gserviceaccount.com","universe_domain": "googleapis.com"}
   MONGO_DB_URL=mongodb+srv://wasteless:wasteless123@sayless.vv7vzei.mongodb.net/SAYLESS
   TOKEN_KEY=VSECUREKEY
   EDENAI_TOKEN="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWIyMzI2NmItZTgzZi00OGM5LTk2ODItZWI3YWMzNmI0MDdkIiwidHlwZSI6ImFwaV90b2tlbiJ9.t8xT9g3b_YRvfB1W_18tz8RhjMDTBAd-GPmoFxrFn8c"
   ```

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
