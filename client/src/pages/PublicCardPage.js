import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import {PublicCard} from '../components/PublicCard'

export const PublicCardPage = () => {
    const {request, loading} = useHttp()
    const [card, setCard] = useState({})
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
        <div className="valign-wrapper " style={{height: '100vh',width: "100%", fontSize: '1.5rem' }}>
            { !loading && card && <PublicCard card={card} /> }
        </div>
    )
}

