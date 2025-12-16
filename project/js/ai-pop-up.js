
// AI CHAT POP-OUT

const aiOverlay = document.getElementById("ai-hp-chat");
const aiCloseBtn = document.getElementById("ai-close");

// any element with .hp-chat-open will open the chat
document.querySelectorAll(".hp-chat-open").forEach((el) => {
  el.addEventListener("click", () => {
    if (aiOverlay) aiOverlay.classList.add("open");
    $("#input_AI").focus();

    if(el.classList.contains('hp-prompt')){
      var value = el.innerText;
      handleSend(value);
    }
  });
});

if (aiCloseBtn) {
  aiCloseBtn.addEventListener("click", () => {
    aiOverlay.classList.remove("open");
  });
}

// optional: click outside modal to close
if (aiOverlay) {
  aiOverlay.addEventListener("click", (e) => {
    if (e.target === aiOverlay) {
      aiOverlay.classList.remove("open");
      $("#input_AI").val("");
    }
  });
}








