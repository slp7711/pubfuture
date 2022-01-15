import styles from '../styles/DisplayCards.module.css'

export default function DisplayCard( { registro, deleteRegistro, displayModal } ) {

    
    const { 
        idReceitas, 
        tipoReceita, 
        idConta, 
        valor, 
        dataRecebimentoEsperado, 
        dataRecebimento, 
        descricao } = registro

        const formatDate = (date) => {
            const [YYYY, MM, DD] = date.split('/')
            const newDate = `${DD}-${MM}-${YYYY}`
            return newDate
        }


    return (
        <div className={styles.container}>
            <div className={`${styles.item}`}>
                <p>Receita</p>
                <p>{idReceitas}</p>
            </div>
            <div className={`${styles.item}`}>
                <p>TipoReceita</p>
                <p>{tipoReceita}</p>
            </div>
            <div className={`${styles.item}`}>
                <p>Conta</p>
                <p>{idConta}</p>
            </div>
            <div className={`${styles.item}`}>
                <p>Valor</p>
                <p>{valor}</p>
            </div>
            <div className={`${styles.item} ${styles.itemBig}`}>
                <p>RecebimentoEsperado</p>
                <p>{formatDate(dataRecebimentoEsperado)}</p>
            </div>
            <div className={`${styles.item} ${styles.itemBig}`}>
                <p>Recebimento</p>
                <p>{formatDate(dataRecebimento)}</p>
            </div>
            <div className={`${styles.item} ${styles.itemBig}`}>
                <p>Descricao</p>
                <p>{descricao}</p>
            </div>
            <div className={`${styles.item}`}>
                <button 
                className={`${styles.btn} ${styles.btnAlt}`} 
                onClick={() => displayModal(registro)}>Alterar</button>

            </div>
            <div className={`${styles.item}`}>
                <button 
                className={`${styles.btn} ${styles.btnExc}`} 
                onClick={() => deleteRegistro(idReceitas, idConta, valor)}>Excluir</button>
            </div>

        </div>

    )
}