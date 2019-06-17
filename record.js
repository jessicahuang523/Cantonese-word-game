var record1 = localStorage.getItem("ch1");
var record2 = localStorage.getItem("ch2");
var record3 = localStorage.getItem("ch3");

if(record1 !== null){
    document.getElementById('rec1').innerHTML = "Last record: "+record1;
}
if(record2 !== null){
    document.getElementById('rec2').innerHTML = "Last record: "+record2;
}
if(record3 !== null){
    document.getElementById('rec3').innerHTML = "Last record: "+record3;
}