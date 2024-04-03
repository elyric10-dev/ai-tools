const express = require("express");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: environment.claudeApiKey,
});

app.post("/api/claude", async (req, res) => {
  console.log("Request Body:", req.body);
  const { prompt, options } = req.body;

  console.log("server prompt:", prompt);

  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 4000,
      temperature: 0.3,
      system:
        "Be an English grammar checker. Apply logical thinking as well. Respond in this JSON format in typescript:\nsample word: i love to play basketball badminton soccer and tennis\n[\n    {\n        \"id\": 1,  //id of the first sentence\n        \"isOpen\": false,\n        \"words\": [\n            {\n            \"id\": 1,\n            \"original\": \"[<'split' 'each' 'user' 'input' 'word' 'if' 'corrected' length === 1 or ''>]\"; otherwise, corrected is more than one word. Just make it one word count. ex: user_input: 'Me and my friend went to the store.' corrected: 'My friend and I' so, original: 'Me and my friend'\n            \"corrected?\": \"<corrected word or don't include if correct>\",\n            \"problem_label?\": \"<punctuation(//punctuation ex: 'basketball,' 'badminton,' 'soccer,' 'and' 'tennis' another ex: beware of end of the sentence 'tennis.' or 'word.'), capitalization, verb tense, spelling, pronoun agreement, spacing, etc.> or don't include if correct\"\n            },\n        ],\n        \"correct_grammar\": \"<corrected_sentece>\",\n        \"rephrase\": \"<rephrased_sentence>\"\n    }\n    ]",
      // 'Be an English grammar checker. Apply logical thinking as well. Respond in this JSON format in typescript:\nsample word: i love to play basketball badminton soccer and tennis\n[\n{\n"id": 1, //sentence id\n"isOpen": false,\n"words": [\n{\n"id": 1,\n"original": "<this is important to split each user input word, >",\n"corrected": "<Capitalization, punctuation, spelling or any english rule. just leave empty or \'\' if correct>",\n"problem_label": "<for punctuation (for example \',\' punctuation: love to play basketball badminton, so put \'basketball,\'\'badminton,\' etc. The last word is no period, so put period on the word: end \'word.\'), pronoun agreement, spelling, etc. and more. If no problem here, just leave empty or \'\'>"\n},\n...\n],\n"correct_grammar": "<corrected_text>",\n"rephrase": "<rephrased_text>"\n}\n]',
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    });

    console.log("server response", msg);
    res.json(msg);
  } catch (error) {
    console.error("Error:", error);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
