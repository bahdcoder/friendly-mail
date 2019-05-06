module.exports = jest.fn((a, b) =>
  b.body.fail
    ? Promise.reject({ response: { body: { message: 'Unauthorized.' } } })
    : Promise.resolve({ body: { url: a, data: b } })
)
