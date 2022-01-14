import { useState } from "react"
import styles from '../styles/Modal.module.css'


export default function Modal({ show, onClose, contasBancarias, registroToUpdate, updateRegistro }) {
    
    //inicializando o modal
    if(!show) {
        return null
    }

    //destructuring registro a ser alterado
    const { 
        idDespesas, 
        tipoDespesa, 
        idConta, 
        valor,
        dataPagamentoEsperado,
        dataPagamento,
        descricao } = registroToUpdate


    //making news states
    const [novoIdDespesas, setNovoIdDespesas] = useState(idDespesas)
    const [novoTipoDespesa, setNovoTipoDespesa] = useState(tipoDespesa)
    const [novoIdConta, setNovoIdConta] = useState(idConta)
    const [novoValor, setNovoValor] = useState(valor)
    const [novaDataPagamentoEsperado, setNovaDataPagamentoEsperado] = useState(dataPagamentoEsperado)
    const [novaDataPagamento, setNovaDataPagamento] = useState(dataPagamento)
    const [novaDescricao, setNovaDescricao] = useState(descricao)
    
    //dados necessŕios para atualizar o saldo ds contas envolvidas
    const [idContaOriginal, setIdContaOriginal] = useState(idConta)
    const [valorAtualRegistro, setValorAtualRegistro] = useState(valor)

    //configurando o novo registro para enviar ao bando de dados
    const registroAlterado = {
        idDespesas: novoIdDespesas,
        tipoDespesa: novoTipoDespesa,
        idConta: novoIdConta,
        valor: novoValor,
        dataPagamentoEsperado: novaDataPagamentoEsperado,
        dataPagamento: novaDataPagamento,
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

                    <label>Tipo de Despesa</label>
                    <p>Registro atual: {tipoDespesa}</p>
                    <select
                    onChange={(event) => {
                        setNovoTipoDespesa(event.target.value)
                    }}>
                        <option value=""></option>
                        <option value="alimentacao">Alimentação</option>
                        <option value="educacao">Educação</option>
                        <option value="lazer">Lazer</option>
                        <option value="moradia">Moradia</option>
                        <option value="roupa">Roupa</option>
                        <option value="saude">Saúde</option>
                        <option value="transporte">Transporte</option>
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

                    <label>Data prevista para pagamento</label>
                    <p>Registro atual: {dataPagamentoEsperado}</p>
                    <input type="date" 
                    onChange={(event) => {
                        setNovaDataPagamentoEsperado(event.target.value)
                    }}
                    ></input>
                    <label>Data de pagamento</label>
                    <p>Registro atual: {dataPagamento}</p>
                    <input type="date" 
                    onChange={(event) => {
                        setNovaDataPagamento(event.target.value)
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