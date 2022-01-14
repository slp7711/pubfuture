import { useState } from "react"
import styles from '../styles/Modal.module.css'


export default function Modal({ show, onClose, contasBancarias, registroToUpdate, updateRegistro }) {
    
    //inicializando o modal
    if(!show) {
        return null
    }

    //destructuring registro a ser alterado
    const { 
        idReceitas, 
        tipoReceita, 
        idConta, 
        valor,
        dataRecebimentoEsperado,
        dataRecebimento,
        descricao } = registroToUpdate


    //making news states
    const [novoIdReceitas, setNovoIdReceitas] = useState(idReceitas)
    const [novoTipoReceita, setNovoTipoReceita] = useState(tipoReceita)
    const [novoIdConta, setNovoIdConta] = useState(idConta)
    const [novoValor, setNovoValor] = useState(valor)
    const [novaDataRecebimentoEsperado, setNovaDataRecebimentoEsperado] = useState(dataRecebimentoEsperado)
    const [novaDataRecebimento, setNovaDataRecebimento] = useState(dataRecebimento)
    const [novaDescricao, setNovaDescricao] = useState(descricao)
    
    //dados necessŕios para atualizar o saldo ds contas envolvidas
    const [idContaOriginal, setIdContaOriginal] = useState(idConta)
    const [valorAtualRegistro, setValorAtualRegistro] = useState(valor)

    //configurando o novo registro para enviar ao bando de dados
    const registroAlterado = {
        idReceitas: novoIdReceitas,
        tipoReceita: novoTipoReceita,
        idConta: novoIdConta,
        valor: novoValor,
        dataRecebimentoEsperado: novaDataRecebimentoEsperado,
        dataRecebimento: novaDataRecebimento,
        descricao: novaDescricao,
        idContaOriginal: idContaOriginal,
        valorAtualRegistro: valorAtualRegistro
    }

    return (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.form}>

                    <h4>Informe os novos dados e click em "Alterar Registro"</h4>
                    <h4>Click em "Fechar" para cancelar a alteração</h4>

                    <label>Tipo de Receita</label>
                    <p>Registro atual: {tipoReceita}</p>
                    <select
                    onChange={(event) => {
                        setNovoTipoReceita(event.target.value)
                    }}>
                        <option value=""></option>
                        <option value="salário">Salário</option>
                        <option value="presente">Presente</option>
                        <option value="prêmio">Prêmio</option>
                        <option value="outros">Outros</option>
                    </select>

                    <label>Conta de Registro</label>
                    <p>Registro atual: {idConta}</p>
                    <select onChange={(event) => {setNovoIdConta(event.target.value)
                    }}>
                        <option value=""></option>
                        {contasBancarias.map((conta) => (
                            <option 
                                key={conta.idContas} 
                                value={conta.idContas}>
                                {`${conta.idContas} - ${conta.tipoConta} - ${conta.instituicaoFinanceira}`}
                            </option>
                        ))}
                    </select>

                    <label>Data prevista para recebimento</label>
                    <p>Registro atual: {dataRecebimentoEsperado}</p>
                    <input type="date" 
                    onChange={(event) => {
                        setNovaDataRecebimentoEsperado(event.target.value)
                    }}
                    ></input>
                    <label>Data de recebimento</label>
                    <p>Registro atual: {dataRecebimento}</p>
                    <input type="date" 
                    onChange={(event) => {
                        setNovaDataRecebimento(event.target.value)
                    }}
                    ></input>

                    <label>Valor</label>
                    <p>Registro atual: {valor}</p>
                    <input type="number" step="0.01"
                    onChange={(event) => {
                        setNovoValor(event.target.value)
                    }}
                    ></input>

                    <label>Descrição</label>
                    <p>Registro atual: {descricao}</p>
                    <input type="text" 
                    onChange={(event) => {
                        setNovaDescricao(event.target.value)
                    }}
                    ></input>

                    <div className={styles.btns}>
                        <div>
                        <button 
                        onClick={onClose, () => updateRegistro(registroAlterado)} 
                        className={styles.button1}>
                            Alterar Registro
                        </button>
                        </div>
                        <div>
                        <button onClick={onClose} className={styles.button2}>Fechar</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}