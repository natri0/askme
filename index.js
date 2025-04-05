import html from "index.html";

// REPLACE THOSE WITH YOUR OWN VALUES!
const botToken = "";
const meUserId = -1;

const tu = (url) => `https://api.telegram.org/bot${botToken}/` + url;

/**
 * @typedef {Object} Env
 */

export default {
  /**
   * @param {Request} request
   * @param {Env} env
   * @param {ExecutionContext} ctx
   * @returns {Promise<Response>}
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/message" && request.method.toLowerCase() === 'post') {
      const params = new URLSearchParams(await request.text());

      const hasCw = params.has("cw") && params.get("cw").length > 0;
      const noPost = params.has("nopost") && params.get("nopost").length > 0;
      let text = hasCw ? `CW: ${params.get("cw")}\n${params.get("text")}` : params.get("text");

      if (noPost) text = 'NO POST! ' + text;

      const result = await fetch(tu('sendMessage'), {
        method: 'post',
        body: JSON.stringify({
          chat_id: meUserId,
          text,
          entities: [
            ...(noPost ? [
              { type: "underline", offset: 0, length: 8 },
              { type: "bold", offset: 0, length: 8 },
            ] : []),
            ...(hasCw ? [
              { type: "bold", offset: text.indexOf("CW"), length: 3 },
              { type: "spoiler", offset: text.indexOf("\n") + 1, length: params.get("text").length }
            ] : [])
          ]
        }),
        headers: { 'content-type': 'application/json' }
      });

      if (Math.floor(result.status / 100) != 2) {
        console.error(await result.text());
        return new Response("error :c", { status: 500 });
      } else {
        return Response.redirect("https://ask.lina.moe/sent");
      }
    }

    let content = html;
    if (url.pathname === "/sent") content = content.replace("display: none;", "display: block;");

    return new Response(content, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
};
