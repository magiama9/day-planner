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
let calendarBody = $("#calendarBody");
let eventBody = $(".eventBody");

// Global Variables for Storing Form Inputs
let inputVal = "";
let inputId = "";
/*****************************************/
$(document).ready(function() {
  iterateRows();
  startHour();
  makeHeader();

  // Creates rows for each hour to display. Calculated as the difference between start and end hour.
  function iterateRows() {
    var numHours = calendarEndHour - calendarStartHour;
    for (let i = 0; i <= numHours; i++) {
      makeRow(i);
      assignTime(i);
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
          $("<span>", {
            id: "eventBody" + i,
            class: "eventInput" + i
          })
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

  // Sets the hour to iterate from when labeling rows.
  function startHour(num, i) {
    startingHour = num + i;
    return moment()
      .hour(startingHour)
      .minute(0)
      .format("h A");
  }

  // Creates header for calendar with current day
  function makeHeader() {
    updateTime();
    $("#calendarHeader").html("");
    $("#calendarHeader").append($("<h1>", { text: currentTime }));
  }

  // Fetches and updates current time in moment
  function updateTime() {
    currentTime = moment().format("dddd, MMMM Do, YYYY");
  }

  // Event Handler For Enter Key on Input
  $(".form-control").on("keydown", function(e) {
    let keycode = e.which;

    if (keycode === 13) {
      console.log("this worked");
      inputId = $(this).attr("id");
      inputVal = $(this).val();

      // Prepends the item into the card body
      updateEventBody();

      // Clears out input field
      $(this).val("");
    }
  });

  // Updates text of the event body
  function updateEventBody() {
    let eventBodyArr = $("span[id^=eventBody]");
    
    // Iterates through spans to find the one that matches the input field
    for (let i = 0; i < eventBodyArr.length; i++) {
      if (inputId === "eventInput" + i) {
        $(".eventInput" + i).prepend(
          "<li class='list-group-item border-0'>" + inputVal
        );
      }
    }
  }

  function insertItem() {
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
    for (var j = 0; j < storedEvents.length; j++) {}

    localStorage.setItem("storedEvents" + i, JSON.stringify(storedEvents));
  }
});
