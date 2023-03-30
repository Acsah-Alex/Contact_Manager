const mongoose = require("mongoose");

exports.connectDb = async () => {
  try {
    mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
    });
    const con = mongoose.connection;

    con.on("open", () => {
      console.log("Database connected");
    });
    // console.log(process.env.CONNECTION_STRING);
    // const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    // console.log(
    //   "database connected: ",
    //   connect.connection.host,
    //   " ",
    //   connect.connection.name
    // );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
