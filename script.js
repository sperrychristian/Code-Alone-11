// # Code Alone 11: Chat App

// ## Overview

// In this assignment, you will write the JavaScript for a chat interface. You are **not allowed to modify the HTML or CSS files**. Everything must be done with JavaScript:

// - Adding event listeners.
// - Switching active channels.
// - Populating messages dynamically.

// 5 points of extra credit will be awarded for implementing sending messages (updating both the screen and the chatData object).

// ## Constraints

// - You **cannot** modify the HTML or CSS.
// - Do **not** manually add IDs or classes; use only what exists.
// - You **can** add IDs and classes dynamically using JavaScript.
// - All changes must be done dynamically via JavaScript.

// ---
// ## Requirements

// 1. **Channel Selection**
//    - There are multiple channels listed on the page.
//    - When a user clicks on a channel:
//      - The previously active channel should lose its "active" state.
//      - The clicked channel should become active.
//      - Messages for that channel should populate the chat window.
//      - The header should update to show the current channel’s name.

function changeChannel(event) {
  let current_active = document.querySelector(".channel.active");
  current_active.classList.remove("active");
  // the above lines of the function take the active status in the channel class and remove it
  event.target.classList.add("active"); // This line will take add the active status to the class of the target or the channel we click.

  // We now need to change the header to match the target channels inner text
  let channel_title = document.querySelector("#channel-title");
  channel_title.innerText = event.target.innerText;

  // We now need to populate the message data for the appropriate channel
  let selected_channel = event.target.dataset.channel;
  populateMessages(selected_channel);
}

// The function below will find every channel button
function initializeEventListeners() {
  let all_channels = document.querySelectorAll(".channel"); // loops through each channel

  all_channels.forEach(function (channel) {
    channel.addEventListener("click", changeChannel);
  }); // tells each button when clicked to run the previosly established changeChannel function

  // adding an event listener so when we click the send button, we can call the sendMessage function outlined below
  let send_button = document.querySelector(".chat-input button");
  send_button.addEventListener("click", sendMessage);
}

initializeEventListeners(); // we need to call this function to connect the actions of the initilizeEventsFunction with the changeChannel function.

// 2. **Message Display**
//    - Each message shows:
//      - Sender’s name.
//      - Message text.
//    - Messages from the user should be styled differently (CSS class provided).
//    - Use the existing template element to create messages dynamically.
//    - Old messages should be removed when switching channels.

function populateMessages(channel_name) {
  let chat_container = document.querySelector("#chat-messages"); // grabbing the chat messages id

  chat_container.innerHTML = ""; // clearing the inner text so we can display appropriate text

  let channel_messages = chatData[channel_name]; // grabbing the messages already being stored in each channel
  channel_messages.forEach(function (message) {
    // using forEach will loop through each message in the array
    let message_template = document.querySelector("template");
    let message_clone = message_template.content.cloneNode(true); // cloning the extising message template

    message_clone.querySelector(".sender").innerText = message.sender + ":"; // changes the sender inner text to reflect the sender associated with each message
    message_clone.querySelector(".text").innerText = message.text; // channges the message inner text to show reflect the prviously written message

    // reflect the CSS styling appropriately based on if it's a self sent message

    if (message.fromSelf === true) {
      message_clone.querySelector(".message").classList.add("self");
    }

    // lastly, we need to add the message to the screen
    chat_container.appendChild(message_clone);
  });
}

// 3. **Sending Messages (Extra Credit)**
//    - Users can type a message and click a send button.
//    - The new message should:
//      - Be added to the correct channel in your chat data object.
//      - Display immediately in the chat window.
//      - Be styled as a user message.
//      - Clear the input box.

function sendMessage() {
  let message_input = document.querySelector("#message-input"); // accessing the texbox element
  let new_message_text = message_input.value.trim(); // new message text becomes whatever the user types (.trim trims the whitespace off of the message)

  if (new_message_text === "") {
    return;
  } // safegard against sending an empty message

  let active_channel = document.querySelector(".channel.active"); // identifying active channel so we can post our sent message to the right channel
  let active_channel_name = active_channel.dataset.channel;

  // building new message object
  let new_message_object = {
    sender: "You",
    text: new_message_text,
    fromSelf: true,
  };

  // push the message object to the correct chat data object

  chatData[active_channel_name].push(new_message_object);

  // make it so new message appears on screen using existing function
  populateMessages(active_channel_name);

  //clear the input box
  message_input.value = "";
}

// Star Wars–themed chat data
const chatData = {
  general: [
    {
      sender: "Luke Skywalker",
      text: "May the Force be with you, everyone.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Always",
      fromSelf: true,
    },
    {
      sender: "Leia Organa",
      text: "Focus, team. We have a new transmission from Hoth Command.",
      fromSelf: false,
    },
  ],

  planning: [
    {
      sender: "Han Solo",
      text: "I've got a bad feeling about this mission...",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "It's just a quick hyperspace jump.",
      fromSelf: true,
    },
    {
      sender: "Chewbacca",
      text: "Rrrrghh!",
      fromSelf: false,
    },
    {
      sender: "Han Solo",
      text: "Chewie agrees. We should double-check the nav-computer.",
      fromSelf: false,
    },
  ],

  feedback: [
    {
      sender: "Obi-Wan Kenobi",
      text: "Remember: The Force will be with you, always.",
      fromSelf: false,
    },
    {
      sender: "Yoda",
      text: "Do or do not. There is no try.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Wise words",
      fromSelf: true,
    },
  ],
};
