const env=require('./environment');
const mongoose=require('mongoose');
mongoose.connect(`mongodb+srv://prateek:prateek2000@cluster0.ixwxz.mongodb.net/codeial?retryWrites=true&w=majority`, { useNewUrlParser: true,useUnifiedTopology: true });
const db=mongoose.connection;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

db.on('error', console.error.bind(console, 'Error in connecting to the database'));

db.once('open', function()
{
    console.log('Connected to the database!');
});


module.exports=db;