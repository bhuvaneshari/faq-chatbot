const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const faqs = [
  { question: "What is Node.js?", answer: "Node.js is a JavaScript runtime built on Chrome's V8 engine." },
  { question: "What is a chatbot?", answer: "A chatbot is a program that can talk with users." }
];

app.get("/faq", (req, res) => {
  let userQuestion = req.query.q;

  if (!userQuestion) {
    return res.json({ answer: "Please ask a question." });
  }

  userQuestion = userQuestion.toLowerCase();

  const found = faqs.find(faq => {
    const normalized = faq.question.toLowerCase()
      .replace("what is ", "")
      .replace("?", "");

    return userQuestion.includes(normalized);
  });

  if (found) {
    res.json({ answer: found.answer });
  } else {
    res.json({ answer: "Sorry, I don’t know the answer." });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
