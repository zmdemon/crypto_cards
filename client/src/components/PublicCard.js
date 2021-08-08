export const PublicCard = ({card}) => {

    const selectedAddressesLis = card.selectedArray.map((item) => {
        return (<li className="collection-item" key={item._id}>
            <div key={item._id + 2}>{item.currency} - {item.address}
            </div>
        </li>)
    })
    console.log(card.selectedArray)
    return (

        <>
            <h2>Card</h2>
            <p>{card.cardTitle}</p>
            <p>Info: {card.description}</p>
            <ul>{selectedAddressesLis}</ul>
            <p>Clicks: <strong>{card.clicks}</strong></p>
            <p>Created: <strong>{new Date(card.date).toLocaleDateString()}</strong></p>
        </>

    )
}
