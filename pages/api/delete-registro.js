import dbConnect from "../../utils/dbConnect";

export default async function handler(req, res) {
    
    const query = await dbConnect()
    console.log('teste Sérgio para checar valor do idReceitas')

    try {

        const idReceitas = req.body.idReceitas
        const idConta = req.body.idConta
        const valor = req.body.valor


        //excluindo registro do banco de dados
        const sql = `DELETE FROM receitas WHERE idReceitas = ${idReceitas};`

        const resultExclusao = await query(sql)

        console.log(` Primeiro: idReceitas = ${idReceitas},idConta= ${idConta}, valor= ${valor}`)
        
        //atualizar saldo da conta onde o registro excluído estava vinculado
        //buscar o saldo atual da conta
        const retornoSaldoAtualConta = await query(
            `SELECT saldo FROM contas WHERE idContas = ${idConta};`
        )
        
        console.log(` Segundo: idReceitas = ${idReceitas},idConta= ${idConta}, valor= ${valor}`)

        const saldoAtualConta = retornoSaldoAtualConta[0].saldo

        const novoSaldoConta = saldoAtualConta - valor

        const sqlUpdateNovoSaldoConta = `UPDATE contas 
            SET saldo = ${novoSaldoConta} 
            WHERE idContas = ${idConta}`

        const retornoAtualizacaoSaldoNovoSaldoConta = await query(sqlUpdateNovoSaldoConta)

        res.status(200).json({ message: 'Item excluído' })


    } catch (error) {

        res.status(406).json({ message: "There is an error!!!" })
    }
}