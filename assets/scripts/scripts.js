/* GLOBAL VARIABLES */
/*****************************************/

// Fetches and formats current time
var currentTime = moment().format("dddd, MMMM Do YYYY, h:mm A");

// Number of events on the calendar
var eventCount = 0;
var pastEvents = 0;
var remainingEvents = eventCount - pastEvents;
/*****************************************/