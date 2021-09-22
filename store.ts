import { Store } from "./definitions.ts";

async function tmpGetPantry() {
    const response = await fetch("https://getpantry.cloud/apiv1/pantry/af55b205-9209-4d98-b049-2b8ef8b1c0ba/basket/events", {
        headers: {
            // Servers use this header to decide on response body format.
            // "application/json" implies that we accept the data in JSON format.
            accept: "application/json",
        },
    });
    return await response.json();
}

async function getEventsTMP() {
    // @ts-ignore
    return await tmpGetPantry()["data"];
}
async function dumpStoreTMP(): Promise<Store> {
    return { events: (await tmpGetPantry())["data"] };  // TODO: Hack due to tmp db
}

async function insertEventTMP(event: Object): Promise<string> {
    return new Promise(async (resolve, reject) => {
        let d = await tmpGetPantry();
        if (!d["data"]) d["data"] = [];
        d["data"].push(event);

        try {
            const response = await fetch("https://getpantry.cloud/apiv1/pantry/af55b205-9209-4d98-b049-2b8ef8b1c0ba/basket/events", {
                method: "POST",
                headers: {
                    // This headers implies to the server that the content of
                    // body is JSON and is encoded using UTF-8.
                    "content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(d),
            });
        }
        catch (e) {
            console.log("error: ");
            console.log(e);
        }
        return resolve("");
    });
}


export {
    insertEventTMP as insertEvent,
    getEventsTMP as getEvents,
    dumpStoreTMP as dumpStore
};
