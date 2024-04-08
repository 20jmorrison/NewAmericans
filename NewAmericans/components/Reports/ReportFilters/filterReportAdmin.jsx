export const filterReportDataByAdminID = (reportData, adminID) => {
  return reportData.filter(item => {
    return item.AdminID.toString() === adminID;
  });
};
