const fetchProducts = async (categoryID) => {
  try {
    const response = await fetch(`http://50.187.63.220:3000/ProductData?categoryID=${categoryID}`);
    if (response.ok) {
      const data = await response.json();
      return data || []; 
    } else {
      console.error('Failed to fetch product data');
      return [];
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
};

export { fetchProducts };