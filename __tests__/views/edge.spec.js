const EdgeRenderEngine = require('../../src/Views/Edge')

describe('The EdgeRenderEngine', () => {
  it('it instantiates properly', () => {
    const config = {
      viewEngine: 'edge'
    }

    expect(new EdgeRenderEngine(config)).toMatchSnapshot()
  })

  it('can render the emails content for all three email types', () => {
    const config = {
      viewEngine: 'edge',
      views: '__tests__/__mocks__/mails'
    }

    expect(
      new EdgeRenderEngine(config).render('reset-password', {
        username: 'bahdcoder'
      })
    ).toMatchSnapshot()
  })
})
