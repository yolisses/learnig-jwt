import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/learningjwt', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

export default mongoose;
