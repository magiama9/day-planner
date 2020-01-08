/* GLOBAL VARIABLES */
/*****************************************/

// Fetches and formats current time
var currentTime = moment().format("dddd, MMMM Do YYYY, h:mm A");

// Number of events on the calendar
var eventCount = 0;
var pastEvents = 0;
var remainingEvents = eventCount - pastEvents;

// Selector for first calendar row
var firstRow = $("#calendarRow");
/*****************************************/

for (i=0; i < 3; i++){
makeFirstRow(i);
}

function generateRow(i) {
  var newRow = firstRow.clone().attr("id", "calendarRow" + i);
  newRow.appendTo(firstRow);
}

// TODO - FIND A LESS AWFUL TO PARSE WAY TO GENERATE THIS
// Generate a bootstrap collapsible row
function makeFirstRow(i) {
  $("#calendarBody").append(
    $("<div>", { class: "card" }).append(
      $("<div>", { class: "card-header", id: "heading" + i }).append(
        $("<h5>", { class: "mb-0" }).append(
          $("<button>", {
            class: "btn btn-link",
            "data-toggle": "collapse",
            "data-target": "#collapse" + i,
            "aria-expanded": "true",
            "aria-controls": "collapse" + i
          }).append($("<span>", { text: "CALENDAR ROW" + i }))
        )
      )
    )
  );
  $("#calendarBody").append(
    $("<div>", {
      id: "collapse" + i,
      class: "collapse hide",
      "aria-labelledby": "heading" + i,
      "data-parent": "#calendarBody"
    }).append(
      $("<div>", { class: "card-body" }).append(
        $("<span>", { text: "EVENT TEXT"+i })
      )
    )
  );
}
