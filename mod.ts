import { decode as base64Decode } from "https://deno.land/std@0.107.0/encoding/base64.ts";
import { serve, json } from "https://deno.land/x/sift@0.3.5/mod.ts";
import {
    insertEvent,
    getEvents
} from "./store.ts";
import { q } from "./query.ts";

// TODO!: JSON ENCODE receiveed params

serve({
  "/": () => new Response("Glass :)"),
  "/api/v1/ping/wload": async (req: Request) => await handle_ping_wload(req),
  "/api/v1/get/events": async (req: Request) => await handle_get_events(req),

  404: () => new Response("not found"),
});



async function handle_ping_wload(req: Request): Promise<Response> {
    const payload = req.url.split("?")[1].substr(8);

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
    let success = await insertEvent(event);
    console.log("Succ + event: " + JSON.stringify(event));
    
    return new Response(JSON.stringify({ msg: "Success" }, null, 2), {
        status: 200,
        statusText: "Success",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    });
}

async function handle_get_events(req: Request): Promise<Response> {
    const urlParams = new URLSearchParams(req.url);
    const pageID = urlParams.get("pageID") || "";

    let d = {
        events: await getEvents()
    }
    console.log(d);
    
    let events = q(d).events().pageID(pageID).get();
    
    return json({
        events: events
    }, {status: 200, statusText: "Success"});
}

// @ts-ignore
/*async function handleRequest(request) {
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
    }****\

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
    console.log("Succ + event: " + JSON.stringify(event));
    
    return new Response(JSON.stringify({ msg: "Success" }, null, 2), {
        status: 200,
        statusText: "Success",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    });
}*/