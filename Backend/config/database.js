const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log(`DB connection: ${conn.connection.host}`);
    });
  // .catch((err) => {
  //   console.error(`DB error: ${err}`);
  //   process.exit(1);
  // });
};

module.exports = dbConnection;
