const fetchFamilyData = async () => {
    try {
      const response = await fetch('http://50.187.63.220:3000/FamilyData');
      if (response.ok) {
        const data = await response.json();
        return data || [];
      } else {
        console.error('Failed to fetch Family data');
        return [];
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
      return [];
    }
  };
  
  export { fetchFamilyData };