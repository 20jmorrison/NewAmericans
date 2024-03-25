export const filterReportDataByUserId = (reportData, familyID) => {
    return reportData.filter(item => {
      return item.FamilyID === familyID;
    });
  };