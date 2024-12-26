https://www.youtube.com/live/rJSaEhrCiFo?si=C7K4OTju1hejMpBe
https://github.com/100xdevs-cohort-2/paytm/

# We're building a PayTm like application that let's users sen money to each other given an initial dummy balance
## Step 1: Create a new project using express-generator
## Step 2: User Mongoose schemas

    We need to support 3 routes for user authentication
    1. Allow user to sing up.
    2. Allow user to sing in.
    3. Allow user to update their information (firstName, lastName, password).
   
**To start off, create the mongo schema for the user table**
   1. Create a new file `db.js` in the root folder
   2. Import mongoose and connect to a database of your choice
   3. Create the mongoose schema for the user table
   4. Export the mongoose model from the file (call it User)
   
   **is it good way to write your mongodb connection string in your db.js file and push it to the github?**

## Step 3: Create routing file structure

In the `index.js` file, route all the request to `/api/v1` to a api router defined in `backend/routes/index.js`

1. Create a new file `backend/routes/index.js` that exports a new express router.
2. Import the router in `index.js` and route all requests from `/api/v1` to it.

## Step 4: Route user requests 

1. Create a new user router:- Define a new router in `backend/routes/user.js` and import it in the index router.
Route all the requests that go to `/api/v1/user` to the user router.
2. Create a new uerRouter in `backend/routes/index.js` so all requests to `/api/v1/user` get routed to the userRouter.

## Step 5: Add cors, body parser and jsonwebtoken
1. Add cors (`npm i cors`) :- Since our frontedn and backend will be hosted on separate routes, and the `cors` middleware to `backend/index.js`
2. Add body parser:- Since we have to support the JSON body in post requests, add the express body parser middleware to `backend/index,js` You can use the `body-pareser` npm library, or use express.json
3. Add jsonwebtoken (`npm i jsonwebtoken`) :- We will be using jsonwebtoken for user authentication. Add the `jsonwebtoken` npm library to the project.
4. Export JWT_SECRET form a new file `backend/config.js`
5. Listen on port `3000`

## Step 6: Add backend auth routes
In the user router (`backend/routes/user.js`), add 3 new routes.
1. **Signup** :- This route needs to get user information, do input validation using zod (`npm i zod`) and store the information in the database provided 
   1. Inputs are correct (validated via zod)
   2. Database doesn't already contain another user with the same email

   If all goes well, return a JWT which has their user id encoded as follows:
   ```javascript
   {
    userIf: "userId of newly aded user"
   }
    ```

    | **NOTE**:- **We are not hashing password before putting them in the database. This is standard practise that should be done, You can find more details here [Password Hashing](https://mojoauth.com/blog/hashing-passwords-in-nodejs/ "https://mojoauth.com/blog/hashing-passwords-in-nodejs/")**

    Method: `POST`
    Route: `/api/v1/user/signup`
    Body: 
    ```javascript
    {
        username: "user@email.com",
        firstName: "John",
        lastName: "Doe",
        password: "password#123"
    }
    ```
    **Response:**
    
    *Status code 200*
    ```javascript
    {
        message: "User created successfully",
        token: "JWT"
    }
    ```
    *Status code 411*
    ```javascript
    {
        message: "Email already taken / Incorrect inputs"
    }
    ```
2. **Signin** :- This route needs to get user information, do input validation using zod and check if the user exists in the database. If the user exists, return a JWT which has their user id encoded as follows:

    Method: `POST`
    Route: `/api/v1/user/signin`
    Body: 
    ```javascript
    {
        username: "name@gmail.com",
        password: "password#123"
    }
    ```
    **Response:**

    *Status code 200*
    ```javascript
    {
        message: "User signed in successfully",
        token: "JWT"
    }
    ```

    *Status code 411*
    ```javascript
    {
        message: "Error while logging in"
    }
    ```
## Step 7: Middlewre
Now that we have a user account, we need to `gate` routes which authenticated users can hit.
For this, we need to introduce an auth middleware

Create a `middleware.js` file that exports an `authMiddleare` function

1. Checks the headers for an Authorization header (Bearer < token >)
2. Verifies that the token is valid
3. Puts the `userId` in the request object if the token checks out.
4. If not, return a 403 status back to the user
```
Header-
Authorization: Bearer <actual token>
```

## Step 8: User routes
1. **Route to update user infomation**

    User should be allowed to `optionally` send either or all of 
    1. password
    2. firstName
    3. lastName

    Wheneever they send, we need to update it in the database for the user.
    Use the `middleware` we defined in the last section to authenticate the user
    Method: `PUT`
    Route: `/api/v1/user`
    Body: 
    ```javascript
    {
        password: "password#123",
        firstName: "John",
        lastName: "Doe",
    }
    ```
    **Response:**
    Status code 200
    ```javascript
    {
        message: "User updated successfully"
    }
    ```

    Status code 411
    ```javascript
    {
        message: "Error while updating information"
    }
    ```

2. **Route to get users from the backend, filterable via firstName/lastName**
   
   this is needed so users can search for their friends and send them money

   Method: `GET`
    Route: `/api/v1/user/bulk`
    Query Parameter: `?filter=John` or `?filter=Doe`

    **Response:**

    Status code 200
    ```javascript
    {
        users: [{
            firstName: "",
            lastName: "",
            _id: "id of the user"
        }]
    }
    ```
    [OR Query Mongoose](https://stackoverflow.com/questions/7382207/mongooses-find-method-with-or-condition-does-not-work-properly "mongooses-find-method-with-or-condition" )

    [Like Query in MongoDB](https://stackoverflow.com/questions/3305561/how-to-query-mongodb-with-like "how-to-query-mongodb-with-like")

## Step 9: Create Bank related Schema

Update the `db.js` file to add one new schemas and export the respective models

#### Accounts table
The `Accounts` table will store the INR balances of a user.
The xchema should look something like this - 
```javascript
{
    userId: ObjectId (or string),
    balance: float/number
}
```
```
In the real world, you shouldn't store `floats` for balances in the database.
You usually store an integer which represents the INR value with decimal place (for eg. if someone has 33.33 rs in their account, you store 3333 in the database).

There is a certain precision that you need to support (which for india is 2/4 decimal places) and this allows you to get rid of precision errors by storing integers in your DB
```
You should reference the users table in the schema ([Hint](https://medium.com/@mendes.develop/joining-tables-in-mongodb-with-mongoose-489d72c84b60 "joining-tables-in-mongodb-with-mongoose") )


## Step 10: Transactions in databases
A lot of times, you want multiple database transactions to be `atomic`

Either all of them should update, or none should

This is super important in the case of a `bank`

## Step 11: Initialize balances on signup
Update the `signup` endpoint to give the user a random balance between 1 and 10000.
This is so we don't have to integrate with banks and give them random balances to start with.

## Step 12: Create a new router for accounts

1. **Create a new router**
   
    All user balances should go to a different express router (that handles all requests on `api/v1/account`).

    Create a new router in `rowtes/account.js` and add export it
2. **Route requests to it**

    Send all requests from `/api/v1/account/*` in `routes/index.js` to the router created in step 1.

## 13 Balance and transfer Ednpoints
Here, you'll be writing a bunch of APIs for the core user balances. There are 2 endpoints that we need to implement

1. **An endpoint for user to get their balance.**
   Method: `GET`
   Route: `/api/v1/account/balance`
   Response: Status code 200
   ```javascript
   {
    balance: 100
   }
   ```
2. **An endpoint for user to transfer money to another account**
   
   Method: `POST`
   Route: `/api/v1/account/transfer`

   Body: 
   ```javascript
   {
    to: string,
    amount: number
   }
   ```
   **Response:**

    Status code 200
    ```javascript
    {
     message: "Transfer successful"
    }
    ```
    Status code 400
    ```javascript
    {
     message: "Insufficient balance"
    }
    ```
    Status code 400
    ```javascript
    {
     message: "Invalid account"
    }
    ```

## The Core API provides the following methods to implement transactions: 
- **startSession()**: Creates a new ClientSession instance.
- **startTransaction()**: Starts a new transaction on the session.
- **commitTransaction()**: Commits the active transaction in the session that it was created in
- **abortTransaction()**: Ends the active transaction in the session that it was created in
- **endSession()**: Ends the active session

***You must perform the following steps when using this API:***
- Pass the session instance to each operation that you want to run in the transaction.
- Implment a catch block in which you identify the server transaction error and impplement error-handling logic.

### Mongoose.startsession()
mongoose.startSession() is a method used to create a new session in Mongoose, a popular Object Data Modeling (ODM) library for MongoDB. A session is a context for executing transactions, allowing you to group multiple database operations into a single, atomic unit.

**Usage**

To start a session, you need to call mongoose.startSession() on your Mongoose connection. Here’s an example:
```javascript
const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost/mydatabase');

// Start a new session
const session = await db.startSession();
```
**Key Points** 
1. **Session creation:** mongoose.startSession() creates a new session, which is a lightweight object that manages the transaction context.

2. **Transaction support:** Sessions enable transactions, allowing you to execute multiple operations as a single, atomic unit.
    
3. **Session scope:** The session is bound to the connection, and all operations executed within the session will use this connection.
4. 
5. **Session management:** You can commit, abort, or end a session using methods like session.commitTransaction(), session.abortTransaction(), and session.endSession().

***Best Practices***

1. ***Use sessions for transactions:*** *Sessions are designed for transactions, so use them when you need to ensure data consistency and integrity.*
2. ***Start a new session for each transaction:*** *Create a new session for each transaction to avoid mixing operations from different transactions.*
3. ***Commit or abort the session:*** *Ensure you either commit or abort the session to maintain data consistency, even in the event of errors.*

