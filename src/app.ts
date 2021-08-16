import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';

import DBRun from './db';
import userRoute from './routes/user.route';

DBRun();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function(error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  console.log(error);
  // render the error pages
  res
    .status(error.status || 500)
    .type('application/json')
    .json({
      error
    });
});

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});

// export default app;
