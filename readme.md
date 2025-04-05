# ask me anything

a simple website that lets anyone ask you something anonymously, and forwards those messages to Telegram. works as a Cloudflare Worker.

## setting up

1. clone/download this repository
2. create a bot with [@BotFather](https://t.me/@BotFather), save the token
3. get your user id, for example using [@userinfobot](https://t.me/@userinfobot)
4. replace `botToken` and `meUserId` in [`index.js`](/index.js) with the respective values
5. pack the folder and upload it to a worker in the [cloudflare dashboard](https://dash.cloudflare.com/)
6. **before using, send the bot something in dms so that it can message you**
7. profit!

## why cloudflare workers?

because it's free. and easy to use. no need to overengineer smth that takes up like 150 sloc.

## more questions?

https://ask.lina.moe/ (or [email](mailto:me@natri.fyi))
