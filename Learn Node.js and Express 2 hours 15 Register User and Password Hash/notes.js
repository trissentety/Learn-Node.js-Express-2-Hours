/*const { response } = require("express")

POST http://localhost:5001/api/contacts/
JSON
{
    "name": "Dipesh",
        "email": "dipesh@gmail.com",
            "phone": "0987654321"
}

Send response
{
    "message": "Create contact"
}
Terminal:
The request body is: { name: 'Dipesh', email: 'dipesh@gmail.com', phone: '0987654321' }


Error handling for missing data in JSON send
//@desc Create New contact
//@route POST /api/contacts
//@access public
const createContact = (req, res) => {
    console.log("The request body is :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    res.status(201).json({ message: "Create contact" });
}


Erorr message is in form of HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Error</title>
  </head>
  <body>
    <pre>Error: All fields are mandatory<br> &nbsp; &nbsp;at createContact (C:\Users\triss\Desktop\Visual Studio Code\Learn Node.js and Express 2 hours\controllers\contactController.js:16:15)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (C:\Users\triss\Desktop\Visual Studio Code\Learn Node.js and Express 2 hours\node_modules\express\lib\router\layer.js:95:5)<br> &nbsp; &nbsp;at next (C:\Users\triss\Desktop\Visual Studio Code\Learn Node.js and Express 2 hours\node_modules\express\lib\router\route.js:144:13)<br> &nbsp; &nbsp;at next (C:\Users\triss\Desktop\Visual Studio Code\Learn Node.js and Express 2 hours\node_modules\express\lib\router\route.js:140:7)<br> &nbsp; &nbsp;at Route.dispatch (C:\Users\triss\Desktop\Visual Studio Code\Learn Node.js and Express 2 hours\node_modules\express\lib\router\route.js:114:3)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (C:\Users\triss\Desktop\Visual Studio Code\Learn Node.js and Express 2 hours\node_modules\express\lib\router\layer.js:95:5)<br> &nbsp; &nbsp;at C:\Users\triss\Desktop\Visual Studio Code\Learn Node.js and Express 2 hours\node_modules\express\lib\router\index.js:284:15<br> &nbsp; &nbsp;at Function.process_params (C:\Users\triss\Desktop\Visual Studio Code\Learn Node.js and Express 2 hours\node_modules\express\lib\router\index.js:346:12)<br> &nbsp; &nbsp;at next (C:\Users\triss\Desktop\Visual Studio Code\Learn Node.js and Express 2 hours\node_modules\express\lib\router\index.js:280:10)<br> &nbsp; &nbsp;at Function.handle (C:\Users\triss\Desktop\Visual Studio Code\Learn Node.js and Express 2 hours\node_modules\express\lib\router\index.js:175:3)</pre>
  </body>
</html>


Because of this it needs changed by creating a curstom middleware to accept req res and inbetween transform res into JSON
Create new folder named Middleware > errorhandler.js


Json send's new error message:
{
  "message": "All fields are mandatory",
  "stackTrace": "Error: All fields are mandatory\n    at createContact (C:\\Users\\triss\\Desktop\\Visual Studio Code\\Learn Node.js and Express 2 hours\\controllers\\contactController.js:16:15)\n    at Layer.handle [as handle_request] (C:\\Users\\triss\\Desktop\\Visual Studio Code\\Learn Node.js and Express 2 hours\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (C:\\Users\\triss\\Desktop\\Visual Studio Code\\Learn Node.js and Express 2 hours\\node_modules\\express\\lib\\router\\route.js:144:13)\n    at next (C:\\Users\\triss\\Desktop\\Visual Studio Code\\Learn Node.js and Express 2 hours\\node_modules\\express\\lib\\router\\route.js:140:7)\n    at Route.dispatch (C:\\Users\\triss\\Desktop\\Visual Studio Code\\Learn Node.js and Express 2 hours\\node_modules\\express\\lib\\router\\route.js:114:3)\n    at Layer.handle [as handle_request] (C:\\Users\\triss\\Desktop\\Visual Studio Code\\Learn Node.js and Express 2 hours\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at C:\\Users\\triss\\Desktop\\Visual Studio Code\\Learn Node.js and Express 2 hours\\node_modules\\express\\lib\\router\\index.js:284:15\n    at Function.process_params (C:\\Users\\triss\\Desktop\\Visual Studio Code\\Learn Node.js and Express 2 hours\\node_modules\\express\\lib\\router\\index.js:346:12)\n    at next (C:\\Users\\triss\\Desktop\\Visual Studio Code\\Learn Node.js and Express 2 hours\\node_modules\\express\\lib\\router\\index.js:280:10)\n    at Function.handle (C:\\Users\\triss\\Desktop\\Visual Studio Code\\Learn Node.js and Express 2 hours\\node_modules\\express\\lib\\router\\index.js:175:3)"
}

User can choose to display stack trace or not


]


created constants js file to replace switch cases that used to have cases such ass 400, 401 etc
constants.js
exports.constants = {
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
};

errorHandler.js
const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500; //Pass status of 400 if no error code then status code is 500
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            case constants.NOT_FOUND:
                res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            case constants.NOT_FOUND:
                    res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
        default:
            break;
    }
};

module.exports = errorHandler;


Express Async Handler used instead of try catch blocks for catching errors
npm i express-async-handler
Handles exceptions inside async expression routes
Passes them to express error handler created


MongoDB
Install VSCode extension Mongodb
Collections make new database > database name mycontacts-backend > collection name contacts > VSCode extension connect > Compass link copy > change last field after / to mycontacts-backend and change password field > should successfully connect
Then mongoDB drivers > driver link copy > add link to .env file as CONNECTION_STRING=mongodb+srv://triss:<password>@cluster0.cthanh9.mongodb.net/?retryWrites=true&w=majority
Add dbname before ? CONNECTION_STRING=mongodb+srv://triss:<password>@cluster0.cthanh9.mongodb.net/mycontacts-backend?retryWrites=true&w=majority

npm install mongoose

//@desc Create New contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body); 
    const { name, email, phone } = req.body; // destructured
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone, // ES6 Since key and value are same only key is needed
    })

    res.status(201).json({ message: "Create contact" });
});

Send res
{
  "name": "Dipesh",
  "email": "dipesh@gmail.com",
  "phone": "0987654321",
  "_id": "6582c776e37f365a3d13daff",
  "createdAt": "2023-12-20T10:52:38.224Z",
  "updatedAt": "2023-12-20T10:52:38.224Z",
  "__v": 0
}


Get http://localhost:5001/api/contacts/6582c776e37f365a3d13daff
{
  "_id": "6582c776e37f365a3d13daff",
  "name": "Dipesh",
  "email": "dipesh@gmail.com",
  "phone": "0987654321",
  "createdAt": "2023-12-20T10:52:38.224Z",
  "updatedAt": "2023-12-20T10:52:38.224Z",
  "__v": 0
}

Wrong contact
Get {
  "title": "Not Found",
  "message": "Contact not found",
  "stackTrace": "Error: Contact not found\n    at C:\\Users\\triss\\Desktop\\Visual Studio Code\\Learn Node.js and Express 2 hours\\controllers\\contactController.js:36:15\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
}



//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

PUT http://localhost:5001/api/contacts/6582c776e37f365a3d13daff
Send
{
"name": "Dipesh Malvia",
"email": "dipesh.malvia@gmail.com",
"phone": "0987654321"
}
Response
{
  "_id": "6582c776e37f365a3d13daff",
  "name": "Dipesh Malvia",
  "email": "dipesh.malvia@gmail.com",
  "phone": "0987654321",
  "createdAt": "2023-12-20T10:52:38.224Z",
  "updatedAt": "2023-12-20T14:15:23.373Z",
  "__v": 0
}


DELETE 
//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.deleteOne();

    res.status(200).json(contact);
});

First GET Contact (not required maybe) send then DELETE
http://localhost:5001/api/contacts/6582c776e37f365a3d13daff
Send
JSON is same as PUT above
Response
Status 200
{
  "_id": "6582c776e37f365a3d13daff",
  "name": "Dipesh Malvia",
  "email": "dipesh.malvia@gmail.com",
  "phone": "0987654321",
  "createdAt": "2023-12-20T10:52:38.224Z",
  "updatedAt": "2023-12-20T14:15:23.373Z",
  "__v": 0
}

if trying to get same contact after above
Status 404
{
  "title": "Not Found",
  "message": "Contact not found",
  "stackTrace": "Error: Contact not found\n    at C:\\Users\\triss\\Desktop\\Visual Studio Code\\Learn Node.js and Express 2 hours\\controllers\\contactController.js:36:15\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
}


15 Create new user and password hashing
POST http://localhost:5001/api/users/register
Req
{
"username": "dmalvia",
"email": "dipesh.malvia@gmail.com",
"password": "123456"
}
Res
Status: 201 Created
Size: 68 Bytes
Time: 297 ms
{
  "_id": "6585782b5b983c8c1a945bd8",
  "email": "dipesh.malvia@gmail.com"
}

Send twice:
Status: 400 Bad Request
Size: 321 Bytes
Time: 133 ms
Res
{
  "title": "Validation Failed",
  "message": "User already registered",
  "stackTrace": "Error: User already registered\n    at C:\\Users\\triss\\Desktop\\Visual Studio Code\\Learn Node.js and Express 2 hours\\controllers\\userController.js:17:15\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
}

MongoDB

_id
6585782b5b983c8c1a945bd8
username
"dmalvia"
email
"dipesh.malvia@gmail.com"
password
"$2b$10$dMioQdXTXxltKXVQipbeSOmKStErgFFbW25lPLNJmIsTtodLkENdq"
createdAt
2023-12-22T11:51:07.180+00:00
updatedAt
2023-12-22T11:51:07.180+00:00
__v
0