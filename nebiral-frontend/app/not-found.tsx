"use client"

import SoftAurora from "./SoftAurora/SoftAurora "
import BreadCrumb from "./breadCrumb/breadCrumb"
import { useRef, useState } from "react"

export default function Not_Found (){
    const sectionRef = useRef<HTMLDivElement | null>(null)
      const [visible, setVisible] = useState(false)
      const sectionAbout = sectionRef.current;
      return(

        <section className="aura">
            <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                <SoftAurora
                    speed={0.7}
                    scale={1.5}
                    brightness={1}
                    color1="#f8f8f8"
                    color2="#0094ff"
                    bandHeight={0.5}
                    bandSpread={0.8}
                    enableMouseInteraction
                    mouseInfluence={0.1}
                    spectrum={1}
                    colorSpeed={1.3}
                    noiseFrequency={2.5}
                    noiseAmplitude={1.1}
                    tilt={0}
                    octaveDecay={0.08}
                    layerOffset={0}
                    clickPulse
                    intro
                    lightMode={false}
                />
                </div>

                <div ref={sectionRef} className={`title-and-breadCrumb ${visible === true ? "RunAbout" : ""}`}>
                  <h2 className="title-of-page">
                    درباره من
                  </h2>
                  <BreadCrumb />
                </div>
                
        </section>

      )
            
}