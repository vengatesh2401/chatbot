class ChatInterface {
    constructor() {
        this.chatbot = chatbot;
        this.initializeEventListeners();
        this.setInitialTime();
    }

    initializeEventListeners() {
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');

        // Send message on button click
        sendButton.addEventListener('click', () => this.sendMessage());

        // Send message on Enter key
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize input
        messageInput.addEventListener('input', this.autoResizeInput);

        // Enable send button when there's text
        messageInput.addEventListener('input', (e) => {
            sendButton.disabled = !e.target.value.trim();
        });
    }

    setInitialTime() {
        const initialTimeElement = document.getElementById('initialTime');
        if (initialTimeElement) {
            initialTimeElement.textContent = this.getCurrentTime();
        }
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }

    autoResizeInput(e) {
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
    }

    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();

        if (!message) return;

        // Clear input and reset height
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        // Disable send button temporarily
        const sendButton = document.getElementById('sendButton');
        sendButton.disabled = true;

        // Add user message to chat
        this.addMessage(message, 'user');

        try {
            // Show typing indicator
            this.showTypingIndicator();

            // Simulate processing time (more natural conversation flow)
            await this.delay(1000 + Math.random() * 1000);

            // Generate response using the chatbot engine
            const response = this.chatbot.generateResponse(message);

            // Remove typing indicator
            this.removeTypingIndicator();

            // Add bot response
            this.addMessage(response, 'bot');

        } catch (error) {
            this.removeTypingIndicator();
            this.addMessage("Sorry, I'm having trouble processing your request. Please try again.", 'bot');
            console.error('Chatbot error:', error);
        } finally {
            // Re-enable send button
            sendButton.disabled = false;
            messageInput.focus();
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    addMessage(content, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;

        // Create avatar
        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = sender === 'bot' ? 'TT' : 'You';

        // Create message content container
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        // Create message text
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = content;

        // Create message time
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = this.getCurrentTime();

        // Assemble message
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        messageElement.appendChild(avatar);
        messageElement.appendChild(messageContent);
        chatMessages.appendChild(messageElement);

        // Scroll to bottom with smooth behavior
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        const typingElement = document.createElement('div');
        typingElement.className = 'message bot-message';
        typingElement.id = 'typing-indicator';

        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = 'TT';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const typingDots = document.createElement('div');
        typingDots.className = 'typing-dots';
        typingDots.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        messageContent.appendChild(typingDots);
        typingElement.appendChild(avatar);
        typingElement.appendChild(messageContent);
        chatMessages.appendChild(typingElement);

        // Scroll to bottom
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }

    removeTypingIndicator() {
        const typingElement = document.getElementById('typing-indicator');
        if (typingElement) {
            typingElement.remove();
        }
    }
}

// Global function for suggestions
function sendSuggestion(button) {
    const message = button.textContent;
    const messageInput = document.getElementById('messageInput');
    messageInput.value = message;
    
    // Trigger input event to enable send button
    const event = new Event('input', { bubbles: true });
    messageInput.dispatchEvent(event);
    
    // Focus and send
    messageInput.focus();
    
    // Use the chat interface instance
    if (window.chatInterface) {
        window.chatInterface.sendMessage();
    }
}

// Initialize chat interface when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.chatInterface = new ChatInterface();
    
    // Focus on input field
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.focus();
    }
});

// Export for global access
window.sendSuggestion = sendSuggestion;