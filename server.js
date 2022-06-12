var express = require("express");
var promMid = require("express-prometheus-middleware");
var app = express();

const token = "mysecrettoken";
const port = 3000;

app.use((req, res, next) => {
    res.header({
        "Access-Control-Allow-Origin": 'http://localhost:3001',
        "Access-Control-Allow-Credentials": "true", 
        "Access-Control-Allow-Headers": "Authorization",
    });

    next();
});

app.use((req, res, next) => {
  if (req.header("Authorization") !== token && req.method !== "OPTIONS") {
    
    // return forbidden status if token isn't matched
    res.status(403).end();
    return;
  }

  next();
});

app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
  })
);

app.get("/time", (req, res) => {
  // divide by 1000 to return seconds (not miliseconds)
  let date = Date.now() / 1000;

  res.send({
    epoch: Math.floor(date),
  });
});

app.listen(port, () => {
  console.log("Server listening on http://localhost:3000/");
});
