/* GLOBAL VARIABLES */
/*****************************************/
var currentTime;

// Choose a value between 0 - (12 AM) and 23 - (11 PM) for each.
var calendarStartHour = 9;
var calendarEndHour = 17;

// Number of events on the calendar
var eventCount = 0;
var pastEvents = 0;
var remainingEvents = eventCount - pastEvents;

// Selector for first calendar row
var calendarBody = $("#calendarBody");
/*****************************************/


iterateRows();
startHour();
makeHeader();

// Creates rows for each hour to display. Calculated as the difference between start and end hour.
function iterateRows() {
  var numHours = calendarEndHour - calendarStartHour;
  for (let i = 0; i <= numHours; i++) {
    makeRow(i);
    assignTime(i);
    insertItem(i);
  }
}

/* Generates a bootstrap collapsible card to display as each calendar row.
The time value is prepended to the input-group div and displays as a button/label*/
function makeRow(i) {
  calendarBody.append(
    $("<div>", { class: "card" }).append(
      $("<div>", {
        class: "card-header input-group p-2",
        id: "heading" + i
      }).append(
        $("<div>", { class: "input-group-prepend" }).append([
          $("<button>", {
            class: "btn btn-link",
            "data-toggle": "collapse",
            "data-target": "#collapse" + i,
            "aria-expanded": "true",
            "aria-controls": "collapse" + i,
            id: "title" + i
          }),
          $("<div>", { class: "col-12 inputField" }).append(
            $("<input>", {
              class: "mb-0 form-control",
              placeholder: "Add Event",
              id: "eventInput" + i,
              type: "text"
            })
          )
        ])
      )
    )
  );
  calendarBody.append(
    $("<div>", {
      id: "collapse" + i,
      class: "collapse hide",
      "aria-labelledby": "heading" + i,
      "data-parent": "#calendarBody"
    }).append(
      $("<div>", { class: "card-body" }).append(
        $("<span>", { id: "eventBody" + i })
      )
    )
  );
}

// Assigns a time value to each generated row
function assignTime(num) {
  $("#title" + num).prepend(
    $("<span>", {
      class: "text-right input-group-text",
      text: startHour(num, calendarStartHour)
    })
  );
}

// Sets the hour to iterate from when labelling rows.
function startHour(num, i) {
  startingHour = num + i;
  return moment()
    .hour(startingHour)
    .minute(0)
    .format("h A");
}

function makeHeader() {
  updateTime();
  $("#calendarHeader").html("");
  $("#calendarHeader").append($("<h1>", { text: currentTime }));
}

function updateTime() {
  currentTime = moment().format("dddd, MMMM Do, YYYY");
}

function insertItem(i) {
  // Fetch stored events from local storage
  var storedEvents = JSON.parse(
    localStorage.getItem("storedEvents" + i) || "[]"
  );
  $("#eventBody" + i).text("");

  // Push new eventto the array if there is a value
  if ($("#eventInput" + i).val() != 0) {
    var newEvent = {
      name: $("#eventInput" + i).val(),
      eventId: "eventInput" + i
    };
    storedEvents.push(newEvent);
  }

  // Iterates through the event list and appends them.
  for (var j = 0; j < storedEvents.length; j++) {
    $("#eventBody" + j).append(
      "<li class='list-group-item border-0'>" +
        storedEvents[j].name +
        "---" +
        storedEvents[j].eventID
    );
  }

  localStorage.setItem("storedEvents" + i, JSON.stringify(storedEvents));
}


