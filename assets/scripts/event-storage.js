let storedEvents = [
  {
    hour: "09",
    spanId: "eventBody0",
    eventList: []
  },
  {
    hour: "10",
    spanId: "eventBody0",
    eventList: []
  },
  {
    hour: "11",
    spanId: "eventBody0",
    eventList: []
  },
  {
    hour: "14",
    spanId: "eventBody0",
    eventList: []
  },
  {
    hour: "13",
    spanId: "eventBody0",
    eventList: []
  },
  {
    hour: "14",
    spanId: "eventBody0",
    eventList: []
  },
  {
    hour: "15",
    spanId: "eventBody0",
    eventList: []
  },
  {
    hour: "16",
    spanId: "eventBody0",
    eventList: []
  },
  {
    hour: "17",
    spanId: "eventBody0",
    eventList: []
  }
];

// Variable used for pushing and fetching from local storage
let localStorageEvents;

function pushStoredEvents() {
  for (i = 0; i < storedEvents.length; i++) {
    localStorageEvents = JSON.parse(
      localStorage.getItem("storedEvents" + i) || "[]"
    );
    storedEvents[i].eventList.push(localStorageEvents);
  }
}

function displayStoredEvents() {
  let eventBodyArr = $("span[id^=eventBody]");
  for (i = 0; i < eventBodyArr.length; i++) {
      
    if (storedEvents[i].eventList.length > 0) {
      for (j = 0; j < storedEvents[i].eventList.length; j++) {
        $(".eventInput" + i).prepend(
          "<li class='list-group-item border-0'>" + storedEvents[i].eventList[j]
        );
        

      }
    }
  }
}
