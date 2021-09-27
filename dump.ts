/**
 * About:
 *      This script "dumps" the buffered data from the connected store into the 'data' folder.
 *      It needs to be compiled after setting the data store in order to be executed by the Github action.
 * 
 * What it actually does:
 *      1. Calls the stores "dump" endpoint which just returns EVERYTHING inside the store.
 *      2. Segments the dump into its different categories and writes them into files.
 *          - "events": //TODO
 *      6. Commits the changes and pushes the change (After this, the new data will be available through the API enpoints).
 */
// TODO: look at best way for err handling
import {
    desc, 
    run, 
    task, 
    ensureDirSync, 
    existsSync
} from "./deps.ts";
import { Store, gEvent } from "./definitions.ts";
import { dumpStore } from "./store.ts";

let DUMP: Store | undefined;
let TIMESTAMP = new Date().toISOString();

desc("Fetches the dump from the current store.");
task("get-dump", [], async function() {
    DUMP = await dumpStore();
    console.log("Got dump");
    //return new Promise(resolve => setTimeout(resolve, 4000));
});

desc("Clears the store.");
task("clear-store", ["get-dump"], async function() {
    console.log("clear dump");
});

desc("Commits the changes to the repository.")
task("commit-changes", [], function() {
    console.log("commit");
});

desc("Pushes the changes.");
task("push-changes", [], function() {
    console.log("push");
});

desc("Stores the raw data to filesystem.");
task("raw-store", ["get-dump"], async function() {
    await Deno.writeTextFile(`./data/raw/${TIMESTAMP}.json`, JSON.stringify(DUMP));
});

desc("Segments the events into different pages and writes these segments to disk.");
task("segment-event-pages", ["get-dump"], async function() {
    let pages: {[key: string]: gEvent[]} = {};
    
    DUMP?.events.forEach(e => {
        if (!(e.pageID in pages))
            pages[e.pageID] = [];
        pages[e.pageID].push(e);
    });

    for (const pageID in pages) {
        let p = `./data/pages/${pageID}`;
        if (!existsSync(p))
            Deno.mkdirSync(p);
        await Deno.writeTextFile(`${p}/${TIMESTAMP}.json`, JSON.stringify(pages[pageID]));
    }

});

task("process-events", ["get-dump", "segment-event-pages"], async function() {
    console.log("DUMasdP")
});

task("process-notDefined", ["get-dump"], async function() {
    console.log(DUMP);
});


desc("Bootstraps the build process.");
task("bootstrap", [], async function() {
    run("get-dump");
    run("clear-store");
    run("raw-store");

    run(
        "segment-event-pages"
    )
    await run(
        "process-events",
        "process-notDefined"
    );
})

desc("Publishes the changes to the repository.");
task("publish", ["bootstrap"], async function() {
    run(
        "commit-changes",
        "push-changes"
    );
})

ensureDirSync("./data/raw");
ensureDirSync("./data/pages")
run(
    "bootstrap",
    "publish"
)
