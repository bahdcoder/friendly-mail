const Request = require('../../src/Request')

describe('The Request class', () => {
  it('can be instantiated properly', () => {
    expect(new Request()).toMatchSnapshot()
  })

  it('can build a request', () => {
    const request = new Request()

    request
      .acceptJson()
      .basicAuth({ username: 'username', password: 'password' })
      .auth('token')
      .headers({
        'api-version': '2019-08-09'
      })

    expect(request._isJson).toBe(true)
    expect(request._headers).toEqual({
      'api-version': '2019-08-09'
    })
    expect(request._auth).toEqual('token')
    expect(request._basicAuth).toEqual({
      username: 'username',
      password: 'password'
    })
  })

  it('can post a request to an endpoint with all data on object', async () => {
    const request = new Request()
    request
      .acceptJson()
      .basicAuth({ username: 'username', password: 'password' })
      .auth('token')
      .headers({
        'api-version': '2019-08-09'
      })

    const response = await request.post('http://fullstackjs.online', {})

    expect(response.url).toEqual('http://fullstackjs.online')
    expect(response.data.headers).toEqual({
      Authorization: 'token',
      'api-version': '2019-08-09'
    })
  })

  it('can reject errors if post request fails', async () => {
    const request = new Request()

    expect(
      request.post('', { fail: true })
    ).rejects.toThrowErrorMatchingSnapshot()
  })
})
