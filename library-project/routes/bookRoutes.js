const express = require("express");

const router = express.Router();

const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
} = require("../controllers/bookController");

const protect = require("../middlewares/authMiddleware");

const adminOnly = require("../middlewares/roleMiddleware");


// PUBLIC
router.get("/", getBooks);
// USER
router.put("/borrow/:id", protect, borrowBook);

router.put("/return/:id", protect, returnBook);

router.get("/history", protect, async (req, res) => {
  const history = await BorrowHistory.find({ user: req.user._id })
    .populate("book")
    .sort({ createdAt: -1 });

  res.json(history);
});
// ADMIN
router.post("/", protect, adminOnly, addBook);

router.put("/:id", protect, adminOnly, updateBook);

router.delete("/:id", protect, adminOnly, deleteBook);





module.exports = router;