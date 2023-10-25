
function submitForm(e) {


    console.log("Executing");

    var date = $(".date").val();
    var startTime = $(".timeStart").val();
    var endTime = $(".timeEnd").val();
    var activity = $(".activity").val();
    var place = $(".place").val();
    var type = $(".type").val();
    var notes = $(".notes").val();
    var free = $(".freeBusy").prop("checked");

    const newRow = $('<tr>');

    newRow.append("<td>" + date + "</td>");
    newRow.append("<td>" + startTime + "</td>");
    newRow.append("<td>" + endTime + "</td>");
    newRow.append("<td>" + activity + "</td>");
    newRow.append("<td>" + place + "</td>");
    newRow.append("<td>" + type + "</td>");
    newRow.append("<td>" + notes + "</td>");
    newRow.append("<td>" + (free ? "<img src = 'images/free.png' alt='free-icon' width = '50vw' height = '50vh'/>" :
        "<img src = 'images/busy.png' alt='busy-icon' width = '50vw' height = '50vh'/>") + "</td>");

    $(".schedule tbody").append(newRow);

}

$(".form").on("click", submitForm);
