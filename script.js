// ===============================
// CANVAS SETUP
// ===============================
let heartInterval;
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// ===============================
// CONFIG
// ===============================

const STAR_COUNT = 450;
const stars = [];
const shootingStars = [];

let frame = 0;


// ===============================
// STAR CLASS
// ===============================

class Star {

    constructor() {

        this.reset();

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

    }

    reset() {

        this.radius = Math.random() * 1.6 + 0.2;

        this.opacity = Math.random();

        this.direction = Math.random() > 0.5 ? 1 : -1;

        this.speed = Math.random() * 0.05 + 0.015;

        this.dx = (Math.random() - 0.5) * 0.03;
        this.dy = Math.random() * 0.05 + 0.01;

        const colors = [

            "255,255,255",
            "190,220,255",
            "170,200,255",
            "255,240,210"

        ];

        this.color =
            colors[Math.floor(Math.random() * colors.length)];

    }

    update() {

        // Drift

        this.x += this.dx;
        this.y += this.dy;

        if (this.y > canvas.height)
            this.y = -10;

        if (this.x < -10)
            this.x = canvas.width + 10;

        if (this.x > canvas.width + 10)
            this.x = -10;


        // Smooth breathing opacity

        this.opacity += this.direction * this.speed;

        if (this.opacity >= 1) {

            this.opacity = 1;
            this.direction = -1;

        }

        if (this.opacity <= 0.15) {

            this.opacity = 0.15;
            this.direction = 1;

        }

    }

    draw() {

        ctx.beginPath();

        ctx.arc(

            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2

        );

        ctx.fillStyle =
            `rgba(${this.color},${this.opacity})`;

        ctx.shadowColor =
            `rgba(${this.color},1)`;

        ctx.shadowBlur = 8;

        ctx.fill();

    }

}


// ===============================
// CREATE STARS
// ===============================

for (let i = 0; i < STAR_COUNT; i++) {

    stars.push(new Star());

}



// ===============================
// SHOOTING STAR
// ===============================

class ShootingStar {

    constructor() {

        this.reset();

    }

    reset() {

        this.x = Math.random() * canvas.width;

        this.y = Math.random() * canvas.height * 0.5;

        this.length =
            Math.random() * 120 + 120;

        this.speed =
            Math.random() * 12 + 12;

        this.life = 0;

        this.maxLife = 80;

    }

    update() {

        this.x += this.speed;

        this.y += this.speed * 0.4;

        this.life++;

    }

    draw() {

        const gradient = ctx.createLinearGradient(

            this.x,
            this.y,

            this.x - this.length,
            this.y - this.length * 0.4

        );

        gradient.addColorStop(
            0,
            "rgba(255,255,255,1)"
        );

        gradient.addColorStop(
            1,
            "rgba(255,255,255,0)"
        );

        ctx.beginPath();

        ctx.moveTo(this.x, this.y);

        ctx.lineTo(

            this.x - this.length,
            this.y - this.length * 0.4

        );

        ctx.strokeStyle = gradient;

        ctx.lineWidth = 2;

        ctx.stroke();

    }

}


// ===============================
// EVERY 5 SECONDS
// ===============================

setInterval(() => {

    shootingStars.push(

        new ShootingStar()

    );

}, 5000);


// ===============================
// DRAW SKY
// ===============================

function drawSky() {

    ctx.fillStyle = "#02030b";

    ctx.fillRect(

        0,
        0,

        canvas.width,
        canvas.height

    );

}


// ===============================
// DRAW STARS
// ===============================

function drawStars() {

    stars.forEach(star => {

        star.update();

        star.draw();

    });

}


// ===============================
// DRAW SHOOTING STARS
// ===============================

function drawShootingStars() {

    for (

        let i = shootingStars.length - 1;

        i >= 0;

        i--

    ) {

        shootingStars[i].update();

        shootingStars[i].draw();

        if (

            shootingStars[i].life >

            shootingStars[i].maxLife

        ) {

            shootingStars.splice(i, 1);

        }

    }

}
// ===============================
// TEXT TIMELINE
// ===============================

const messages = [

    {
        text: [
            "Every day I can't believe",
            "how lucky I am."
        ],
        duration: 250
    },

    {
        text: [
            "Amongst trillions and",
            "trillions of stars,",
            "over billions of years..."
        ],
        duration: 260
    },

    {
        text: [
            "To be alive...",
            "and to spend",
            "this life with you."
        ],
        duration:260
    },

    {
        text:[
            "is so incredibly...",
            "unfathomably unlikely."
        ],
        duration:250
    },

    {
        text:[
            "And yet...",
            "here I am...",
            "with the impossible",
            "chance to know you."
        ],
        duration:280
    }

];


// ===============================
// FINAL MESSAGE
// ===============================

const finalMessage = [

    "I love you so much,",

    "ARI",

    "more than all the time",

    "and space in the universe",

    "can contain."

];


const endingMessage = [

    "And I can't wait",

    "to spend all the time",

    "in the world",

    "sharing that love",

    "with you."

];


// ===============================
// TEXT VARIABLES
// ===============================

let messageIndex = 0;

let localFrame = 0;

let textOpacity = 0;

let fadeDirection = 1;

let finishedMessages = false;


// ===============================
// DRAW MULTILINE TEXT
// ===============================

function drawLines(lines, opacity, glow = false) {

    ctx.save();

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    let fontSize =
        Math.min(
            34,
            canvas.width / 18
        );

    if(canvas.width < 500){

        fontSize = 26;

    }

    ctx.font =
        `600 ${fontSize}px Poppins`;

    if(glow){

        ctx.shadowBlur = 20;

        ctx.shadowColor =
            "#90c8ff";

    }

    ctx.fillStyle =
        `rgba(255,255,255,${opacity})`;

    const spacing =
        fontSize + 14;

    const startY =
        canvas.height/2 -
        ((lines.length-1)*spacing)/2;

    lines.forEach(

        (line,index)=>{

            ctx.fillText(

                line,

                canvas.width/2,

                startY + index*spacing

            );

        }

    );

    ctx.restore();

}


// ===============================
// DRAW FINAL MESSAGE
// ===============================

function drawFinalMessage(opacity){

    ctx.save();

    let fontSize =
        Math.min(
            34,
            canvas.width/18
        );

    if(canvas.width<500){

        fontSize=26;

    }

    const spacing =
        fontSize+16;

    const startY =
        canvas.height/2-80;

    ctx.textAlign="center";

    ctx.font=
        `600 ${fontSize}px Poppins`;

    finalMessage.forEach(

        (line,index)=>{

            if(line==="ARI"){

                ctx.shadowBlur=30;

                ctx.shadowColor="#7dd3ff";

                ctx.fillStyle=
                    `rgba(150,220,255,${opacity})`;

            }

            else{

                ctx.shadowBlur=12;

                ctx.shadowColor="#ffffff";

                ctx.fillStyle=
                    `rgba(255,255,255,${opacity})`;

            }

            ctx.fillText(

                line,

                canvas.width/2,

                startY+index*spacing

            );

        }

    );

    ctx.restore();

}


// ===============================
// DRAW ENDING MESSAGE
// ===============================

function drawEnding(opacity){

    ctx.save();

    let fontSize =
        Math.min(
            28,
            canvas.width/20
        );

    if(canvas.width<500){

        fontSize=22;

    }

    ctx.font=
        `500 ${fontSize}px Poppins`;

    ctx.textAlign="center";

    ctx.fillStyle=
        `rgba(255,255,255,${opacity})`;

    ctx.shadowBlur=14;

    ctx.shadowColor="#9ad8ff";

    const spacing=
        fontSize+10;

    const startY=
        canvas.height/2+140;

    endingMessage.forEach(

        (line,index)=>{

            ctx.fillText(

                line,

                canvas.width/2,

                startY+index*spacing

            );

        }

    );

    ctx.restore();

          }
// ===============================
// TEXT TIMELINE CONTROLLER
// ===============================

function updateTextTimeline() {

    if (!finishedMessages) {

        const current = messages[messageIndex];

        // Fade In
        if (fadeDirection === 1) {

            textOpacity += 0.012;

            if (textOpacity >= 1) {

                textOpacity = 1;

                localFrame++;

                if (localFrame >= current.duration) {

                    fadeDirection = -1;

                }

            }

        }

        // Fade Out
        else {

            textOpacity -= 0.012;

            if (textOpacity <= 0) {

                textOpacity = 0;

                fadeDirection = 1;

                localFrame = 0;

                messageIndex++;

                if (messageIndex >= messages.length) {

                    finishedMessages = true;

                }

            }

        }

        drawLines(

            current.text,

            textOpacity,

            true

        );

    }

    else {

        updateFinalSequence();

    }

}



// ===============================
// FINAL SEQUENCE
// ===============================

let finalOpacity = 0;

let endingOpacity = 0;

let finalFrame = 0;

let buttonShown = false;



function updateFinalSequence() {

    // Final Message

    if (finalOpacity < 1)

        finalOpacity += 0.01;

    drawFinalMessage(finalOpacity);

    finalFrame++;




    // Second Message

    if (finalFrame > 180) {

        if (endingOpacity < 1)

            endingOpacity += 0.01;

        drawEnding(endingOpacity);

    }




    // Reveal Button

    if (

        finalFrame > 360 &&

        !buttonShown

    ) {

        buttonShown = true;

        surpriseButton.style.display = "block";

    }

    }
// ===============================
// DOM ELEMENTS
// ===============================

const surpriseButton =
    document.getElementById("surpriseButton");

const imageContainer =
    document.getElementById("imageContainer");

const fadeOverlay =
    document.getElementById("fadeOverlay");



// ===============================
// HEARTS
// ===============================

function createHeart(){

    const heart =
        document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left =
        Math.random()*100 + "vw";

    heart.style.animationDuration =
        (Math.random()*3+4)+"s";

    heart.style.fontSize =
        (Math.random()*18+18)+"px";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },7000);

}



// ===============================
// SURPRISE BUTTON
// ===============================

surpriseButton.addEventListener("click",()=>{

    surpriseButton.style.display="none";

    fadeOverlay.classList.add("show");

    setTimeout(()=>{

        canvas.style.display="none";

        imageContainer.classList.add("show");

        heartInterval= setInterval(createHeart,350);

    },2200);

});



// ===============================
// MAIN LOOP
// ===============================

function animate(){

    frame++;

    drawSky();

    drawStars();

    drawShootingStars();

    updateTextTimeline();

    requestAnimationFrame(animate);

}

animate();



// ===============================
// RESIZE
// ===============================

window.addEventListener(

    "resize",

    ()=>{

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }

);
