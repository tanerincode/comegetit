import "reflect-metadata";
import {DataSource} from "typeorm";
import {entities} from "@entities/index";
import {migrations} from "@database/migrations";
import {subscribers} from "@database/subscribers";
// import * as Process from "process";


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
})