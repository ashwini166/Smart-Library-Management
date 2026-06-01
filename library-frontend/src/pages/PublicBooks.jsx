import { FaBook } from "react-icons/fa";

import { useEffect,useState } from "react";

import { getBooks }
from "../services/bookService";

function PublicBooks(){

const [books,setBooks]=
useState([]);

const fetchBooks=
async()=>{

try{

const res=
await getBooks();

setBooks(
res.data.books
);

}catch(error){

console.log(error);

}

};

useEffect(()=>{

fetchBooks();

},[]);

return(

<div className="min-h-screen bg-white p-8">

<div className="mb-10">

<h1 className="text-5xl font-bold text-slate-800">

Library Books

</h1>

<p className="text-gray-600 mt-2">

Public can only view books

</p>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

{

books.map((book)=>(

<div
key={book._id}
className="bg-white border border-gray-200 p-6 rounded-3xl shadow-lg"
>

<div className="bg-gray-100 w-fit p-4 rounded-2xl mb-5">

<FaBook className="text-3xl text-slate-800"/>

</div>

<h2 className="text-3xl font-bold text-slate-800 mb-3">

{book.title}

</h2>

<p>

Author:

{book.author}

</p>

<p>

Available Copies:

{book.availableCopies}

</p>

</div>

))

}

</div>

</div>

);

}

export default PublicBooks;