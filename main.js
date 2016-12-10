var AMOUNT_OF_POINTS = 90;

var c = document.getElementById("canvas");
var context = c.getContext("2d");

var points = [];
this.color = "darkgreen";

var Point = function() {
    this.x = Math.random()*980+10;
    this.y = Math.random()*980+10;
    this.radius = 2;
    this.connections = [];
    this.xvelocity = Math.random()-0.5;
    this.yvelocity = Math.random()-0.5;

    this.update = function(myIndex) {
        this.x += this.xvelocity;
        this.y += this.yvelocity;

        if (this.x > 1000) {
            this.xvelocity = -1 * Math.abs(this.xvelocity);
        } else if (this.x < 0) {
            this.xvelocity = Math.abs(this.xvelocity);
        }

        if (this.y > 1000) {
            this.yvelocity = -1 * Math.abs(this.yvelocity);
        } else if (this.y < 0) {
            this.yvelocity = Math.abs(this.yvelocity);
        }

        for (var i = 0; i < points.length; i++) {
            if (i == myIndex) {continue;}
            if (Math.floor(Math.random() * 200) == 0 && this.distanceFrom(points[i]) < 100) {
                // point chosen, toggle connection
                if (this.connections.indexOf(points[i]) == -1) {
                    this.connections.push(points[i]);
                } else {
                    //this.connections.splice(this.connections.indexOf(points[i]), 1);
                }
            }
        }

        for (var i = this.connections.length-1; i >= 0; i--) {
            point = this.connections[i];
            if (this.distanceFrom(point) > 100) {
                this.connections.splice(i, 1);
            }
        }

        // update color
        this.color = "rgb(0, " + (this.connections.length*50+40) + ", 0)"
    }

    this.distanceFrom = function(point) {
        var a = this.x - point.x;
        var b = this.y - point.y;

        return Math.sqrt(a*a + b*b);
    }

    this.draw = function() {
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        context.fill();
        context.stroke();

    }

    this.drawLines = function() {
        context.lineWidth = 2;
        context.fillStyle = "darkgreen";
        context.strokeStyle = "darkgreen";
        for (var i = 0; i < this.connections.length; i++) {
            context.beginPath();
            context.moveTo(this.x, this.y);
            context.lineTo(this.connections[i].x, this.connections[i].y);
            context.stroke();
        }
    }
}

function drawPoints() {

    
    
    context.fillStyle = "black";
    context.strokeStyle = "darkgreen";
    context.fillRect(0, 0, 1000, 1000);
    context.fillStyle = "darkgreen";

    for (var i = 0; i < points.length; i++) {
        points[i].update(i);
        points[i].drawLines();
        points[i].draw();
    }
}

for (var i = 0; i < AMOUNT_OF_POINTS; i++) {
    points.push(new Point());
}

setInterval(drawPoints, 50);




function type() {
    var needTyping = false;
    $(".type").each(function() {
        var text = $(this).text();
        var data = $(this).attr("data");
        if (text.length < data.length) {
            $(this).text(text + data.charAt(text.length));
            needTyping = true;
        }
    });
    if (needTyping) {
        setTimeout(function(){type();}, 150)
    }
}
$(document).ready(function() {
    
    var open = true;
    
    //navbar
    $(".bars").click(function() {
        if (open) {
            $(".navbar").css("left", (-1 * $(".navbar").width() - 60) + "px");
        } else {
            $(".navbar").css("left", "0px");
        }
        open = !open;
    });
    
    // close the navbar
    $(".navbar").css("left", (-1 * $(".navbar").width() - 60) + "px");
    open = false;
    
    
    
    // canvas size
    $(window).resize(function(){
        if ($(".splash").width() > $(".splash").height()) {
            $('#canvas').css('width', '100%');
            $('#canvas').height($('#canvas').width());
        } else {
            $('#canvas').css('height', '100%');
            $('#canvas').width($('#canvas').height());
        }
    });
    
    
    
    $(".type").each(function() {
        $(this).attr("data", $(this).text());
        $(this).text("");
    });
    setTimeout(function(){ type() }, 500);
});