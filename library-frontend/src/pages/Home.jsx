import BookCard from "../components/BookCard";

function Home() {

  const books = [
    {
      _id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      available: true
    },
    {
      _id: 2,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      available: false
    }
  ];

  return (
    <div className="p-8">

      <h1 className="text-5xl font-bold text-slate-800 mb-10">
        Library Management System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {
          books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
            />
          ))
        }

      </div>

    </div>
  );
}

export default Home;