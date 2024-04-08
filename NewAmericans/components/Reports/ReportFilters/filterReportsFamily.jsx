export const filterReportDataByFamilyID= (reportData, familyID) => {
    return reportData.filter(item => {
      return item.FamilyID.toString() === familyID;
    });
  };