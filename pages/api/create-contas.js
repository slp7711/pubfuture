import dbConnect from "../../utils/dbConnect"


export default async function handler(req, res) {
    
const query = await dbConnect()

    if(req.method === 'POST') {

        try {

            const tipoConta = req.body.tipoConta
            const instituicaoFinanceira = req.body.instituicaoFinanceira

            const sqlInsert = `INSERT INTO contas ( 
                tipoConta, 
                instituicaoFinanceira
                ) VALUES (?, ?);`


            let result = await query(sqlInsert, [tipoConta, instituicaoFinanceira])

                
            const novaConta = {
                tipoConta,
                instituicaoFinanceira,
                contaNumero: result.insertId
            }
            
            res.status(200).json({ message: "Acconut created!", novaConta })

            console.log(result.insertId)
            console.log('Fim')
            console.log(result)

        } catch (error) {
            res.status(406).json({ message: error.sqlMessage })
            console.log(error.sqlMessage, error)
        }
    }
}