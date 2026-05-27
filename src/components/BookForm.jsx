function BookForm() {
  return (
    <div className="bg-white p-5 rounded shadow-md">

      <h2 className="text-2xl font-bold mb-4">
        Add Book
      </h2>

      <form className="flex flex-col gap-3">

        <input
          type="text"
          placeholder="Book Title"
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Author"
          className="border p-2 rounded"
        />
    <button className="bg-black text-white p-2 rounded">
          Add Book
        </button>

      </form>

    </div>
  );
}

export default BookForm;