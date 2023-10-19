import "reflect-metadata";
import {DataSource} from "typeorm";
import {entities} from "@entities/index";
import {migrations} from "@migrations/index";
import {subscribers} from "@subscribers/index";
// import * as Process from "process";

export const POSTGRES_UNIQUE_ERROR_CODE = "23505";

export const ApplicationDataSource = new DataSource({
    type: "postgres",
    host: "trumpet.db.elephantsql.com",
    username: "gxjscode",
    password: "PE0hpdN3aTKmfwfiup6T67meLwIF5WpK",
    database: "gxjscode",
    synchronize: false,
    logging: false,
    entities:entities,
    migrations: migrations,
    subscribers: subscribers
});