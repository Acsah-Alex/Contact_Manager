const express = require("express");
const { connectDb } = require("./config/dbConnection");
const { errorHandler } = require("./middleware/errorHandler");

require("dotenv").config();

connectDb();

const app = express();

app.use(express.json());

const contactRouter = require("./routes/contacts");
const userRouter = require("./routes/users");

app.use("/contacts", contactRouter);
app.use("/users", userRouter);
app.use(errorHandler);
// app.get("/contacts", (req, res) => {
//   res.send("get all contacts");
// });
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
