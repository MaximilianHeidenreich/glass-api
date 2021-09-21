async function insertEventTMP(event: Object) {
    const response = await fetch("https://getpantry.cloud/apiv1/pantry/af55b205-9209-4d98-b049-2b8ef8b1c0ba/basket/events", {
        method: "POST",
        headers: {
            // This headers implies to the server that the content of
            // body is JSON and is encoded using UTF-8.
            "content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(event),
    });
}


export {
    insertEventTMP as insertEvent,
    //insertEvent as add
};