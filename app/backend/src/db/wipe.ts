import { pool, query } from "./client.js";

async function wipe() {
    console.log("🧹 Wiping the database...");
    await query("DROP SCHEMA public CASCADE");
    await query("CREATE SCHEMA public");
    console.log("✅ Database wiped successfully!");
    await pool.end();
}

wipe().catch((err) => {
    console.error("Wipe failed:", err);
    process.exit(1);
});
