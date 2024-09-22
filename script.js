const btnCon = document.getElementById("btnCon");
const spanCon = document.querySelector("#spanCon");
const vo1 = document.querySelector("#vo1");
const vo2 = document.querySelector("#vo2");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.lang = "en-GB";
  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;
  window.speechSynthesis.speak(text_speak);
}

function day_to_day() {
  let day = new Date();
  let hours = day.getHours();

  if (hours >= 0 && hours < 12) {
    speak("Good Morning Samiran");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon Samiran");
  } else {
    speak("Good Evening Samiran");
  }
}

// Automatically greet user when page loads
window.addEventListener('load', () => day_to_day());

let SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let v1 = new SpeechRecognition();

v1.onresult = (event) => {
  let v2 = event.resultIndex;
  let v3 = event.results[v2][0].transcript;
  spanCon.textContent = v3;
  takeCommand(v3.toLowerCase());  // Pass the recognized speech to takeCommand function
};

btnCon.addEventListener("click", () => {
  v1.start();
  vo1.style.display = "none";
  vo2.style.display = "block";
  btnCon.style.display = "none";
});

function takeCommand(message) {
  vo1.style.display = "flex";
  vo2.style.display = "none";
  btnCon.style.display = "flex";

  if (message.includes("hello")) {
    speak("hello sir, what can I help you with?");
  } else if (message.includes("good bye")) {
    speak("goodbye sir, have a nice day");
  } else if (message.includes("what is your name")) {
    speak("my name is Nobita, nice to meet you");
  } else if (message.includes("who are you")) {
    speak("I am Nobita, your personal assistant");
  } else if (message.includes("what can you do")) {
    speak(
      "I can help you with a lot of things, like setting reminders, sending emails, making calls, and much more"
    );
  } else if (message.includes("set reminder")) {
    speak("What reminder do you want to set?");
  } else if (message.includes("open youtube")) {
    window.open("https://www.youtube.com/");
  } else if (message.includes("open facebook")) {
    window.open("https://www.facebook.com/");
  } else {
    // Clean up the message by removing certain words and perform a Google search
    let vv = message.replace("doremon", "").replace("nobita", "").trim();
    speak(vv);
    window.open(`https://www.google.com/search?q=${vv}`, "_blank");
  }
}
// \end{code}