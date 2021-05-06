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

function _G.RunScript(script, path)
	if _G["core_run"] ~= nil then
		_G["core_run"](script, path)
	else
		load(script, path)()
	end
end

_G.A_CoreBasePath = nil
function _G.RequireCore(base_path)
	local ___COROUTINE = coroutine.running()
	A_CoreBasePath = base_path
	Require(base_path, "Core/Base")
	Require(base_path, "Core/Reflect")
	Require(base_path, "Core/Lua")
	Require(base_path, "Core/Log")
	Require(base_path, "Core/List")
	Require(base_path, "Core/Map")
	Require(base_path, "Core/Math")
	Require(base_path, "Core/String")
	Require(base_path, "Core/Time")
	Require(base_path, "Core/Coroutine")
	Require(base_path, "Core/Net")
	Require(base_path, "Core/Worker")
	Require(base_path, "Core/Require")
end

end