const axios = require('axios');

const typeEnum = ['Free', 'Paid', 'Premium'];

async function createtypeEnum() {
  try {
    for (const type of typeEnum) {
      const response = await axios.post('http://localhost:5000/api/v1/coursesType/create', {typeName:type});
      console.log(`"${type}" created successfully`);
    }
    console.log('All courses types created successfully.');
  } catch (error) {
    console.error('Error creating course type:', error);
  }
}
createtypeEnum();
