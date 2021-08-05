import {useCallback, useState} from 'react'
import {useHttp} from "./http.hook";


export const useAddresses = () => {
const {request} = useHttp()
    const [addressesList, setAddressesList] = useState([])

    const getAddresses = useCallback(async (token) => {
        try {
            const data = await request('/api/address/', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setAddressesList(data)
        } catch (e) {
            console.log(e.message)

        }
    }, [])


    return { getAddresses, addressesList }
}
