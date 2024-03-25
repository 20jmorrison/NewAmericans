export const filterReportDataByUserId = (reportData, studentID) => {
  return reportData.filter(item => {
    return item.StudentID === studentID;
  });
};

