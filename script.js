const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const apiKey = 'sk-proj-1hPqms1K936rdTa8yGHPT3BlbkFJmSgLHp3e0plMUsVxGgQC'; // Replace with your API key

app.use(bodyParser.json());
app.use(express.static('public'));  // Serve your HTML file from the public directory

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'text-davinci-003', // Use the model of your choice
                prompt: message,
                max_tokens: 150
            })
        });

        const data = await response.json();
        res.json({ reply: data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
