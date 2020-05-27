const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const productRouter = require('./routers/productRouter')();
const brandRouter = require('./routers/brandRouter')();
const countryRouter = require('./routers/countryRouter')();
const addressRouter = require('./routers/addressRouter')();
const categoryRouter = require('./routers/categoryRouter')();
const customerRouter = require('./routers/customerRouter')();
const orderStatusRouter = require('./routers/orderStatusRouter')();
const paymentMethodRouter = require('./routers/paymentMethodRouter')();
const orderRouter = require('./routers/orderRouter')();
const orderRowRouter = require('./routers/orderRowRouter')();
const productImageRouter = require('./routers/productImageRouter')();
const promoTypeRouter = require('./routers/promoTypeRouter')();
const promoCodeRouter = require('./routers/promoCodeRouter')();
const shippingMethodRouter = require('./routers/shippingMethodRouter')();
const taxRouter = require('./routers/taxRouter')();
const favoriteRouter = require('./routers/favoriteRouter')();
const cartProductRouter = require('./routers/cartProductRouter')();
const productCategoryRouter = require('./routers/productCategoryRouter')();
const reviewRouter = require('./routers/reviewRouter')();
const basicCartRouter = require('./routers/basicCartRouter')();
const favoritesCountRouter = require('./routers/favoritesCountRouter')();
const searchRouter = require('./routers/searchRouter')();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', productRouter);
app.use('/api', brandRouter);
app.use('/api', countryRouter);
app.use('/api', addressRouter);
app.use('/api', categoryRouter);
app.use('/api', customerRouter);
app.use('/api', orderStatusRouter);
app.use('/api', paymentMethodRouter);
app.use('/api', orderRouter);
app.use('/api', orderRowRouter);
app.use('/api', productImageRouter);
app.use('/api', promoTypeRouter);
app.use('/api', promoCodeRouter);
app.use('/api', shippingMethodRouter);
app.use('/api', taxRouter);
app.use('/api', favoriteRouter);
app.use('/api', cartProductRouter);
app.use('/api', productCategoryRouter);
app.use('/api', reviewRouter);
app.use('/api', basicCartRouter);
app.use('/api', favoritesCountRouter);
app.use('/api', searchRouter);

app.server = app.listen(port, () => { console.log(`Running on port ${port}`); });


module.exports = app;

