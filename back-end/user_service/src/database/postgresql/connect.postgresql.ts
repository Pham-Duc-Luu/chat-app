import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../../entity/User";
import app_config from "../../config/app.config";

const AppDataSource = new DataSource({
    type: "postgres",
    host: app_config.postgresql.host,
    port: app_config.postgresql.port,
    username: app_config.postgresql.username,
    password: app_config.postgresql.password,
    database: app_config.postgresql.database,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});

export default AppDataSource;
