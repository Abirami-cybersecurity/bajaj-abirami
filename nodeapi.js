const express = require("express");
const app = express();

app.use(express.json());

app
  .route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post((req, res) => {
    const data = req.body.data || [];
    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = "";

    for (const item of data) {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (item.length === 1 && /^[a-zA-Z]$/.test(item)) {
        alphabets.push(item);
        const lowercasedItem = item.toLowerCase();
        if (
          !highestLowercaseAlphabet ||
          lowercasedItem > highestLowercaseAlphabet
        ) {
          highestLowercaseAlphabet = lowercasedItem;
        }
      }
    }

    res.json({
      is_success: true,
      user_id: "sanhita17",  // Your unique user ID
      email: "sanhita.kundu2020@vitstudent.ac.in",  // Your email
      roll_number: "20BEC0215",  // Your roll number
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
    });
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
