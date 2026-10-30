"use client";

import { useEffect, useState } from "react";
import "@/app/typingAnimCamponent/typingAnim.css"

interface Props {
    text: string,
    speed: number,
}
 
export default function Typing_Animation({
    text, speed
}: Props){

    const [displayText, setDisplayText] = useState("")
    const [noWorkderPipe, setNoWorkderPipe] = useState(false)

    useEffect(()=>{

        let index = 0;
   

        const timer = setInterval(() => {
           index++ 
           

            setDisplayText(text.slice(0, index))

            if(index >= text.length){
                clearInterval(timer)
                setNoWorkderPipe(true)
            }

        }, speed);

        return ()=> clearInterval(timer) 

    }, [text, speed])


    return ( 
       <div className="text">{displayText}<span className={noWorkderPipe === true ? "fadepipe" : "pipe"}>|</span></div>
     );

}

 
