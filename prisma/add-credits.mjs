import pg from 'pg'
import 'dotenv/config'
import crypto from 'crypto'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })

const userId = 'thehiddenyes:dating:1015356'
const amount = 1000

// Upsert user_credits: create if not exists, otherwise add to balance
const upsertResult = await pool.query(
    `INSERT INTO user_credits (id, "userId", balance, "createdAt", "updatedAt")
     VALUES ($1, $2, $3, NOW(), NOW())
     ON CONFLICT ("userId") DO UPDATE SET
       balance = user_credits.balance + $3,
       "updatedAt" = NOW()
     RETURNING balance`,
    [crypto.randomUUID(), userId, amount],
)

console.log(`Updated balance for ${userId}: ${upsertResult.rows[0].balance} credits`)

// Record the transaction
await pool.query(
    `INSERT INTO credit_transaction (id, "userId", type, amount, status, reason, "createdAt")
     VALUES ($1, $2, 'grant', $3, 'SUCCESSFUL', 'Manual top-up', NOW())`,
    [crypto.randomUUID(), userId, amount],
)

console.log(`Recorded grant transaction of ${amount} credits`)

await pool.end()
