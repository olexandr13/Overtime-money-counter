@@ -62,7 +62,7 @@ document.addEventListener('DOMContentLoaded', function () {
        }
        document.getElementById("toBeDisappeared").style.display = 'none';
        document.getElementById("toBeAppeared").style.display = 'inline';
        pElFOrSalaryAndOvertimeValues.innerHTML = 'Salary is set to: ' + salary + '; overtime is ' + overtimeCheckboxIsChecked;
        pElFOrSalaryAndOvertimeValues.innerHTML = 'Salary is set to <span id="test">' + salary + '</span>$; overtime is ' + overtimeCheckboxIsChecked;
        moneyAmountToAddEachSecond = salary / 168 / 60 / 60;
        if (overtimeCheckboxIsChecked) moneyAmountToAddEachSecond *= 1.25;
        trigger = setInterval(function () {
@ -92,8 +92,8 @@ document.addEventListener('DOMContentLoaded', function () {
        }
    });

//    ICE timer
    var countDownDate = new Date("Feb 6, 2018 10:00:00").getTime();
/*//    ICE timer start
    var countDownDate = new Date("Feb 5, 2019 12:00:00").getTime();
    // var countDownDate = new Date("Jan 26, 2018 18:08:05").getTime();
    var x = setInterval(function () {
        var now = new Date().getTime();
@ -105,9 +105,13 @@ document.addEventListener('DOMContentLoaded', function () {
        var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("iceTimer").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";
        if (days === 0) {
            document.getElementById("iceTimer").innerHTML = hours + "h "
                + minutes + "m " + seconds + "s ";
        } else {
            document.getElementById("iceTimer").innerHTML = days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ";
        }

        // If the count down is finished, write some text
        if (difference < 0) {
@ -118,4 +122,7 @@ document.addEventListener('DOMContentLoaded', function () {
            document.getElementById("iceTimer").style.fontSize = "2em";
        }
    }, 1000);
//    ICE timer end*/


});
