import {DataSource} from "typeorm";
import {ApplicationDataSource} from "@utils/data-source";

let dataSource:DataSource;

async function revertMigration():Promise<any> {
    if (!dataSource) dataSource = await ApplicationDataSource.initialize();
    await dataSource.undoLastMigration({transaction: "each"});
    console.log("Migration revert is completed!");
}

revertMigration().catch(error => {
    console.log(error);
    process.exit(1);
});