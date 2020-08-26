import React, { useState, useEffect } from 'react'
import "./home.css"
import axios from "axios"
import CountUp from 'react-countup';

function About () {

    const [cases,setCases] = useState(0)
    const [deaths,setDeaths] = useState(0)
    const [recovered,setRecovered] = useState(0)

    const fetchData = async () => {
        const data = await axios.get("https://covid19.mathdro.id/api/countries/india")
        setCases(data.data.confirmed.value)
        setDeaths(data.data.deaths.value)
        setRecovered(data.data.recovered.value)
    }

    useEffect ( ()=> {
        fetchData() 
    },[])


    return (
     <div className="home">
         <h1>Covid 19 - India</h1>
         <div className="flex">
            <div className="cases">
                <div><CountUp start={0} end={cases} duration={2}/></div>
                <div>Total Cases</div>
            </div>
            <div className="deathreco">
                <div className="death">
                    <div><CountUp start={0} end={deaths} duration={2}/></div>  
                    <div>Deaths</div>
                </div>
                <div className="recovered">
                   <div><CountUp start={0} end={recovered} duration={2}/></div> 
                   <div>Recovered</div>
                </div>
            </div>
         </div>
     </div>
    )
}

export default About 
