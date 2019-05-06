module.exports = {
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
  },

  /*
  |--------------------------------------------------------------------------
  | SparkPost
  |--------------------------------------------------------------------------
  |
  | Here we define configuration for spark post. Extra options can be defined
  | inside the "extra" object.
  |
  | https://developer.sparkpost.com/api/transmissions.html#header-options-attributes
  |
  | extras: {
  |   campaign_id: 'sparkpost campaign id',
  |   options: { // sparkpost options }
  | }
  |
  */
  sparkpost: {
    driver: 'sparkpost',
    // endpoint: 'https://api.eu.sparkpost.com/api/v1',
    apiKey: process.env.SPARKPOST_API_KEY,
    extras: {}
  },

  /*
  |--------------------------------------------------------------------------
  | Mailgun
  |--------------------------------------------------------------------------
  |
  | Here we define configuration for mailgun. Extra options can be defined
  | inside the "extra" object.
  |
  | https://mailgun-documentation.readthedocs.io/en/latest/api-sending.html#sending
  |
  | extras: {
  |   'o:tag': '',
  |   'o:campaign': '',,
  |   . . .
  | }
  |
  */
  mailgun: {
    driver: 'mailgun',
    domain: process.env.MAILGUN_DOMAIN,
    apiKey: process.env.MAILGUN_API_KEY,
    extras: {}
  },

  /*
  |--------------------------------------------------------------------------
  | Ethereal
  |--------------------------------------------------------------------------
  |
  | Ethereal driver to quickly test emails in your browser. A disposable
  | account is created automatically for you.
  |
  | https://ethereal.email
  |
  */
  ethereal: {
    driver: 'ethereal'
  }
}
