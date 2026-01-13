export default function (p) {

      let currentPos, target;

      p.setup = function () {
        let canvas = p.createCanvas(580, 580);
        const sketchContainer = p.canvas.parentElement;
        currentPos = p.createVector(150, 300);
        target = p.createVector(450, 300);
        
      };

      p.draw = function () {
        p.background(0);
        p.textSize(20);
        p.strokeWeight(2);

        // Vector mix o interpolado
        
        // Vector "x" (currentPos) en verde
        p.stroke('green');
        p.line(0, 0, currentPos.x, currentPos.y);
        drawArrowHead(currentPos, 'green');
        p.noStroke();
        p.fill('green');
        p.text("x (current)", currentPos.x, currentPos.y + 20);
        
        // Vector "y" (target) en rojo
        p.stroke('red');
        p.line(0, 0, target.x, target.y);
        drawArrowHead(target, 'red');
        p.noStroke();
        p.fill('red');
        p.text("y (target)", target.x, target.y + 20);
        
        // Vector interpolado en blanco
        let t = p.constrain(p.map(p.mouseX,currentPos.x, target.x,0,1),0,1);
        let mixed = p5.Vector.add(p5.Vector.mult(currentPos, 1-t), p5.Vector.mult(target,t))    
        
        p.stroke('white');
        p.line(0, 0, mixed.x, mixed.y);
        drawArrowHead(mixed, 'white');
        p.noStroke();
        p.fill('white');
        let aValue = p.round(t,2);
        p.text(`mix(x, y, ${aValue})`, mixed.x+10, mixed.y);
        //console.log("sketch interpolation is running");
      };

      function drawArrowHead(vec, col) {
        p.push();
        p.translate(vec.x, vec.y);
        let angle = p.atan2(vec.y, vec.x);
        p.rotate(angle);
        p.fill(col);
        p.noStroke();
        p.triangle(0, 0, -10, 5, -10, -5);
        p.pop();
      }
}