import {NavLink, useHistory} from 'react-router-dom'
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const handleLogoutClick = (event) => {
        event.preventDefault()
        auth.logout()
        history.push("/")
    }
    return (

        <nav className="top-nav">
                <div className="nav-wrapper deep-purple" style={{paddingLeft: '2rem'}}>
                    {/*<a href="/" className="brand-logo">Crypto Addresses</a>*/}
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to={"/create"}>Create Card</NavLink></li>
                        <li><NavLink to={"/addresses"}>My Addresses</NavLink></li>
                        <li><NavLink to={"/cards"}>My Cards</NavLink></li>
                        <li><a href={"/"} onClick={handleLogoutClick}>Log Out</a></li>
                    </ul>
                </div>


        </nav>
    )
}
