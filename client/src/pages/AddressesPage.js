import React, {useContext, useEffect, useState} from 'react'
import M from 'materialize-css';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useAddresses} from "../hooks/addresses.hook";


export const AddressesPage = () => {
    const counter = document.querySelectorAll('.counterful');
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const {getAddresses, addressesList} = useAddresses()

    const [newAddress, setNewAddress] = useState('')
    const [nickname, setNickname] = useState('')
    const [currency, setCurrency] = useState('')
    // const [addressesList, setAddressesList] = useState([])

    useEffect(() => {
        M.AutoInit();
        M.CharacterCounter.init(counter);
    }, [])



    useEffect(() => {
        getAddresses(auth.token)
    }, [])

    const addressesMixedList = addressesList.map((item) => {
        return (
            <tr key={item.address}>
                <td>{(!item.nickname) ? "default" : item.nickname}</td>
                <td>{item.currency}</td>
                <td>{item.address}</td>
            </tr>
        )
    })

    const handleAddressSubmit = async () => {
        try {
            const data = await request('/api/address/add', 'POST', {address: newAddress, currency, nickname}, {
                Authorization: `Bearer ${auth.token}`
            })
            setCurrency('')
            setNickname('')
            setNewAddress('')
        } catch (e) {
            console.log("Can't add new address", e)
        } finally {
            await getAddresses(auth.token)
        }
    }

    const handleAddressInputChange = (e) => {
        setNewAddress(e.target.value)
    }

    return (
        <div>
            <h1>My Addresses</h1>
            <table className="col s1">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Crypto</th>
                    <th>Address</th>
                </tr>
                </thead>

                <tbody>
                {addressesMixedList}
                </tbody>
            </table>


            <button data-target="modal1" className="btn modal-trigger">Add new</button>


            <div id="modal1" className="modal modal-fixed-footer col s12">
                <div className="modal-content">
                    <h4>Add new newAddress</h4>
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="newAddress-nickname">Short name</label>
                            <input
                                value={nickname}
                                type="text"
                                onChange={e => setNickname(e.target.value)}
                                id="newAddress-nickname"
                                data-length="10"
                                className="counterful center-align"/>
                        </div>

                        <div className="input-field col s4 m6">
                            <select className="icons" onChange={e => setCurrency(e.target.value)}>
                                <option value="null" disabled selected>Choose your option</option>
                                <option value="BTC" data-icon="">BTC</option>
                                <option value="ETH" data-icon="">ETH</option>
                                <option value="ADA" data-icon="">Cardano</option>
                            </select>
                            <label>Types</label>
                        </div>
                    </div>
                    <div className="row">

                        <div className="input-field col s8">
                            <input
                                type="text"
                                id="newAddress"
                                className="materialize-textarea"
                                onChange={handleAddressInputChange}
                                value={newAddress}
                            />
                            <label htmlFor="newAddress">Address</label>
                        </div>

                    </div>

                </div>
                <div className="modal-footer">
                    <button
                        className="modal-close waves-effect waves-green btn-flat green"
                        onClick={handleAddressSubmit}
                    >Submit
                    </button>
                </div>

            </div>
        </div>
    )
}
