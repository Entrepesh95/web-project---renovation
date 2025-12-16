// API key must be placed here in order to run the AI model
const GEMINI_API_KEY = "AIzaSyAtTPvSa3617wx64aoHq2QSK8WnH5qSiQ0";


// Functionto the AI model a question

async function askGemini(prompt) {
  // This is the URL used to talk to the Gemini model
  const url =
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
    GEMINI_API_KEY;

  // This is the body we send to Gemini
  const data = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  try {
    // Make the request to Gemini
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    // Gemini returns the AI text in a nested structure:
    return (
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I’m sorry, I couldn't generate a response."
    );

  } catch (error) {
    console.error("Gemini Error:", error);
    return "There was an error contacting Cleantech AI Assistant.";
  }
}

// ==============================
// Chat UI Logic (Simple & Clean)
// ==============================

// Remove gif when chat starts
let gifRemoved = false;

// Add chat message bubble
function addMessage(text, sender) {
  const chat = document.getElementById("conversation_with_AI_agent");
  const div = document.createElement("div");
  div.className = "chat-msg " + sender; // you style these in CSS
  div.innerText = text;
  chat.appendChild(div);

  // Auto-scroll
  const outer = document.getElementById("conversation_with_AI_agent_container");
  outer.scrollTop = outer.scrollHeight;
//   window(getElementByClassName("ai-modal")).scrollBy(100,100);
}

// Handle sending a message
async function handleSend(text) {

  // Show user's message
  addMessage(text, "user");
 

  // Show typing indicator
  const typingMsg = addMessage("Cleantech AI Assistant is typing…", "ai");

  // Get real AI reply
  const reply = await askGemini(text);

  // Replace typing indicator with real answer
  const chat = document.getElementById("conversation_with_AI_agent");
  chat.lastChild.innerText = reply;
}

// ==============================
// Event Listeners – Run After Page Loads
// ==============================
document.addEventListener("DOMContentLoaded", () => {
 

  $("#input_AI").on("keypress",function(e){
  if (e.which === 13) {
            const value = $(this).val();
            if (value !== "") {
               handleSend(value);
                $(this).val("");
            }
        }
  });

  $("#submit_input_AI").on("click", function () {
        const value = $("#input_AI").val();
        if (value !== "") {
            handleSend(value);
            $("#input_AI").val("");
        }
    });

  
  // When clicking prompt suggestions
  $(".input_suggestion").on("click",function(){
    
        var value = $(this).text();

        handleSend(value);
    });
});



