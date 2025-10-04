
let scaleSaved = "";
let resultSaved = "";


export async function checkresume(){ // changed
    const text = document.querySelector('.inputText').value;
    document.querySelector('.result').textContent="processing...";

    try{
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/resume-check`, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({text})
        });
        
        const data = await response.json();

        const feedback = data.candidates?.[0]?.content?.parts?.[0]?.text || "no response";

                // Remove Markdown headings and split by sections
                let cleanedfeedback = feedback
                .replace(/### /g, "\n")       // remove headings
                .replace(/\*\*/g, "")         // remove bold
                .replace(/\*/g, "")           // remove stray *
                .replace(/\n{2,}/g, "\n");   // remove extra newlines

               //cleaning even more markdowns to parse
               const stripped = cleanedfeedback.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/,'').trim();
                cleanedfeedback = (stripped.match(/\{[\s\S]*\}/) || [stripped])[0];
  
                //
        cleanedfeedback = JSON.parse(cleanedfeedback);
        document.querySelector('.result').textContent = cleanedfeedback.comment;
                          //              resultSaved = cleanedfeedback.comment; // was replaced by the below code
        document.querySelector('.scalebox').textContent =  cleanedfeedback.scale;

       const scale = cleanedfeedback.scale;
    /**BAR COLOR */
    
         //const rating = document.querySelector('.scalebox');
    if (Number(scale) <= 0){
       // const decimal = scale/10;
        //scalePercent = Math.round(scale * 100);
        //`linear-gradient(90deg, red, yellow ${scalePercent}%, green ${scalePercent}%)`;
        
        const colorx = "red 90%"
        document.querySelector('.bar').style.background = `linear-gradient(90deg, white 0%, ${colorx})`
        alert("hau");}
    if (Number(scale) > 0 && Number(scale) <= 3){
        const colorx = " yellow 90%";
        document.querySelector('.bar').style.background = `linear-gradient(90deg, white 10%, ${colorx})`
    
    }
    if (Number(scale) > 3 && Number(scale) <= 7){

         const colorx = " yellow 90%";
        document.querySelector('.bar').style.background = `linear-gradient(90deg, white 10%, ${colorx})`
    
        
    }
    if (Number(scale) > 7 && Number(scale) <= 10){
        const colorx = "green 90%";
        document.querySelector('.bar').style.background = `linear-gradient(90deg, white 10%, ${colorx})`;
    }

}
catch(error){
        document.querySelector('.result').textContent = "Error:" + error.message;
    }
}




export {scaleSaved, resultSaved};
// glow 

let typingtimer;
const inputbox = document.querySelector('.inputText');
if (inputbox) {
inputbox.addEventListener('input', () => {
    //const glowIntensity = Math.min(Math.max(scale / 2, 0), 10); // Scale from 0 to 10
    inputbox.classList.add('glow');

    clearTimeout(typingtimer);  //removes previously scheduled timer to remove the glow
    typingtimer = setTimeout(() => {
        inputbox.classList.remove('glow');
    }, 500); // wait 500ms after user stops typing to remove the glow

});
}