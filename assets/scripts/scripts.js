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

makeFirstRow(1);

function generateRow(i) {
  var newRow = firstRow.clone().attr("id", "calendarRow" + i);
  newRow.appendTo(firstRow);
}

function makeFirstRow(i) {
  $("#calendarRow").append(
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
  $("#calendarRow").append(
    $("<div>", {
      id: "collapse" + i,
      class: "collapse show",
      "aria-labelledby": "heading" + i,
      "data-parent": "#calendarRow"
    }).append(
      $("<div>", { class: "card-body" }).append(
        $("<span>", { text: "EVENT TEXT"+i })
      )
    )
  );
}
