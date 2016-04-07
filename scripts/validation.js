"use strict";


window.onload = function() {
    var form = document.getElementById("form");
    form.onsubmit = validateInput;
}

function validateInput() {
    var elem = document.getElementById("maxValue");

    if (elem && !isNaN(elem.value) && parseInt(elem.value) >= 1) {
        return true;
    }
    else {
        elem = document.getElementById("errorMaxValue");
        elem.className = "error";
        return false;
    }
}
