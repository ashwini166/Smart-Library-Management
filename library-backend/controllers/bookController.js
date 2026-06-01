const Book = require("../models/Book");
const BorrowHistory = require("../models/BorrowHistory");
// ================= ADD BOOK =================

exports.addBook = async (req, res) => {
  try {
    const { title, author, totalCopies } = req.body;

    // 🔴 VALIDATION START
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required"
      });
    }

    if (!author || !author.trim()) {
      return res.status(400).json({
        success: false,
        message: "Author is required"
      });
    }

    if (
      totalCopies === undefined ||
      totalCopies === null ||
      isNaN(totalCopies) ||
      Number(totalCopies) <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Total copies must be a valid number greater than 0"
      });
    }
    // 🔴 VALIDATION END

    const book = await Book.create({
      title: title.trim(),
      author: author.trim(),
      totalCopies: Number(totalCopies),
      borrowedBy: []
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
    const books = await Book.find().populate(
      "borrowedBy",
      "fullName email"
    );

    const updatedBooks = books.map((book) => {
      const availableCopies =
        book.totalCopies - book.borrowedBy.length;

      return {
        _id: book._id,
        title: book.title,
        author: book.author,
        totalCopies: book.totalCopies,
        borrowedBy: book.borrowedBy,
        availableCopies
      };
    });

    res.status(200).json({
      success: true,
      books: updatedBooks
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================= UPDATE BOOK =================
exports.updateBook = async (req, res) => {
  try {
    const { title, author, totalCopies } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (title) book.title = title;
    if (author) book.author = author;

    if (totalCopies !== undefined) {
      const borrowedCount = book.borrowedBy.length;

      if (Number(totalCopies) < borrowedCount) {
        return res.status(400).json({
          message: "Total copies cannot be less than borrowed copies"
        });
      }

      book.totalCopies = Number(totalCopies);
    }

    await book.save();

    res.json({
      success: true,
      message: "Book updated",
      book
    });

  } catch (error) {
    res.status(500).json({
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

    const availableCopies = book.totalCopies - book.borrowedBy.length;

    if (availableCopies <= 0) {
      return res.status(400).json({ message: "No copies available" });
    }

    if (book.borrowedBy.includes(req.user._id)) {
      return res.status(400).json({ message: "Already borrowed" });
    }

    book.borrowedBy.push(req.user._id);
    await book.save();

    // 🔥 STORE HISTORY (IMPORTANT FIX)
    await BorrowHistory.create({
      user: req.user._id,
      book: book._id,
      action: "BORROW"
    });

    res.json({
      success: true,
      message: "Book borrowed"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= RETURN BOOK =================
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.borrowedBy = book.borrowedBy.filter(
      id => id.toString() !== req.user._id.toString()
    );

    await book.save();

    // 🔥 STORE HISTORY (IMPORTANT FIX)
    await BorrowHistory.create({
      user: req.user._id,
      book: book._id,
      action: "RETURN"
    });

    res.json({
      success: true,
      message: "Book returned"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// ================= ADMIN DASHBOARD =================
exports.adminDashboard = async (req, res) => {
  try {
    const books = await Book.find().populate(
      "borrowedBy",
      "fullName email"
    );

    const dashboard = books.map((book) => {
      const availableCopies =
        book.totalCopies - book.borrowedBy.length;

      return {
        title: book.title,
        totalCopies: book.totalCopies,
        availableCopies,
        borrowCount: book.borrowedBy.length,
        borrowers: [...new Set(
          book.borrowedBy.map((u) => u.fullName)
        )]
      };
    });

    res.json({
      success: true,
      dashboard
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.getAnalytics = async (req, res) => {
  try {
    const BorrowHistory = require("../models/BorrowHistory");

    const history = await BorrowHistory.find()
      .populate("book", "title")
      .populate("user", "fullName email");

    const analyticsMap = {};

    history.forEach((entry) => {
      const id = entry.book._id.toString();

      if (!analyticsMap[id]) {
        analyticsMap[id] = {
          title: entry.book.title,
          borrowCount: 0,
          borrowers: []
        };
      }

      analyticsMap[id].borrowCount += 1;
      analyticsMap[id].borrowers.push(entry.user.fullName);
    });

    res.json({
      success: true,
      analytics: Object.values(analyticsMap)
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};