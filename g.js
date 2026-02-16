const r = 5;
const c = 5;
var g = Array(c).fill().map(() => Array(r).fill(-1));

var xr=-1;
var yr=-1;
var att=5;
var score=0;

const hw=0;//hidden wrap mode
const hwn=5;//wrap at

const c0 = "background-color: lightgray;";

const c1 = "background-color: blue;";
const c2 = "background-color: cyan;";
const c3 = "background-color: lime;";
const c4 = "background-color: yellow;";
const c5 = "background-color: orange;";
const c6 = "background-color: red;";

const dc1 = "background-color: darkblue;";
const dc2 = "background-color: darkcyan;";
const dc3 = "background-color: green;";
const dc4 = "background-color: olive;";
const dc5 = "background-color: #8B5F00;";
const dc6 = "background-color: darkred;";

function rd(mx) {
	return Math.floor(Math.random()*mx);
}

function s(v){
    if(v===0){//blue
        return 10;
    }else if(v===1){//teal
        return 20;
    }else if(v===2){//green
        return 35;
    }else if(v===3){//yellow
        return 55;
    }else if(v===4){//orange
        return 90;
    }else if(v===5){//red
        return 150;
    }
    return 0;
}

function col(v,d=0){
    if(v===0){
        return (d===0)?c1:dc1;
    }else if(v===1){
        return (d===0)?c2:dc2;
    }else if(v===2){
        return (d===0)?c3:dc3;
    }else if(v===3){
        return (d===0)?c4:dc4;
    }else if(v===4){
        return (d===0)?c5:dc5;
    }else if(v===5){
        return (d===0)?c6:dc6;
    }
    return c0;
}

function dg(i,j,x,y){
    return (j+i===x+y||j-i===x-y);
}
function rc(i,j,x,y){
    return (j===x||i===y);
}

function ds(){
    for(let i=0;i<c;i++){
        for(let j=0;j<r;j++){
            let bt = document.getElementById("button"+(i*r+j));
            if(bt.disabled===false){
                bt.style=col(g[i][j],1);
            }
            bt.disabled="disabled";
        }
    }
}
function en(){
    for(let i=0;i<c;i++){
        for(let j=0;j<r;j++){
            let bt = document.getElementById("button"+(i*r+j));
            bt.disabled=false;
            bt.style=c0;
        }
    }
}

function cl(x,y,v,n=0){//n=0 => no limit
    if(v<0||v>4){
        return;
    }
    let tmp=[];
    for(let i=0;i<c;i++){
        for(let j=0;j<r;j++){
            if (((v===0&&!(rc(i,j,x,y)||dg(i,j,x,y)))||
                (v===1&&(rc(i,j,x,y)||dg(i,j,x,y)))||
                (v===2&&rc(i,j,x,y))||
                (v===3&&dg(i,j,x,y))||
                (v===4&&((j===x&&(i===y+1||i===y-1))||i===y&&(j===x+1||j===x-1))))&&
                !(j===xr&&i===yr)&&g[i][j]===-1){
                tmp.push(i*r+j);
            }
        }
    }
    if(n!=0){
        if(n<tmp.length){
            let tmp2=tmp.sort(()=>Math.random()-0.5).slice(0,n);//bad random
            for(let i=0;i<tmp2.length;i++){
                let x2=tmp2[i]%r;
                let y2=Math.floor(tmp2[i]/r);
                g[y2][x2]=v;
            }
        }else{
            for(let i=0;i<tmp.length;i++){
                let x2=tmp[i]%r;
                let y2=Math.floor(tmp[i]/r);
                g[y2][x2]=v;
            }
        }
    }else{
        for(let i=0;i<tmp.length;i++){
            let x2=tmp[i]%r;
            let y2=Math.floor(tmp[i]/r);
            g[y2][x2]=v;
        }
    }
}

function init(){
    g = Array(c).fill().map(() => Array(r).fill(-1));
    xr=rd(r);
    yr=rd(c);
    while(xr===Math.floor(r/2)&&yr===Math.floor(c/2)){
        xr=rd(r);
        yr=rd(c);
    }
    g[yr][xr]=5;
    cl(xr,yr,4,2);
    cl(xr,yr,3,3);
    cl(xr,yr,2,4);
    cl(xr,yr,1);
    cl(xr,yr,0);
    en();
}

function inf(){
    document.getElementById("att2").innerHTML="tries left: "+att;
    document.getElementById("sc").innerHTML="score: "+score;
}

function rst(){
    init();
    let e = document.getElementsByClassName("msg");
    while(e.length > 0) {
        e[0].parentNode.removeChild(e[0]);
    }
    score=0;
    att=document.getElementById("att").value;
    inf();
}

function rv(x,y){
    let bt = document.getElementById("button"+(y*r+x));
    bt.disabled="disabled";
    bt.style=col(g[y][x]);
    score+=s(g[y][x]);
    lg(g[y][x],s(g[y][x]));
    att--;
    inf();
    if(att<=0){
        document.getElementById("att2").innerHTML="done";
        ds();
    }
}

function lg(v=-1,sc=-1){
    let dv = document.getElementById("log");
    let sym=document.createElement("span");
    let msg=document.createElement("span");
    let br=document.createElement("br");
    sym.innerHTML="&nbsp;";
    msg.innerHTML="&nbsp;+"+sc;
    sym.style=col(v)+"text-align: center;display: inline-block;width: 22px;";
    sym.classList.add("msg");
    msg.classList.add("msg");
    br.classList.add("msg");
    dv.appendChild(sym);
    dv.appendChild(msg);
    dv.appendChild(br);
}

function mk(func){
    let dv = document.getElementById("btn");
    for(let i=0;i<c;i++){
        let cnt=0;
        for(let j=0;j<r;j++){
            let bt=document.createElement("button");
            bt.value=i*r+j;
            bt.id="button"+(i*r+j);
            bt.style=c0;
            bt.innerHTML="&nbsp;";
            bt.classList.add("b");
            bt.onclick=func;
            dv.appendChild(bt);
            cnt++;
            if(hw===1&&hwn<r&&cnt===hwn){
                let br=document.createElement("br");
                dv.appendChild(br);
            }
        }
        let br=document.createElement("br");
        dv.appendChild(br);
    }
}

mk(function f(){
    let y=Math.floor(this.value/r);
    let x=this.value%r;
    rv(x,y);
});