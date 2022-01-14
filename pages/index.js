import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Desafio PubFuture</h1>
      <p>Este aplicativo foi desenvolvido para participar do desafio "PubFuture".</p>
      <p>Trata-se de um aplicativo de controle de contas pessoais.</p>
      <p>Nele você pode cadastrar suas receitas e despesas, bem como fazer diversos 
        tipos de pesquisa. </p>

        <p>
          Obs.: Antes de cadastrar receitas e despesas, você deverá cadastrar as "Contas Bancárias".
        </p>

        <h3>Consultas</h3>
        <p>Você pode fazer diveros tipos de pesquisas: por tipo de receita ou despesas, por 
          determinada, sem data especificada, ou uma combinação de vários parametros.
        </p>

        <h4>Por fim uma recomendação: Use sem moderação!!!</h4>

    </div>
  )
}
