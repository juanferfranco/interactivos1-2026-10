export default function (p) {
    let t = 0;
    let w = 600;
    let k = 0;
    let e = 0;
    let q = 0;
    let c = 0;
    let a = (x, y, d = p.mag(k = (4 + p.sin(x / 11 + t * 8)) * p.cos(x / 14), e = y / 8 - 19) + p.sin(y / 9 + t * 2)) => p.point((q = 2 * p.sin(k * 2) + p.sin(y / 17) * k * (9 + 2 * p.sin(y - d * 3)))+50*p.cos(c=d*d/49-t)+200,q*p.sin(c)+d*39-440);

    p.setup = function () {
        p.createCanvas(w, w);
        p.background(9);
        p.stroke(w, 96);
    }

    p.draw = function () {
        p.background(9).stroke(w,96);
        let i=0;
        for(t+=p.PI/240,i=1e4;i--;){
            a(i,i/235);
        }
            
    }
}