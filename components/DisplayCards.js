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

    return (
        <div className={styles.info}>
            <div className={`${styles.item} ${styles.itemSmall}`}>
                <p>idReceitas</p>
                <p>{idReceitas}</p>
            </div>
            <div className={`${styles.item} ${styles.itemSmall}`}>
                <p>tipoReceita</p>
                <p>{tipoReceita}</p>
            </div>
            <div className={`${styles.item} ${styles.itemSmall}`}>
                <p>idConta</p>
                <p>{idConta}</p>
            </div>
            <div className={`${styles.item} ${styles.itemSmall}`}>
                <p>valor</p>
                <p>{valor}</p>
            </div>
            <div className={`${styles.item} ${styles.itemBig}`}>
                <p>dataRecebimentoEsperado</p>
                <p>{dataRecebimentoEsperado}</p>
            </div>
            <div className={`${styles.item} ${styles.itemBig}`}>
                <p>dataRecebimento</p>
                <p>{dataRecebimento}</p>
            </div>
            <div className={`${styles.item} ${styles.itemBig}`}>
                <p>descricao</p>
                <p>{descricao}</p>
            </div>
            <div className={`${styles.item} ${styles.btnInfo} ${styles.buttons}`}>
                <button className={styles.btnAlt} onClick={() => displayModal(registro)}>Alterar</button>
                <button 
                className={styles.btnExc} 
                onClick={() => deleteRegistro(idReceitas, idConta, valor)}>Excluir</button>
            </div>

        </div>

    )
}