const num = document.getElementById('att');
const mn = 1;
const mx = r*c;
num.max=r*c;
num.value=Math.floor(Math.sqrt(r*c));//in case it doesnt reset itself
rst();
num.addEventListener('beforeinput',(e)=>{
	const regex = new RegExp("^[0-9]*$");
	if(e.data!=null&&!regex.test(e.data)){
		e.preventDefault();
	}
});
num.addEventListener('input',(e)=>{
	if(num.value>mx){
		num.value=mx;
	}
	if(num.value<mn){
		num.value=mn;
	}
});