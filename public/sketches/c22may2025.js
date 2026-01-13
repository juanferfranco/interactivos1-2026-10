export default function (p) {
let a;
let t = 0, w = 400, k = 0, e = 0, q = 0, c = 0;
let i;

a=(x,y,o=p.mag(k=x/4-12.5,e=y/9)/9)=>p.point((q=99+3*(p.tan(y/2)/2+p.cos(y))/k+k*(3+p.cos(y)/3+p.sin(e+o*4-t*2)))*p.cos(c=o/4+e/4-t/8)*p.cos(c/2-e/3+t/8)+200,q*p.sin(c)+200)
t=0,p.draw=$=>{t||p.createCanvas(w=400,w);p.background(6).stroke(w,46);for(t+=p.PI/90,i=3e4;i--;)a(i%100,i/350)}

    p.keyPressed = function(){
        console.log(p.frameRate());
    }

}

