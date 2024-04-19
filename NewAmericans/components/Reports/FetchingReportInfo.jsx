const fetchReportData = async () => {
    try {
      const response = await fetch('http://50.187.63.220:3000/ReportData');
      if (response.ok) {
        const data = await response.json();
        return data || []; // Ensure we have a fallback for empty or missing data
      } else {
        console.error('Failed to fetch Report data');
        return [];
      }
    } catch (error) {
      console.error('Error fetching Report data:', error);
      return [];
    }
  };
  
  export { fetchReportData };
  