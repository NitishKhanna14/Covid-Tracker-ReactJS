import React, { useState, useEffect } from 'react'
import "./about.css"
import axios from "axios"
import CountUp from 'react-countup';


function About () {

    const [places,setPlaces] = useState([])
    const [place,setPlace] = useState(" ")
    const [cities,setCities] = useState([])
    const [city,setCity] = useState(" ")
    const [active,setActive] = useState(0)
    const [deaths,setDeaths] = useState(0)
    const [recovered,setRecovered] = useState(0)

    const fetchData = async () => {
        const data = await axios.get("https://api.covid19india.org/state_district_wise.json")
        if (place !== " ") {
            const arr1=[]
            //console.log(data.data[place])
            if (data.data[place]) {
                for (let cc in data.data[place].districtData){
                    arr1.push(cc)
                }
                setCities(arr1)
            }
            
            if (city !== " " && arr1.includes(city)) {
                console.log(data.data[place].districtData)
                setActive(data.data[place].districtData[city].active)
                setDeaths(data.data[place].districtData[city].deceased)
                setRecovered(data.data[place].districtData[city].recovered)
            }
        }
        const arr=[]
        for (let to in data.data) {
            arr.push(to)
        }
        setPlaces(arr)
    }

    const changePlace = (e) => {
        setPlace(e.target.value) 
    }

    const changeCity = (e) => {
        setCity(e.target.value) 
    }

 
    useEffect(()=>{
        fetchData()
    },[place,city])

    return (
     <div className="tn">
         <h1>Covid 19 Tracker</h1>
         <select className="select" onChange={changePlace}>
         <option value="" disabled selected>Select your state</option>
            {places.map((pl,ind)=> <option key={ind}>{pl}</option>)}
         </select>
         <br/>
         <select className="select" onChange={changeCity}>
         <option value="" disabled selected>Select your district</option>
            {cities.map((pl,ind)=> <option key={ind}>{pl}</option>)}
         </select>
         
        <div className="home">
         
         <h2>{city}</h2>
         <div className="flex">
            <div className="cases">
                <div><CountUp start={0} end={active} duration={2}/></div>
                <div>Active Cases</div>
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
     </div>
    )
}

export default About 
