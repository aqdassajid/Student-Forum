const eventsContainer = document.querySelector(".event-category");
const addButton = document.querySelector("#add-event-button");

let eventsData = [];

// Fetch events from JSON file
fetch("events.json")
  .then((response) => response.json())
  .then((data) => {
    eventsData = data;
    displayEvents();
  })
  .catch((error) => console.error("Error fetching events:", error));

// Function to display events
function displayEvents() {
  const culturalEventsContainer = document.querySelector(".cultural-events");
  const academicEventsContainer = document.querySelector(".academic-events");

  culturalEventsContainer.innerHTML = "";
  academicEventsContainer.innerHTML = "";

  if (eventsData.length === 0) {
    // Display message for no events
    const noEventsDiv = document.createElement("div");
    noEventsDiv.classList.add("no-events");
    noEventsDiv.textContent =
      "No events available at the moment. Check back soon!";
    culturalEventsContainer.appendChild(noEventsDiv);
    academicEventsContainer.appendChild(noEventsDiv);
  } else {
    for (const event of eventsData) {
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("event");
      eventDiv.innerHTML = `
        <h4>${event.name}</h4>
        <p>Date: ${event.date}</p>
        <p>Time: ${event.time}</p>
        <p>Venue: ${event.venue}</p>
      `;

      if (event.category === "Cultural Events") {
        culturalEventsContainer.appendChild(eventDiv);
      } else if (event.category === "Academic Events") {
        academicEventsContainer.appendChild(eventDiv);
      }
    }
  }
}

// Function to handle adding a new event
function addEvent() {
  if (eventsData.length >= 10) {
    alert("You've reached the maximum limit of events (10).");
    return;
  }

  const eventName = prompt("Enter event name:");
  const eventDate = prompt("Enter event date:");
  const eventTime = prompt("Enter event time:");
  const eventVenue = prompt("Enter event venue:");

  const newEvent = {
    category: "Custom Events",
    name: eventName,
    date: eventDate,
    time: eventTime,
    venue: eventVenue,
  };

  eventsData.push(newEvent);
  saveEventsToFile();
  displayEvents();
}

// Save events to JSON file
function saveEventsToFile() {
  fetch("events.json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventsData),
  });
}

// Attach the addEvent function to a button click event
//addButton.addEventListener("click", addEvent);

//queries
document.addEventListener("DOMContentLoaded", function () {
  const queryForm = document.getElementById("queryForm");
  const queryGrid = document.getElementById("queryGrid");

  queryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const queryInput = document.getElementById("query");
    const queryText = queryInput.value.trim();

    if (queryText !== "") {
      const queryItem = document.createElement("div");
      queryItem.classList.add("query-item");
      queryItem.textContent = queryText;
      queryGrid.appendChild(queryItem);

      queryInput.value = ""; // Clear the input field
    }
  });
});
