import React from "react" 
import "../../App.css"
import { Link} from "react-router-dom"

function Nav () {
    return (
        <nav className="nav">            
                <Link to='/'><h1>Home</h1></Link>
                <Link to='/overall'><h1>Overall</h1></Link>
                <Link to='/daily'><h1>Daily</h1></Link>    
        </nav>
    )
}

export default Nav  