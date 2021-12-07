const bearerToken = require("express-bearer-token");
app.use(bearerToken());

const {
    authRoute
} = require("./src/routes");

app.use("/auth", authRoute);