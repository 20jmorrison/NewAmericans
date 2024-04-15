const putCategory = async (updatedCategory) => {
    try {
        const response = await fetch(`http://50.187.63.220:3000/PutCategory/${updatedCategory.CategoryID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCategory),
        });
        const data = await response.json();
        console.log('Category updated:', data);
    } catch (error) {
        console.error('Error updating Category:', error);
    }
};
export { putCategory };