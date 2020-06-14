var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
var costPrice = 0;
var carPrice;
var vehicleName;
var ExtraDetailsOutput;
var priceTotal;
// for selecting the vehicle
function pickCar(number, className) {
    var cars = document.getElementsByClassName("card");
    for (var i = 0; i < cars.length; i++) {
        if (i == number - 1) {
            if (cars[i].dataset.select = "true") {
                carPrice = cars[i].dataset.price;
                var vehiclesDetails = cars[i].dataset.details;
                // vehicle details
                document.getElementById("vehicleOut").innerHTML = vehiclesDetails;
                vehicleName = cars[i].dataset.vehicles;
                // outputting vehicle
                document.getElementById("vehicle").innerHTML = vehicleName;
                document.getElementById("nextBtn").disabled = false;
            }
        } else {
            cars[i].dataset.select = "false";
        }
    }
}

function showTab(n) {
    // This function will display the specified tab of the form
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // and fix the Previous/Next buttons as well as width:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").disabled = true;
        document.getElementById("regForm").style.width = "90%";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
        document.getElementById("nextBtn").style.display = "inline";
        document.getElementById("regForm").style.width = "65%";
    }
    // when the user is on the final outputscreen
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Confirm!";
        document.getElementById("outPutSummary").setAttribute("data-finalOutput", "true");
        document.getElementById("extrasOutput").setAttribute("data-finalOutput", "true");
        document.getElementById("outputWidth").setAttribute("data-finalOutput", "true");
        document.getElementById("logoColourChange").style.color = "#DFDFDF";
        document.getElementById("main-logo-text").style.paddingLeft = "50px";
        regForm.style.display = "none";
        nextPrevButtons.style.bottom = "20px";
        footer.style.display = "none";
        document.getElementById("nextBtn").setAttribute("data-finalOutput", "true");
        // user on first page
    } else if (n == 0) {
        document.getElementById("outPutSummary").setAttribute("data-finalOutput", "mainFalse");
        // user on second page
    } else if (n == 1) {
        document.getElementById("prevBtn").innerHTML = "Re-select";
        document.getElementById("outPutSummary").setAttribute("data-finalOutput", "false");
        // any other page
    } else {
        document.getElementById("nextBtn").innerHTML = "Continue";
        document.getElementById("prevBtn").innerHTML = "Previous";
        document.getElementById("outPutSummary").setAttribute("data-finalOutput", "false");
        document.getElementById("logoColourChange").style.color = "#2C3E50";
        document.getElementById("main-logo-text").style.paddingLeft = "7px";
        regForm.style.display = "block";
        nextPrevButtons.style.bottom = "";
        document.getElementById("nextBtn").setAttribute("data-finalOutput", "false");
        footer.style.display = "block";
    }
    //... and run a function that will display the correct  indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        console.log("bruh, you finshed");
        pushData();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value.trim() == "" || !y[i].checkValidity()) {
            // add an "data-valid" attribute to the field:
            y[i].setAttribute("data-valid", "false");
            document.getElementById("nameInvalid").innerHTML = document.getElementById("mainName").validationMessage;
            document.getElementById("cellInvalid").innerHTML = document.getElementById("phone").validationMessage;
            document.getElementById("emailInvalid").innerHTML = document.getElementById("email").validationMessage;
            document.getElementById("ageInvalid").innerHTML = document.getElementById("numAge").validationMessage;
            // and set the current valid status to false
            valid = false;
            nextBtn.disabled = !privacyCheck.checked;
        } else {
            // basically just for looks but not necessary
            y[i].setAttribute("data-valid", "true");
            document.getElementById("nameInvalid").innerHTML = document.getElementById("mainName").validationMessage;
            document.getElementById("cellInvalid").innerHTML = document.getElementById("phone").validationMessage;
            document.getElementById("emailInvalid").innerHTML = document.getElementById("email").validationMessage;
            document.getElementById("ageInvalid").innerHTML = document.getElementById("numAge").validationMessage;

        }


    }
    // If the valid status is true, mark the st2ep as finished and valid:
    if (valid) {
        document.getElementsByClassName("progress")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function privacy() {
    // disables conitnue buton when htey havent agreed with privacy
    nextBtn.disabled = !privacyCheck.checked;
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all st2eps...
    var i, x = document.getElementsByClassName("progress");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current st2p:
    x[n].className += " active";
}

function getExtra() {
    // get info of extra selected
    var form = document.getElementsByClassName("Additionals");
    costPrice = 0;
    ExtraDetailsOutput = '';
    for (var i = 0; i < form.length; i++) {
        if (form[i].type == 'checkbox') {
            if (form[i].checked == true) {
                // calculates total for extras
                costPrice = costPrice + parseInt(form[i].dataset.cost);
                document.getElementById("outputExtra").innerHTML = '$' + costPrice + '.00';
                extra4Output = form[i].dataset.value + '<br>'
                ExtraDetailsOutput = ExtraDetailsOutput + extra4Output;
            } else {
                document.getElementById("outputExtra").innerHTML = '$' + costPrice + '.00';
            }
        }
        document.getElementById("extraOut").innerHTML = ExtraDetailsOutput;
        outputTotal();
    }
}

function outputTotal() {
    var INSURANCE = 20;
    var BOOKINGFEE = 50;
    var carPriceBeforeExtras = carPrice * numDays.value;
    var priceExtras = numDays.value * INSURANCE;
    priceTotal = carPriceBeforeExtras + priceExtras + BOOKINGFEE + costPrice;
    var insuranceFee = INSURANCE * numDays.value;
    // outputs all the information
    document.getElementById("priceCar").innerHTML = '$' + carPrice + '.00';
    document.getElementById("priceTotal").innerHTML = '$' + priceTotal + '.00';
    document.getElementById("insuranceFEE").innerHTML = '$' + insuranceFee + '.00';
    document.getElementById("bookingFEE").innerHTML = '$' + BOOKINGFEE + '.00';
    // information on the side bar
    document.getElementById("infoOutput").innerHTML = "<strong>Number of days hiring:</strong> " + numDays.value;
    document.getElementById("pickupDateOutput").innerHTML = "<strong>Pick up date:</strong> " + pickupDate.value;
    document.getElementById("nameOutput").innerHTML = "<strong>Name:</strong> " + mainName.value;
    document.getElementById("emailOutput").innerHTML = "<strong>Email:</strong> " + email.value;
    document.getElementById("commentOutput").innerHTML = "<strong>Comments:</strong> " + userComment.value;

}

function pushData() {
    var data = { //creating a JSON file to br sent over to firebase
        user_name: mainName.value,
        user_email: email.value,
        user_age: numAge.value,
        user_phone: phone.value,
        user_days: numDays.value,
        user_pickup: pickupDate.value,
        user_vehicle: vehicleName,
        user_extra: ExtraDetailsOutput,
        user_comment: userComment,
        user_total: priceTotal
    }
    firebase.database().ref('bookings').push(data);
    thxsUser();
}

function thxsUser() {
    // confirms the booking and thanks the user
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    thanksOutput.innerHTML = "Thank You for hiring with us. We hope you enjoy your time!<br>You will recieve an email shorlty regarding your booking.<br>You can now close this browser tab."
}

function updateNights(number) {
    // max and minimum days
    numDays.value = parseInt(numDays.value) + number;
    if (numDays.value > 14) {
        numDays.value = 14
    }
    if (numDays.value < 1) {
        numDays.value = 1
    }
}

function checkAge(object) {
    // so the user cannot enter age larger than a number
    if (object.value.length > object.max.length) object.value = object.value.slice(0, object.max.length)
}
// get todays date
function todayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    // swap it for hte values
    document.getElementById("pickupDate").setAttribute("min", today);
    document.getElementById("pickupDate").setAttribute("value", today);
};