-- ALittle Generate Lua And Do Not Edit This Line!
do
local ___pairs = pairs
local ___ipairs = ipairs


function _G.Require(base_path, url)
	local ___COROUTINE = coroutine.running()
	if _G["core_require"] ~= nil then
		_G["core_require"](base_path .. url)
	else
		require(base_path .. url)
	end
	return nil
end

function _G.RequireFromPaths(base_path, rel_path, file_list)
	local ___COROUTINE = coroutine.running()
	for index, path in ___ipairs(file_list) do
		path = string.sub(path, 1, -9)
		Require(base_path, rel_path .. path)
	end
end

function _G.RequireCore(base_path)
	local ___COROUTINE = coroutine.running()
	Require(base_path, "Core/Base")
	Require(base_path, "Core/Reflect")
	Require(base_path, "Core/Lua")
	if _G["bit"] == nil then
		_G["bit"] = _G["bit32"]
	end
	Require(base_path, "Core/Log")
	Require(base_path, "Core/List")
	Require(base_path, "Core/Map")
	Require(base_path, "Core/Math")
	Require(base_path, "Core/String")
	Require(base_path, "Core/Time")
	Require(base_path, "Core/Coroutine")
	Require(base_path, "Core/Net")
end

end