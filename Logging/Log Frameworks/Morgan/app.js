import express from "express"

const app = express();

import morgan from "morgan";
import chalk from "chalk";

// app.use(morgan("combined")) // ::1 - - [23/Dec/2023:21:31:18 +0000] "GET / HTTP/1.1" 304 - "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
// app.use(morgan("common")) // ::1 - - [23/Dec/2023:21:32:18 +0000] "GET / HTTP/1.1" 304 -
// app.use(morgan("dev")) // GET / 304 1.728 ms - -
// app.use(morgan("short")) // ::1 - GET / HTTP/1.1 304 - - 1.318 ms
// app.use(morgan("tiny")) // GET / 200 12 - 10.479 ms

// app.use(morgan(":method :url :status :res[content-length] - :response-time ms")); // GET / 304 - - 1.183 ms
// app.use(
//   morgan(function (tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, "content-length"),
//       "-",
//       tokens["response-time"](req, res),
//       "ms",
//     ].join(" ");
//   })
// ); // GET / 304  - 1.260 ms

app.use(morgan(function (tokens, req, res) {
  return [
    "\n\n\n",
    chalk.hex("#ff4757").bold("🍄  Morgan --> "),
    chalk.hex("#34ace0").bold(tokens.method(req, res)),
    chalk.hex("#ffb142").bold(tokens.status(req, res)),
    chalk.hex("#ff5252").bold(tokens.url(req, res)),
    chalk.hex("#2ed573").bold(tokens["response-time"](req, res) + " ms"),
    chalk.hex("#f78fb3").bold("@ " + tokens.date(req, res)),
    chalk.yellow(tokens["remote-addr"](req, res)),
    chalk.hex("#fffa65").bold("from " + tokens.referrer(req, res)),
    chalk.hex("#1e90ff")(tokens["user-agent"](req, res)),
    "\n\n\n",
  ].join(" ")
})) //  🍄  Morgan -->  GET 304 / 1.395 ms @ Sat, 23 Dec 2023 22:02:21 GMT ::1 from undefined Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 

app.get("/", (req, res) => {
    res.send("Hello Morgan")
})

app.listen(3030, () => {
    console.log("Server is listening on port: 3030")
})