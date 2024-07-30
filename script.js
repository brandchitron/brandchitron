async function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    appendMessage('User', message);
    userInput.value = '';

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer sk-proj-BRIsrEy1Jt9ypsxJ0WIzT3BlbkFJxFHi2uKeaQJFHp3FxZBn`, // Replace with your API key
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // Or 'gpt-4' if you have access
                messages: [{ role: 'user', content: message }],
                max_tokens: 150
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
        }

        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        appendMessage('ChatGPT', botMessage);
    } catch (error) {
        console.error('Detailed Error:', error);
        appendMessage('ChatGPT', `Sorry, there was an error: ${error.message}`);
    }
}
