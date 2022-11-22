import { join } from "node:path";
import { DataSource } from "typeorm"
import Entities from './entity';

// This assumes a setup with SQLite.  This is good for development, but we recommend a more robust back-end for a production application.
const DATABASE_FILE = process.env.DATABASE_PATH ?? join(__dirname, '..', 'database.db');

const Database = new DataSource({
  type: 'sqlite',
  database: DATABASE_FILE,
  synchronize: true,
  entities: Entities
})

export default Database