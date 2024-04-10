const UpdateStudentFamily = async (updatedStudent) => {
    try {
        const response = await fetch(`http://50.187.63.220:3000/UpdateStudentFamily/${updatedStudent.StudentID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedStudent),
        });
        const data = await response.json();
        console.log('Student family updated:', data);
    } catch (error) {
        console.error('Error updating student family:', error);
    }
};
export { UpdateStudentFamily };