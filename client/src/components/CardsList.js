import React from 'react'
import {Link} from 'react-router-dom'

export const CardsList = ({ cards }) => {
    if (!cards.length) {
        return <p className="center">Add some crypto cards</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Name</th>
                <th>Description</th>
                <th>Short link</th>
                <th>Открыть</th>
            </tr>
            </thead>

            <tbody>
            { cards.map((card, index) => {
                return (
                    <tr key={card._id}>
                        <td>{index + 1}</td>
                        <td>{card.cardTitle}</td>
                        <td>{card.description}</td>
                        <td><a href={'http://localhost:3000'+card.cardLink.toString()}>http://localhost:3000 {card.cardLink}</a></td>

                        <td>
                            <Link to={`/detail/${card._id}`}>Открыть</Link>
                        </td>
                    </tr>
                )
            }) }
            </tbody>
        </table>
    )
}
