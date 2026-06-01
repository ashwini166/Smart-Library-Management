const mongoose =
require("mongoose");

const borrowHistorySchema =
new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

book:{
type:mongoose.Schema.Types.ObjectId,
ref:"Book"
},

action:{
type:String,
enum:["BORROW","RETURN"]
}

},
{timestamps:true}
);

module.exports =
mongoose.model(
"BorrowHistory",
borrowHistorySchema
);