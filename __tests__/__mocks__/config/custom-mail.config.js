module.exports = {
  testing: true,
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | Connection to be used for sending emails. Each connection needs to
  | define a driver too.
  |
  */
  connection: process.env.MAIL_CONNECTION || 'smtp',

  /*
  |--------------------------------------------------------------------------
  | Views
  |--------------------------------------------------------------------------
  |
  | This configuration defines the folder in which all emails are stored.
  | If it's not defined, /mails is used as default.
  |
  */
  views: 'mails',

  /*
  |--------------------------------------------------------------------------
  | View engine
  |--------------------------------------------------------------------------
  |
  | This is the view engine that should be used. The currently supported are:
  | handlebars, edge
  |
  */
  viewEngine: 'handlebars',

  /*
  |--------------------------------------------------------------------------
  | SMTP
  |--------------------------------------------------------------------------
  |
  | Here we define configuration for sending emails via SMTP.
  |
  */
  smtp: {
    driver: 'smtp',
    pool: true,
    port: process.env.SMTP_PORT || 2525,
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    },
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 10
  }
}
