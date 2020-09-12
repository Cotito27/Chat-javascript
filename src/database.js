const mongoose = require('mongoose');

mongoose.connect(process.env.URL_MONGODB, {
    useNewUrlParser: true
})
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));