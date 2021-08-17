import React, {useEffect, useRef} from "react"
import {BrowserRouter as Router} from "react-router-dom";
import {Loader} from "./components/Loader";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext"
import {Navbar} from "./components/Navbar";
import {useRoutes} from "./routes";
import 'materialize-css'
import {SideNavbar} from "./components/SideNavbar";
import M from "materialize-css";
// const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGI5MTA2MTNjOTgxNTE4NDQyNjBiZjgiLCJpYXQiOjE2Mjc4OTA0MDcsImV4cCI6MTYyNzg5NDAwN30.haQmTTw7rMMJo9YkGh1OJr3TzpdJpnTiUyg3my4IuPw"
function App() {
    const {login, logout, token, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    const sideRef = useRef(null)


    useEffect(() => {
        // console.log("Token: ",token,"rare state swag boom")
        // console.log("Token is valid?: ",jwt.verify(expiredToken, "rare state swag boom"))
    }, [])
    // useEffect(() => {
    //     M.AutoInit();
    // })

    useEffect(() => {
        M.Sidenav.init(sideRef.current)
    })

    if (!ready) {
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
                {isAuthenticated && <Navbar/>}
                {isAuthenticated && <SideNavbar rareRef={sideRef}/>}
                <div className={"container"}>
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
