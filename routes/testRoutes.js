const express = require("express");
const router = express.Router();
const {
  getAllTests,
  createTest,
  createQuestion,
  getTest,
  deleteTest,
  getAllQuestions,
  deleteQuestion,
  updateTest
} = require("../controllers/testController");

router.get("/", getAllTests);
router.get("/getAllQuestions", getAllQuestions);
router.post("/createTest", createTest);
router.post("/createQuestion/:testid", createQuestion);
router.get("/getTest/:id", getTest);
router.get("/deleteTest/:testId", deleteTest);
router.get("/deleteQuestion/:questionId", deleteQuestion);
router.post("/updateTest/:testId", updateTest);

module.exports = router;
