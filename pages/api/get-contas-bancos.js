import dbConnect from "../../utils/dbConnect";


export default async function handler(req, res) {
    
const query = await dbConnect()

    try {

        const sql = `SELECT * FROM contas;`

        let result = await query(sql)

        res.status(200).json({ result })

        //console.log(result)

    } catch (error) {

        res.status(406).json({ message: "There is an error!!!" })
    }
}