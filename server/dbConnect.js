const mongoose = require("mongoose");
const mongoUrI = `mongodb+srv://dibdas:hvG7lk27zlhS4CmL@cluster1.v6wnrro.mongodb.net/?retryWrites=true&w=majority`;

// connection is an async function as it is using internet and connecting to data base
async function connecting() {
  try {
    const connectMan = await mongoose.connect(mongoUrI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongoose connected.. ${connectMan.connection.host}`);
  } catch (error) {
    console.log(error);
    // if any error comes while connecting to the database then exit immediately, and the server will stop
    // 0 is for the success code and other than 0 is for the failed code,which lead us to terminate the process
    process.exit(1);
  }
}
module.exports = { connecting };
