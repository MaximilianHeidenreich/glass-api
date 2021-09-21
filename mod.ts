import {
    decode as base64Decode,
} from "https://deno.land/std@0.107.0/encoding/base64.ts"; 
import {
    insertEvent
} from "./store.ts";

// Every request to a Deno Deploy program is considered as a fetch event.
// So let's register our listener that will respond with the result of
// our request handler on "fetch" events.
addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    if (request.method !== "GET") {
        return new Response(null, {
            status: 405,
            statusText: "Method Not Allowed",
        });
    }

    // We want the 'content-type' header to be present to be able to determine
    // the type of data sent by the client. So we respond to the client with
    // "Bad Request" status if the header is not available on the request.
    /*if (!request.headers.has("content-type")) {
            return new Response(
                JSON.stringify({ error: "please provide 'content-type' header" }),
                {
                    status: 400,
                    statusText: "Bad Request",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                },
            );
    }*/

    const payload = request.url.split("?")[1].substr(8);

    if (!payload) {
        return new Response(null, {
            status: 400,
            statusText: "Missing payload",
        });
    }

    // TODO: Add parser validation & error
    const data = JSON.parse(new TextDecoder('utf-8').decode(base64Decode(payload)));

    // Create event TODO: Create docs
    let event = {
        timestamp: Date.now(),
        type: "WLOAD",           // WLOAD, VISALIVE
        pageID: data.pageID,
        clientID: data.clientID,
        payload: data.payload
    }
    let res = await insertEvent(event);
    console.log(res);
    
    return new Response(JSON.stringify({ msg: "Success" }, null, 2), {
        status: 200,
        statusText: "Success",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    });
}