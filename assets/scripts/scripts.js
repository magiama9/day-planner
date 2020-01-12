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
let localStorageEvents;
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
  function startHour(i, num) {
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
    // Iterates through spans to find the one that matches the input field
    // InputVal is updated in the event handler where updateEventBody() is called
    for (let i = 0; i < eventBodyArr.length; i++) {
      if (inputId === "eventInput" + i) {
        $(".eventInput" + i).prepend(
          "<li class='list-group-item border-0'>" + inputVal
        );
        storedEvents[i].eventList.push(inputVal);
        toggleCollapse(i);
        colorHeader(i);
        localStorageEvents = JSON.parse(
          localStorage.getItem("storedEvents" + i) || "[]"
        );
        localStorageEvents.push(inputVal);
        localStorage.setItem(
          "storedEvents" + i,
          JSON.stringify(localStorageEvents)
        );
      }
    }
  }

  // Expands & collapses card body
  function toggleCollapse(i) {
    $("#collapse" + i).addClass("show");
  }

  // Adds a style to card header when an event is added
  function colorHeader(i) {
    $("#heading" + i).addClass("hasEvent");
  }

  // Remove List Item On Click, reduce event count by 1, update the header
  // Event handler is on all the divs with an id beginning in "collapse" e.g. id=collapse0 or id=collapse4
  $("div[id^=collapse]").on("click", function(e) {
    let eventBodyArr = $("span[id^=eventBody]");
    let targetText = $(e.target).text();
    $(e.target).remove();
    eventCount--;
    makeHeader();
    console.log(targetText);

    // Determines whether or not the hour has a list item to change the color

    for (i = 0; i < eventBodyArr.length; i++) {
      let hasList = $("#collapse" + i).has("li");
      if (hasList.length === 0) {
        $("#heading" + i).removeClass("hasEvent");
      }
      // Removes selected value from the stored events array (stored in event-storage.js)
      storedEvents[i].eventList.splice(
        $.inArray(targetText, storedEvents[i].eventList),
        1
      );

      // Handles local storage
      localStorageEvents = JSON.parse(
        localStorage.getItem("storedEvents" + i) || "[]"
      );
      // Removes the value and updates local storage
      let index = localStorageEvents.indexOf(targetText);
      if (index >= 0) {
        localStorageEvents.splice(targetText, 1);
        console.log(localStorageEvents);
        localStorage.setItem("storedEvents" + i, localStorageEvents);
      }
    }
  });
});
