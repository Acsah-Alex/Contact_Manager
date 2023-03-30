const asyncHandler = require("express-async-handler");
const Contact = require("../models/contacts");
//@desc Get all contacts
//@route GET /contacts
//@access public

exports.getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create new contacts
//@route POST /contacts
//@access public

exports.createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  //   const contact = new Contact({
  //     name: req.body.name,
  //     email: req.body.email,
  //     phone: req.body.phone,
  //   });
  res.status(201).json(contact);
});

//@desc Get individual contacts
//@route GET /contacts
//@access public

exports.getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(201).json(contact);
});

//@desc Update contacts
//@route PUT /contacts
//@access public

exports.updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Unauthorized user");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).json(updatedContact);
});

//@desc Delete contacts
//@route DELETE /contacts
//@access public

exports.deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Unauthorized user");
  }
  await Contact.findByIdAndRemove(req.params.id);
  res.status(201).json(contact);
});

//module.exports = { getContact };
