import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {CardsList} from "../components/CardsList";

export const CardsPage = () => {

    const {token,logout} = useContext(AuthContext)
    const {request, loading} = useHttp(logout)
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

    const handleCardDelete = async (id) => {

        try {
            await request(`/api/card/delete/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            await getCards()

        } catch (e) {
            console.log(e.value)
        }

    }


    useEffect(() => {
        getCards()
    }, [getCards])

    if (loading) {
        return <Loader/>
    }


    return (
        <div>
            <h1>My crypto business cards</h1>
            {!loading && <CardsList cards={cards} onCardDelete={handleCardDelete}/>}
        </div>
    )
}
