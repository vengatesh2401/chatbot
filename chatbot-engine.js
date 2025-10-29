class TrainingTrainsChatbot {
    constructor() {
        this.courses = this.initializeCourses();
        this.conversationHistory = [];
        this.initializePatterns();
    }

    initializeCourses() {
        return [
            {
                id: 1,
                name: "Python Programming Bootcamp",
                category: "IT & Technology",
                duration: "6 weeks",
                price: "₹499", 
                level: "Beginner to Advanced",
                description: "Comprehensive Python programming course covering fundamentals to advanced topics including web development, data analysis, and automation.",
                features: ["Live projects", "Career support", "Certificate", "Flexible schedule"]
            },
            {
                id: 2,
                name: "Project Management Professional (PMP)",
                category: "Business",
                duration: "8 weeks",
                price: "₹799",
                level: "Intermediate",
                description: "PMP certification preparation with real-world case studies and expert instructors.",
                features: ["Exam preparation", "Practice tests", "Study materials", "Instructor support"]
            },
            {
                id: 3,
                name: "Data Science Fundamentals",
                category: "Data Science",
                duration: "10 weeks",
                price: "₹899",
                level: "Intermediate",
                description: "Learn data analysis, visualization, machine learning, and statistical modeling.",
                features: ["Python & R", "ML algorithms", "Real datasets", "Portfolio projects"]
            },
            {
                id: 4,
                name: "Digital Marketing Certification",
                category: "Marketing",
                duration: "6 weeks",
                price: "₹599",
                level: "Beginner to Intermediate",
                description: "Master SEO, social media marketing, content strategy, and digital advertising.",
                features: ["Google Analytics", "Social media tools", "Campaign planning", "Certification"]
            },
            {
                id: 5,
                name: "Leadership and Management",
                category: "Soft Skills",
                duration: "4 weeks",
                price: "₹399",
                level: "All Levels",
                description: "Develop essential leadership skills for modern workplaces and team management.",
                features: ["Team building", "Communication skills", "Conflict resolution", "Strategic planning"]
            },
            {
                id: 6,
                name: "Web Development Full Stack",
                category: "IT & Technology",
                duration: "12 weeks",
                price: "₹1099",
                level: "Beginner to Advanced",
                description: "Complete full-stack web development with HTML, CSS, JavaScript, Node.js, and React.",
                features: ["Frontend & backend", "Database integration", "Deployment", "Portfolio projects"]
            }
        ];
    }

    initializePatterns() {
        this.patterns = {
            greeting: {
                triggers: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
                responses: [
                    "Hello! Welcome to TrainingTrains. How can I assist you with our training programs today?",
                    "Hi there! Ready to explore our professional training courses? What are you interested in?",
                    "Welcome to TrainingTrains! I'm here to help you find the perfect training program. What would you like to know?"
                ]
            },
            courses: {
                triggers: ["course", "training", "program", "what do you offer", "learn", "study"],
                responses: [
                    "We offer a wide range of professional courses! Here are our main categories:\n• IT & Technology\n• Business & Management\n• Data Science\n• Digital Marketing\n• Soft Skills\n\nWhich area interests you?",
                    "Our training programs cover various domains. We have courses in technology, business, data science, and more. Any specific field you're looking for?"
                ]
            },
            pricing: {
                triggers: ["price", "cost", "how much", "fee", "payment", "expensive"],
                responses: [
                    "Our course prices range from ₹499 to ₹1099 depending on duration and complexity:\n• Short courses (4-6 weeks): ₹499-₹699\n• Standard courses (8-10 weeks): ₹599-₹899\n• Comprehensive programs (12+ weeks): ₹899-₹1099\n\nWe also offer payment plans and group discounts!",
                    "Course fees vary by program. Most courses are between $399-$1099 with flexible payment options. Would you like specific pricing for a particular course?"
                ]
            },
            contact: {
                triggers: ["contact", "email", "phone", "address", "support", "help", "talk to someone"],
                responses: [
                    "You can reach us through:\n📧 Email: digital@trainingtrains.com\n📞 Phone: 9025010144\n📍 Address: mullamparappu branch\n332 mullamparappu, N.G.Palayam Post, Erode - 638115\n\nOur support team is available Mon-Fri 9AM-6PM.",
                    "Contact information:\n• Email: digital@trainingtrains.com\n• Phone: 9698548633\n• Live Chat: Available on our website\n\nHow can we help you today?"
                ]
            },
            schedule: {
                triggers: ["schedule", "when", "timing", "duration", "start", "date", "time"],
                responses: [
                    "We offer flexible scheduling options:\n• Weekday batches: Mon-Wed or Tue-Thu\n• Weekend batches: Sat-Sun\n• Self-paced learning: Start anytime\n• Upcoming start dates: 1st and 15th of each month",
                    "Course schedules are designed for working professionals:\n• Duration: 4-12 weeks\n• Classes: 2-3 times per week\n• Timing: Morning, Evening, or Weekend slots\n\nWhich schedule works best for you?"
                ]
            },
            enrollment: {
                triggers: ["enroll", "register", "sign up", "apply", "join", "admission", "how to start"],
                responses: [
                    "Enrollment process is simple:\n1. Choose your course\n2. Fill the online application\n3. Complete payment\n4. Get course access\n\nYou can enroll directly on our website or contact our admissions team for assistance.",
                    "To enroll in any course:\n• Visit our website trainingtrains.com\n• Select your preferred course\n• Complete the registration form\n• Choose payment method\n\nNeed help with enrollment?"
                ]
            },
            thanks: {
                triggers: ["thank", "thanks", "appreciate", "helpful", "awesome", "good job"],
                responses: [
                    "You're welcome! Happy to help with your training journey. 😊",
                    "Glad I could assist! Let me know if you need any other information.",
                    "My pleasure! Feel free to ask about other courses or services."
                ]
            },
            goodbye: {
                triggers: ["bye", "goodbye", "see you", "later", "exit", "stop"],
                responses: [
                    "Thank you for visiting TrainingTrains! Good luck with your learning journey! 🚀",
                    "Goodbye! Hope to see you in one of our courses soon!",
                    "Take care! Remember, we're here to help with your training needs."
                ]
            }
        };
    }

    preprocessText(text) {
        return text.toLowerCase().replace(/[^\w\s]/g, '').trim();
    }

    findMatchingIntent(userInput) {
        const processedInput = this.preprocessText(userInput);
        
        for (const [intent, data] of Object.entries(this.patterns)) {
            for (const trigger of data.triggers) {
                if (processedInput.includes(trigger)) {
                    return intent;
                }
            }
        }
        
        return null;
    }

    getCourseInfo(category = null) {
        if (category) {
            const categoryLower = category.toLowerCase();
            const filteredCourses = this.courses.filter(course => 
                course.category.toLowerCase().includes(categoryLower) ||
                course.name.toLowerCase().includes(categoryLower)
            );
            
            if (filteredCourses.length > 0) {
                let response = `Here are our ${category} courses:\n\n`;
                filteredCourses.forEach(course => {
                    response += `🎯 ${course.name}\n`;
                    response += `   Duration: ${course.duration} | Price: ${course.price}\n`;
                    response += `   Level: ${course.level}\n`;
                    response += `   ${course.description}\n\n`;
                });
                return response;
            }
        }
        
        // Return all courses categorized
        const categories = [...new Set(this.courses.map(course => course.category))];
        let response = "Our Training Programs:\n\n";
        categories.forEach(category => {
            const categoryCourses = this.courses.filter(course => course.category === category);
            response += `📚 ${category}:\n`;
            categoryCourses.forEach(course => {
                response += `   • ${course.name} (${course.duration}) - ${course.price}\n`;
            });
            response += '\n';
        });
        response += "Which course would you like more details about?";
        return response;
    }

    generateResponse(userInput) {
        const intent = this.findMatchingIntent(userInput);
        
        // Store conversation
        this.conversationHistory.push({
            user: userInput,
            intent: intent,
            timestamp: new Date().toISOString()
        });

        // Keep only last 20 messages
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-20);
        }

        // Handle course-specific queries
        const courseKeywords = ["python", "project management", "data science", "digital marketing", "leadership", "web development", "it", "technology", "business", "marketing"];
        for (const keyword of courseKeywords) {
            if (userInput.toLowerCase().includes(keyword)) {
                return this.getCourseInfo(keyword);
            }
        }

        // Handle intents
        if (intent && this.patterns[intent]) {
            const responses = this.patterns[intent].responses;
            const response = responses[Math.floor(Math.random() * responses.length)];
            
            // Add course information for course-related intents
            if (intent === 'courses') {
                return response + '\n\n' + this.getCourseInfo();
            }
            
            return response;
        }

        // Fallback responses
        const fallbackResponses = [
            "I'm not sure I understand. Could you rephrase your question about TrainingTrains courses?",
            "I specialize in helping with TrainingTrains programs. You can ask me about:\n• Available courses\n• Pricing information\n• Enrollment process\n• Schedule details\n• Contact information",
            "Let me help you find the right training program! Could you tell me what skills you're looking to develop?",
            "I'm here to assist with TrainingTrains courses. Could you be more specific about what you'd like to know?"
        ];

        return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }

    // Method to get all available course categories
    getCategories() {
        return [...new Set(this.courses.map(course => course.category))];
    }

    // Method to search courses by name or category
    searchCourses(query) {
        const queryLower = query.toLowerCase();
        return this.courses.filter(course => 
            course.name.toLowerCase().includes(queryLower) ||
            course.category.toLowerCase().includes(queryLower) ||
            course.description.toLowerCase().includes(queryLower)
        );
    }
}

// Global chatbot instance
const chatbot = new TrainingTrainsChatbot();

// Helper function to send suggestions
function sendSuggestion(button) {
    const message = button.textContent;
    const messageInput = document.getElementById('messageInput');
    messageInput.value = message;
    
    // Trigger the send message functionality
    const event = new Event('input', { bubbles: true });
    messageInput.dispatchEvent(event);
    
    // If you have a sendMessage function in your main script
    if (typeof window.sendMessage === 'function') {
        window.sendMessage();
    }
}