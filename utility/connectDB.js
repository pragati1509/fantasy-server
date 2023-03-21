const mongoose = require('mongoose');


mongoose.set('strictQuery', true);
const uri = process.env.MONGODB_URI;

const  options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  authSource: 'admin',
  user: 'pragatibisen2001',
  pass: process.env.pass,
}

mongoose.connect(uri, options)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

conn = mongoose.connection;


module.exports = conn;