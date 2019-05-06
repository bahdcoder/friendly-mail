const HandlebarsRenderEngine = require('../../src/Views/Handlebars')

describe('The HandlebarsRenderEngine', () => {
  it('it instantiates properly', () => {
    const config = {
      viewEngine: 'handlebars'
    }

    expect(new HandlebarsRenderEngine(config)).toMatchSnapshot()
  })

  it('can render the emails content for all three email types', () => {
    const config = {
      viewEngine: 'handlebars',
      views: '__tests__/__mocks__/mails'
    }

    expect(
      new HandlebarsRenderEngine(config).render('confirm-email', {
        username: 'bahdcoder'
      })
    ).toMatchSnapshot()
  })
})
