const fetchTransactions = async (StudentID) => {
    try {
      const response = await fetch(`http://50.187.63.220:3000/TransactionData?=${StudentID}`);
      if (response.ok) {
        const data = await response.json();
        return data || []; 
      } else {
        console.error('Failed to fetch transaction data');
        return [];
      }
    } catch (error) {
      console.error('Error fetching transaction data:', error);
      return [];
    }
  };
  
  export { fetchTransactions };