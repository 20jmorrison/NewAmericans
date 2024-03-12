// Function to fetch category names
const fetchCategories = async () => {
  try {
    const response = await fetch('http://50.187.63.220:3000/CategoryData'); // Needs to be updated when IP is given
    if (response.ok) {
      const data = await response.json();
      return data.categories;
    } else {
      console.error('Failed to fetch category data');
      return [];
    }
  } catch (error) {
    console.error('Error fetching category data:', error);
    return [];
  }
};

export { fetchCategories };
