-- ALittle Generate Lua And Do Not Edit This Line!
do
if _G.ALittle == nil then _G.ALittle = {} end
local ALittle = ALittle
local Lua = Lua
local ___rawset = rawset
local ___pairs = pairs
local ___ipairs = ipairs


local insert = table.insert
ALittle.Require = Lua.Class(nil, "ALittle.Require")

function ALittle.Require:Ctor()
	___rawset(self, "_rely_map", {})
	___rawset(self, "_reverse_map", {})
	___rawset(self, "_loading_count", 0)
	___rawset(self, "_file_count", 0)
end

function ALittle.Require:AddPaths(base_path, rel_path, rely_list_list)
	base_path = base_path .. rel_path
	for _, rely_list in ___ipairs(rely_list_list) do
		local key = base_path .. rely_list[1]
		local sub_map = self._rely_map[key]
		if sub_map == nil then
			sub_map = {}
			self._rely_map[key] = sub_map
		end
		for index, value in ___ipairs(rely_list) do
			if index ~= 1 then
				sub_map[base_path .. value] = true
			end
		end
	end
end

function ALittle.Require:DoNext()
end

function ALittle.Require:OnLoad(url, error)
	self:RemoveReply(url)
	self._loading_count = self._loading_count - 1
	self:DoNext()
end

function ALittle.Require:Start()
	local ___COROUTINE = coroutine.running()
	if self._thread ~= nil then
		return "doing require"
	end
	self._file_count = 0
	self._reverse_map = {}
	for key, value_map in ___pairs(self._rely_map) do
		for value, _ in ___pairs(value_map) do
			local sub_map = self._reverse_map[value]
			if sub_map == nil then
				sub_map = {}
				self._reverse_map[value] = sub_map
			end
			sub_map[key] = true
		end
		self._file_count = self._file_count + (1)
	end
	while true do
		if self._file_count <= 0 then
			return nil
		end
		local require_list = self:PopList()
		if require_list == nil then
			return "require ring"
		end
		for index, url in ___ipairs(require_list) do
			self:RemoveReply(url)
		end
		if _G["core_require"] ~= nil then
			for index, url in ___ipairs(require_list) do
				_G["core_require"](url)
			end
		else
			for index, url in ___ipairs(require_list) do
				require(url)
			end
		end
	end
	self._thread = ___COROUTINE
	self:DoNext()
	return coroutine.yield()
end

function ALittle.Require:PopList()
	local require_list = nil
	for key, value_map in ___pairs(self._rely_map) do
		local empty = true
		for _1, _v2 in ___pairs(value_map) do
			empty = false
			break
		end
		if empty then
			if require_list == nil then
				require_list = {}
			end
			insert(require_list, key)
		end
	end
	if require_list == nil then
		return nil
	end
	for index, url in ___ipairs(require_list) do
		self._rely_map[url] = nil
		self._file_count = self._file_count - (1)
	end
	return require_list
end

function ALittle.Require:RemoveReply(value)
	local sub_map = self._reverse_map[value]
	if sub_map ~= nil then
		for key, _ in ___pairs(sub_map) do
			local rely_sub_map = self._rely_map[key]
			if rely_sub_map ~= nil then
				rely_sub_map[value] = nil
			end
		end
	end
end

end