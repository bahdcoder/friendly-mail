const BaseRenderEngine = require('../../src/Views/Base')

describe('The base render engine', () => {
  it('can be instantiated properly', () => {
    const config = {
      viewEngine: 'handlebars'
    }

    expect(new BaseRenderEngine(config)).toMatchSnapshot()
  })

  it('can get views path', () => {
    const config = {
      viewEngine: 'handlebars'
    }

    const renderEngine = new BaseRenderEngine(config)

    expect(renderEngine._getViewsPath('confirm-email')).toEqual(
      `${process.cwd()}/mails/confirm-email`
    )
  })

  it('can get views path using views config ', () => {
    const config = {
      viewEngine: 'handlebars',
      views: 'server/mails'
    }

    const renderEngine = new BaseRenderEngine(config)

    expect(renderEngine._getViewsPath('confirm-email')).toEqual(
      `${process.cwd()}/server/mails/confirm-email`
    )
  })

  it('can get views content based on viewEngine and views config variables', () => {
    const config = {
      viewEngine: 'handlebars',
      views: '__tests__/__mocks__/mails'
    }

    const edgeConfig = {
      viewEngine: 'edge',
      views: '__tests__/__mocks__/mails'
    }

    expect(
      new BaseRenderEngine(config)._getContent('confirm-email')
    ).toMatchSnapshot()
    expect(
      new BaseRenderEngine(edgeConfig)._getContent('reset-password')
    ).toMatchSnapshot()
  })

  it('can gracefully ignore mail templates that are not found', () => {
    const config = {
      views: '__tests__/__mocks__/mails',
      viewEngine: 'handlebars'
    }

    const base = new BaseRenderEngine(config)
    const content = base._getContent('payment-received')

    expect(content.text).toBeNull()
    expect(content.watchHtml).toBeNull()
    expect(content.html).toMatchSnapshot()
  })
})
