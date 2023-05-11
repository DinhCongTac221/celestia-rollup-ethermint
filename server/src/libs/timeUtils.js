const dayjs = require("dayjs");
const weekOfYear = require("dayjs/plugin/weekOfYear");

module.exports = {
    getTime: () => {
        return dayjs().format("YYYY-MM-DD HH:mm:ss");
    },
    getDayId: () => {
        return dayjs().format("YYYYMMDD");
    },
    getWeekId: () => {
        dayjs.extend(weekOfYear);
        return +`${dayjs().year()}${dayjs().week()}`;
    },
    getMonthId: () => {
        return dayjs().format("YYYYMM");
    },
    getDiffMinutesFromNow: (_time) => {
        const timeCompare = dayjs(_time);
        const timeNow = dayjs();
        return timeNow.diff(timeCompare, "minutes", true);
    },
};
