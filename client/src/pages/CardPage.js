import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {UserCard} from "../components/UserCard";

export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [card, setCard] = useState(null)
    const cardId = useParams().id

    const getCard = useCallback(async () => {
        try {
            const fetched = await request(`/api/card/${cardId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setCard(fetched)
        } catch (e) {

        }
    }, [token, cardId, request])

    useEffect(() => {
        getCard()
    }, [getCard])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && card && <UserCard card={card}/>}
        </>
    )
}


