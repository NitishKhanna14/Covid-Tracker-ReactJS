import React, { useState, useEffect } from 'react'
import "./daily.css"
import axios from "axios"
import CountUp from 'react-countup';


function Daily () {

    const [cities,setCities] = useState([])
    const [city,setCity] = useState(" ")
    const [active,setActive] = useState(0)
    const [deaths,setDeaths] = useState(0)
    const [recovered,setRecovered] = useState(0)
    const [date,setDate] = useState(" ")

    const fetchData = async () => {
        const data = await axios.get("https://api.covid19india.org/v4/data-all.json")
        //console.log(data.data)
        const obj = data.data
        const keys = Object.keys(obj)
        const last = keys[keys.length-1]
        const secondLast = keys[keys.length-2]    
        const currentState = obj[last].TN.districts
        const arr = []
        for (let dis in currentState) {
            arr.push(dis)
        }
        setCities(arr)

        if (city !== " " && arr.includes(city) && currentState[city].delta) {
            setDate(last)
            console.log(currentState[city])
            setActive(currentState[city].delta.confirmed)
            setDeaths(currentState[city].delta.deceased)
            setRecovered(currentState[city].delta.recovered)
        }

        else if (city != " " && arr.includes(city)) {
            //console.log("ss"+currentState[city])
            setDate(secondLast)
            const secondCurrent = obj[secondLast].TN.districts
            setActive(secondCurrent[city].delta.confirmed)
            setDeaths(secondCurrent[city].delta.deceased)
            setRecovered(secondCurrent[city].delta.recovered)

        }
        
    }

    const changeCity = (e) => {
        setCity(e.target.value) 
    }

    useEffect(()=>{
        fetchData()
    },[city])

    return (
        <div className="tn">
            <h1>Covid 19 - Tamil Nadu</h1>
            <select className="select" onChange={changeCity}>
            <option value="" disabled selected>Select your district</option>
                {cities.map((pl,ind)=> <option key={ind}>{pl}</option>)}
            </select>
            
            <div className="home">
                <h2>{city}</h2>
                <div className="flex">
                    <div className="cases">
                        <div><CountUp start={0} end={active} duration={2}/></div>
                        <div>New Cases</div>
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
            <div className="date">{date !== " "? <h2>Date : {date}</h2> : <h2></h2>}</div>
            
            
        </div>
    )
}

export default Daily