
import Link from 'next/link';
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
    return ( 
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <h4>Desafio pubfuture</h4>
            </div>
            <Link href="/"><a>Home</a></Link>
            <Link href="/cadastrar-receitas"><a>Cadastrar Receita</a></Link>
            <Link href="/cadastrar-despesas"><a>Cadastrar Despesa</a></Link>
            <Link href="/cadastrar-contas"><a>Cadastrar Conta</a></Link>
            <Link href="/consultar-receitas"><a>Consultar Receita</a></Link>
            <Link href="/consultar-despesas"><a>Consultar Despesa</a></Link>
        </nav>
     );
}
 
export default Navbar;