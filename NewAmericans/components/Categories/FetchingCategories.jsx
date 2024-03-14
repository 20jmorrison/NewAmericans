
const fetchCategories = async () => {
  try {
    const response = await fetch('http://50.187.63.220:3000/CategoryData');
    if (response.ok) {
      const data = await response.json();
      return data || []; // Return an empty array if categories data is undefined
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
