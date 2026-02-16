const r = 5;
const c = 5;
var l=r*c;
var g = Array(c).fill().map(() => Array(r).fill(-1));

var xt=-1;
var yt=-1;
var fs=0;
var att=5;

const hw=0;//hidden wrap mode
const hwn=5;//wrap at

//other colors
const cr = "background-color: lightgray;";//valid
const cw = "background-color: gray;";//invalid
const dcw = "background-color: dimgray;";//blocked
const cs = "background-color: magenta;";//selected
//colors
const c1 = "background-color: blue;";
const c2 = "background-color: cyan;";
const c3 = "background-color: lime;";
const c4 = "background-color: yellow;";
const c5 = "background-color: orange;";
const c6 = "background-color: red;";
//dark colors
const dc1 = "background-color: darkblue;";
const dc2 = "background-color: darkcyan;";
const dc3 = "background-color: green;";
const dc4 = "background-color: olive;";
const dc5 = "background-color: #8B5F00;";
const dc6 = "background-color: darkred;";

function dg(i,j,x,y){
    return (j+i===x+y||j-i===x-y);
}
function rc(i,j,x,y){
    return (j===x||i===y);
}
function d(x,y,v){
    let s=0;
    g[y][x]=-2;
    for(let i=0;i<c;i++){
        for(let j=0;j<r;j++){
            if ((v===0&&(rc(i,j,x,y)||dg(i,j,x,y)))||
                (v===1&&!rc(i,j,x,y)&&!dg(i,j,x,y))||
                (v===2&&!rc(i,j,x,y))||
                (v===3&&!dg(i,j,x,y))||
                (v===4&&!((j===x&&(i===y+1||i===y-1))||i===y&&(j===x+1||j===x-1)))||
                (v===5)){
                g[i][j]=(g[i][j]<0)?-2:g[i][j];
            }
            s+=(g[i][j]===-1)?1:0;
        }
    }
    g[y][x]=v;
    l=s;
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
    return cr;
}

function ds(){
    for(let i=0;i<c;i++){
        for(let j=0;j<r;j++){
            let bt = document.getElementById("button"+(i*r+j));
            bt.disabled="disabled";
            if(j===xt&&i===yt){
                bt.style=cs;
            }else{
                bt.style=(g[i][j]===-2||g[i][j]===-1)?dcw:col(g[i][j],1);
            }
        }
    }
}
function en(m=0){
    for(let i=0;i<c;i++){
        for(let j=0;j<r;j++){
            let bt = document.getElementById("button"+(i*r+j));
            if(g[i][j]===-1){
                bt.disabled=false;
                bt.style=cr;
            }else if(g[i][j]>=0&&g[i][j]<=5){
                bt.style=col(g[i][j]);
            }else{
                bt.style=cw;
                if(fs===1){
                    bt.disabled=false;
                }
            }
            if(m===1){
                bt.disabled="disabled";
            }
        }
    }
}

function ds2(){
    document.getElementById("blue").disabled="disabled";
    document.getElementById("teal").disabled="disabled";
    document.getElementById("gren").disabled="disabled";
    document.getElementById("yelw").disabled="disabled";
    document.getElementById("orng").disabled="disabled";
    document.getElementById("rred").disabled="disabled";

    document.getElementById("blue").style=dc1;
    document.getElementById("teal").style=dc2;
    document.getElementById("gren").style=dc3;
    document.getElementById("yelw").style=dc4;
    document.getElementById("orng").style=dc5;
    document.getElementById("rred").style=dc6;
}
function en2(){
    document.getElementById("blue").disabled=false;
    document.getElementById("teal").disabled=false;
    document.getElementById("gren").disabled=false;
    document.getElementById("yelw").disabled=false;
    document.getElementById("orng").disabled=false;
    document.getElementById("rred").disabled=false;

    document.getElementById("blue").style=c1;
    document.getElementById("teal").style=c2;
    document.getElementById("gren").style=c3;
    document.getElementById("yelw").style=c4;
    document.getElementById("orng").style=c5;
    document.getElementById("rred").style=c6;
}

function end(f){
    if(f===1){
        let flg=false;
        for(let i=0;i<c;i++){
            for(let j=0;j<r;j++){
                if (g[i][j]===-1){
                    d(j,i,5);
                    flg=true;
                    break;
                }
            }
            if(flg){
                break;
            }
        }
    }
    if((f===0||f===1)){
        document.getElementById("sub").innerHTML="found red";
    }else if(f===2){
        document.getElementById("sub").innerHTML="cant find red";
    }else if(f===3){
        document.getElementById("sub").innerHTML="wtf";
    }else{
        document.getElementById("sub").innerHTML="no more tries";
    }
    en(1);ds2();
}

function attup(){
    document.getElementById("att2").innerHTML="tries left: "+att;
}

function a(v){
    if(xt!=-1&&yt!=-1){
        att--;
        attup();
        document.getElementById("sub").innerHTML="select cell";
        if(v === 5){
            if(g[yt][xt]!=-2){
                d(xt,yt,v);
                end(0);
            }else{
                d(xt,yt,v);
                end(3);
            }
        }else{
            d(xt,yt,v);
            en();ds2();
            xt=-1;yt=-1;
            if(att<=0){
                end(4);
            }else{
                if(l===1){
                    end(1);
                }else if(l===0){
                    end(2);
                }
            }
        }
    }
}

function rst(){
    xt=-1;yt=-1;
    g = Array(c).fill().map(() => Array(r).fill(-1));
    g[Math.floor(c/2)][Math.floor(r/2)]=-2;
    l=r*c;
    att=document.getElementById("att").value;
    fs=(document.querySelector('#fs').checked===true)?1:0;
    attup();
    ds();
    en();ds2();
    document.getElementById("sub").innerHTML="select cell";
}

function mk(func){
    let dv = document.getElementById("btn");
    for(let i=0;i<c;i++){
        let cnt=0;
        for(let j=0;j<r;j++){
            let bt=document.createElement("button");
            bt.value=i*r+j;
            bt.id="button"+(i*r+j);
            bt.style=cr;
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
    yt=Math.floor(this.value/r);
    xt=this.value%r;
    document.getElementById("sub").innerHTML="select color";
    ds();en2();
});