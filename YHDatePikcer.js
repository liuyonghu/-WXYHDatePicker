// libs/YHDatePicker/YHDatePikcer.js
var YHTimePicker = require('/yhTimePicker.js');
var timepicker = new YHTimePicker();
Component({
        /**
         * 组件的属性列表
         */
        properties: {
                ComfrimYHDatePickerFunc: {
                        type: Function,
                        value: function() {
                        }
                }
        },

        /**
         * 组件的初始数据
         */
        data: {
                dateTime: '时间:现在',
                selectDate: {},
                coulmn: 0,
                value: 0,
                dateArray: ["现在", "今天", "明天", "后天"],
                hoursArray: [],
                minutesArray: [],
                dateRange: [],
                objectDateRange: [],
                dateRangeIndex: [0, 0, 0],
                dateIndex: 0
        },
        ready: function() {
                // init date picker
                this.changeTimePicker();
                // console.log("ready --- " + JSON.stringify(this.methods));
        },
        /**
         * 组件的方法列表
         */
        methods: {
                changeTimePicker: function(e) {
                        // console.log('changeTimePicker ==  ' + JSON.stringify(e));
                        var today = new Date(),
                                hour = today.getHours(),
                                minute = Math.ceil(today.getMinutes() / 10);

                        // dateRange  value- minutes flag
                        var dateArray = this.data.dateArray,
                                hoursArray = this.data.hoursArray,
                                minutesArray = this.data.minutesArray,
                                dateFlag = this.data.dateIndex,
                                coulmn = this.data.coulmn,
                                value = this.data.value;
                        if (e && e.type != "tap") {
                                if (e.detail.column == 0) {
                                        dateFlag = e.detail.value;
                                        this.setData({
                                                dateIndex: dateFlag
                                        });
                                        // console.log('e -- dateFlag = ' + dateFlag);
                                }
                                coulmn = e.detail.column;
                                value = e.detail.value;
                                this.setData({
                                        coulmn: coulmn,
                                        value: value
                                });

                        }
                        // console.log('dateFlag = ' + dateFlag + '  coulmn = ' + coulmn + "  value = " + this.data.dateRangeIndex);
                        switch (coulmn) {
                                case (0):
                                        {
                                                hoursArray = [];
                                                minutesArray = [];

                                                switch (dateFlag) {
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
                                                // console.log("hoursArray = " + hoursArray)
                                                this.setData({
                                                        hoursArray: hoursArray,
                                                        minutesArray: minutesArray,
                                                        // dateFlag:value
                                                });
                                        };
                                        break;
                                case (1):
                                        {
                                                minutesArray = [];
                                                // console.log(213);
                                                switch (dateFlag) {
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
                                                                                                        hoursArray: hoursArray,
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
                                                this.setData({
                                                        minutesArray: minutesArray,
                                                        // hourFlag :value
                                                });
                                        };
                                        break;
                                default:
                                        {
                                                // this.setData({
                                                //         minuteFlag : value
                                                // });

                                        }
                                        break;
                        }

                        // console.log('hoursArray = ' + hoursArray);
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

                        var objectDateRange = [objDateArray, objHoursArray, objMinutesArray];
                        // console.log('objectDateRange = ' + JSON.stringify(objectDateRange));
                        this.setData({
                                dateRange: [dateArray, hoursArray, minutesArray],
                                objectDateRange: objectDateRange
                        });
                },
                confirmTimePicker: function(e) {
                        // var today = new Date("Dec 30 2018 14:10:00");
                        console.log("e.detail.value = " + JSON.stringify(e.detail.value));
                        var today = new Date();
                        var objArr = this.data.objectDateRange;
                        var year = today.getFullYear();
                        var month = today.getMonth();
                        var day = today.getDate();
                        // 日
                        var resultCoulmn1 = e.detail.value[0];
                        // 时
                        var resultCoulmn2 = e.detail.value[1];
                        // 分
                        var resultCoulmn3 = e.detail.value[2];
                        var date = objArr[0][resultCoulmn1].value;
                        var hour = objArr[1][resultCoulmn2].value;
                        var minute = objArr[2][resultCoulmn3].value;
                        console.log("date = %s hour= %s minute = %s ", date, hour, minute);
                        // var tempDate = new Date(year, 6, 0);
                        var tempDate = new Date(year, month, 0);
                        var daysCount = tempDate.getDate();
                        // 判断选择天数是否超过当月总天数

                        // console.log(' resultCoulmn1 = ' + resultCoulmn1 + ' resultCoulmn2 = ' + resultCoulmn2 + ' resultCoulmn3 = ' + resultCoulmn3);
                        switch (resultCoulmn1) {
                                case (0):
                                        {

                                        }
                                case (2):
                                        {
                                                var desitionDay = day + 1;
                                                if (desitionDay > daysCount) {
                                                        month += 1;
                                                        if (month > 12) {
                                                                month = 1;
                                                                year += 1;
                                                        }
                                                        day = 1;
                                                } else {
                                                        day += 1;
                                                }
                                        };
                                        break;
                                case (3):
                                        {
                                                var desitionDay = day + 2;
                                                if (desitionDay > daysCount) {
                                                        month += 1;
                                                        if (month > 12) {
                                                                month = 1;
                                                                year += 1;
                                                        }
                                                        var space = desitionDay - daysCount;
                                                        day = space;
                                                } else {
                                                        day += 2;
                                                }
                                        };
                                        break;
                                default:
                                        {

                                        };
                                        break;
                        }

                        var isNow = date == "现在";
                        var selectDate = !isNow ? new Date(year, month, day, hour, minute) : today;
                  
                        var confirmDate = !isNow ? date + " " + hour + ":" + this.getNumber(minute) : "时间:现在";

                        this.setData({
                                dateTime: confirmDate,
                                selectDate: selectDate,
                                ceateOrderNow: isNow
                        });
                        console.log("selectDate =" + selectDate);
                        this.properties.ComfrimYHDatePickerFunc({
                                selectDate: selectDate,
                                ceateOrderNow: isNow
                        });
                        // console.log('today ==  ' + day + "    " + " tempDate.getDate() =   " + tempDate.getDate());

                        // console.log('\n\n\n' + '-----confirmTimePicker------ ' + "today=" + confirmDate + "\n   slectDate = " + selectDate + "\n   tody =      " + today + "\n    day = " + day);
                },
                getNumber: function (num) {
                        num = num + '';
                        num = num.length == 2 ? num : ('0' + num);
                        return num;
                }
        }
})