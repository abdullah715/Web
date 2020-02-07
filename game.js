var num = 1;
var start = false;
var min = 1;
var time = 0;
var prevLvl = 0;
var lvl = 0;
//setting 

//Time Between Levels in Seconds

lvlTime = 30;
//number of obstacles
var obstacleCount = 3;

//breakpoint
/*
The position for the generation of next block must equal or less than the obstacle count
1 - end of arena width
2 - at half
3 - at one third from right
*/
var posDivi = 3;

//speed

var speed = 8000;

function slide(num) {
    

     $("#obstacle_" + num).show();

    var topPostions = ["125px", "-25px"];

    var randNum = Math.floor(Math.random() * 2);
    $("#obstacle_" + num).css("top", topPostions[randNum])

    $("#obstacle_" + num).animate({
        left: "-10%"
    }, speed,
           function () {

               $("#obstacle_" + num).css("left", "100%");
               $("#obstacle_" + num).hide();
           })

}



//check every 10 milli second for which is active and move it

setInterval(function () {

    if (start) {
        var posCurrent;
        if (num <= obstacleCount) {
            posCurrent = $("#obstacle_" + num).position();
        } else {
            posCurrent = $("#obstacle_3").position();
        }


       // console.log(posCurrent.left);

        var arWidth = $(".arena").width();

        var breakpoint = (arWidth - (arWidth / posDivi));


        if (posCurrent.left < breakpoint) {

            if (num <= obstacleCount) {

                num++;
                slide(num);

            } else {
                num = 1;
                slide(1);
            }


        }
    }

    if ((lvl - prevLvl == 1) && num == 1) {
        prevLvl++;
        levelUp();
    }

}, 10)




$(document).keypress(function () {
    if (!start) {
        start = true;
        for (var i = 1; i <= obstacleCount; i++) {
            $('.arena').append(" <div id='obstacle_" + i + "' class='obstacle'></div>")
        }

        startCounter();
        slide(num);
    }
    
});


function startCounter() {

    setInterval(function () {
        $("#counter").text(time);
        time++;

        //Leveling Up
        if (time % lvlTime == 0 || time == 1) {

            prevLvl = lvl;
            lvl++;
            $("#Level").text("Level " + lvl + "Completed " + prevLvl);


        }
    }, 1000);
}


function levelUp() {
    //speedup if diff in level
         obstacleCount++;
        $('.arena').append(" <div id='obstacle_" + obstacleCount + "' class='obstacle'></div>");
        speed -= 1000;
        posDivi++;

}