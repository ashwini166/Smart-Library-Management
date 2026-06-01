const express = require("express");

const router = express.Router();

const {

  getBooks,
  addBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  adminDashboard,
  getAnalytics

} = require("../controllers/bookController");

const protect =
require("../middlewares/authMiddleware");

const adminOnly =
require("../middlewares/roleMiddleware");

const BorrowHistory =
require("../models/BorrowHistory");
const Book = require("../models/Book");

// =====================================
// PUBLIC ROUTES
// =====================================

// View all books (NO LOGIN REQUIRED)

router.get(
  "/",
  getBooks
);


// =====================================
// USER ROUTES (LOGIN REQUIRED)
// =====================================

// Borrow Book

router.put(
  "/borrow/:id",
  protect,
  borrowBook
);


// Return Book

router.put(
  "/return/:id",
  protect,
  returnBook
);

router.get("/dashboard", protect, adminOnly, adminDashboard);
router.get("/analytics", protect, adminOnly, getAnalytics);

// Borrow / Return History

router.get(
  "/history",
  protect,
  async(req,res)=>{

    try{

      const history =
      await BorrowHistory.find({

        user:req.user._id

      })

      .populate(
        "book",
        "title author"
      )

      .sort({

        createdAt:-1

      });

      res.status(200).json({

        success:true,

        history

      });

    }catch(error){

      console.log(
        "HISTORY ERROR:",
        error
      );

      res.status(500).json({

        success:false,

        message:
        "Failed to fetch history"

      });

    }

  }
);


// =====================================
// ADMIN ROUTES
// LOGIN + ADMIN ONLY
// =====================================


// Add Book

router.post(
  "/",
  protect,
  adminOnly,
  addBook
);
router.get(
  "/analytics",
  protect,
  adminOnly,
  getAnalytics
);


// Update Book

router.put(
  "/:id",
  protect,
  adminOnly,
  updateBook
);


// Delete Book

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteBook
);


// Dashboard Analytics

router.get(
  "/dashboard",
  protect,
  adminOnly,
  adminDashboard
);
router.get(
  "/my-books",
  protect,
  async (req, res) => {
    try {
      const books = await Book.find({
        borrowedBy: req.user._id
      });

      res.json({
        success: true,
        books
      });

    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);


module.exports = router;