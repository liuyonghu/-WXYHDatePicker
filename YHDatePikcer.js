var YHTimePicker = require('/yhTimePicker.js');
var timepicker = new YHTimePicker(),
    dateArray = ["现在", "今天", "明天", "后天"],
    selectDate = {},
    hoursArray = [],
    minutesArray = [],
    objectDateRange = [],
    coulmn = 0,
    dateIndex = 0,
    value = 0;
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        ComfrimYHDatePickerFunc: {
            type: Function,
            value: function () { }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        dateTime: '时间:现在',
        dateRange: [],
        dateRangeIndex: [0, 0, 0]
    },
    ready: function () {
        // init date picker
        const today = new Date();

        const todayTimestamp = today.getTime();

        var dateArr = ["现在"];
        const weekArr = ["星期一  ", "星期二  ", "星期三  ", "星期四  ", "星期五  ", "星期六  ", "星期日  "];
        for (var i = 0; i < 7; i++) {
            let date = new Date(todayTimestamp + (i) * 24 * 60 * 60 * 1000);
            var dateStr;
            switch (i) {
                case (0):
                    {
                        dateStr = "今天  " + (date.getMonth() + 1) + "月" + date.getDate() + "日";
                    };
                    break;
                case (1):
                    {
                        dateStr = "明天  " + (date.getMonth() + 1) + "月" + date.getDate() + "日";
                    };
                    break;
                case (2):
                    {
                        dateStr = "后天  " + (date.getMonth() + 1) + "月" + date.getDate() + "日";
                    };
                    break;
                default:
                    {
                        dateStr = weekArr[date.getDay()] + (date.getMonth() + 1) + "月" + date.getDate() + "日";
                    };
                    break;
            }


            dateArr.push(dateStr);

        }
        dateArray = dateArr;

        this.changeTimePicker();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        changeTimePicker: function (e) {
            var today = new Date(),
                hour = today.getHours(),
                minute = Math.ceil(today.getMinutes() / 10);
            if (e && e.type != "tap") {
                if (e.detail.column == 0) {
                    dateIndex = e.detail.value;
                }
                coulmn = e.detail.column;
                value = e.detail.value;

            }
            switch (coulmn) {
                case (0):
                    {
                        hoursArray = [];
                        minutesArray = [];

                        switch (dateIndex) {
                            case (0):
                                {
                                    hoursArray = ["现在"];
                                    minutesArray = ["现在"];
                                };
                                break;
                            case (1):
                                {
                                    timepicker.changeTimeHourMinutesWithMinutes(minute, hoursArray, minutesArray);
                                };
                                break;
                            default:
                                { //不是今日
                                    var options = {
                                        hoursArray: hoursArray,
                                        minutesArray: minutesArray
                                    }
                                    timepicker.initBothHoursOrMiuteAsUsual(true, options);
                                }
                        }

                    };
                    break;
                case (1):
                    {
                        minutesArray = [];
                        switch (dateIndex) {
                            case (0):
                                {
                                    hoursArray = ["现在"];
                                    minutesArray = ["现在"];
                                };
                                break;
                            case (1):
                                {
                                    switch (value) {
                                        case (0):
                                            {
                                                timepicker.changeTimeHourMinutesWithMinutes(minute, hoursArray, minutesArray);
                                            };
                                            break;
                                        default:
                                            {
                                                var options = {
                                                    // hoursArray: hoursArray,
                                                    minutesArray: minutesArray
                                                }
                                                timepicker.initBothHoursOrMiuteAsUsual(false, options);
                                            };
                                            break;
                                    }

                                };
                                break;
                            default:
                                { //不是今日
                                    var options = {
                                        hoursArray: hoursArray,
                                        minutesArray: minutesArray
                                    }
                                    timepicker.initBothHoursOrMiuteAsUsual(true, options);
                                }
                        }
                    };
                    break;
                default:
                    {


                    }
                    break;
            }

            // obj dateRange
            var objDateArray = [],
                objHoursArray = [],
                objMinutesArray = [];
            for (var i = 0; i < dateArray.length; i++) {
                var item = {
                    id: i,
                    value: dateArray[i]
                }
                objDateArray.push(item);
            };
            for (var i = 0; i < hoursArray.length; i++) {
                var hourValue = hoursArray[i].replace("点", "");
                var item = {
                    id: i,
                    value: hourValue
                }
                objHoursArray.push(item);
            };
            for (var i = 0; i < minutesArray.length; i++) {
                var minuteValue = minutesArray[i].replace("分", "");
                var item = {
                    id: i,
                    value: minuteValue
                }
                objMinutesArray.push(item);
            };
            // var 

            objectDateRange = [objDateArray, objHoursArray, objMinutesArray];

            this.setData({
                dateRange: [dateArray, hoursArray, minutesArray],
            });
        },
        confirmTimePicker: function (e) {
            var today = new Date();
            var year = today.getFullYear();
            var month = today.getMonth();
            var day = today.getDate();
            var todayFlag = new Date(year, month, day);
            console.log("todayFlag = " + todayFlag);

            // 日
            var resultCoulmn1 = e.detail.value[0];
            // 时
            var resultCoulmn2 = e.detail.value[1];
            // 分
            var resultCoulmn3 = e.detail.value[2];
            var date = objectDateRange[0][resultCoulmn1].value;
            var hour = objectDateRange[1][resultCoulmn2].value;
            var minute = objectDateRange[2][resultCoulmn3].value;
            let tempMonth = month + 1 > 11 ? 0 : month + 1;
            if (!tempMonth) {
                year += 1;
            }
            var tempDate = new Date(year, tempMonth, 0);
            var daysCount = tempDate.getDate();
            console.log(resultCoulmn1);
            var operateTodayStamp = todayFlag.getTime() + (resultCoulmn1 - 1) * 24 * 60 * 60 * 1000 + hour * 60 * 60 * 1000 + minute * 60 * 1000;
            var isNow = date == "现在";
            // selectDate = !isNow ? new Date(year, month, day, hour, minute) : today;
            selectDate = !isNow ? new Date(operateTodayStamp) : today;
            // var confirmDate = !isNow ? date + " " + hour + ":" + this.getNumber(minute) : "时间:现在";
            var confirmDate = !isNow ? date + " " + hour + ":" + this.getNumber(minute) : "时间:现在";
            this.setData({
                dateTime: confirmDate,
                ceateOrderNow: isNow
            });
            console.log("PIKER selectDate = " + selectDate);
            this.properties.ComfrimYHDatePickerFunc({
                selectDate: selectDate,
                ceateOrderNow: isNow
            });
        },
        getNumber: function (num) {
            num = num + '';
            num = num.length == 2 ? num : ('0' + num);
            return num;
        }
    }
})
