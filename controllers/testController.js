const Test = require("../models/test");
const Questions = require("../models/questions");
const { all } = require("../routes/userRoutes");

async function getAllTests(req, res) {
  const allTests = await Test.find({});
  res.send(allTests);
}
async function getTest(req, res) {
  const test_id = req.params.id;
  const current_Test = await Test.findOne({ _id: test_id }).populate("content");
  res.send(current_Test);
}
async function getAllQuestions(req, res) {
  const allQuestions = await Questions.find({});
  res.send(allQuestions);
}
async function createTest(req, res) {
  //creating a test
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      throw new Error("Please provide all the fields!!");
    }
    const TestObj = {
      title: title,
      category: category,
      content: [],
    };
    const result = await Test.create(TestObj);
    if (result) {
      res.send({ status: "Test is created", Test: result });
    } else {
      throw new Error("There was a problem in inserting into db");
    }
  } catch (err) {
    res.send(err);
  }
}
async function deleteTest(req, res) {
  //creating a test
  try {
    const testId = req.params.testId;
    console.log(testId);
    if (!testId) {
      throw new Error("Please provide test id to be deleted!");
    }
    const result = await Test.deleteOne({ _id: testId });
    //delete all questions related to this test
    const deleteAllQuestions = await Questions.deleteMany({ belongTo: testId });
    console.log(result);
    if (result && deleteAllQuestions) {
      res.send({
        status:
          "Test is deleted and all the questions related to this is deleted!!",
      });
    } else {
      throw new Error("There was a problem deleteting the test!!");
    }
  } catch (err) {
    res.send(err);
  }
}

async function deleteQuestion(req, res) {
  //creating a test
  try {
    const questionId = req.params.questionId;
    if (!questionId) {
      throw new Error("Please provide question id to be deleted!");
    }
    const result = await Questions.deleteOne({ _id: questionId });

    if (result) {
      res.send({ status: "Question is deleted" });
    } else {
      throw new Error("There was a problem deleteting the question!!");
    }
  } catch (err) {
    res.send(err);
  }
}

async function createQuestion(req, res) {
  //creating a test
  try {
    const { question_description, options } = req.body;
    const test_id = req.params.testid;
    if (!question_description || !options) {
      throw new Error("Please provide all the fields!!");
    }
    const QuestionObj = {
      question_description: question_description,
      options: options,
      belongTo: test_id,
    };
    const result = await Questions.create(QuestionObj);
    const pushOpr = await Test.findByIdAndUpdate(test_id, {
      $push: { content: result._id },
    });

    if (result) {
      res.send({ status: "Question is created", Question: result });
    } else {
      throw new Error("There was a problem in inserting into db");
    }
  } catch (err) {
    res.send(err);
  }
}
async function updateTest(req, res) {
  try {
    const testId = req.params.testId;
    const { title, category } = req.body;
    if (!testId) {
      throw new Error("Please provide test id to be updated!");
    }
    //make the object
    const updates = {};
    if (title) {
      updates.title = title;
    }
    if (category) {
      updates.category = category;
    }
    const result = await Test.findByIdAndUpdate(
      testId,
      {
        $set: updates,
      },
      {
        new: true,
      }
    );

    if (result) {
      res.send({ status: "Test is updated!!",updatedTest:result });
    } else {
      throw new Error("There was a problem updating the test!!");
    }
  } catch (err) {
    res.send(err);
  }
}
module.exports = {
  getAllTests,
  createTest,
  createQuestion,
  getTest,
  getAllQuestions,
  deleteTest,
  deleteQuestion,
  updateTest
};
