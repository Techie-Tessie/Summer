var unit = 100,
    canvasList, // canvas list
    info = {}, // common setting information
    colorList; // information of color

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
    info.seconds = 0;
    info.t = 0;
    canvasList = [];
    colorList = [];
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#42BFE4', '#A8DFF2', '#95DAEF']);//color setting
  // initializing
for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth; 
        canvas.height = 200;//height of wave
        canvas.contextCache = canvas.getContext("2d");
    }
    // 
    update();
}

function update() {
    for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        //draw
        draw(canvas, colorList[canvasIndex]);
    }
    
    info.seconds = info.seconds + .014;
    info.t = info.seconds*Math.PI;
    // call
    setTimeout(update, 35);
}

/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
 */
function draw(canvas, color) {
    var context = canvas.contextCache;
    context.clearRect(0, 0, canvas.width, canvas.height);

    //drawWave(canvas, color[wave number], opacity, width of zoom,delay )
    drawWave(canvas, color[0], 0.5, 3, 0);//0.5⇒opacity : 50%、3⇒if you make this value big, the wave will be slow
    drawWave(canvas, color[1], 0.4, 2, 250);
    drawWave(canvas, color[2], 0.2, 1.6, 100);
}

/**
* drawWave(color, opacity, wave width, delay)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
    var context = canvas.contextCache;
    context.fillStyle = color;//color of fill
    context.globalAlpha = alpha;
    context.beginPath(); //Path start
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.lineTo(canvas.width + 10, canvas.height); 
    context.lineTo(0, canvas.height); 
    context.closePath()
    context.fill(); //fill
}

/**
 * Function to draw sine
 * 
 * The sine curve is drawn in 10px segments starting at the origin. 
 * drawSine(time, width, zoom, delay of wave)
 */
function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height/2);
    var yAxis = 0;
    var context = canvas.contextCache;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    var x = t;
    var y = Math.sin(x)/zoom;
    context.moveTo(yAxis, unit*y+xAxis); 

    // Loop to draw segments 
    for (i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t+(-yAxis+i)/unit/zoom;
        y = Math.sin(x - delay)/3;
        context.lineTo(i, unit*y+xAxis);
    }
}

init();