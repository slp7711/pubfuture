import dbConnect from "../../utils/dbConnect"


export default async function handler(req, res) {

    const query = await dbConnect()


    if(req.method === 'POST') {

        try {
            
            
            const receita = req.body.tipoReceita
            const idConta = req.body.idConta
            let valor = Number(req.body.valor)
            const dataRecebimentoEsperado = req.body.dataRecebimentoEsperado
            const dataRecebimento = req.body.dataRecebimento
            const descricao = req.body.descricao;
            
            if(valor < 0) { valor = valor * -1 }

            const sqlInsert = `INSERT INTO receitas ( 
                tipoReceita, 
                idConta, 
                valor, 
                dataRecebimentoEsperado, 
                dataRecebimento, 
                descricao
                ) VALUES (?, ?, ?, ?, ?, ?);`
    
            const resultInsert = await query(
                sqlInsert, 
                [receita, idConta, valor, dataRecebimentoEsperado, dataRecebimento,descricao]
            )


            const resultSaldoAnteriorConta = await query(
                `SELECT saldo FROM contas WHERE idContas = ${idConta}`
            )

            const saldoAnterior = resultSaldoAnteriorConta[0].saldo

            const novoSaldoConta = saldoAnterior + valor

            console.log('Saldo anterior:', saldoAnterior, 'Novo saldo', novoSaldoConta)

            const sqlUpdate = `UPDATE contas SET saldo = ${novoSaldoConta} WHERE idContas = ${idConta}`

            const sqlUpdateSaldoConta = await query(sqlUpdate)
    
            const novaReceita = {
                tipoReceita,
                idConta,
                valor,
                dataRecebimentoEsperado,
                dataRecebimento,
                descricao
            }
    
            //console.log(novaReceita);
    
            res.status(200).json(novaReceita)

        } catch (error) {

            res.status(406).json({ message: error.sqlMessage })
            console.log(error.sqlMessage, error)
            
        }

    }

}