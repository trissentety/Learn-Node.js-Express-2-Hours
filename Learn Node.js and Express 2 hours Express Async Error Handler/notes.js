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


Express Async Handler used instead of try catch blocks for handling errors
npm i express-async-handler
Handles exceptions inside async expression routes
Passes them to express error handler created

