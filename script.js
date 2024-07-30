const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    appendMessage('User', message);
    userInput.value = '';

    try {
        const response = await fetch('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer YOUR_API_KEY`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
                max_tokens: 150
            })
        });
        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        appendMessage('ChatGPT', botMessage);
    } catch (error) {
        console.error('Error:', error);
        appendMessage('ChatGPT', 'Sorry, there was an error.');
    }
}

function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender.toLowerCase();
    messageDiv.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
