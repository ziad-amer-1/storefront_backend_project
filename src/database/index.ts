import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const {
  POSTGRES_HOST,
  ENV,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT
} = process.env

console.log(ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST)

let client: any

if (ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT as unknown as number
  })
} else {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT as unknown as number
  })
}

client.on('error', (err: Error) => console.log(err))

export default client
