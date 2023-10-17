import {DataSource} from "typeorm";
import {ApplicationDataSource} from "@utils/data-source";

let dataSource:DataSource;

export async function runMigrations() {
    if ( !dataSource )
    {
        dataSource = await ApplicationDataSource.initialize();
    }

    await dataSource.runMigrations();
    console.log("Migration is completed!");
}

runMigrations().catch(error => {
    console.log(error);
    process.exit(1);
});