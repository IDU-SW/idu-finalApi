const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const CafeRouter = require('./cafe/cafeRouter');
const BrandRouter = require('./brand/brandRouter');
app.use("/cafe",CafeRouter);
app.use("/brand",BrandRouter);

console.log('listen 3000');
app.listen(3000);