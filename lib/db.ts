import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || '';

export const sql = postgres(connectionString, {
  prepare: false, // Required for Supavisor on port 6543
  max: 1,         // Prevents connection pool exhaustion in Serverless environments
  idle_timeout: 20,
  connect_timeout: 10,
});
