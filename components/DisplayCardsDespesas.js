import styles from '../styles/DisplayCards.module.css'

export default function DisplayCard( { registro, deleteRegistro, displayModal } ) {

    const { 
        idDespesas, 
        tipoDespesa, 
        idConta, 
        valor, 
        dataPagamentoEsperado, 
        dataPagamento, 
        descricao } = registro

    return (
        <div className={styles.info}>
            <div className={`${styles.item} ${styles.itemSmall}`}>
                <p>idDespesas</p>
                <p>{idDespesas}</p>
            </div>
            <div className={`${styles.item} ${styles.itemSmall}`}>
                <p>tipoDespesa</p>
                <p>{tipoDespesa}</p>
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
                <p>dataPagamentoEsperado</p>
                <p>{dataPagamentoEsperado}</p>
            </div>
            <div className={`${styles.item} ${styles.itemBig}`}>
                <p>dataPagamento</p>
                <p>{dataPagamento}</p>
            </div>
            <div className={`${styles.item} ${styles.itemBig}`}>
                <p>descricao</p>
                <p>{descricao}</p>
            </div>
            <div className={`${styles.item} ${styles.btnInfo} ${styles.buttons}`}>
                <button className={styles.btnAlt} onClick={() => displayModal(registro)}>Alterar</button>
                <button 
                className={styles.btnExc} 
                onClick={() => deleteRegistro(idDespesas, idConta, valor)}>Excluir</button>
            </div>

        </div>

    )
}