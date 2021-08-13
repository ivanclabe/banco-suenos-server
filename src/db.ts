import { ConnectionOptions, createConnection } from 'mongoose';

const options: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

const connectDB = createConnection('', options);
connectDB.then(
  () => {
    console.log('Connected correctly to DB Logica');
  },
  err => {
    console.log(err);
  }
);

export default connectDB;
