const {Pool} = require('pg')

const dbConfig = {
    user: 'postgres',
    password: 'pwd123',
    host: 'localhost',
    port: 5432,
    database: 'zombieplus'
}

export async function executeSql(sqlScript){

    try{
        const pool = new Pool(dbConfig)
        const client = await pool.connect()

        const result = await client.query(sqlScript)
        console.log("SQL executado:"+ result.rows)

    }catch(error){
        console.log("Erro ao executar SQL:" + error)
    }
    
}