document.addEventListener('DOMContentLoaded', function () {

    function roundPlus(x, n, plusZero) {
        if(isNaN(x) || isNaN(n)) return false;
        var m = Math.pow(10,n);
        var result = Math.round(x*m)/m;
        if (plusZero && result < 10) {
            return '0' + result;
        } else return result;
    }

    var startDate;
    var currentDate;
    var secondsAmount;

    function timeCounter(totalSeconds) {
        hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        minutes = Math.floor(totalSeconds / 60);
        seconds = totalSeconds % 60;
        if (minutes < 10) minutes = '0' + minutes.toString();
        return (hours + ':' + minutes + ':' + roundPlus(seconds, 0, true))
    }

    var pForCounter = document.getElementById('counter');
    var time = document.getElementById('time');

    var countSec = 0;
    var salary;
    var value = 0;
    function count(countSec) {
        value += countSec;
        pForCounter.innerHTML = roundPlus(value,3,false) + ' $';
        currentDate = new Date();
        secondsAmount = (currentDate-startDate)/1000;
        time.innerHTML = timeCounter(secondsAmount);

    }

    document.getElementById("run").addEventListener("click", function(){
        startDate = new Date();
        // document.getElementById("run").disabled = true;
        document.getElementById("disappered").style.display = 'none';
        var salaryInput = document.getElementById('salary');
        salary = parseInt(salaryInput.value);
        document.getElementById("salaryValue").innerHTML = 'Salary is set to: ' + salary;
        countSec = salary/168/60/60;
        if (!document.getElementById('overtimeCheckbox').isDisabled) countSec *= 1.25;
        setInterval(function () {
            count(countSec);
        }, 1000);
    });

});
