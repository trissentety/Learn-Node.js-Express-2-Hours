const express = require("express")
const router = express.Router();
const { getContact } = require("../controllers/contactController");

router.route("/").get(getContact)

router.route("/").post()

router.route("/:id").get()

router.route("/:id").put((req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` });
})

router.route("/:id").delete((req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` });
})
module.exports = router;