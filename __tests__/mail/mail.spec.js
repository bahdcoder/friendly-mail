const Mail = require('../../src/index')

describe('The Mail class', () => {
  it('instantiates with preferred config if its passed as second argument ', () => {
    const config = require('../../mail.config')
    config.TEST_CONFIG = 'TEST_CONFIG'
  
    const mail = new Mail('confirm-account', config)

    expect(mail.Config.TEST_CONFIG).toBe('TEST_CONFIG')
  })

  it('instantiates with a custom config', () => {
    process.env.MAIL_CONFIG_FILE_PATH =
      '__tests__/__mocks__/config/custom-mail.config.js'

    const mail = new Mail()

    expect(mail.Config.testing).toBe(true)
    expect(mail._configFilePath).toEqual(
      '__tests__/__mocks__/config/custom-mail.config.js'
    )
  })

  it('sets driver instance once instantiated', () => {
    expect(new Mail()._driverInstance).toBeTruthy()
  })

  it('can set `inReplyTo` for message to be sent', () => {
    const mail = new Mail().inReplyTo('test@mail.ru')

    expect(mail.mailerMessage.inReplyTo).toEqual('test@mail.ru')
  })

  it('can set `subject` for message to be sent', () => {
    const mail = new Mail()

    mail.subject('Test Mail')
    expect(mail.mailerMessage.subject).toEqual('Test Mail')
  })

  it('can set `from` for message to be sent', () => {
    const mail = new Mail().inReplyTo('10122121112')

    expect(mail.mailerMessage.inReplyTo).toEqual('10122121112')
  })

  it('can build a complete mail message', () => {
    const mail = new Mail()

    mail
      .driverExtras()
      .data({
        name: 'Foo Bar',
        username: 'foo-bar-js'
      })
      .inReplyTo('10122121112')
      .embed('logo.png', 'logo')
      .from('foo@bar.com', 'Foo Bar')
      .to('jane@doe.com', 'Jane Doe')
      .cc('john@doe.com', 'John doe')
      .attachData('hello text', 'hello.txt')
      .bcc('admin@app.com', 'Administrator')
      .sender('mark@meyner.com', 'Mark Meyner')
      .replyTo('anne@meyner.com', 'Anne Meyner')
      .attach('absolute/path/to/file.jpg', { contentTpe: 'plain/text' })
      .alternative('**Hello**', { contentType: 'text/x-web-markdown' })

    expect(mail.mailerMessage).toMatchSnapshot()
  })
})
