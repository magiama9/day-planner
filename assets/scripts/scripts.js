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
  }
}

// Generate a bootstrap collapsible card to display as each calendar row
function makeRow(i) {
  calendarBody.append(
    $("<div>", { class: "card" }).append(
      $("<div>", { class: "card-header", id: "heading" + i }).append(
        $("<h5>", { class: "mb-0" }).append(
          $("<button>", {
            class: "btn btn-link",
            "data-toggle": "collapse",
            "data-target": "#collapse" + i,
            "aria-expanded": "true",
            "aria-controls": "collapse" + i,
            id: "title" + i
          })
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
        $("<span>", { text: "EVENT TEXT" + i })
      )
    )
  );
}

// Assigns a time value to each generated row
function assignTime(num) {
  $("#title" + num).append(
    $("<span>", {
      class: "text-right",
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