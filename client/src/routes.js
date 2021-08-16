import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage";
import {DetailPage} from "./pages/CardPage";
import {CreateCardPage} from "./pages/CreateCardPage";
import {CardsPage} from "./pages/CardsPage";
import {AddressesPage} from "./pages/AddressesPage";
import {PublicCardPage} from "./pages/PublicCardPage";

export const useRoutes = isAuthenticated => {

    if (isAuthenticated) {

        return (
            <Switch>
                <Route path="/cards">
                    <CardsPage/>
                </Route>
                <Route path="/addresses">
                    <AddressesPage/>
                </Route>
                <Route path="/create">
                    <CreateCardPage/>
                </Route>
                <Route path="/detail/:id">
                    <DetailPage/>
                </Route>
                <Route path="/c/:code">
                    <PublicCardPage/>
                </Route>
                <Redirect to={"/create"}/>
            </Switch>
        )
    }
    return (

        <Switch>
            <Route path="/main" exact>
                <AuthPage/>
            </Route>
            <Route path="/c/:code">
                <PublicCardPage/>
            </Route>
            <Redirect to="/main"/>
        </Switch>
    )
}
