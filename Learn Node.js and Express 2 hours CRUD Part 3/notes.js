const { response } = require("express")

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

