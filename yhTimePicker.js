

class YHTimePicker {

        //操作中 初始化分钟
        changeTimeHourMinutesWithMinutes(minute, hoursArray, minutesArray) {

                var today = new Date(),
                        hour = today.getHours(),
                        minute = Math.ceil(today.getMinutes() / 10);

                if (5 - minute >= 3) {
                        for (var i = 0; i < 24; i++) {
                                if (i >= hour) {
                                        hoursArray.push(i + '点');
                                }
                        };
                        for (var i = 0; i < 6; i++) {
                                if (i >= (minute + 3)) {
                                        minutesArray.push((i * 10) + '分');
                                }
                        };

                } else {
                        // hour
                        for (var i = 0; i < 24; i++) {
                                if (i >= (hour + 1)) {
                                        hoursArray.push((i) + '点');
                                }
                        };
                        // minites
                        for (var i = 0; i < 6; i++) {

                                var minuteSpace = minute - 3;

                                if (i >= minuteSpace) {
                                        minutesArray.push(((i) * 10) + '分');
                                }

                        };
                }
        }

        // 初始化 小时  分钟
        initBothHoursOrMiuteAsUsual(bol, options) {
                var today = new Date(),
                        hour = today.getHours(),
                        minute = Math.ceil(today.getMinutes() / 10);

                var hoursArray = options.hoursArray,
                        minutesArray = options.minutesArray;

                if (bol) {
                        for (var i = 0; i < 24; i++) {
                                hoursArray.push(i + '点');

                        };
                        for (var i = 0; i < 6; i++) {
                                i = i + '';
                                i = i.length == 2 ? i : ('0' + i);
                                minutesArray.push((i * 10) + '分');
                        };
                } else {
                        for (var i = 0; i < 6; i++) {
                                i = i + '';
                                i = i.length == 2 ? i : ('0' + i);
                                minutesArray.push((i * 10) + '分');
                        };
                }
        }

}

module.exports = YHTimePicker;