export default function (p) {
    let t = 0;

    p.setup = function () {
        p.createCanvas(600, 600);
        p.background(9);
        p.colorMode(p.HSB, 360, 100, 100);
    }

    p.draw = function () {
        p.background(9);
    
        t += p.PI / 45;
        for (let i = 10000; i--;) {
            let x = i % 200;
            let y = i / 55;

            let k = 9 * p.cos(x / 8);
            let e = y / 8 - 12.5;
            let d = p.sq(p.mag(k, e)) / 99 + p.sin(t) / 6 + 0.5;

            let angle = p.atan2(k, e);
            let q = 99 - e * p.sin(angle * 7) / d + k * (3 + p.cos(d * d - t) * 2);
            let c = d / 2 + e / 69 - t / 16;

            let px = q * p.sin(c) + 200;
            let py = (q + 19 * d) * p.cos(c) + 200;

            p.stroke(p.map(p.mouseX, 0, p.width, 0, 360), 100, 100, 0.5);
            p.point(px, py);
        }
    }

    p.keyPressed = function(){
        console.log(p.frameRate());
    }
}