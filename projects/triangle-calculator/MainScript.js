/* Name: Seung-Gu Lee
 * Date: Nov. 24, 2019
 * Summary: This script is the main script that handles the Triangle Calculator web application.
 *          It is in charge of calculations and data presentation.
 */


// Constants declaration
const RADIAN = 57.2958;

const DEGREES = 820;
const RADIANS = 821;
const PI_RADIANS = 822;

const NUMBER = 960;
const NOT_NUMBER = 961;
const EMPTY_TEXT = 962;

const NO_EQUATION_FOUND = 404;
const ERROR = 405;

const CALCULATE_MODE = 1321;
const ERROR_MODE = 1322;
const WARNING_MODE = 1323;



////////// HTML FUNCTIONS //////////
        
        
// This function opens the modal.
function openModal(modalName)
{
    document.getElementById(modalName).style.display = "block";
}
// This function closes the modal.
function closeModal(modalName)
{
    document.getElementById(modalName).style.display = "none";
}

function collapsible(collapsibleName)
{
    var content = document.getElementById(collapsibleName);
    
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
}

// This function clears all inputs.
function clearInputs()
{
    var idArray = ["inputSideA", "inputSideB", "inputSideC", "inputAngleA", "inputAngleB", "inputAngleC"];
    for(var i=0; i<6; i++)
    {
        document.getElementById(idArray[i]).value = "";
    }
    onInputChange();
}
// This function clears just one input.
function clearOneInput(id)
{
    document.getElementById(id).value = "";
    onInputChange();
}

// This function modifies the text and color of the button.
function setCalculateButtonMode(newMode)
{
    var buttonCalculate = document.getElementById('buttonCalculate');
    
    if(newMode === CALCULATE_MODE)
    {
        buttonCalculate.innerHTML = "<span>Calculate</span>";
        buttonCalculate.style.backgroundColor = "#66cc00";
    }
    else if(newMode === ERROR_MODE)
    {
        buttonCalculate.innerHTML = "⚠ Error";
        buttonCalculate.style.backgroundColor = "#ff6666";
    }
    else if(newMode === WARNING_MODE)
    {
        buttonCalculate.innerHTML = "<span>Calculate</span>";
        buttonCalculate.style.backgroundColor = "#ff9933";
    }
}



////////// CALCULATION STEP FUNCTIONS //////////


// This function initiates the calculation process.
function calculate()
{
    document.getElementById("textExplanation").innerHTML = "";
    
    validateInput();
}

// This function once again checks the validity of inputs.
function validateInput()
{
    // Variable declaration
    var arrayResult = getInputIdArray();
    var allInputsAreValid = true;
    var invalidEntry = "Invalid entries found are: ";
    var idArray = ["inputSideA", "inputSideB", "inputSideC", "inputAngleA", "inputAngleB", "inputAngleC"]; 
    
    
    // Checking for non-number inputs
    for(var i=0; i<6; i++)
    {
        if(arrayResult[i] === NOT_NUMBER)
        {
            if(allInputsAreValid) {
                allInputsAreValid = false;
                invalidEntry += '"' + document.getElementById(idArray[i]).value + '"';
            }
            else {
                invalidEntry += ', "' + document.getElementById(idArray[i]).value + '"';
            }
        }
    }
    if(!allInputsAreValid)
    {
        document.getElementById("textError").innerHTML 
            = "Invalid entries were found.<br/>All entries must be numbers. Please check if all entries are valid numbers and try again.<br/>\n\
                (Fractions or negative numbers cannot be processed.)<br/><br/>"
            + invalidEntry + ".";
        openModal("modalError");
        return;
    }
    
    // Checking for negative inputs
    for(var i=0; i<6; i++)
    {
        var input = parseFloat(document.getElementById(idArray[i]).value);
        if(input < 0)
        {
            document.getElementById("textError").innerHTML 
                = "Negative numbers were found.<br/>Please check that all entries must be positive numbers and try again.";
            openModal("modalError");
            return;
        }
    }
    
    // Checking if all 6 inputs are filled (if so, just calculates the area)
    if(allInputsFilled(arrayResult))
    {
        // Variable declaration
        var inputArray = new Array();
        var angleMode = getAngleMode();
        
        // Gets inputs to array form
        for(var i=0; i<6; i++)
        {
            inputArray[i] = parseFloat(document.getElementById(idArray[i]).value);
        }
        
        // Starts area calculation
        document.getElementById("textExplanation").innerHTML += "Good news! The 3 sides and 3 angles of the triangle were already provided. \n\
            We only need to get the area.<br/><br/>";
        calculateArea(angleMode, inputArray, idArray);
        
        return;
    }
    
    // All ok -> starts solving the triangle
    solveTriangle();
}

// This function solves for the triangle.
function solveTriangle()
{
    // Variable declaration
    var calculationSuccess;
    var arrayResult = getInputIdArray();
    var idArray = ["inputSideA", "inputSideB", "inputSideC", "inputAngleA", "inputAngleB", "inputAngleC"];
    var inputArray = new Array();
    var angleMode = getAngleMode();
    
    
    // Gets inputs to array form
    for(var i=0; i<6; i++)
    {
        inputArray[i] = parseFloat(document.getElementById(idArray[i]).value);
    }
    
    // All 6 sides exist -> go directly to area calculation
    if(allInputsFilled(arrayResult))
    {
        calculateArea(angleMode, inputArray, idArray);
        return;
    }
    
    // Does calculations using the given values
    // Sum of Angles (angles add up to 180 deg)
    if(arrayResult[3] === EMPTY_TEXT && arrayResult[4] === NUMBER && arrayResult[5] === NUMBER)
    {
        calculationSuccess = sumOfAngles(3, 4, 5, angleMode, inputArray, idArray);
    }
    else if(arrayResult[3] === NUMBER && arrayResult[4] === EMPTY_TEXT && arrayResult[5] === NUMBER)
    {
        calculationSuccess = sumOfAngles(4, 3, 5, angleMode, inputArray, idArray);
    }
    else if(arrayResult[3] === NUMBER && arrayResult[4] === NUMBER && arrayResult[5] === EMPTY_TEXT)
    {
        calculationSuccess = sumOfAngles(5, 4, 3, angleMode, inputArray, idArray);
    }
    // Law of Cosines
    else if(arrayResult[0] === EMPTY_TEXT && arrayResult[1] === NUMBER && arrayResult[2] === NUMBER && arrayResult[3] === NUMBER) // finding for #0, side A
    {
        calculationSuccess = lawOfCosines(0, 1, 2, 3, angleMode, inputArray, idArray);
    }
    else if(arrayResult[0] === NUMBER && arrayResult[1] === EMPTY_TEXT && arrayResult[2] === NUMBER && arrayResult[4] === NUMBER) // finding for #0, side A
    {
        calculationSuccess = lawOfCosines(1, 0, 2, 4, angleMode, inputArray, idArray);
    }
    else if(arrayResult[0] === NUMBER && arrayResult[1] === NUMBER && arrayResult[2] === EMPTY_TEXT && arrayResult[5] === NUMBER) // finding for #0, side A
    {
        calculationSuccess = lawOfCosines(2, 0, 1, 5, angleMode, inputArray, idArray);
    }
    // Law of Sines - A and B
    else if(arrayResult[0] === NUMBER && arrayResult[1] === NUMBER && arrayResult[3] === NUMBER && arrayResult[4] === EMPTY_TEXT) // finding for #4, angle B 
    {
        calculationSuccess = lawOfSinesAngle(4, 3, 1, 0, angleMode, inputArray, idArray);
    }
    else if(arrayResult[0] === NUMBER && arrayResult[1] === NUMBER && arrayResult[3] === EMPTY_TEXT && arrayResult[4] === NUMBER) // finding for #3, angle A
    {
        calculationSuccess = lawOfSinesAngle(3, 4, 0, 1, angleMode, inputArray, idArray);
    }
    else if(arrayResult[0] === NUMBER && arrayResult[1] === EMPTY_TEXT && arrayResult[3] === NUMBER && arrayResult[4] === NUMBER) // finding for #1, side B
    {
        calculationSuccess = lawOfSinesSide(1, 0, 4, 3, angleMode, inputArray, idArray);
    }
    else if(arrayResult[0] === EMPTY_TEXT && arrayResult[1] === NUMBER && arrayResult[3] === NUMBER && arrayResult[4] === NUMBER) // finding for #0, side A
    {
        calculationSuccess = lawOfSinesSide(0, 1, 3, 4, angleMode, inputArray, idArray);
    }
    // Law of Sines - A and C family
    else if(arrayResult[0] === EMPTY_TEXT && arrayResult[2] === NUMBER && arrayResult[3] === NUMBER && arrayResult[5] === NUMBER) // finding for #0, side A
    {
        calculationSuccess = lawOfSinesSide(0, 2, 3, 5, angleMode, inputArray, idArray);
    }
    else if(arrayResult[0] === NUMBER && arrayResult[2] === EMPTY_TEXT && arrayResult[3] === NUMBER && arrayResult[5] === NUMBER) // finding for #2, side C
    {
        calculationSuccess = lawOfSinesSide(2, 0, 5, 3, angleMode, inputArray, idArray);
    }
    else if(arrayResult[0] === NUMBER && arrayResult[2] === NUMBER && arrayResult[3] === EMPTY_TEXT && arrayResult[5] === NUMBER) // finding for #3, angle A
    {
        calculationSuccess = lawOfSinesAngle(3, 5, 0, 2, angleMode, inputArray, idArray);
    }
    else if(arrayResult[0] === NUMBER && arrayResult[2] === NUMBER && arrayResult[3] === NUMBER && arrayResult[5] === EMPTY_TEXT) // finding for #5, angle C
    {
        calculationSuccess = lawOfSinesAngle(5, 3, 2, 0, angleMode, inputArray, idArray);
    }
    // Law of Sines - B and C family
    else if(arrayResult[1] === EMPTY_TEXT && arrayResult[2] === NUMBER && arrayResult[4] === NUMBER && arrayResult[5] === NUMBER) // finding for #1, side B
    {
        calculationSuccess = lawOfSinesSide(1, 2, 4, 5, angleMode, inputArray, idArray);
    }
    else if(arrayResult[1] === NUMBER && arrayResult[2] === EMPTY_TEXT && arrayResult[4] === NUMBER && arrayResult[5] === NUMBER) // finding for #2, side C
    {
        calculationSuccess = lawOfSinesSide(2, 1, 5, 4, angleMode, inputArray, idArray);
    }
    else if(arrayResult[1] === NUMBER && arrayResult[2] === NUMBER && arrayResult[4] === EMPTY_TEXT && arrayResult[5] === NUMBER) // finding for #4, angle B
    {
        calculationSuccess = lawOfSinesAngle(4, 5, 1, 2, angleMode, inputArray, idArray);
    }
    else if(arrayResult[1] === NUMBER && arrayResult[2] === NUMBER && arrayResult[4] === NUMBER && arrayResult[5] === EMPTY_TEXT) // finding for #5, angle C
    {
        calculationSuccess = lawOfSinesAngle(5, 4, 2, 1, angleMode, inputArray, idArray);
    }
    
    
    // If no equation is found, shows error messages depending on the validity
    else
    {
        var anyIsNaN = false;
        
        // Any value is NaN
        for(var i=0; i<6; i++)
        {
            if(document.getElementById(idArray[i]).value === 'NaN')
            {
                anyIsNaN = true;
            }
        }
        if(anyIsNaN)
        {
            document.getElementById("textError").innerHTML 
                = "ERROR: UNDEFINED<br/><br/>One or more of outputs are undefined(NaN/Not a Number).<br/>\n\
                This maybe because of the x in arcsin(x) or arccos(x) was out of range(-1 ≤ x ≤ 1).<br/><br/>\n\
                If you believe this is an error, please contact us at <a href='mailto:seung_lee@s.thevillageschool.com'>seung_lee@s.thevillageschool.com</a>.";
            openModal("modalError");

            return;
        }
        // Only 3 sides were given, can only calculate the area
        else if(arrayResult[0] === NUMBER && arrayResult[1] === NUMBER && arrayResult[2] === NUMBER && arrayResult[3] !== NUMBER && arrayResult[4] !== NUMBER && arrayResult[5] !== NUMBER) // if area can be calculated with heron's law
        {
            document.getElementById("textExplanation").innerHTML += "Because only the 3 sides were given, we can only calculate the area.<br/><br/>";
            calculateArea(angleMode, inputArray, idArray);
            return;
        }
        // Else - no formula was found
        else
        {
            document.getElementById("textError").innerHTML 
                = "No formula was found for your entries.<br/>Please check if your entries are sufficient enough for the calculator to get the results.<br/>\n\
                 Please refer to the help box for additional information.<br/><br/>\n\
                If you believe this is an error, please contact us at <a href='mailto:seung_lee@s.thevillageschool.com'>seung_lee@s.thevillageschool.com</a>.";
            openModal("modalError");
            return;
        }
        
    }
    
    // Updates ID array result
    arrayResult = getInputIdArray();
    
    // Calculation failed for any reason
    if(!calculationSuccess)
    {
        var anyIsNaN = false;
        
        // Any value is NaN
        for(var i=0; i<6; i++)
        {
            if(document.getElementById(idArray[i]).value === 'NaN')
            {
                anyIsNaN = true;
            }
        }
        if(anyIsNaN)
        {
            document.getElementById("textError").innerHTML 
                = "ERROR: UNDEFINED<br/><br/>One or more of outputs are undefined(NaN/Not a Number).<br/>\n\
                This maybe because of the x in arcsin(x) or arccos(x) was out of range(-1 ≤ x ≤ 1).<br/><br/>\n\
                If you believe this is an error, please contact us at <a href='mailto:seung_lee@s.thevillageschool.com'>seung_lee@s.thevillageschool.com</a>.";
            openModal("modalError");

            return;
        }
        // Reason of error is not found
        else
        {
            document.getElementById("textError").innerHTML 
                = "ERROR: ERROR_CALCULATION<br/><br/>An unexpected error has occured during the calculation process.<br/>Please check if your entries are sufficient enough for the calculator to get the results.<br/>\n\
                 Please refer to the help box for additional information.<br/><br/>\n\
                If you believe this is an error, please contact us at <a href='mailto:seung_lee@s.thevillageschool.com'>seung_lee@s.thevillageschool.com</a>.";
            openModal("modalError");

            return;
        }
    }
    
    // Updates input array
    for(var i=0; i<6; i++)
    {
        inputArray[i] = parseFloat(document.getElementById(idArray[i]).value);
    }
    
    // Checks if the triangle is fully solved (No - repeats method, Yes - calculates area)
    if(allInputsFilled(arrayResult))
    {
        calculateArea(angleMode, inputArray, idArray);
        return;
    }
    else
    {
        solveTriangle();
    }
}

// This function returns a boolean value if all 6 input fields are filled.
function allInputsFilled(arrayResult)
{
    var fullInputs = 0;
    for(var i=0; i<6; i++)
    {
        if(arrayResult[i] === NUMBER) {
            fullInputs++;
        }
    }
    
    if(fullInputs === 6) {
        return true;
    }
    else {
        return false;
    }
}

// This function calculates the area using various formulas
function calculateArea(angleMode, inputArray, idArray)
{
    // Variable declaration
    var area;
    
    // Tries various equations
    try {
        area = heronsLaw(inputArray[0], inputArray[1], inputArray[2]);
    }
    catch(e)
    {
        try {
            area = obliqueFormula(inputArray[0], inputArray[2], inputArray[5], angleMode);
        }
        // Error
        catch(e)
        {
            document.getElementById("textError").innerHTML 
                = "An unexpected error has occured during the area calculation process.<br/>Please check if your entries are sufficient enough for the calculator to get the results.<br/>\n\
                 Please refer to the help box for additional information.<br/><br/>\n\
                If you believe this is an error, please contact us at <a href='mailto:seung_lee@s.thevillageschool.com'>seung_lee@s.thevillageschool.com</a>.";
            openModal("modalError");
            return;
        }
    }
    
    // Prints the results
    printResults(idArray, area, angleMode);
}

// This function prints the results on the modal and on the textfields.
function printResults(idArray, area, angleMode)
{
    // Variable declaration
    var sideA = parseFloat(document.getElementById(idArray[0]).value);
    var sideB = parseFloat(document.getElementById(idArray[1]).value);
    var sideC = parseFloat(document.getElementById(idArray[2]).value);
    var angleA = parseFloat(document.getElementById(idArray[3]).value);
    var angleB = parseFloat(document.getElementById(idArray[4]).value);
    var angleC = parseFloat(document.getElementById(idArray[5]).value);
    
    // Sets text of angles (based on angle mode)
    if(angleMode === DEGREES)
    {
        document.getElementById("outputAngleA").innerHTML = round(angleA, 2) + "°";
        document.getElementById("outputAngleB").innerHTML = round(angleB, 2) + "°";
        document.getElementById("outputAngleC").innerHTML = round(angleC, 2) + "°";
        
        // Converts the angles to radians, for drawing diagram
        angleA /= RADIAN;
        angleB /= RADIAN;
        angleC /= RADIAN;
    }
    else if(angleMode === RADIANS)
    {
        document.getElementById("outputAngleA").innerHTML = round(angleA, 6);
        document.getElementById("outputAngleB").innerHTML = round(angleB, 6);
        document.getElementById("outputAngleC").innerHTML = round(angleC, 6);
    }
    else if(angleMode === PI_RADIANS)
    {
        document.getElementById("outputAngleA").innerHTML = round(angleA, 6) + "π";
        document.getElementById("outputAngleB").innerHTML = round(angleB, 6) + "π";
        document.getElementById("outputAngleC").innerHTML = round(angleC, 6) + "π";
        
        // Converts the angles to radians, for drawing diagram
        angleA *= Math.PI;
        angleB *= Math.PI;
        angleC *= Math.PI;
    }
    
    // Sets text of sides and area
    document.getElementById("outputSideA").innerHTML = round(sideA, 3);
    document.getElementById("outputSideB").innerHTML = round(sideB, 3);
    document.getElementById("outputSideC").innerHTML = round(sideC, 3);
    document.getElementById("outputArea").innerHTML = round(parseFloat(area), 4);
    
    // Checks if sum of angles are valid (if not, shows warning0
    if(anglesAreValid())
    {
        document.getElementById("textOutputWarning").innerHTML = "";
    }
    else
    {
        document.getElementById("textOutputWarning").innerHTML = "WARNING: the angles don't total up to 180° or π(≈ 3.14) radians. Results may be inaccurate.";
    }
    
    // Adds explanation
    document.getElementById("textExplanation").innerHTML += "Sides, angles and area calculations are now completed! Please see the chart above for results.";

    // Opens the output modal
    openModal("modalOutput");
    
    // Updates diagram
    updateDiagram(sideA, sideB, sideC, angleA, angleB, angleC);
        
}

// This function updates the diagram.
function updateDiagram(sideA, sideB, sideC, angleA, angleB, angleC)
{
    // Variable declaration
    var canvas = document.getElementById("canvasDiagram");
    var width = canvas.width;
    var height = canvas.height;
    var xA, yA, xB, yB, xC, yC;
    var context = canvas.getContext("2d");
    
    
    // Calculation process
    if(angleA > angleC) // A > C
    {
        if(angleA > Math.PI / 2) // A is obtuse
        {
            if((sideA * Math.sin(Math.PI - angleC)) < ((sideB + (sideC * Math.cos(Math.PI - angleA))) / 2)) // x fits max
            {
                xA = width - (sideB * width / (sideB + (sideC * Math.cos(Math.PI - angleA))));
                yA = height;
                xB = 0;
                yB = height - (sideC * Math.sin(Math.PI - angleA) * (2 * height / (sideB + (sideC * Math.cos(Math.PI - angleA)))));
                xC = width;
                yC = height;
            }
            else // y fits max
            {
                xA = width - sideB * (width / (2 * sideA * Math.sin(angleC)));
                yA = height;
                xB = width - (sideB + (sideC * Math.cos(Math.PI - angleA))) * (width / (2 * sideA * Math.sin(angleC)));
                yB = 0;
                xC = width;
                yC = height;
            }
        }
        else // A is acute or right
        {
            if(sideC * Math.sin(angleA) < sideB / 2) // x fits max
            {
                xA = 0;
                yA = height;
                xB = sideC * Math.cos(angleA) * (width / sideB);
                yB = height - (sideC * Math.sin(angleA) * (2 * height / sideB));
                xC = width;
                yC = height;
            }
            else // y fits max
            {
                xA = width - (sideB * width / (2 * sideA * Math.sin(angleC)));
                yA = height;
                xB = width - (sideA * Math.cos(angleC) * width / (2 * sideA * Math.sin(angleC)));
                yB = 0;
                xC = width;
                yC = height;
            }
        }
    }
    else // A < C
    {
        if(angleC > Math.PI / 2) // C is obtuse
        {
            if((sideA * Math.sin(Math.PI - angleC)) < ((sideB + (sideA * Math.cos(Math.PI - angleC))) / 2)) // x fits max
            {
                xA = 0;
                yA = height;
                xB = width;
                yB = height - (sideA * Math.sin(Math.PI - angleC) * (2 * height / (sideB + (sideA * Math.cos(Math.PI - angleC)))));
                xC = sideB * width / (sideB + (sideA * Math.cos(Math.PI - angleC)));
                yC = height;
            }
            else // y fits max
            {
                xA = 0;
                yA = height;
                xB = (sideB + (sideA * Math.cos(Math.PI - angleC))) * (width / (2 * sideC * Math.sin(angleA)));
                yB = 0;
                xC = sideB * (width / (2 * sideC * Math.sin(angleA)))
                yC = height;
            }
        }
        else // C is acute or right
        {
            if(sideC * Math.sin(angleA) < sideB / 2) // x fits max
            {
                xA = 0;
                yA = height;
                xB = sideC * Math.cos(angleA) * width / sideB;
                yB = height - (sideC * Math.sin(angleA) * height * 2 / sideB);
                xC = width;
                yC = height;
            }
            else // y fits max
            {
                xA = 0;
                yA = height;
                xB = sideC * Math.cos(angleA) * height / (sideC * Math.sin(angleA));
                yB = 0;
                xC = sideB * height / (sideC * Math.sin(angleA));
                yC = height;
            }
        }
    }
    
    // Clears canvas
    context.clearRect(0, 0, width, height);
    
    // Using the coordinates, draws the triangle (3 times to make the sides thick)
    for(var i=0; i<3; i++)
    {
        context.beginPath();
        context.moveTo(xA, yA);
        context.lineTo(xC, yC);
        context.lineTo(xB, yB);
        context.lineTo(xA, yA);
        context.closePath();
        context.stroke();
    }
}



////////// RESULT CALCULATION FUNCTIONS //////////


// This function calculates for an angle using the sum of angles.
function sumOfAngles(indexOutput, indexInput1, indexInput2, angleMode, inputArray, idArray)
{
    try {
        // Variable declaration
        var nameArray = ["ERROR", "ERROR", "ERROR", "A", "B", "C"];
        var output;
        
        // Calculates for angle, adds explanation
        if(angleMode === DEGREES)
        {
            output = 180 - inputArray[indexInput1] - inputArray[indexInput2];
            
            document.getElementById("textExplanation").innerHTML += "<b><u>Calculating for angle " + nameArray[indexOutput] + ":</u></b> \n\
                Since two angles (" + nameArray[indexInput1] + ", " + nameArray[indexInput2] + ") are given, we can easily find the remaining angle: \n\
                A + B + C = 180°, " + nameArray[indexOutput] + " = 180° - " + round(inputArray[indexInput1], 2) + "° - " + round(inputArray[indexInput2], 2) + "° = " + round(output, 2) + "°. \n\
                Therefore, angle " + nameArray[indexOutput] + " is " + round(output, 2) + "°.<br/><br/>"
        }
        else if(angleMode === RADIANS)
        {
            output = Math.PI - inputArray[indexInput1] - inputArray[indexInput2];
            
            document.getElementById("textExplanation").innerHTML += "<b><u>Calculating for angle " + nameArray[indexOutput] + ":</u></b> \n\
                Since two angles (" + nameArray[indexInput1] + ", " + nameArray[indexInput2] + ") are given, we can easily find the remaining angle: \n\
                A + B + C = π radians, " + nameArray[indexOutput] + " = π - " + round(inputArray[indexInput1], 6) + " - " + round(inputArray[indexInput2], 6) + " = " + round(output, 6) + " radians. \n\
                Therefore, angle " + nameArray[indexOutput] + " is " + round(output, 6) + " radians.<br/><br/>"
        }
        else if(angleMode === PI_RADIANS)
        {
            output = 1 - inputArray[indexInput1] - inputArray[indexInput2];
            
            document.getElementById("textExplanation").innerHTML += "<b><u>Calculating for angle " + nameArray[indexOutput] + ":</u></b> \n\
                Since two angles (" + nameArray[indexInput1] + ", " + nameArray[indexInput2] + ") are given, we can easily find the remaining angle: \n\
                A + B + C = π radians, " + nameArray[indexOutput] + " = π - " + round(inputArray[indexInput1], 6) + "π - " + round(inputArray[indexInput2], 6) + "π = " + round(output, 6) + "π radians. \n\
                Therefore, angle " + nameArray[indexOutput] + " is " + round(output, 6) + "π radians.<br/><br/>"
        }
        else // error
        {
            return false;
        }

        // Updates the textfield value
        document.getElementById(idArray[indexOutput]).value = output;
        
        return true;
    }
    // Exception(error) has occured
    catch(e)
    {
        document.getElementById("textError").innerHTML 
                = "An unexpected error has occured.<br/><br/>There was an error while calculating in sum of angles.<br/>\n\
                If you believe this is an error, please contact us at <a href='mailto:seung_lee@s.thevillageschool.com'>seung_lee@s.thevillageschool.com</a>.";
        openModal("modalError");
        return false;
    }
}

// This function calculates for an angle using the law of sines.
function lawOfSinesAngle(indexOutput, indexInput1, indexInput2, indexInput3, angleMode, inputArray, idArray)
{
    try {
        // Variable declaration
        var nameArray = ["A", "B", "C", "A", "B", "C"];
        var output;
        
        // Calculates for angle and adds explanation
        if(angleMode === DEGREES)
        {
            var angleInRadians = inputArray[indexInput1] / RADIAN;
            output = Math.asin(inputArray[indexInput2] * Math.sin(angleInRadians) / inputArray[indexInput3]);
            output *= RADIAN;
            
            document.getElementById("textExplanation").innerHTML += "<b><u>Calculating for angle " + nameArray[indexOutput] + ":</u></b> \n\
                Since angle " + nameArray[indexInput1] + ", side " + nameArray[indexInput2] + ", and side " + nameArray[indexInput3] + 
                " are given, we can use the Law of Sines to calculate for angle " + nameArray[indexOutput] + ". We can modify the formula so that it becomes angle " + nameArray[indexOutput] + 
                " = arcsin(" + round(inputArray[indexInput2], 3) + " * sin(" + round(inputArray[indexInput1], 2) + "°) / " + round(inputArray[indexInput3], 3) + ") = " +
                round(output, 2) + "°. Therefore, angle " + nameArray[indexOutput] + " is " + round(output, 2) + "°.<br/><br/>";
        }
        else if(angleMode === RADIANS)
        {
            output = Math.asin(inputArray[indexInput2] * Math.sin(inputArray[indexInput1]) / inputArray[indexInput3]);
            
            document.getElementById("textExplanation").innerHTML += "<b><u>Calculating for angle " + nameArray[indexOutput] + ":</u></b> \n\
                Since angle " + nameArray[indexInput1] + ", side " + nameArray[indexInput2] + ", and side " + nameArray[indexInput3] + 
                " are given, we can use the Law of Sines to calculate for angle " + nameArray[indexOutput] + ". We can modify the formula so that it becomes angle " + nameArray[indexOutput] + 
                " = arcsin(" + round(inputArray[indexInput2], 3) + " * sin(" + round(inputArray[indexInput1], 6) + ") / " + round(inputArray[indexInput3], 3) + ") = " +
                round(output, 6) + " radians. Therefore, angle " + nameArray[indexOutput] + " is " + round(output, 6) + " radians.<br/><br/>";
        }
        else if(angleMode === PI_RADIANS)
        {
            var angleInRadians = inputArray[indexInput1] * Math.PI;
            output = Math.asin(inputArray[indexInput2] * Math.sin(angleInRadians) / inputArray[indexInput3]);
            output /= Math.PI;
            
            document.getElementById("textExplanation").innerHTML += "<b><u>Calculating for angle " + nameArray[indexOutput] + ":</u></b> \n\
                Since angle " + nameArray[indexInput1] + ", side " + nameArray[indexInput2] + ", and side " + nameArray[indexInput3] + 
                " are given, we can use the Law of Sines to calculate for angle " + nameArray[indexOutput] + ". We can modify the formula so that it becomes angle " + nameArray[indexOutput] + 
                " = arcsin(" + round(inputArray[indexInput2], 3) + " * sin(" + round(inputArray[indexInput1], 6) + "π) / " + round(inputArray[indexInput3], 3) + ") = " +
                round(output, 6) + "π radians. Therefore, angle " + nameArray[indexOutput] + " is " + round(output, 6) + "π radians.<br/><br/>";
        }
        else // error
        {
            return false;
        }

        // Updates textfield value
        document.getElementById(idArray[indexOutput]).value = output;
        return true;
    }
    // Unexpected error has occured
    catch(e)
    {
        document.getElementById("textError").innerHTML 
                = "An unexpected error has occured.<br/><br/>There was an error while calculating in law of sines.<br/>\n\
                If you believe this is an error, please contact us at <a href='mailto:seung_lee@s.thevillageschool.com'>seung_lee@s.thevillageschool.com</a>.";
            openModal("modalError");
        return false;
    }
}

// This function calculates for a side using the law of sines.
function lawOfSinesSide(indexOutput, indexInput1, indexInput2, indexInput3, angleMode, inputArray, idArray)
{
    try {
        // Variable declaration
        var nameArray = ["A", "B", "C", "A", "B", "C"];
        var output;
        
        // Calculates for the side and adds explanation
        if(angleMode === DEGREES)
        {
            var angle1 = inputArray[indexInput2] / RADIAN;
            var angle2 = inputArray[indexInput3] / RADIAN;
            output = inputArray[indexInput1] * Math.sin(angle1) / Math.sin(angle2);
            
            document.getElementById("textExplanation").innerHTML += "<b><u>Calculating for side " + nameArray[indexOutput] + ":</u></b> \n\
                Since angle " + nameArray[indexInput2] + ", angle " + nameArray[indexInput3] + ", and side " + nameArray[indexInput1] + " are given, \n\
                we can use the Law of Sines to calculate for side " + nameArray[indexOutput] + ". We can modify the formula so that it becomes side " + nameArray[indexOutput] + 
                " = " + round(inputArray[indexInput1], 3) + " * sin(" + round(inputArray[indexInput2], 2) + "°) / sin(" + round(inputArray[indexInput3], 2) + "°) = " +
                round(output, 3) + ". Therefore, side " + nameArray[indexOutput] + " is " + round(output, 3) + ".<br/><br/>";
        }
        else if(angleMode === RADIANS)
        {
            output = inputArray[indexInput1] * Math.sin(inputArray[indexInput2]) / Math.sin(inputArray[indexInput3]);
            
            document.getElementById("textExplanation").innerHTML += "<b><u>Calculating for side " + nameArray[indexOutput] + ":</u></b> \n\
                Since angle " + nameArray[indexInput2] + ", angle " + nameArray[indexInput3] + ", and side " + nameArray[indexInput1] + " are given, \n\
                we can use the Law of Sines to calculate for side " + nameArray[indexOutput] + ". We can modify the formula so that it becomes side " + nameArray[indexOutput] + 
                " = " + round(inputArray[indexInput1], 3) + " * sin(" + round(inputArray[indexInput2], 6) + ") / sin(" + round(inputArray[indexInput3], 6) + ") = " +
                round(output, 3) + ". Therefore, side " + nameArray[indexOutput] + " is " + round(output, 3) + ".<br/><br/>";
        }
        else if(angleMode === PI_RADIANS)
        {
            var angle1 = inputArray[indexInput2] * Math.PI;
            var angle2 = inputArray[indexInput3] * Math.PI;
            output = inputArray[indexInput1] * Math.sin(angle1) / Math.sin(angle2);
            
            document.getElementById("textExplanation").innerHTML += "<b><u>Calculating for side " + nameArray[indexOutput] + ":</u></b> \n\
                Since angle " + nameArray[indexInput2] + ", angle " + nameArray[indexInput3] + ", and side " + nameArray[indexInput1] + " are given, \n\
                we can use the Law of Sines to calculate for side " + nameArray[indexOutput] + ". We can modify the formula so that it becomes side " + nameArray[indexOutput] + 
                " = " + round(inputArray[indexInput1], 3) + " * sin(" + round(inputArray[indexInput2], 6) + "π) / sin(" + round(inputArray[indexInput3], 6) + "π) = " +
                round(output, 3) + ". Therefore, side " + nameArray[indexOutput] + " is " + round(output, 3) + ".<br/><br/>";
        }
        else // error
        {
            return false;
        }

        // Updates textfield value
        document.getElementById(idArray[indexOutput]).value = output;
        return true;
    }
    catch(e) // unexpected error has occured
    {
        document.getElementById("textError").innerHTML 
                = "An unexpected error has occured.<br/><br/>There was an error while calculating in law of sines.<br/>\n\
                If you believe this is an error, please contact us at <a href='mailto:seung_lee@s.thevillageschool.com'>seung_lee@s.thevillageschool.com</a>.";
            openModal("modalError");
        return false;
    }
}

// This function calculates for a side using the law of cosines.
function lawOfCosines(indexOutput, indexInput1, indexInput2, indexInput3, angleMode, inputArray, idArray)
{
    try {
        // Variable declaration
        var nameArray = ["A", "B", "C", "A", "B", "C"];
        var output;
        
        // Calculates for side and adds explanation
        if(angleMode === DEGREES)
        {
            var angleRadian = inputArray[indexInput3] / RADIAN;
            output = Math.sqrt((inputArray[indexInput1] * inputArray[indexInput1]) + (inputArray[indexInput2] * inputArray[indexInput2])
                    - (2 * inputArray[indexInput1] * inputArray[indexInput2] * Math.cos(angleRadian)));
             
            document.getElementById("textExplanation").innerHTML += "<b><u>Calculating for side " + nameArray[indexOutput] + ":</u></b> \n\
               We can use the Law of Cosines to calculate for side " + nameArray[indexOutput] + ". We can simply substitute the values in the formula: \n\
               side " + nameArray[indexOutput] + " = √(" + round(inputArray[indexInput1], 3) + "² + " + round(inputArray[indexInput2], 3) + "² - 2 * " + 
                    round(inputArray[indexInput1], 3) + " * " + round(inputArray[indexInput2], 3) + " * cos(" + round(inputArray[indexInput3], 2) + "°)) = " + 
                    round(output, 3) + ". Therefore, side " + nameArray[indexOutput] + " is " + round(output, 3) + ".<br/><br/>";
        }
        else if(angleMode === RADIANS)
        {
            output = Math.sqrt((inputArray[indexInput1] * inputArray[indexInput1]) + (inputArray[indexInput2] * inputArray[indexInput2]) 
                    - (2 * inputArray[indexInput1] * inputArray[indexInput2] * Math.cos(inputArray[indexInput3])));
            
            document.getElementById("textExplanation").innerHTML += "<b><u>Calculating for side " + nameArray[indexOutput] + ":</u></b> \n\
               We can use the Law of Cosines to calculate for side " + nameArray[indexOutput] + ". We can simply substitute the values in the formula: \n\
               side " + nameArray[indexOutput] + " = √(" + round(inputArray[indexInput1], 3) + "² + " + round(inputArray[indexInput2], 3) + "² - 2 * " + 
                    round(inputArray[indexInput1], 3) + " * " + round(inputArray[indexInput2], 3) + " * cos(" + round(inputArray[indexInput3], 6) + ")) = " + 
                    round(output, 3) + ". Therefore, side " + nameArray[indexOutput] + " is " + round(output, 3) + ".<br/><br/>";
        }
        else if(angleMode === PI_RADIANS)
        {
            var angleRadian = inputArray[indexInput3] * Math.PI;
            output = Math.sqrt((inputArray[indexInput1] * inputArray[indexInput1]) + (inputArray[indexInput2] * inputArray[indexInput2]) 
                    - (2 * inputArray[indexInput1] * inputArray[indexInput2] * Math.cos(angleRadian)));
            
            document.getElementById("textExplanation").innerHTML += "<b><u>Calculating for side " + nameArray[indexOutput] + ":</u></b> \n\
               We can use the Law of Cosines to calculate for side " + nameArray[indexOutput] + ". We can simply substitute the values in the formula: \n\
               side " + nameArray[indexOutput] + " = √(" + round(inputArray[indexInput1], 3) + "² + " + round(inputArray[indexInput2], 3) + "² - 2 * " + 
                    round(inputArray[indexInput1], 3) + " * " + round(inputArray[indexInput2], 3) + " * cos(" + round(inputArray[indexInput3], 6) + "π)) = " + 
                    round(output, 3) + ". Therefore, side " + nameArray[indexOutput] + " is " + round(output, 3) + ".<br/><br/>";
        }
        else // unexpected error
        {
            return false;
        }

        // Updates the textfield value
        document.getElementById(idArray[indexOutput]).value = output;
        return true;
    }
    catch(e) // unexpected error
    {
        document.getElementById("textError").innerHTML 
                = "An unexpected error has occured.<br/><br/>There was an error while calculating in law of cosines.<br/>\n\
                If you believe this is an error, please contact us at <a href='mailto:seung_lee@s.thevillageschool.com'>seung_lee@s.thevillageschool.com</a>.";
            openModal("modalError");
        return false;
    }
}

// This function calculates for the area using the heron's law.
function heronsLaw(side1, side2, side3)
{
    // Variable declaration
    var area;
    var s;
    
    // Calculates for angle
    s = (side1 + side2 + side3) / 2;
    area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    
    // Adds explanation
    document.getElementById("textExplanation").innerHTML += "<b><u>Finding the area:</u></b> We can use the Heron's Law to calculate the area of the triangle. \n\
        We can first find the s value: s = (" + round(side1, 3) + " + " + round(side2, 3) + " + " + round(side3, 3) + ") / 2 = " + round(s, 3) + ". Then, we can get the area by substituting values in the formula: \n\
        Area = √(" + round(s, 3) + " * (" + round(s, 3) + " - " + round(side1, 3) + ") * (" + round(s, 3) + " - " + round(side2, 3) + ") * (" + round(s, 3) + " - " + round(side3, 3) + ")) = " + round(area, 4) + ". Therefore, the area is " + round(area, 4) + ".<br/><br/>";
    
    // Returns area
    return area;
}

// This function calculates for the area using the oblique triangle formula.
function obliqueFormula(side1, side2, angle, angleMode)
{
    // Variable declaration
    var area;
    var angleText;
    
    // Calculation using formula
    area = side1 * side2 * Math.cos(angle) / 2;
    
    // Adds explanation
    if(angleMode === DEGREES)
    {
        angleText = "" + round(angle, 2) + "°";
    }
    else if(angleMode === RADIANS)
    {
        angleText = "" + round(angle, 6) + " rad";
    }
    else if(angleMode === PI_RADIANS)
    {
        angleText = "" + round(angle, 6) + "π rad";
    }
    document.getElementById("textExplanation").innerHTML += "<b><u>Finding the area:</u></b> We can use the Oblique Triangle Formula to calculate the area of the triangle. \n\
        We can simply substitute the values in the formula: \n\
        Area = " + round(side1, 3) + " &times; " + round(side2, 3) + " &times; cos(" + angleText + ") / 2 = " + round(area, 4) + ". Therefore, the <b>area is " + round(area, 4) + "</b>.<br/><br/>";
    
    // Returns area
    return area;
}



////////// OTHER FUNCTIONS //////////


// This function rounds the given number to given number of decimals.
function round(number, decimals)
{
    number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
    
    return number;
}

// This function returns the input types in array form.
function getInputIdArray()
{
    // Variable declaration
    var returnArray = new Array();
    var idArray = ["inputSideA", "inputSideB", "inputSideC", "inputAngleA", "inputAngleB", "inputAngleC"];
    
    // Loop to create an array
    for(var i=0; i<6; i++)
    {
        var input = document.getElementById(idArray[i]).value;
        
        if(input == "")
        {
            returnArray[i] = EMPTY_TEXT;
        }
        else if(isNaN(parseFloat(input)))
        {
            returnArray[i] = NOT_NUMBER;
        }
        else
        {
            returnArray[i] = NUMBER;
        }
    }
    
    // Returns array
    return returnArray;
}

// This function is called when an input value is changed.
// It determines the validity of the inputs and shows messages if needed.
function onInputChange()
{
    // Variable declaration
    var negativeInputsFound = false;
    var idArray = ["inputSideA", "inputSideB", "inputSideC", "inputAngleA", "inputAngleB", "inputAngleC"]; 
    var arrayResultId = getInputIdArray();
    var allInputsAreValid = true;
    
    // Check for invalid inputs
    for(var i=0; i<6; i++)
    {
        if(arrayResultId[i] === NOT_NUMBER)
        {
            allInputsAreValid = false;
        }
    }
    
    // Checking for negative inputs
    for(var i=0; i<6; i++)
    {
        var input = parseFloat(document.getElementById(idArray[i]).value);
        if(input < 0)
        {
            negativeInputsFound = true;
        }
    }
    
    // Shows messages on validity
    if(!allInputsAreValid)
    {
        document.getElementById("textWarning").innerHTML = 'Invalid entries were found. Click the button below for details.';
        setCalculateButtonMode(ERROR_MODE);
    }
    else if(negativeInputsFound)
    {
        document.getElementById("textWarning").innerHTML = 'Negative entries were found. Numbers must be positive.';
        setCalculateButtonMode(ERROR_MODE);
    }
    else
    {
        // Variable declaration
        var angleMode = getAngleMode();
        
        // Checks if angles add up to 180 degrees or pi radians (approximately)
        if(anglesAreValid() === false)
        {
            if(angleMode === DEGREES)
            {
                document.getElementById("textWarning").innerHTML = "Warning: Angles don't total up to 180 degrees! Calculating may give inaccurate results.";
                setCalculateButtonMode(WARNING_MODE);
            }
            else
            {
                document.getElementById("textWarning").innerHTML = "Warning: Angles don't total up to π(≈ 3.14) radians! Calculating may give inaccurate results.";
                setCalculateButtonMode(WARNING_MODE);
            }
        }
        else
        {
            document.getElementById("textWarning").innerHTML = "";
            setCalculateButtonMode(CALCULATE_MODE);
        }
    }
}

// This function returns a boolean value whether the sum of angles are valid.
function anglesAreValid()
{
    // Variable declaration
    var idArray = ["inputSideA", "inputSideB", "inputSideC", "inputAngleA", "inputAngleB", "inputAngleC"]; 
    var angleMode = getAngleMode();
    var inputArray = new Array();
    var totalAngle;
    
    // Calculates total angle
    for(var i=0; i<6; i++)
    {
        inputArray[i] = parseFloat(document.getElementById(idArray[i]).value);
    }
    totalAngle = inputArray[3] + inputArray[4] + inputArray[5];

    // Determines and returns a boolean value of validity
    if(angleMode === DEGREES)
    {
        if(totalAngle < 179 || totalAngle > 181) {
            return false;
        }
        else {
            return true;
        }
    }
    else if(angleMode === RADIANS)
    {
        if(totalAngle < 3.09 || totalAngle > 3.19) {
            return false;
        }
        else {
            return true;
        }
    }
    else if(angleMode === PI_RADIANS)
    {
        if(totalAngle < 0.99 || totalAngle > 1.01) {
            return false;
        }
        else {
            return true;
        }
    }
}

// This function returns the angle mode.
function getAngleMode()
{
    if(document.getElementById("angleModeDeg").checked)
    {
        return DEGREES;
    }
    else if(document.getElementById("angleModeRad").checked)
    {
        return RADIANS;
    }
    else if(document.getElementById("angleModePiRad").checked)
    {
        return PI_RADIANS;
    }
}
