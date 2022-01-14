import dbConnect from "../../utils/dbConnect"


export default async function handler(req, res) {

    const query = await dbConnect()


    try {

        //obtendo dados do request
        const idDespesas = req.body.idDespesas
        const tipoDespesa = req.body.tipoDespesa
        const idConta = req.body.idConta
        let valor = Number(req.body.valor)
        const dataPagamentoEsperado = req.body.dataPagamentoEsperado
        const dataPagamento = req.body.dataPagamento
        const descricao = req.body.descricao;

        const valorAtualRegistro = req.body.valorAtualRegistro
        const idContaOriginal = req.body.idContaOriginal


        //se cliente digitar valor negativo, fazer a conversão para positivo
        if(valor < 0) { valor = valor * -1 }

        //enviando query para o banco de dados
        const sqlUpdateRegistro = `UPDATE despesas 
            SET 
                tipoDespesa = "${tipoDespesa}", 
                idConta = "${idConta}", 
                valor = ${valor}, 
                dataPagamentoEsperado = "${dataPagamentoEsperado}", 
                dataPagamento = "${dataPagamento}", 
                descricao = "${descricao}"
            WHERE
                idDespesas = ${idDespesas}`

        const resultInsert = await query(sqlUpdateRegistro)


        //Agora vamos atualizar o saldo da conta original
        //buscar o saldo atual da conta original
        const retornoSaldoAnteriorContaOriginal = await query(
            `SELECT saldo FROM contas WHERE idContas = ${idContaOriginal}`
        )
        const saldoAnteriorContaOriginal = retornoSaldoAnteriorContaOriginal[0].saldo

        //Devemos excluir o valor integral da despesa nesta conta, creditando ela
        const novoSaldoContaOriginal = saldoAnteriorContaOriginal + valorAtualRegistro

        const sqlUpdateSaldoContaOriginal = `UPDATE contas 
            SET saldo = ${novoSaldoContaOriginal} 
            WHERE idContas = ${idContaOriginal}`

        const retornoAtualizacaoSaldoContaOriginal = await query(sqlUpdateSaldoContaOriginal)

        //Agora vamos atualizar o saldo da nova conta
        //buscar o saldo atual da nova conta
        const retornoSaldoAnteriorNovaConta = await query(
            `SELECT saldo FROM contas WHERE idContas = ${idConta}`
        )

        const saldoAnteriorNovaConta = retornoSaldoAnteriorNovaConta[0].saldo

        //devemos lançao o novo valor integramente nesta conta, debitando ela
        const novoSaldoNovaConta = saldoAnteriorNovaConta - valor

        const sqlUpdateSaldoNovaConta = `UPDATE contas 
            SET saldo = ${novoSaldoNovaConta} 
            WHERE idContas = ${idConta}`

        const retornoAtualizacaoSaldoNovaConta = await query(sqlUpdateSaldoNovaConta)

        //making an objeto to send do client to update the state
        const newRecord = {
            idDespesas, 
            tipoDespesa, 
            idConta, 
            valor,
            dataPagamentoEsperado,
            dataPagamento,
            descricao
        }

            
        res.status(200).json(newRecord)

    } catch (error) {

        res.status(406).json({ message: error.sqlMessage })
        console.log(error.sqlMessage, error)
        
    }

}