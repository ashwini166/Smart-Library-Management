const Book = require("../models/Book");

exports.getDashboard =
async(req,res)=>{

try{

const books = await Book.find()

.populate(
"history.user",
"fullName"
);

const data = books.map(book=>({

title:book.title,

availableCount:
book.availableCount,

history:book.history

}));

res.json(data);

}catch(error){

res.status(500).json({
message:error.message
});

}

};