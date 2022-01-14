import dbConnect from "../../utils/dbConnect"


export default async function handler(req, res) {
    
    try {
        const query = await dbConnect()

        let sqlSelectData

        const modalidadeDespesa = req.body.modalidadeDespesa
        const tipoData = req.body.tipoData
        const dataInicial = req.body.dataInicial
        const dataFinal = req.body.dataFinal

        if(modalidadeDespesa === 'todasDespesas') {
            
            sqlSelectData = 
            `SELECT 
                idDespesas,
                tipoDespesa,
                idConta,
                valor,
                descricao,
                DATE_FORMAT(dataPagamento,'%d/%m/%Y') AS dataPagamento,
                DATE_FORMAT(dataPagamentoEsperado,'%d/%m/%Y') AS dataPagamentoEsperado
            FROM 
                despesas
            WHERE
                ${tipoData} >= '${dataInicial}'
            AND ${tipoData} <= '${dataFinal}';`
        } else {
            
            sqlSelectData = 
            `SELECT 
                idDespesas,
                tipoDespesa,
                idConta,
                valor,
                descricao,
                DATE_FORMAT(dataPagamento,'%Y/%m/%d') AS dataPagamento,
                DATE_FORMAT(dataPagamentoEsperado,'%Y/%m/%d') AS dataPagamentoEsperado
            FROM 
                despesas
            WHERE
                tipoDespesa = '${modalidadeReceita}'
            AND ${tipoData} >= '${dataInicial}'
            AND ${tipoData} <= '${dataFinal}';`
        }

        
        const result = await query(sqlSelectData)
        res.status(200).json({ result })
        
        //console.log(result)
        //console.log(tipoReceita, tipoData, dataInicial, dataFinal)


    } catch (error) {
            res.status(406).json({ message: error })
            console.log(error)
    }
}