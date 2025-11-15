const moment = require("moment");

const splitTimeRange = (timeRange) => {
  const { startTime, endTime } = timeRange;
  const start = moment(startTime, "HH:mm");
  const end = moment(endTime, "HH:mm");

  // First slot: Start to 12:00 PM
  const firstSlotEnd = moment("12:00 PM", "h:mm A");
  const firstSlot = `${start.format("h:mm A")} - ${firstSlotEnd.format("h:mm A")}`;

  // Second slot: 1:00 PM to End
  const secondSlotStart = moment("1:00 PM", "h:mm A");
  const secondSlot = `${secondSlotStart.format("h:mm A")} - ${end.format("h:mm A")}`;

  return [firstSlot, secondSlot];
};
  module.exports =  { splitTimeRange };