import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useParams} from "react-router-dom";
import {Loader} from "../components/Loader";
import {PublicCard} from "../components/PublicCard";
import {CardsList} from "../components/CardsList";

export const CardsPage = () => {

    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [cards, setCards] = useState([])

    const getCards = useCallback(async () => {
        try {
            const fetched = await request(`/api/card`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setCards(fetched)
        } catch (e) {

        }
    }, [token, request])

    useEffect(() => {
        getCards()
    }, [getCards])

    if (loading) {
        return <Loader />
    }


    return (
        <div>
            <h1>My crypto business cards</h1>
            { !loading && <CardsList cards={cards} /> }
        </div>
    )
}
