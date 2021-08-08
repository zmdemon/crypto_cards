import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {PublicCard} from '../components/PublicCard'

export const PublicCardPage = () => {
    const {request, loading} = useHttp()
    const [card, setCard] = useState(null)
    const cardCode = useParams().code

    const getCard = useCallback(async () => {
        try {
            const fetched = await request(`/c/${cardCode}`, 'GET', null, {})
            setCard(fetched)
        } catch (e) {

        }
    }, [cardCode, request])

    useEffect(() => {
        getCard()
    }, [getCard])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            { !loading && card && <PublicCard card={card} /> }
        </>
    )
}

