img="";
var status="";

function preload(){
    img=loadImage("boy.jpg");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting boy";
    document.getElementById("found").innerHTML="boy Do Not Found";
}

function modelLoaded() {
    console.log('modelLoaded!');
    status=true;
    objectDetector.detect(img,gotResults);
}

function gotResults(error,results){
    if (error) {
        console.error(error);
    }
     console.log(results);
     object=results;

}

function draw() {

    image(img,0,0,380,380);

    if (status!="") {
        
        object.detect(img,gotResults);
        r=random(225);
        g=random(225);
        b=random(225);
        for (let i = 0; i < object.length; i++) {
            fill(r,g,b);
            percent=floor(object[i].confidence * 100);
            text(object[i].label+ " " + "%" , object[i].x + 15, object[i].y + 15);
            nofill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].hieght);
            document.getElementById("status").innerHTML="Status : Detected boy";
            document.getElementById("found").innerHTML="Boy Found";
        }
    }
}