import pg from 'pg'
import 'dotenv/config'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })

const gifts = [
    ['roses', 'Rose', '/gifts-1/Rose.png', 10, 1],
    ['tulips', 'Chocolate', '/gifts-1/Chocolate.png', 15, 2],
    ['gerbera', 'Teddy Bear', '/gifts-1/Teddy Bear.png', 25, 3],
    ['lilacs', 'Coffee', '/gifts-2/coffee.png', 10, 4],
    ['freesia', 'Flower', '/gifts-2/flower.png', 15, 5],
    ['dahlias', 'Trophy', '/gifts-2/trophy.png', 30, 6],
    ['hydrangea', 'Fire', '/gifts-2/fire.png', 20, 7],
    ['orhid', 'Bottle', '/gifts-3/Bottle.png', 20, 8],
    ['pions', 'Star', '/gifts-3/Star.png', 15, 9],
    ['ranunculus', 'Treasure', '/gifts-3/Tresure.png', 35, 10],
]

for (const [slug, name, imagePath, priceCoins, sortOrder] of gifts) {
    await pool.query(
        `INSERT INTO gift_catalog (id, slug, name, "imagePath", "priceCoins", "isActive", "sortOrder", "createdAt", "updatedAt")
         VALUES (gen_random_uuid()::text, $1, $2, $3, $4, true, $5, NOW(), NOW())
         ON CONFLICT (slug) DO UPDATE SET
           name = EXCLUDED.name,
           "imagePath" = EXCLUDED."imagePath",
           "priceCoins" = EXCLUDED."priceCoins",
           "isActive" = true,
           "sortOrder" = EXCLUDED."sortOrder",
           "updatedAt" = NOW()`,
        [slug, name, imagePath, priceCoins, sortOrder],
    )
    console.log('Upserted:', slug)
}

const { rows } = await pool.query(
    'SELECT slug, name, "imagePath" FROM gift_catalog WHERE "isActive" = true ORDER BY "sortOrder"',
)
console.log('Active gifts:', rows.length)
rows.forEach((r) => console.log(' ', r.slug, '-', r.name, '-', r.imagePath))

await pool.end()
