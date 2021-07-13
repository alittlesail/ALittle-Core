-- ALittle Generate Lua And Do Not Edit This Line!
do
if _G.ALittle == nil then _G.ALittle = {} end
local ALittle = ALittle
local Lua = Lua
local ___pairs = pairs
local ___ipairs = ipairs


function ALittle.Time_GetCurTime()
	return os.time()
end

function ALittle.Time_GetCurBeginTime(time)
	do
		local info = os.date("*t", time)
		info.hour = 0
		info.min = 0
		info.sec = 0
		return os.time(info)
	end
end

function ALittle.Time_MakeTime(year, month, day, hour, minute, second)
	do
		local info = {}
		info.year = year
		info.month = month
		info.day = day
		info.hour = hour
		info.min = minute
		info.sec = second
		return os.time(info)
	end
end

function ALittle.Time_GetCurDate(time)
	return os.date("%Y-%m-%d-%H-%M-%S", time)
end

function ALittle.Time_GetCurYMD(time)
	return os.date("%Y-%m-%d", time)
end

function ALittle.Time_GetYear(time)
	do
		local info = os.date("*t", time)
		return info.year
	end
end

function ALittle.Time_GetMonth(time)
	do
		local info = os.date("*t", time)
		return info.month
	end
end

function ALittle.Time_GetDay(time)
	do
		local info = os.date("*t", time)
		return info.day
	end
end

function ALittle.Time_GetMonthDayCount(year, month)
	if month == 1 or month == 3 or month == 5 or month == 7 or month == 8 or month == 10 or month == 12 then
		return 31
	end
	if month == 2 then
		if (year % 4 == 0 and year % 100 ~= 0) or (year % 400 == 0) then
			return 29
		else
			return 28
		end
	end
	if month >= 1 and month <= 12 then
		return 30
	end
	return 0
end

end