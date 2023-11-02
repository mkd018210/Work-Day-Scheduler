// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  var now = day.js().format("dddd, MMMM D YYYY");
  var currentHour24h = day.js().hour();
  $("#currentDay").text(now);

  var storedEvents = JSON.parse(localStorage.getItem("storedEvents"));
  if (storedEvents !== null) {
    eventArray = storedEvents;
  } 
   

    var plannerDiv = $("#planner");
    plannerDiv.empty();

    for (var hour = 9; hour <= 17; hour++) {
      var newRowDiv = $("<div>");
      newRowDiv.addClass("row time-block");
      newRowDiv.attr("hour", hour);

      var timeCol = $("<div>");
      timeCol.addClass("col-2 col-md-1 hour text-center py-3");

      var amPM = "";
      if (hour < 12 ) {
        displayHour = hour;
        amPM = "AM";
      }
      if (hour > 12 ) {
        displayHour = hour - 12;
        amPM = "PM";
    }

    timeCol.text('${displayHour}${amPM}');
    newRowDiv.append(timeCol);

    var rowIndex = hour - 9;
    var inputArea = $("<textara>");
    inputArea.attr("id", 'input-${rowIndex}');
    inputArea.attr("hour-index", rowIndex);
    inputArea.addClass("col-8 col-md-10 description");
    inputArea.val(eventArray[rowIndex]);

    newRowDiv.append(inputArea);

    var saveButtonDiv = $('<div>');
    saveButtonDiv.attr("id", 'saveID-${rowIndex}');
    saveButtonDiv.attr("saveID", rowIndex);
    saveButtonDiv.addClass("btn col-2 col-md-1 saveBtn");

    var saveButton = $("<i>");
    saveButton.attr("class", "fas fa-save");

    newRowDiv.append(saveButtonDiv);
    saveButtonDiv.append(saveButton);

    updateRowColor(newRowDiv, hour);

    plannerDiv.append(newRowDiv);
    }

    function updateRowColor(rowHour, hour) {
      if (hour < currentHour24h) {
        rowHour.addClass("past");
      } else if (hour > currentHour24h) {
        rowHour.addClass("future");
      } else {
        rowHour.addClass("present");
      }
    };

    $(".saveBtn").on('click', function (event) {
      event.preventDefault();

      var index = $(this).attr("saveID");
      var eventInfoID = "#input-" + index;
      var eventInfo = $(eventInfoID).val();

      eventArray[index] = eventInfo;
      localStorage.setItem("storedEvents", JSON.stringify(eventArray));
    });
});
// TODO: Add code to display the current date in the header of the page.
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?