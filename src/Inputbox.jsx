import { checkresume } from './brain.js' // changed

function Inputbox({ setResult }){ // changed, added additional function to be excuted first 
    async function handleClick(){ // changed
        const responsefinal = await checkresume(); // changed
        if(responsefinal?.comment) setResult(responsefinal.comment); // changed
    }
    return (
        <div className='inputbox'>
    <textarea className="inputText" rows="30" cols="60" placeholder="info goes here..." onInput={
                            (e)=>{ const el=e.target; el.classList.add('glow'); clearTimeout(window.__typingtimer); 
                            window.__typingtimer=setTimeout(()=>el.classList.remove('glow'),500); }
        
        }></textarea> 
        
        
        
        <div className='buttonbox'>
            <button className="button1"  onClick={handleClick}>check</button> {/* changed */}
            <button>clear</button>
        </div>
        <div className="result"></div>
        <div className="scalebox"></div>
        
    </div>
    )
    
}
export default Inputbox;