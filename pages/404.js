import Link from "next/link";

const NotFound = () => {
    return (
        <div className="not-found">
            <h1> Hooooops......</h1>
            <h2>Esta página não existe!</h2>

            <p>Voltar para <Link href="/"><a>Home page</a></Link></p>

            <style jsx>{`
            .not-found {
                text-align: center;
            }
            h1 {
                color: blue;
            }
            a {
                color: blue;
                border-bottom: 2px solid black
            }

            `}</style>

        </div>
    );
}
 
export default NotFound;