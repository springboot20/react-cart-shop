/** @format */

require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const { rateLimit } = require('express-rate-limit');
const path = require('path');

// ENDPOINT ROUTES
const authRoutes = require('./routes/auth/auth.routes');

// ERROR HANDLER
const { errorHandler } = require('./middleware/error/error.middlewareleware');
const notfound = require('./error/notfound');

const app = express();

app.use(express.json());

app.use(cors({ origin: '*' }));

app.engine('hsb', expressHandlebars.engine());
app.set('view engine', 'hsb');
app.set('views', path.resolve(`${__dirname}/views`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/users', authRoutes.router);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 450, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers..,
    handler: (_, __, ___, options) => {
      throw new ApiError(
        options.statusCode || 500,
        `There are too many requests. You are only allowed ${options.max} requests per ${
          options.windowMs / 60000
        } minutes`
      );
    },
  })
);

app.use(notfound);
app.use(errorHandler);

module.exports = { httpServer: app };
