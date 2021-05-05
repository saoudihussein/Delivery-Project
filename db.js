const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://user:123456789azerty@cluster0.sgwd0.mongodb.net/Deliv?retryWrites=true&w=majority',
 {useNewUrlParser: true,useUnifiedTopology:true})
    .then(()=>console.log("Mongo is up"))
    .catch(err=>console.log("Mongo is down !! "+err))
