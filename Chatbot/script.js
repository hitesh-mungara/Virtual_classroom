const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
// Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");
    
    // Predefined responses for common questions
    const predefinedResponses = {
        "Hi": "Hey! hi, How can I help you",
        "What courses do you offer?": "We offer courses in Java, Web Development, and Machine Learning. You can find more details on our website.",
        "How can I enroll in a course?": "To enroll in a course, visit our website and navigate to the course page. From there, you can follow the instructions to enroll.",
        "Do you offer Java courses?": "Yes, we offer comprehensive Java courses designed to help you master Java programming.",
        "Do you offer Web Development courses?": "Absolutely! We provide a range of Web Development courses covering HTML, CSS, JavaScript, and more.",
        "Do you offer Machine Learning courses?": "Yes, we offer Machine Learning courses that cover a wide range of topics, from basic concepts to advanced algorithms.",
        // Add more predefined responses as needed
    };

    // Get the user's original message without converting it to lowercase
    const userOriginalMessage = userMessage.trim();

    // Check if the user's original message has a predefined response
    if (predefinedResponses.hasOwnProperty(userOriginalMessage)) {
        messageElement.textContent = predefinedResponses[userOriginalMessage];
    } else {
        // If not, respond with the default message
        messageElement.textContent = "For further assistance, please contact us at academiaelite@gmail.com";
    }

    // Automatically scroll to the bottom of the chatbox
    chatbox.scrollTo(0, chatbox.scrollHeight);
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
