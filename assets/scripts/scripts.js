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
let listItem = $("li").hasClass("list-group-item");

// Variable for detecting and coloring list based on whether it has an event
let hasList;

// Global Variables for Storing Form Inputs
let inputVal = "";
let inputId = "";
/*****************************************/
$(document).ready(function() {
  iterateRows();
  startHour();
  makeHeader();
  addButton();
  isPast(0);

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
      $("<div>", { class: "row" }).append(
        $("<div>", { class: "card col-12 no-gutters" }).append(
          $("<div>", {
            class: "card-header input-group p-2",
            id: "heading" + i
          }).append(
            $("<div>", { class: "input-group-prepend col-12" }).append([
              $("<button>", {
                class: "btn btn-link btn-lg btn-block",
                "data-toggle": "collapse",
                "data-target": "#collapse" + i,
                "aria-expanded": "true",
                "aria-controls": "collapse" + i,
                id: "title" + i
              }),
              $("<div>", { class: "inputField" }).append(
                $("<input>", {
                  class: "mb-0 form-control align-bottom",
                  placeholder: "Add Event",
                  id: "eventInput" + i,
                  type: "text"
                })
              )
            ])
          )
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

  function addButton() {
    $(".form-control").append("<i>", {
      class: "material-icons"
    });
    $(".material-icons").text("face");
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
  function isPast(num) {
    let eventHour = $("#title" + num).text();
    let eventHourMoment = moment(eventHour);
    console.log(eventHourMoment);
    let currentHour = moment().format("HH");
    let currentHourMoment = moment(currentHour);
    console.log(currentHour);
    console.log(currentHourMoment.isAfter(eventHourMoment, "HH"));
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
    $("#calendarHeader").append(
      $("<h1>", { text: "You have " + eventCount + " events today." })
    );
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
      eventCount++;
      makeHeader();
      // Clears out input field
      $(this).val("");
    }
  });

  // Updates text of the event body
  function updateEventBody() {
    let eventBodyArr = $("span[id^=eventBody]");
    console.log($("#collapse0"));
    // Iterates through spans to find the one that matches the input field
    for (let i = 0; i < eventBodyArr.length; i++) {
      if (inputId === "eventInput" + i) {
        $(".eventInput" + i).prepend(
          "<li class='list-group-item border-0'>" + inputVal
        );
        toggleCollapse(i);
        colorHeader(i);
      }
    }
  }

  function toggleCollapse(i) {
    $("#collapse" + i).addClass("show");
  }
  function colorHeader(i) {
    $("#heading" + i).addClass("hasEvent");
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

  // Remove List Item On Click, reduce event count by 1, update the header
  $("div[id^=collapse]").on("click", function(e) {
    let eventBodyArr = $("span[id^=eventBody]");
    console.log(e.target);
    $(e.target).remove();
    eventCount--;
    makeHeader();

    // Determines whether or not the hour has a list item to change the color

    for (i = 0; i < eventBodyArr.length; i++) {
      let hasList = $("#collapse" + i).has("li");
      if (hasList.length === 0) {
        $("#heading" + i).removeClass("hasEvent");
      }
    }
  });
});
