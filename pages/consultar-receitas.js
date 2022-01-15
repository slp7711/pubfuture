import { useEffect, useState } from "react"
import DisplayCard from "../components/DisplayCards";
import Modal from "../components/Modal";
import styles from '../styles/ConsultarReceitas.module.css'

export default function ConsultarReceitas() {

    const [modalidadeReceita, setModalidadeReceita] = useState("");
    const [tipoData, setTipoData] = useState("")
    const [dataInicial, setDataInicial] = useState("1970-01-01")
    const [dataFinal, setDataFinal] = useState("9999-01-01")

    const [contasBancarias, setContasBancarias] = useState([])
    const [registros, setRegistros] = useState([])
    
    const [registroToUpdate, setRegistroToUpdate] = useState("")
    const [show, setShow] = useState(false)
    
    //usando o hook useEffect para atualizar relação de contas bancárias
    //incluímos "setShow" no array para que o react rode novamente a aplicação
    useEffect(() => {
        

    },[setShow])

    const getContasBancos = async () => {
        const res = await fetch('/api/get-contas-bancos')
        const data = await res.json()
        setContasBancarias(data.result)
        console.log('test getContas by clicing on alterar registro', contasBancarias)
    }

    const displayModal = async (registro) => {
        setShow(true)
        setRegistroToUpdate(registro)
        getContasBancos()
    }

    const updateRegistro = async (registroAlterado) => {
        setShow(false)

        const response = await fetch('api/update-registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registroAlterado)
        })
        const data = await response.json()
        console.log(data)

        //configurar novo registro para incluir na array "registros"
        const newRecord = data
        const { idReceitas } = newRecord

        //frist, we need to exclude de old record
        const novosRegistros = registros.filter(registro => registro.idReceitas !== idReceitas)


        //usando spread operator to update array "registros"
        setRegistros([newRecord, ...novosRegistros])

    }


 
    const deleteRegistro = async (idReceitas, idConta, valor) => {
        
        const response = await fetch('api/delete-registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idReceitas,
                idConta,
                valor
            })
        })

        const data = await response.json()
        console.log(data)

        const novosRegistros = registros.filter(registro => registro.idReceitas !== idReceitas)

        setRegistros(novosRegistros)

        //console.log(data.result)

        //setData(data.result)
    }

    const submitData = async () => {
        
        const response = await fetch('api/get-receitas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                modalidadeReceita,
                tipoData,
                dataInicial,
                dataFinal
            })
        })

        // zerando resgistros nos campos e redefinindo novos states
        let inputs = document.querySelectorAll("input");
        inputs.forEach((input) => (input.value = ""));

        let selects = document.querySelectorAll("select");
        selects.forEach((select) => (select.value = ""));

        setModalidadeReceita("")
        setTipoData("")
        setDataInicial("1970-01-01")
        setDataFinal("9999-01-01")
        
        const data = await response.json()

        //console.log(data.result)

        setRegistros(data.result)
    }

    //console.log(registros)

    return <div className={styles.container}>
        <div className={styles.form}>
            <h1>Consultar receita</h1>
            <p>Para consultar receitas de todo o período, deixar os campos "Data Inicial" e "Data Final" sem preenchimento.</p>

            <label>Selecione tipo de Receita</label>
            <select defaultValue={""}
            onChange={(event) => {
                setModalidadeReceita(event.target.value)
            }}>
                <option value=""></option>
                <option value="todasReceitas">Todas as receitas</option>
                <option value="salário">Salário</option>
                <option value="presente">Presente</option>
                <option value="prêmio">Prêmio</option>
                <option value="outros">Outros</option>
            </select>

            <label>Selecione tipo de data</label>
            <select defaultValue={""}
            onChange={(event) => {
                setTipoData(event.target.value)
            }}>
                <option value=""></option>
                <option value="dataRecebimento">Data Recebida</option>
                <option value="dataRecebimentoEsperado">Data Esperada</option>
            </select>

            <label>Data inicial</label>
            <input type="date" 
            onChange={(event) => {
                setDataInicial(event.target.value)
            }}
            ></input>
            <label>Data Final</label>
            <input type="date" 
            onChange={(event) => {
                setDataFinal(event.target.value)
            }}
            ></input>

            <button onClick={submitData}>Consultar</button>
        </div>
        <Modal 
            onClose={() => setShow(false)} 
            contasBancarias={contasBancarias}
            registroToUpdate={registroToUpdate}
            updateRegistro={updateRegistro}
            show={show}>
        </Modal>

        <div className={styles.registros}>
            {registros.map((registro) => (
                <DisplayCard 
                    key={registro.idReceitas} 
                    registro={registro} 
                    deleteRegistro={deleteRegistro}
                    displayModal={displayModal}/>
            ))}
        </div>

    </div>
}


