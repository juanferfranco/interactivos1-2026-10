export default function (p) {
  let hueSlider, satSlider, brightSlider;
  let hsbColor, rgbColor;
  let colorWheelGraphic;
  let wheelRadius = 150;
  let wheelX = 230, wheelY = 390;

  p.setup = function () {
    // Crear un canvas más ancho para acomodar los sliders
    let canvas = p.createCanvas(650, 550); // Aumenté el ancho de 480 a 650
    const sketchContainer = p.canvas.parentElement;

    p.colorMode(p.HSB, 255);
    let sliderX = 490; // Posición fija para los sliders dentro del canvas

    // Create and parent the paragraph and slider elements to sketchContainer
    let tonoP = p.createP("Tono (H)");
    tonoP.parent(sketchContainer);
    tonoP.position(sliderX, 20);
    tonoP.style('margin', '0');
    tonoP.style('color', 'white');
    tonoP.style('font-size', '14px');

    hueSlider = p.createSlider(0, 255, 0);
    hueSlider.parent(sketchContainer);
    hueSlider.position(sliderX, 50);

    let satP = p.createP("Saturación (S)");
    satP.parent(sketchContainer);
    satP.position(sliderX, 80);
    satP.style('margin', '0');
    satP.style('color', 'white');
    satP.style('font-size', '14px');

    satSlider = p.createSlider(0, 255, 255);
    satSlider.parent(sketchContainer);
    satSlider.position(sliderX, 110);

    let brilloP = p.createP("Brillo (B)");
    brilloP.parent(sketchContainer);
    brilloP.position(sliderX, 140);
    brilloP.style('margin', '0');
    brilloP.style('color', 'white');
    brilloP.style('font-size', '14px');

    brightSlider = p.createSlider(0, 255, 255);
    brightSlider.parent(sketchContainer);
    brightSlider.position(sliderX, 170);

    colorWheelGraphic = createColorWheelGraphic(wheelRadius);
  };

  p.draw = function () {
    p.background(30);
    p.noStroke();
    
    let h = hueSlider.value();
    let s = satSlider.value();
    let b = brightSlider.value();
    
    hsbColor = p.color(h, s, b);
    rgbColor = p.color(hsbColor);
    
    // Rectángulo que muestra el color HSB
    p.fill(hsbColor);
    p.rect(20, 80, 150, 100);
    p.fill(255);
    p.textSize(16);
    p.text(`HSB: ${h}, ${s}, ${b}`, 30, 50);
    p.text(`(${getSaturationDescription(s)}, ${getBrightnessDescription(b)})`, 20, 220);
    
    // Rectángulo que muestra el color RGB
    p.fill(rgbColor);
    p.rect(300, 80, 150, 100);
    p.fill(255);
    let redColor = p.round(p.red(rgbColor));
    let greenColor = p.round(p.green(rgbColor));
    let blueColor = p.round(p.blue(rgbColor));
    p.text(`RGB: ${redColor}, ${greenColor}, ${blueColor}`, 300, 50);
    
    // Dibujar la color wheel en la posición definida
    drawColorWheelAt(wheelX, wheelY);
    //console.log("sketch colorWheel is running");
  };

  // ...resto de las funciones permanecen igual...
  function createColorWheelGraphic(r) {
    let graphic = p.createGraphics(r * 2, r * 2);
    graphic.colorMode(p.HSB, 255);
    graphic.noStroke();
    
    for (let angle = 0; angle < 360; angle++) {
      for (let radius = 0; radius < r; radius++) {
        let h = angle / 360 * 255;
        let s = p.map(radius, 0, r, 0, 255);
        let b = 255;
        let c = p.color(h, s, b);
        let angleAdjusted = angle - 90;
        let px = r + p.cos(p.radians(angleAdjusted)) * radius;
        let py = r + p.sin(p.radians(angleAdjusted)) * radius;
        graphic.stroke(c);
        graphic.point(px, py);
      }
    }
    return graphic;
  }

  function drawColorWheelAt(x, y) {
    p.image(colorWheelGraphic, x - wheelRadius, y - wheelRadius);
    
    let h = hueSlider.value();
    let s = satSlider.value();
    let markerAngle = p.map(h, 0, 255, 0, 360) - 90;
    let markerRadius = p.map(s, 0, 255, 0, wheelRadius);
    let markerX = x + p.cos(p.radians(markerAngle)) * markerRadius;
    let markerY = y + p.sin(p.radians(markerAngle)) * markerRadius;
    p.fill(0);
    p.ellipse(markerX, markerY, 15, 15);
  }

  function getSaturationDescription(s) {
    if (s < 50) return "Muy baja saturación (casi gris)";
    if (s < 130) return "Saturación media (colores apagados)";
    return "Alta saturación (colores vivos)";
  }

  function getBrightnessDescription(b) {
    if (b < 50) return "Muy oscuro";
    if (b < 130) return "Brillo medio";
    return "Brillo alto";
  }
}
