export const UserCard = ({card}) => {

    const cryptoList = card.selectedArray?.map((item) => {
        return (<li className="collection-item " key={item.address}>
            <div className="truncate" key={item.address} style={{paddingTop: '1.2rem', paddingBottom: '1.2rem'}}>{item.currency} - {item.address}
            </div>
        </li>)
    })
    console.log(card.selectedArray)
    return (

        <>
            <div className="row" >
                <div className="col s10 m10">
                    <div className="card deep-purple darken-1">
                        <div className="card-content white-text">
                            <h5 className="card-title">{card.cardTitle}</h5>
                            <p>{card.description}</p>

                        </div>
                        <ul className="collection truncate">{cryptoList}</ul>
                    </div>
                </div>
            </div>



            {/*<p>Clicks: <strong>{card.clicks.toString()}</strong></p>*/}
            {/*<p>Created: <strong>{new Date(card.date).toLocaleDateString()}</strong></p>*/}
        </>

    )
}
