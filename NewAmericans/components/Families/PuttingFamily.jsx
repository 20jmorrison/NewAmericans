const putFamily = async (updatedFamily) => {
    try {
        const response = await fetch(`http://50.187.63.220:3000/PutFamily/${updatedFamily.FamilyID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFamily),
        });
        const data = await response.json();
        console.log('Family updated:', data);
    } catch (error) {
        console.error('Error updating Family:', error);
    }
};
export { putFamily };