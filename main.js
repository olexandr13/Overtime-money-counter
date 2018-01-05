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
        totalEarnedMoneyToBeDisplayed = (currentDate-startDate)/1000*moneyAmountToAddEachSecond;
        pElForMoneyCounter.innerHTML = '$ ' + roundPlus(totalEarnedMoneyToBeDisplayed, 2, false);
        secondsAmountFromStart = (currentDate - startDate) / 1000;
        timeCounter.innerHTML = convertTimeToPrettyFromat(secondsAmountFromStart);
    }

    document.getElementById("run").addEventListener("click", function() {
        startDate = new Date();
        overtimeCheckboxIsChecked = document.getElementById('overtimeCheckbox').checked;
        var salaryInput = document.getElementById('salary');
        salary = parseInt(salaryInput.value);
        if(salary <= 0 || isNaN(salary)) {
            pElForError.innerHTML = 'Enter valid salary value';
            pElForError.style.display = 'inline';
            pElForError.style.color = 'red';
            return;
        }
        if(salary > 10000) {
            pElForError.innerHTML = 'Good joke. Ha-ha';
            pElForError.style.display = 'inline';
            pElForError.style.color = 'green';
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
            totalTimeOnPause = pauseStopTime-pauseStartTime;
            startDate.setTime(startDate.getTime() + totalTimeOnPause);
            trigger = setInterval(function () {
                countTotalMoneyAmountAndTimeToBeDisplayedAndAddDisplayInHTML(moneyAmountToAddEachSecond);
            }, 1000);
        }
    });

});
