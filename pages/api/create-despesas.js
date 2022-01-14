import dbConnect from "../../utils/dbConnect"


export default async function handler(req, res) {

    const query = await dbConnect()


    if(req.method === 'POST') {

        try {
            
            
            const tipoDespesa = req.body.tipoDespesa
            const idConta = req.body.idConta
            let valor = Number(req.body.valor)
            const dataPagamentoEsperado = req.body.dataPagamentoEsperado
            const dataPagamento = req.body.dataPagamento
            const descricao = req.body.descricao;
            
            if(valor < 0) { valor = valor * -1 }

            const sqlInsert = `INSERT INTO despesas ( 
                tipoDespesa, 
                idConta, 
                valor, 
                dataPagamentoEsperado, 
                dataPagamento, 
                descricao
                ) VALUES (?, ?, ?, ?, ?, ?);`
    
            const resultInsert = await query(
                sqlInsert, 
                [tipoDespesa, idConta, valor, dataPagamentoEsperado, dataPagamento, descricao]
            )


            const resultSaldoAnteriorConta = await query(
                `SELECT saldo FROM contas WHERE idContas = ${idConta}`
            )

            const saldoAnterior = resultSaldoAnteriorConta[0].saldo

            const novoSaldoConta = saldoAnterior - valor

            //console.log('Saldo anterior:', saldoAnterior, 'Novo saldo', novoSaldoConta)

            const sqlUpdate = `UPDATE contas SET saldo = ${novoSaldoConta} WHERE idContas = ${idConta}`

            const sqlUpdateSaldoConta = await query(sqlUpdate)
    
            const novaDespesa = {
                tipoDespesa,
                idConta,
                valor,
                dataPagamentoEsperado,
                dataPagamento,
                descricao
            }
    
            //console.log(novaDespesa);
    
            res.status(200).json(novaDespesa)

        } catch (error) {

            res.status(406).json({ message: error.sqlMessage })
            console.log(error.sqlMessage, error)
            
        }

    }

}