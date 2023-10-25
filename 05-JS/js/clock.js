function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;

  var grad = ctx.createLinearGradient(0, 0, radius, 0);
  grad.addColorStop(0, "beige");
  grad.addColorStop(1, "gray");
  ctx.fillStyle = grad;

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.9, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();

  // Draw the edge circle with gradient
  // TODO: (Optional) add a gradient circle

  // Center circle
  // TODO: make the central black circle
}

function drawNumbers(ctx, radius) {
  //TODO: Make sure you show all the numbers
  var ang;
  //var num = 1;

  for(num=1; num<=12; num++){
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  // TODO: Calculate the angles of every hand depending on the time
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  console.log("hour "+hour)
  console.log("minute: "+minute)
  console.log("second: "+second)

  //hour
  if (hour>12){
    hour-=12;
  }
  hour= hour *(2*Math.PI)/12
 
  drawHand(ctx, hour, radius * 0.5, radius * 0.07);
  //minute
  minute= minute *(2*Math.PI)/60
  drawHand(ctx, minute, radius * 0.8, radius * 0.07);
  // second
  second= second *(2*Math.PI)/60
  drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
