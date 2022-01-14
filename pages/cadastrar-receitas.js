import { useEffect, useState } from "react"
import styles from '../styles/CadastrarReceitas.module.css'


export default function CadastrarReceitas() {
    //valores usados para para inicializar o aplicativo, sem efeito prático
    const contas = [{
        idContas: 1, 
        tipoConta: 'carteiraTeste', 
        instituicaoFinanceira: 'Banco teste', 
        saldo: 100}]

    //usando o hook useEffect para atualizar relação de contas bancárias
    useEffect(() => {
        getContasBancos()

    },[])

    const [contasBancarias, setContasBancaria] = useState(contas)

    const [tipoReceita, setTipoReceita] = useState("");
    const [idConta, setIdConta] = useState("");
    const [valor, setValor] = useState(0);
    const [dataRecebimentoEsperado, setDataRecebimentoEsperado] = useState("");
    const [dataRecebimento, setDataRecebimento] = useState("");
    const [descricao, setDescricao] = useState("");


    const getContasBancos = async () => {
        const responseContas = await fetch('api/get-contas-bancos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await responseContas.json()
        console.log(data.result)
        setContasBancaria(data.result)
    }
    

    const submitData = async () => {
        
        const response = await fetch('api/create-receitas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipoReceita,
                idConta,
                valor,
                dataRecebimentoEsperado,
                dataRecebimento,
                descricao
            })
        })
        // zerando resgistros nos campos e states
        let inputs = document.querySelectorAll("input");
        inputs.forEach((input) => (input.value = ""));

        let selects = document.querySelectorAll("select");
        selects.forEach((select) => (select.value = ""));

        setTipoReceita('')
        setIdConta('')
        setValor(0)
        setDataRecebimentoEsperado('')
        setDataRecebimento('')
        setDescricao('')

        //console.log(valor)
        const data = await response.json()
        //console.log(data)
    }

    return <div className={styles.container}>
        <h1>Cadastrar Receita</h1>
        <p>Cadastre aqui as receitas obtidas.</p>
        <div className={styles.form}>

            <label>Tipo de Receita</label>
            <select
            onChange={(event) => {
                setTipoReceita(event.target.value)
            }}>
                <option value=""></option>
                <option value="salário">Salário</option>
                <option value="presente">Presente</option>
                <option value="prêmio">Prêmio</option>
                <option value="outros">Outros</option>
            </select>

            <label>Conta de Registro</label>
            <select onChange={(event) => {setIdConta(event.target.value)
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
            <input type="date" 
            onChange={(event) => {
                setDataRecebimentoEsperado(event.target.value)
            }}
            ></input>
            <label>Data de recebimento</label>
            <input type="date" 
            onChange={(event) => {
                setDataRecebimento(event.target.value)
            }}
            ></input>

            <label>Valor</label>
            <input type="number" step="0.01"
            onChange={(event) => {
                setValor(event.target.value)
            }}
            ></input>

            <label>Descrição</label>
            <input type="text" 
            onChange={(event) => {
                setDescricao(event.target.value)
            }}
            ></input>

            <button className={styles.btn} onClick={submitData}>Cadastrar</button>

        </div>

    </div>
}

/* export async function getStaticProps() {

    const res = await fetch('http://localhost:3000/api/get-contas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})

    const contas = await res.json()
  
    return {
      props: {
        contas,
      },
      revalidate: 10,
    }
  } */
  
  