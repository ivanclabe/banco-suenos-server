import { connect } from 'mongoose';

const URI =
  'mongodb+srv://root:root@cluster0.xzwpb.gcp.mongodb.net/bankApp?retryWrites=true&w=majority';

export default async (): Promise<void> => {
  try {
    await connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected correctly to mongodb.net/bankApp');
  } catch (error) {
    console.log(error);
  }
};
