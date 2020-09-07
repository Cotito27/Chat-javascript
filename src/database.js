const mongoose = require('mongoose');
//mongoose.connect('mongodb://admin:6W3cjggIGqF8yKnl@SG-chat-37819.servers.mongodirector.com:27017/admin', {
//mongoose.connect('mongodb://Publico:CotitoMononomoxd_27@SG-chat-37819.servers.mongodirector.com:27017/chat', {
//mongoose.connect('mongodb://localhost/chat', {
mongoose.connect('mongodb://Publico:CotitoMononomoxd_27@SG-chat-37819.servers.mongodirector.com:27017/chat', {
    useNewUrlParser: true
})
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));