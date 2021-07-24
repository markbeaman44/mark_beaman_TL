/// <reference types="cypress" />

describe('Test satelite TLE data via API GET requests', () => {
  const statusData = [
    // [id, statusCodes, parameters]
    ['25544', 200, { format: 'json' }],
    ['25544', 200, { format: 'text' }],
    ['25543', 404, { format: 'json' }]
  ]

  statusData.forEach((data) => {
    const [id, statusCodes, parameters] = data

    it(`Validate ${statusCodes} response status code`, () => {
      cy.getTlesAPI(id, parameters).then((response) => {
        expect(response.status).to.equal(statusCodes)
      })
    })
  })

  const formatData = [
    // [id, parameters, fixtureValues]
    ['25544', { format: 'json' }, 'json_format.json'],
    ['25544', { format: 'text' }, 'text_format.txt']
  ]

  formatData.forEach((data) => {
    const [id, parameters, fixtureValues] = data

    it(`Validate response data for specific format ${fixtureValues}`, () => {
      cy.getTlesAPI(id, parameters).then((response) => {
        cy.readFile(`tests/fixtures/${fixtureValues}`).then((jsonResults) => {
          delete response.body.requested_timestamp
          delete response.body.tle_timestamp
          expect(response.body).to.deep.equal(jsonResults)
        })
      })
    })
  })
})
