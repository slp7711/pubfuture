import dbConnect from "../../utils/dbConnect"


export default async function handler(req, res) {
    
    try {
        const query = await dbConnect()

        let sqlSelectData

        const modalidadeReceita = req.body.modalidadeReceita
        const tipoData = req.body.tipoData
        const dataInicial = req.body.dataInicial
        const dataFinal = req.body.dataFinal

        if(modalidadeReceita === 'todasReceitas') {
            
            sqlSelectData = 
            `SELECT 
                idReceitas,
                tipoReceita,
                idConta,
                valor,
                descricao,
                DATE_FORMAT(dataRecebimento,'%Y/%m/%d') AS dataRecebimento,
                DATE_FORMAT(dataRecebimentoEsperado,'%Y/%m/%d') AS dataRecebimentoEsperado
            FROM 
                receitas
            WHERE
                ${tipoData} >= '${dataInicial}'
            AND ${tipoData} <= '${dataFinal}';`
        } else {
            
            sqlSelectData = 
            `SELECT 
                idReceitas,
                tipoReceita,
                idConta,
                valor,
                descricao,
                DATE_FORMAT(dataRecebimento,'%Y/%m/%d') AS dataRecebimento,
                DATE_FORMAT(dataRecebimentoEsperado,'%Y/%m/%d') AS dataRecebimentoEsperado
            FROM 
                receitas
            WHERE
                tipoReceita = '${modalidadeReceita}'
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