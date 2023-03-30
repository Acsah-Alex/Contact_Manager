const express = require("express");
const contactControllers = require("../controllers/contactControllers");
const { validateToken } = require("../middleware/validateTokenHandler");
require("dotenv").config();

const contactRouter = express.Router();

contactRouter.use(validateToken);

contactRouter.get("/", contactControllers.getContacts);

contactRouter.post("/create", contactControllers.createContact);

contactRouter.get("/:id", contactControllers.getContact);

contactRouter.put("/update/:id", contactControllers.updateContact);

contactRouter.delete("/delete/:id", contactControllers.deleteContact);

module.exports = contactRouter;
