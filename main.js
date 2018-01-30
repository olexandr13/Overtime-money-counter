document.addEventListener('DOMContentLoaded', function () {
    var startDate;
    var currentDate;
    var secondsAmountFromStart;
    var pElForMoneyCounter = document.getElementById('totalEarnedAmount');
    var timeCounter = document.getElementById('time');
    var moneyAmountToAddEachSecond = 0;
    var salary;
    var totalEarnedMoneyToBeDisplayed = 0;
    var pElFOrSalaryAndOvertimeValues = document.getElementById("salaryAndOvertimeValues");
    var pElForError = document.getElementsByClassName('error')[0];
    var trigger;
    var totalTimeOnPause = 0;
    var pauseStartTime;
    var pauseStopTime;
    var overtimeCheckboxIsChecked;

    //cut numbers after comma
    // x - number to be cut;
    // n - numbers after comma;
    // plusZero - if TRUE add '0' if number < 10 (diaplay '01' instead of '1')
    function roundPlus(x, n, plusZero) {
        if (isNaN(x) || isNaN(n)) return false;
        var m = Math.pow(10, n);
        var result = Math.round(x * m) / m;
        if (plusZero && result < 10) {
            return '0' + result;
        } else return result;
    }

    function convertTimeToPrettyFromat(totalSeconds) {
        hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        minutes = Math.floor(totalSeconds / 60);
        seconds = totalSeconds % 60;
        if (minutes < 10) minutes = '0' + minutes.toString();
        return (hours + ':' + minutes + ':' + roundPlus(seconds, 0, true))
    }

    function countTotalMoneyAmountAndTimeToBeDisplayedAndAddDisplayInHTML() {
        currentDate = new Date();
        totalEarnedMoneyToBeDisplayed = (currentDate - startDate) / 1000 * moneyAmountToAddEachSecond;
        pElForMoneyCounter.innerHTML = '$ ' + roundPlus(totalEarnedMoneyToBeDisplayed, 2, false);
        secondsAmountFromStart = (currentDate - startDate) / 1000;
        timeCounter.innerHTML = convertTimeToPrettyFromat(secondsAmountFromStart);
    }

    document.getElementById("run").addEventListener("click", function () {
        startDate = new Date();
        overtimeCheckboxIsChecked = document.getElementById('overtimeCheckbox').checked;
        var salaryInput = document.getElementById('salary');
        salary = parseInt(salaryInput.value);
        if (salary <= 0 || isNaN(salary)) {
            pElForError.innerHTML = 'Enter valid salary value';
            pElForError.style.display = 'inline';
            return;
        }
        if (salary > 10000) {
            pElForError.innerHTML = 'Likely it\'s not true';
            pElForError.style.display = 'inline';
            return;
        }
        document.getElementById("toBeDisappeared").style.display = 'none';
        document.getElementById("toBeAppeared").style.display = 'inline';
        pElFOrSalaryAndOvertimeValues.innerHTML = 'Salary is set to: ' + salary + '; overtime is ' + overtimeCheckboxIsChecked;
        moneyAmountToAddEachSecond = salary / 168 / 60 / 60;
        if (overtimeCheckboxIsChecked) moneyAmountToAddEachSecond *= 1.25;
        trigger = setInterval(function () {
            countTotalMoneyAmountAndTimeToBeDisplayedAndAddDisplayInHTML(moneyAmountToAddEachSecond);
        }, 1000);
    });

//    pause and play
    var pauseAndPlay = document.getElementById("pauseAndPlay");
    pauseAndPlay.addEventListener("click", function () {
        // pause
        if (pauseAndPlay.src === window.location.origin + '/pause.png') {
            pauseAndPlay.src = window.location.origin + '/play.png';
            pauseStartTime = new Date();
            clearInterval(trigger);
            return;
        }
        //play
        if (pauseAndPlay.src === window.location.origin + '/play.png') {
            pauseAndPlay.src = window.location.origin + '/pause.png';
            pauseStopTime = new Date();
            totalTimeOnPause = pauseStopTime - pauseStartTime;
            startDate.setTime(startDate.getTime() + totalTimeOnPause);
            trigger = setInterval(function () {
                countTotalMoneyAmountAndTimeToBeDisplayedAndAddDisplayInHTML(moneyAmountToAddEachSecond);
            }, 1000);
        }
    });

//    ICE timer
    var countDownDate = new Date("Feb 6, 2018 10:00:00").getTime();
    // var countDownDate = new Date("Jan 26, 2018 18:08:05").getTime();
    var x = setInterval(function () {
        var now = new Date().getTime();

        var difference = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(difference / (1000 * 60 * 60 * 24));
        var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("iceTimer").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (difference < 0) {
            clearInterval(x);
            var elToDelete = document.getElementById("iceText");
            document.getElementById("ICEwrapper").removeChild(elToDelete);
            document.getElementById("iceTimer").innerHTML = '<span style="color:red">I</span><span style="color:green">C</span><span style="color:blue">E</span> <p>show has started!</p>';
            document.getElementById("iceTimer").style.fontSize = "2em";
        }
    }, 1000);
});
