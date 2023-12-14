import { createPool, Pool, PoolOptions } from 'mysql2/promise';
import { dbConfig } from './dbconfig.js';

const poolOptions: PoolOptions = {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
};

const pool: Pool = createPool(poolOptions);

export default pool;