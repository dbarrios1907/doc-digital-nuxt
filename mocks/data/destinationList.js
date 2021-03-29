// employees.js
const faker = require('faker')
function generateDestinationList() {
  const lists = []
  for (let id = 0; id < 50; id++) {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const email = faker.internet.email()
    lists.push({
      id,
      first_name: firstName,
      last_name: lastName,
      email,
    })
  }
  return { lists }
}
module.exports = generateDestinationList
