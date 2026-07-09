// ===============================
// MOCHI INTRO V1
// ===============================

const introScreen = document.getElementById("introScreen");
const dialogueText = document.getElementById("dialogueText");

const introMessage =
"Oh? Ari? What's the date today?";

let index = 0;

function typeMessage(){

    if(index < introMessage.length){

        dialogueText.textContent +=
            introMessage.charAt(index);

        index++;

        setTimeout(typeMessage,45);

    }

}

window.addEventListener("load",()=>{

    typeMessage();

});
