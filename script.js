document.addEventListener("DOMContentLoaded", () => {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const chatbot = document.querySelector(".chatbot");
    const chatbox = document.querySelector(".chatbox");
    const sendButton = document.querySelector("#send-btn");
    const textarea = document.querySelector(".chat-input textarea");

    // Predefined outfit suggestions with links
    const outfitDatabase = {
        casual: {
            fair: [
                { text: "Light denim jeans with a pastel shirt", link: "https://www.muftijeans.in/winter-pastels/6xl-jacquard-m-printed-spreadcollar-textured_1.html?srsltid=AfmBOoqShKWHQ312ieM4rFhEGJsXCyL-uKuQYReNmItsz0xcBXkustMw" },
                { text: "White sneakers and beige chinos", link: "https://lookastic.com/men/beige-chinos/how-to-wear-with/white-low-top-sneakers" }
            ],
            medium: [
                { text: "Olive green chinos with a navy polo", link: "https://lookastic.com/men/olive-chinos/how-to-wear-with/navy-polo" },
                { text: "Dark wash jeans and a mustard shirt", link: "https://lookastic.com/men/blue-jeans/how-to-wear-with/mustard-shirt-jacket" }
            ],
            dark: [
                { text: "Black jeans with a maroon t-shirt", link: "https://lookastic.com/men/black-jeans/how-to-wear-with/burgundy-shirt" },
                { text: "Brown loafers with a cream sweater", link: "https://lookastic.com/men/black-jeans/how-to-wear-with/burgundy-shirt" }
            ]
        },
        formal: {
            fair: [
                { text: "Navy suit with a white shirt ", link: "https://www.myntra.com/navy-blue-suits" },
                { text: "Light gray blazer and dark trousers", link: "https://www.amazon.in/Mens-Suits-Blazers-Greys-Clothing/s?rh=n%3A1968107031%2Cp_n_size_two_browse-vebin%3A1975322031" }
            ],
            medium: [
                { text: "Charcoal suit with a cream shirt", link: "https://frenchcrown.in/collections/gray-suits" },
                { text: "Dark blue tie with a patterned shirt", link: "https://www.muftijeans.in/navy-tie-dieprint-casual-shirt-mfs-15452-t-navy.html?srsltid=AfmBOoq6ZlID70PqE2v0IhqIF0biJYZS4ISxK1kwQq-WPZdAf9RPP4B5" }
            ],
            dark: [
                { text: "Black suit with a bold-colored tie", link: "https://frenchcrown.in/collections/black-suits" },
                { text: "Burgundy dress shirt with dark trousers", link: "https://www.myntra.com/burgundy-shirts" }
            ]
        },
        party: {
            fair: [
                { text: "Bright floral shirt and white jeans", link: "https://www.myntra.com/shirts/voi+jeans/voi-jeans-men-off-white-standard-slim-fit-floral-printed-cotton-casual-shirt/17348674/buy" },
                { text: "Metallic skirt with a sequin top", link: "https://www.myntra.com/sequin-skirt" }
            ],
            medium: [
                { text: "Gold blazer with dark pants", link: "https://example.com/gold-blazer" },
                { text: "Red dress with subtle jewelry", link: "https://example.com/red-dress" }
            ],
            dark: [
                { text: "Shimmering black dress", link: "https://www.myntra.com/shimmer-dresses" },
                { text: "Bright yellow jumpsuit with matching heels", link: "https://www.etsy.com/in-en/market/yellow_jumpsuit" }
            ]
        }
    };

    let step = 0; // Keeps track of the current step
    let userInputData = {
        occasion: "",
        skinTone: "",
        height: "",
        gender: "",
        weather: ""
    };

    // Function to append messages to chat
    function addMessage(message, type = "incoming") {
        const messageElement = document.createElement("li");
        messageElement.classList.add("chat", type);
        messageElement.innerHTML = `<p>${message}</p>`;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Function to handle bot responses
    function handleBotResponse() {
        if (step === 0) {
            addMessage("What is the occasion? (e.g., casual, formal, party)");
        } else if (step === 1) {
            addMessage("What is your skin tone? (e.g., fair, medium, dark)");
        } else if (step === 2) {
            addMessage("What is your height? (e.g., short, average, tall)");
        } else if (step === 3) {
            addMessage("What is your gender? (e.g., male, female, non-binary)");
        } else if (step === 4) {
            addMessage("What is the weather like? (e.g., hot, cold, rainy)");
        } else {
            const { occasion, skinTone, gender, weather } = userInputData;

            if (!outfitDatabase[occasion] || !outfitDatabase[occasion][skinTone]) {
                addMessage("Sorry, I couldn't find outfit suggestions for your input.");
            } else {
                const recommendations = outfitDatabase[occasion][skinTone];
                let response = `Based on your input (${gender}, ${weather}), here are some outfit suggestions:`;
                recommendations.forEach(outfit => {
                    response += `<br>- <a href="${outfit.link}" target="_blank">${outfit.text}</a>`;
                });
                addMessage(response);
            }
        }
    }

    // Event listener for toggling the chatbot
    chatbotToggler.addEventListener("click", () => {
        document.body.classList.toggle("show-chatbot");
        textarea.focus();
        handleBotResponse();
    });

    // Event listener for sending messages
    sendButton.addEventListener("click", () => {
        const userInput = textarea.value.trim();
        if (!userInput) return;

        addMessage(userInput, "outgoing");
        textarea.value = "";

        if (step === 0) {
            if (["casual", "formal", "party"].includes(userInput.toLowerCase())) {
                userInputData.occasion = userInput.toLowerCase();
                step++;
                setTimeout(handleBotResponse, 500);
            } else {
                addMessage("Please provide a valid occasion (casual, formal, party).");
            }
        } else if (step === 1) {
            if (["fair", "medium", "dark"].includes(userInput.toLowerCase())) {
                userInputData.skinTone = userInput.toLowerCase();
                step++;
                setTimeout(handleBotResponse, 500);
            } else {
                addMessage("Please provide a valid skin tone (fair, medium, dark).");
            }
        } else if (step === 2) {
            userInputData.height = userInput.toLowerCase(); // Store height but currently unused
            step++;
            setTimeout(handleBotResponse, 500);
        } else if (step === 3) {
            if (["male", "female", "non-binary"].includes(userInput.toLowerCase())) {
                userInputData.gender = userInput.toLowerCase();
                step++;
                setTimeout(handleBotResponse, 500);
            } else {
                addMessage("Please provide a valid gender (male, female, non-binary).");
            }
        } else if (step === 4) {
            if (["hot", "cold", "rainy"].includes(userInput.toLowerCase())) {
                userInputData.weather = userInput.toLowerCase();
                step++;
                setTimeout(handleBotResponse, 500);
            } else {
                addMessage("Please provide a valid weather type (hot, cold, rainy).");
            }
        }
    });
});
