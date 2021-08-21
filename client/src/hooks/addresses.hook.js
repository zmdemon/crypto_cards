import {useCallback, useState} from 'react'
import {useHttp} from "./http.hook";


export const useAddresses = (logout = () => {
}) => {
    const {request} = useHttp()
    const [addressesList, setAddressesList] = useState([])


    const getAddresses = useCallback(async (token) => {
        try {
            const data = await request('/api/address/', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setAddressesList(data.map(item => {
                return {...item, disabled: false}
            }))
        } catch (e) {
            // console.log(e.message)
            if (e.message === 'Нет авторизации') {
                // console.log(e.message)

                logout()
            }

        }
    }, [request])


    return {getAddresses, addressesList, setAddressesList}
}
