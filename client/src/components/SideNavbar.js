import {NavLink, useHistory} from 'react-router-dom'
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export const SideNavbar = ({rareRef}) => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const handleLogoutClick = (event) => {
        event.preventDefault()
        auth.logout()
        history.push("/")
    }
    return (
        <>
            {/*hide-on-large-only*/}
            {/*<a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>*/}

            <ul id="slide-out" className="sidenav " ref={rareRef}>

                <li className="sidenav-close"><NavLink to={"/create"}>Create Card</NavLink></li>
                <li className="sidenav-close"><NavLink to={"/addresses"}>My Addresses</NavLink></li>
                <li className="sidenav-close"><NavLink to={"/cards"} >My Cards</NavLink></li>
                <li className="sidenav-close"><a href={"/"} onClick={handleLogoutClick}>Log Out</a></li>
            </ul>
                <a href="#" data-target="slide-out" className="sidenav-trigger top-nav"><i
                    className="material-icons">menu</i></a>

        </>


    )
}
