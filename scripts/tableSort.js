"use strict";


window.onload = setAllEventHandlers;

function setAllEventHandlers() {
    var table = document.getElementById("triplesResults");
    var tableHeaders = table.rows[0].children;

    for (var i = 0; i < tableHeaders.length; ++i) {
        setEventHandler(tableHeaders[i], i);
    }
}

function setEventHandler(element, column) {
    element.addEventListener("click", function() {
        var table = document.getElementById("triplesResults");
        var rowCol = table.rows;
        var rows = [];

        for (var i = 0; i < rowCol.length; ++i) {
            rows[i] = rowCol[i];
        }

        rows.sort(function(row1, row2) {
            var x1 = parseInt(row1.children[column].innerText);
            var x2 = parseInt(row2.children[column].innerText);

            if (isNaN(x1) && isNaN(x2)) {
                return 0;
            }
            else if (isNaN(x1)) {
                return -1;
            }
            else if (isNaN(x2)) {
                return 1;
            }
            else {
                return x1 - x2;
            }
        });

        buildNewTable(rows);
    });
}

function buildNewTable(rows) {
    var table = document.getElementById("triplesResults");
    var newTable = document.createElement("table");
    var row, cell;
    newTable.id = table.id;

    for (var i = 0, row, cell; i < rows.length; ++i) {
        if (i === 0) {
            row = newTable.createTHead().insertRow(0);
            for (var j = 0; j < 3; ++j) {
                cell = document.createElement("th");
                cell.innerText = rows[i].children[j].innerText;
                row.appendChild(cell);
            }
        }
        else {
            row = newTable.insertRow(i);
            for (var j = 0; j < 3; ++j) {
                cell = row.insertCell(j);
                cell.innerText = rows[i].children[j].innerText;
            }
        }
    }

    table.outerHTML = newTable.outerHTML;
    setAllEventHandlers();
}
