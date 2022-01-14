import { useState } from "react"
import styles from '../styles/CadastrarContas.module.css'


export default function CadastrarContas() {

    const [tipoConta, setTipoConta] = useState("");
    const [instituicaoFinanceira, setInstituicaoFinanceira] = useState("");


    const submitData = async () => {
        
        const response = await fetch('api/create-contas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipoConta,
                instituicaoFinanceira
            })
        })

        const data = await response.json()
        console.log(data)
    }

    return <div className={styles.container}>
        <h1>Cadastrar Conta</h1>
        <p>Cadastre aqui uma nova conta.</p>
        <div className={styles.form}>

            <label>Tipo de Conta</label>
            <select onChange={(event) => {
                setTipoConta(event.target.value)
            }}>
                <option value=""></option>
                <option value="carteira">Carteira</option>
                <option value="conta corrente">Conta Corrente</option>
                <option value="poupança">Poupança</option>
            </select>
            
            <label>Instituição Financeira</label>
            <input type="text"
            onChange={(event) => {
                setInstituicaoFinanceira(event.target.value)
            }}
            ></input>

            <button onClick={submitData}>Cadastrar</button>

        </div>


    </div>
  }
  