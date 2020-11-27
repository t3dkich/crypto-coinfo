import mongoose from "mongoose";

const connectionString: string = "mongodb://localhost:27017/local";

const connectionOptions: connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
interface connectionOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

export default () => {
  mongoose.connect(
    connectionString,
    connectionOptions,
    (err: mongoose.Error) => {
      if (err) return err.message;
      console.log("Mongoose Connection at " + connectionString);
    }
  );
};
