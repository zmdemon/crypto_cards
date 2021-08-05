import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useParams} from "react-router-dom";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";
import {CardsList} from "../components/CardsList";

export const CardsPage = () => {

    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [links, setLinks] = useState([])

    const getLinks = useCallback(async () => {
        try {
            const fetched = await request(`/api/link`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {

        }
    }, [token, request])

    useEffect(() => {
        getLinks()
    }, [getLinks])

    if (loading) {
        return <Loader />
    }


    return (
        <div>
            <h1>My crypto business cards</h1>
            { !loading && <CardsList addresses={links} /> }
        </div>
    )
}
