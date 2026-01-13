export default function (p) {

    let canvas;
    let container;
    let gridData = []; // Almacenar los datos generados

    p.setup = () => {
        console.log("sketch intro setup");
        canvas = p.createCanvas(800, 800);
        container = p.canvas.parentElement;
        
        // Generar todos los valores aleatorios UNA vez en setup
        let rows = 10; 
        let cols = 10; 
        let cellSize = p.width / cols;
        
        gridData = [];
        for (let i = 0; i < rows; i++) {
        gridData[i] = [];
        for (let j = 0; j < cols; j++) {
            gridData[i][j] = {
            size: p.random(cellSize * 0.5, cellSize * 0.9),
            choice: Math.floor(p.random(3))
            };
        }
        }
        
        p.noLoop();
        console.log("no loop");
    };

    p.draw = () => {
        p.background(10); 
        p.stroke(255);
        p.noFill(); 

        let rows = 10; 
        let cols = 10; 
        let cellSize = p.width / cols;

        for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let x = j * cellSize + cellSize / 2;
            let y = i * cellSize + cellSize / 2;
            
            // Usar los valores pre-generados
            let size = gridData[i][j].size;
            let choice = gridData[i][j].choice;

            if (choice === 0) {
            p.ellipse(x, y, size, size); 
            } else if (choice === 1) {
            p.rect(x - size / 2, y - size / 2, size, size); 
            } else {
            p.line(x - size / 2, y - size / 2, x + size / 2, y + size / 2); 
            p.line(x - size / 2, y + size / 2, x + size / 2, y - size / 2);
            }
            p.strokeWeight(4);
            p.point(x, y);
            p.strokeWeight(1);
        }
        }

        p.stroke(0, 255, 0);
        p.noFill();
    };


    p.mousePressed = () => {
    // Regenerar los datos aleatorios
    let rows = 10; 
    let cols = 10; 
    let cellSize = p.width / cols;
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
        gridData[i][j] = {
            size: p.random(cellSize * 0.5, cellSize * 0.9),
            choice: Math.floor(p.random(3))
        };
        }
    }
    p.redraw(); // Redibujar con los nuevos valores
    };

    
}