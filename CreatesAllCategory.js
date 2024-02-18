const axios = require('axios');

const categoryEnum = ['Development', 'Business', 'Finance', 'Art', 'Health', 'Fitness', 'Cooking', 'Music', 'Language', 'Other'];

async function createCategories() {
  try {
    for (const category of categoryEnum) {
      const response = await axios.post('http://localhost:5000/api/v1/category/create', { categoryName: category, logo:"nil" });
      console.log(`Category "${category}" created successfully`);
    }
    console.log('All categories created successfully.');
  } catch (error) {
    console.error('Error creating categories:', error);
  }
}

// Call the function to create categories
createCategories();
