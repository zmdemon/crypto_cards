
export const LinkCard = ({link}) => (
    <>
        <h2>Короткая ссылка</h2>
        <p>Вот она есть: <a href={link.to} target={"_blank"} rel="noopener noreferrer">{link.to}</a></p>
        <p>Вот она была: <a href={link.from} target={"_blank"} rel="noopener noreferrer">{link.from}</a></p>
        <p>Столько кликов есть: <strong>{link.clicks}</strong></p>
        <p>Тогда ссылка создана: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </>

)
