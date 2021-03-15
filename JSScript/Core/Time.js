{
if (typeof ALittle === "undefined") window.ALittle = {};


ALittle.Time_GetCurTime = function() {
	return ALittle.Math_Floor(Date.now() / 1000);
}

ALittle.Time_MakeTime = function(year, month, day, hour, minute, second) {
	{
		let date = new Date();
		date.setFullYear(year);
		date.setMonth(month - 1);
		date.setDate(day);
		date.setHours(hour);
		date.setMinutes(minute);
		date.setSeconds(second);
		return ALittle.Math_Floor(date.getTime() / 1000);
	}
}

ALittle.Time_GetCurDate = function(time) {
	{
		let date = new Date();
		if (time !== undefined) {
			date.setTime(time * 1000);
		}
		let result = date.getFullYear() + "-";
		let month = date.getMonth() + 1;
		if (month < 10) {
			result = result + "-0" + month;
		} else {
			result = result + "-" + month;
		}
		let day = date.getDate();
		if (day < 10) {
			result = result + "-0" + day;
		} else {
			result = result + "-" + day;
		}
		let hours = date.getHours();
		if (hours < 10) {
			result = result + "-0" + hours;
		} else {
			result = result + "-" + hours;
		}
		let minutes = date.getMinutes();
		if (minutes < 10) {
			result = result + "-0" + minutes;
		} else {
			result = result + "-" + minutes;
		}
		let seconds = date.getSeconds();
		if (seconds < 10) {
			result = result + "-0" + seconds;
		} else {
			result = result + "-" + seconds;
		}
		return result;
	}
}

ALittle.Time_GetCurYMD = function(time) {
	{
		let date = new Date();
		if (time !== undefined) {
			date.setTime(time * 1000);
		}
		let result = date.getFullYear() + "-";
		let month = date.getMonth() + 1;
		if (month < 10) {
			result = result + "-0" + month;
		} else {
			result = result + "-" + month;
		}
		let day = date.getDate();
		if (day < 10) {
			result = result + "-0" + day;
		} else {
			result = result + "-" + day;
		}
		return result;
	}
}

ALittle.Time_GetYear = function(time) {
	{
		let date = new Date();
		if (time !== undefined) {
			date.setTime(time * 1000);
		}
		return date.getFullYear();
	}
}

ALittle.Time_GetMonth = function(time) {
	{
		let date = new Date();
		if (time !== undefined) {
			date.setTime(time * 1000);
		}
		return date.getMonth() + 1;
	}
}

ALittle.Time_GetDay = function(time) {
	{
		let date = new Date();
		if (time !== undefined) {
			date.setTime(time * 1000);
		}
		return date.getDate();
	}
}

ALittle.Time_GetMonthDayCount = function(year, month) {
	if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
		return 31;
	}
	if (month === 2) {
		if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
			return 29;
		} else {
			return 28;
		}
	}
	if (month >= 1 && month <= 12) {
		return 30;
	}
	return 0;
}

}