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
  if (!request.headers.has("content-type")) {
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
  }

  const contentType = request.headers.get("content-type");
  const responseInit = {
        status: 200,
        statusText: "Success",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
  };

  // Handle JSON data.
  if (contentType.includes("application/json")) {
        const json = await request.json();

        console.log(json);

        // Validate request

        // Cache request
        
        return new Response(JSON.stringify({ msg: "Success" }, null, 2), responseInit);
  }

  // Reaching here implies that we don't support the provided content-type
  // of the request so we reflect that back to the client.
  return new Response(null, {
        status: 415,
        statusText: "Unsupported Media Type",
  });
}