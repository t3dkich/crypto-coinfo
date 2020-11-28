import mongoose from "mongoose";

const connectionOptions: connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
interface connectionOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

export default (setts: any) => {
  mongoose.connect(
    setts.db.CONNECTION_STRING,
    connectionOptions,
    (err: mongoose.Error) => {
      if (err) return err.message;
      console.log("Mongoose Connection at " + setts.db.CONNECTION_STRING);
    }
  );
};
