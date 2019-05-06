# Friendly Mail 📩

[![Build Status](https://travis-ci.org/fullstack-js-online/mail.svg?branch=master)](https://travis-ci.org/fullstack-js-online/mail)

#### Elegant mail sender for node js.

Friendly Mail is simple, clean, and modern and easy to use email sending package for Nodejs built on top of [nodemailer](https://github.com/nodemailer/nodemailer) and uses driver implementations from [Adonis Mail](https://github.com/adonisjs/adonis-mail).

Supported mail drivers: smtp, mailgun, amazon-ses, sparkpost, ethereal

<!-- <img src="https://badge.fury.io/js/%40fullstackjs%2Fmail.png" alt="">
<img src="https://travis-ci.org/fullstack-js-online/mail.svg?branch=master" alt="">
<img src="https://img.shields.io/github/issues/fullstack-js-online/mail.svg" alt=""> -->

### Installation

You can install the package using npm or yarn

```bash
npm install --save friendly-mail
# Using yarn
yarn add friendly-mail
```

### Create a mail configuration file

To configure what drivers you'll be using to send emails, view engines and more, you need to generate a `mail.config.js` file in your project's root.

```bash
# Using npm
npx friendlymail init

# Using yarn
yarn friendlymail init
```

### Setting it up

Here's an example of the configuration:

```js
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
    | If it is not defined, /mails is used as default.
    |
    */
    views: '/mails',

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
    | inside the `extra` object.
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
    | inside the `extra` object.
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
```

The `mail.config.js` file exports an object. The following configuration variables are required:

- `connection`: This represents the name of the driver to use.
- `views`: This is the folder in which all your emails are stored. It defaults to `/mails`
- `viewsEngine`: This defines what templating engine you are using for emails. For now, only [handlebars](http://handlebarsjs.com/) and [edge](https://edge.adonisjs.com) are supported

The last configuration required is a configuration object specific to the driver. Here's an example configuration for `smtp`:
```js
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
```

### Usage

Here's a sample piece of code to send an email:

```js
const Mail = require('friendly-mail')

const nameOfEmail = 'confirm-email'

const recipientName = 'John Doe'
const recipientEmail = 'john.doe@friendly.mail.ru'

const subject = 'Please confirm your email address.'

// Send the mail using async/await
await new Mail(nameOfEmail)
    .to(recipientEmail, recipientName)
    .subject(subject)
    .send()
```

Note: All publicly exposed methods on the `Mail` class are chainable, except the `send` and `sendRaw` which return `Promises`.

### Common use cases

#### Generating emails
The package ships with a command to generate help you scaffold emails.

```bash
# Using npm
npx friendlymail generate activate-account
# Using yarn
yarn friendlymail generate activate-account
```

#### Passing data to templates
The `data` method can be used to set data that will be passed to the email template.

```js
await new Mail(nameOfEmail)
    .to(recipientEmail, recipientName)
    .subject(subject)
    .data({
        name: 'John Doe',
        url: 'https://google.com'
    })
    .send()
```

#### Setting cc and bcc for a mail

```js
await new Mail(nameOfEmail)
    .inReplyTo('jane@doe.com', 'Jane Doe')
    .to(recipientEmail, recipientName)
    .subject(subject)
    .cc('eren.stales@yahoomail.com', 'Eren Stales')
    .bcc('steve.dickson@gmail.com', 'Steve Dickson')
    .send()
```

#### Sending emails to multiple recipients

The `to` method can recieve an array of address objects to send emails to multiple users. This also works for all other methods that set user addresses like `from cc bcc inReplyTo replyTo` and `sender`

```js
await new Mail(nameOfEmail)
    .inReplyTo([{ address: 'jane@doe.com', email: 'Jane Doe' }])
    .to([{ address: 'foo@bar.com', name: 'Foo' }])
    .subject('Monthly Newsletter')
    .cc([{ address: 'eren.stales@yahoomail.com', name: 'Eren Stales' }])
    .bcc([{ address: 'steve.dickson@gmail.com', name: 'Steve Dickson' }])
    .send()
```

#### Sending mails with attachments
The `attach` and `attachData` methods can be used to send attachments

```js
// Attaching an existing file

await new Mail(nameOfEmail)
    .to(recipientEmail, recipientName)
    .subject(subject)
    .attach('/absolute/path/to/file')
    .send()

// Attaching buffer as attachment with a custom file name
const filename = 'hello.txt'
const rawData = new Buffer('hello')
await new Mail(nameOfEmail)
    .to(recipientEmail, recipientName)
    .subject(subject)
    .attachData(rawData, filename)
    .send()

// Attaching readstream as attachment with a custom file name
const filename = 'hello.txt'
const rawData = fs.createReadStream('hello.txt')

await new Mail(nameOfEmail)
    .to(recipientEmail, recipientName)
    .subject(subject)
    .attachData(rawData, filename)
    .send()

// Attaching string as attachment with a custom file name
const filename = 'hello.txt'
const rawData = 'hello'

await new Mail(nameOfEmail)
    .to(recipientEmail, recipientName)
    .subject(subject)
    .attachData(rawData, filename)
    .send()
```
