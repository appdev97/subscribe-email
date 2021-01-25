'use strict';

module.exports = app => {
  app.use('/subscriptions', require('../src/subscriptions'));
  app.use('/topics', require('../src/topics'));
  app.use('/messages', require('../src/messages'));
};
