import React, {useContext, useEffect, useRef, useState} from 'react'

import {AuthContext} from "../context/AuthContext";
import M from "materialize-css";
import {useAddresses} from "../hooks/addresses.hook";

const _ = require('lodash');


export const CreateCardPage = () => {
    const selectRef = useRef(null)

    const auth = useContext(AuthContext)

    // const selectRef = useRef()
    const [selectedArray, setSelectedArray] = useState([])
    const {getAddresses, addressesList, setAddressesList} = useAddresses()
    const [addressesListState, setAddressesListState] = useState([])
    const [description, setDescription] = useState("")
    const [cardTitle, setCardTitle] = useState("")

    // const aListPlusD = addressesList.map(item => {
    //     return {...item, disabled: false}
    // })

    const grouped = _.mapValues(_.groupBy(addressesList, 'currency'),
        clist => clist.map(address => _.omit(address, 'currency')));

    // const optionArray = makeOptions()

    useEffect(() => {
        getAddresses(auth.token)
    }, [])

    useEffect(() => {
        console.log(addressesList)
        M.FormSelect.init(selectRef.current)
    })

    // useEffect(() => {
    //     // const rows = document.querySelectorAll(`${testRef.current} tr`)
    //
    //
    //     console.log(M.FormSelect.getInstance(selectRef.current).getSelectedValues())
    //
    // }, [])


    function handleAddressSelectChange(e) {
        const addressString = e.target.value.split(" ").sort(
            function (a, b) {
                return b.length - a.length;
            }
        )[0]
        const addressObject = addressesList.filter((it) => it.address === addressString)[0]
        setSelectedArray(previous => [...previous, addressObject])
        setAddressesList(addressesList.map(item => {
            if (item._id === addressObject._id) {
                return {...item, disabled: true}
            } else return item
        }))

    }

    const onDeleteIconClick = (id) => {
        setSelectedArray(selectedArray.filter((item) => item._id !== id))

        setAddressesList(addressesList.map(item => {
            if (item._id === id) {
                return {...item, disabled: false}
            } else return item
        }))

        console.log(selectedArray)
    }

    const selectedAddressesLis = selectedArray.map((item) => {
        return (<li className="collection-item" key={item._id}>
            <div key={item._id + 2}>{item.currency} - {item.address}<a
                key={item._id + 1} href="#!"
                onClick={() => onDeleteIconClick(item._id)}
                className="secondary-content">
                <i key={item._id + 3}
                   className="material-icons red-text">delete</i></a>
            </div>
        </li>)
    })

    const RareOption = ({crypto}) => {
        return (
            <option value={crypto._id}>"{crypto.nickname}" {crypto.address}</option>
        )
    }
    const RareOptGroup = ({label, currencyGroup}) => {
        return (
            <optgroup label={label}>
                {currencyGroup.map(crypto => {
                    return <RareOption crypto={crypto}/>
                })}
            </optgroup>
        )
    }
    const RareGroupedOptions = Object.entries(grouped).map(item => {
        return (
            <RareOptGroup label={item[0].toString()} key={item[0].toString()} currencyGroup={item[1]}>
                {item[1].map(crypto => {
                    return <RareOption crypto={crypto} key={crypto.id}/>
                })}
            </RareOptGroup>
        )
    })


    const GroupedOptions = Object.entries(grouped).map(item => {
        return (
            <optgroup label={item[0].toString()} key={item[0].toString()}>
                {item[1].map(crypto => {
                    return <option value={crypto.id} key={crypto.id}
                                   disabled={crypto.disabled}>"{crypto.nickname}" {crypto.address}</option>
                })}
            </optgroup>
        )
    })


    // function makeOptions() {
    //     let arrayOfOptions = []
    //
    //     for (const [key, value] of Object.entries(grouped)) {
    //         arrayOfOptions.push(
    //             <optgroup label={key} key={key}>
    //                 {value.map(crypto => {
    //                     return <option value={crypto.id} key={crypto.id}
    //                                    className="truncate">"{crypto.nickname}" {crypto.address}</option>
    //                 })}
    //             </optgroup>
    //         )
    //
    //     }
    //     return (arrayOfOptions)
    // }


    return (
        <div className="row">
            <h1>Create Card</h1>

            <div className="col s8 offset-s2 z-depth-2" style={{paddingTop: '2rem', marginTop: '5rem'}}>
                <div className="input-field col s12 center">

                    <label htmlFor="titlew">Title</label>
                    <input type="text" id="titlew" value={cardTitle} onChange={e => setCardTitle(e.target.value)}/>
                </div>


                <div className="col s12 ">
                    <ul className="collection "
                        style={{
                            position: "static"
                        }}
                    >
                        {/*<li className="collection-header"><h4>First Names</h4></li>*/}
                        {selectedAddressesLis}

                        <li key="1li" className="collection-item">
                            <div key="1div" className="input-field">
                                <select key="1select" name="rare_selection_name" id="rare_selection_id" ref={selectRef}
                                        onChange={handleAddressSelectChange}>
                                    {GroupedOptions}
                                </select>
                                <label key="1label">Choose crypto-addresses</label>
                            </div>

                        </li>


                    </ul>
                </div>

                <div className="input-field col s12">
                    <textarea id="textarea1" className="materialize-textarea" value={description}
                              onChange={e => setDescription(e.target.value)}/>
                    <label htmlFor="textarea1">Description for Card</label>
                </div>
                <div className="input-field col s12">
                    <button className="btn waves-effect waves-light deep-purple" type="submit" name="action">Create
                        <i className="material-icons right">send</i>
                    </button>
                </div>


            </div>
        </div>
    )
}
