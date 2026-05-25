const Book = require("../models/Book");
const BorrowHistory = require("../models/BorrowHistory"); // ✅ ADD THIS HERE

// ================= ADD BOOK =================

exports.addBook = async (req, res) => {

  try {

    let { title, author } = req.body;

    title = title?.trim();
    author = author?.trim();

    if (!title || !author) {

      return res.status(400).json({
        success: false,
        message: "Title and author are required"
      });

    }

    const book = await Book.create({
      title,
      author
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      book
    });

  } catch (error) {

    console.log("ADD BOOK ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ================= GET ALL BOOKS =================

exports.getBooks = async (req, res) => {

  try {

    const books = await Book.find()
      .populate(
        "borrowedBy",
        "fullName email"
      );

    res.status(200).json({
      success: true,
      count: books.length,
      books
    });

  } catch (error) {

    console.log("GET BOOKS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ================= UPDATE BOOK =================

exports.updateBook = async (req, res) => {

  try {

    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {

      return res.status(404).json({
        success: false,
        message: "Book not found"
      });

    }

    let {
      title,
      author,
      available
    } = req.body;

    if (title !== undefined) {
      book.title = title.trim();
    }

    if (author !== undefined) {
      book.author = author.trim();
    }

    if (available !== undefined) {
      book.available = available;
    }

    await book.save();

    res.json({
      success: true,
      message: "Book updated successfully",
      book
    });

  } catch (error) {

    console.log("UPDATE BOOK ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ================= DELETE BOOK =================

exports.deleteBook = async (req, res) => {

  try {

    const { id } = req.params;

    const deletedBook =
      await Book.findByIdAndDelete(id);

    if (!deletedBook) {

      return res.status(404).json({
        success: false,
        message: "Book not found"
      });

    }

    res.json({
      success: true,
      message: "Book deleted successfully"
    });

  } catch (error) {

    console.log("DELETE BOOK ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ================= BORROW BOOK =================

exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!book.available) {
      return res.status(400).json({ message: "Already borrowed" });
    }

    book.available = false;
    book.borrowedBy = req.user._id;
    book.borrowedAt = new Date();

    await book.save();

    // 🔥 SAVE HISTORY
    await BorrowHistory.create({
      user: req.user._id,
      book: book._id,
      action: "BORROWED",
      time: new Date()
    });

    res.json({
      success: true,
      message: "Book borrowed successfully",
      book
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= RETURN BOOK =================
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.borrowedBy?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    book.available = true;
    book.borrowedBy = null;
    book.borrowedAt = null;

    await book.save();

    // 🔥 SAVE HISTORY
    await BorrowHistory.create({
      user: req.user._id,
      book: book._id,
      action: "RETURNED",
      time: new Date()
    });

    res.json({
      success: true,
      message: "Book returned successfully",
      book
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};