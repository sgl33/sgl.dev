/* 
 * JavaScript file for the Study Logger application
 * 
 * https://seunggulee.dev/studylog
 * (Previously: projects.seunggulee.com/studylog)
 */



// Declaration of DOM elements
const recordForm = document.getElementById('main-form');
const locationInput = document.getElementById("field-location");
const subjectInput = document.getElementById("field-subject");
const commentInput = document.getElementById("field-comments");
const recordButton = document.getElementById("record-button");
const cancelButton = document.getElementById("cancel-button");

const timerText = document.getElementById("timer-text");
const logText = document.getElementById("text-log");
const timeText = document.getElementById("text-time");


// Converts day (0-6, int) to string
function getDateText(dayNumber)
{
    switch(dayNumber) {
        case 0: return "Sun";
        case 1: return "Mon";
        case 2: return "Tues";
        case 3: return "Wed";
        case 4: return "Thurs";
        case 5: return "Fri";
        case 6: return "Sat";
    }
}

// Open and close log popup
function hideLog()
{
    //document.getElementById("log-div").style.display = "none";
    $("#log-div").fadeOut(200);
}
function showLog()
{
    //document.getElementById("log-div").style.display = "block";
    $("#log-div").fadeIn(200);
}


// Start Record (called w/ button)
function recordStart()
{
    // Initialize "elapsedTime"
    if(localStorage.elapsedTime === undefined)
        localStorage.elapsedTime = 0;
    
    // Set Recording to true
    localStorage.recording = true;
    
    // Receive date
    var date = new Date();
    localStorage.startDate = date.getTime();
    
    // Add date to temp log
    localStorage.tempLog = "[Start] " +  (date.getMonth() + 1) + "/" 
            + date.getDate() + " (" + getDateText(date.getDay()) + ") " + date.getHours() + ":" + addLeadingZero(date.getMinutes()) + "<br/>";
    
    // Initialize log
    if(localStorage.log === undefined)
        localStorage.log = "";
    
    // Alert and reload
    alert("The Start Time was successfully recorded.\n\nFeel free to close the browser or open another tab. Data will be kept. Just don't forget to come back and stop the timer!");
    location.reload();
}

// End Record (called w/ button)
function recordEnd()
{
    // Get location and subject
    var loc = locationInput.value;
    var subject = subjectInput.value;
    var comment = commentInput.value;
    
    var askUser = true;
    if(loc === "" && subject === "")
        askUser = confirm("Are you sure you don't want to record subject and location?");
    
    if(askUser === false) // User wishes to cancel
        return;
    
    // Reset recording
    localStorage.removeItem('recording');
    
    // Receive date
    var date = new Date();
    
    // Calculate elapsed time
    var deltaMinutes = Math.ceil((date.getTime() - localStorage.startDate) / (1000 * 60));
    var currentMinutesTotal = localStorage.elapsedTime;
    if(localStorage.elapsedTime === undefined)
        currentMinutesTotal = 0;
    
    // Update elapsed log
    localStorage.elapsedTime = parseInt(currentMinutesTotal) + parseInt(deltaMinutes);
    
    // Initialize log
    var currentLog = localStorage.log;
    if(currentLog === undefined || currentLog === null) {
        currentLog = "";
    }
    
    
    // Update log
    if(loc !== "" || subject !== "") // has location & subject info
    {
        localStorage.log = currentLog + localStorage.tempLog + "[End] " +  (date.getMonth() + 1) + "/" 
                + date.getDate() + " (" + getDateText(date.getDay()) + ") " + date.getHours() 
                + ":" + addLeadingZero(date.getMinutes()) + " (" + convertMinutesToString(deltaMinutes) +")<br/>"
                + "Studied \"" + subject + "\" @ \"" + loc + "\"<br/>";
    }
    else {
        localStorage.log = currentLog + localStorage.tempLog + "[End] " +  (date.getMonth() + 1) + "/" 
                + date.getDate() + " (" + getDateText(date.getDay()) + ") " + date.getHours() 
                + ":" + addLeadingZero(date.getMinutes()) + " (" + convertMinutesToString(deltaMinutes) +")<br/>";
    }
    // Clear temp log
    localStorage.tempLog = "";
    
    var currentLog = localStorage.log;
    
    // Comment
    if(comment !== "" && comment !== null) {
        localStorage.log = currentLog + "[Comment] \"" + comment  + "\"<br/><br/>";;
    }
    else {
        localStorage.log = currentLog + "<br/>";
    }
        
    // Alert
    alert("The End Time was successfully recorded." +
            "\nYou studied for " + convertMinutesToString(deltaMinutes) + "!");
    
    // Reload
    location.reload();
}

function record()
{
    if(localStorage.recording !== undefined) {
        recordEnd();
    }
    else {
        recordStart();
    }
}

// Converts minutes to string as hrs/mins
function convertMinutesToString(minutes)
{
    var hours = Math.floor(minutes / 60);
    var mins = minutes % 60;
    
    var str = "";
    
    if(hours <= 1)
        str += "" + hours + " hr ";
    else
        str += "" + hours + " hrs ";
    
    return str + mins + " min";
}

// Adds leading zeros
function addLeadingZero(minutes)
{
    if(minutes < 10)
        return "0" + minutes;
    else
        return minutes;
}

function getMinutes()
{
    return localStorage.elapsedTime;
}

// Get today's date as "Jan 1, 1970" format
function getTodayDate(useUnderscore)
{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    console.log(mm + dd + yyyy);
    
    if(useUnderscore)
        return "" + mm + "_" + dd + "_" + yyyy;
    else
        return "" + mm + "/" + dd + "/" + yyyy;
}

function getMonthAsString(month)
{
    var mm = parseInt(month);
    
    switch(mm)
    {
        case 1: return "Jan";
        case 2: return "Feb";
        case 3: return "Mar";
        case 4: return "Apr";
        case 5: return "May";
        case 6: return "Jun";
        case 7: return "Jul";
        case 8: return "Aug";
        case 9: return "Sep"; 
        case 10: return "Oct";
        case 11: return "Nov";
        case 12: return "Dec";
    }
    return "[Error with month]";
}



// Ask user for reset confirmation
function askReset()
{
    let result = confirm("Are you sure you want to delete all saved data? This will also cancel the current on-going record. This cannot be undone.");
    
    if(result === true) {
        resetData();
    }
}

function resetData()
{
    localStorage.clear();
    alert("The data has been cleared.");
    location.reload();
}

function printLog()
{
    let log = localStorage.log;
    
    var elapsedTime = "<br/>Total Study Time: " + convertMinutesToString(localStorage.elapsedTime);
    
    if(log === undefined) {
        logText.innerHTML = "Your Study Log is empty. Start studying now!";
    }
    else {
        logText.innerHTML = log + localStorage.tempLog + "<br/>= End of Log =";
        timeText.innerHTML = elapsedTime;
    }
    
    
}



function testLocalStorageSave()
{
    localStorage.log = "Test Log AAAAhhhhh";
    alert("Log saved");
    location.reload();
}

function init()
{
    console.log("localStorage.recording => " + localStorage.recording);
    
    
    if(localStorage.recording !== undefined) // Recording
    {
        recordButton.innerHTML = "■";
        
        recordButton.style.backgroundColor = "#ff9966";
        updateTimer();
        setInterval(updateTimer, 3000);
    }
    else // Not recording
    {
        recordButton.innerHTML = "▶";
        recordButton.style.backgroundColor = "#009933";
        cancelButton.style.display = "none";
        locationInput.style.display = "none";
        subjectInput.style.display = "none";
        commentInput.style.display = "none";
    }
    
    printLog();
    
    
    // Initialize Banner Ad
    const NUM_ADS = 3;
    var rd = "" + parseInt(NUM_ADS * Math.random());
    
    for(var i=0; i<NUM_ADS; i+=1)
    {
        if(i !== parseInt(rd))
        {
            var domId = "banner-ad-" + i;
            document.getElementById(domId).style.display = 'none';
        }
    }
    
}

function updateTimer()
{
    var date = new Date();
    var dateDifference = (date.getTime() - localStorage.startDate);
    var deltaMinutes = Math.ceil(dateDifference / (1000 * 60));
    timerText.innerHTML = "🕒 " + convertMinutesToString(deltaMinutes - 1);
}


function cancelRecord()
{
    let result = confirm("Are you sure you want to cancel the current record?");
    
    if(result === true) {
        
        localStorage.removeItem('recording');
        localStorage.tempLog = "";
        
        alert("The record was successfully cancelled.");
        location.reload();
    }
}




function printPdf()
{
    
}

// Changes <br/> to \n
function escNextLines(str)
{
    return str.replace(/<br\/>/g, "\n");
}

init();