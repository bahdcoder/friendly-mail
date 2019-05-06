const SmtpDriver = require('../../src/Mail/Drivers/Smtp')

describe('the Smtp driver', () => {
  it('can set configuration', () => {
    const config = {
      host: 'smtp.mailtrap.io'
    }
    const driver = new SmtpDriver()

    driver.setConfig(config)
    expect(driver.transporter).toBeDefined()
  })
})
