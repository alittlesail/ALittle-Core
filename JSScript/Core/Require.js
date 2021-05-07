{
if (typeof ALittle === "undefined") window.ALittle = {};


ALittle.Require = JavaScript.Class(undefined, {
	Ctor : function() {
		this._rely_map = {};
		this._reverse_map = {};
		this._loading_count = 0;
		this._file_count = 0;
	},
	AddPaths : function(base_path, rel_path, rely_list_list) {
		base_path = base_path + rel_path;
		let ___OBJECT_1 = rely_list_list;
		for (let _ = 1; _ <= ___OBJECT_1.length; ++_) {
			let rely_list = ___OBJECT_1[_ - 1];
			if (rely_list === undefined) break;
			let key = base_path + rely_list[1 - 1];
			let sub_map = this._rely_map[key];
			if (sub_map === undefined) {
				sub_map = {};
				this._rely_map[key] = sub_map;
			}
			let ___OBJECT_2 = rely_list;
			for (let index = 1; index <= ___OBJECT_2.length; ++index) {
				let value = ___OBJECT_2[index - 1];
				if (value === undefined) break;
				if (index !== 1) {
					sub_map[base_path + value] = true;
				}
			}
		}
	},
	DoNext : function() {
		{
			if (this._file_count <= 0) {
				if (this._loading_count <= 0) {
					let thread = this._thread;
					this._thread = undefined;
					if (thread !== undefined) {
						thread(undefined);
					}
				}
				return;
			}
			let require_list = this.PopList();
			if (require_list === undefined) {
				if (this._loading_count <= 0) {
					let thread = this._thread;
					this._thread = undefined;
					if (thread !== undefined) {
						thread("require ring");
					}
				}
				return;
			}
			let ___OBJECT_3 = require_list;
			for (let index = 1; index <= ___OBJECT_3.length; ++index) {
				let url = ___OBJECT_3[index - 1];
				if (url === undefined) break;
				this._loading_count = this._loading_count + (1);
				let script = document.createElement("script");
				script.type = "text/javascript";
				script.async = "async";
				let error = this.OnLoad.bind(this, url, "load failed");
				script.onabort = error;
				script.onerror = error;
				script.ontimeout = error;
				script.onload = this.OnLoad.bind(this, url, undefined);
				script.src = url + ".js";
				document.body.appendChild(script);
			}
		}
	},
	OnLoad : function(url, error) {
		this.RemoveReply(url);
		-- this._loading_count;
		this.DoNext();
	},
	Start : function() {
		return new Promise((function(___COROUTINE, ___) {
			if (this._thread !== undefined) {
				___COROUTINE("doing require"); return;
			}
			this._file_count = 0;
			this._reverse_map = {};
			let ___OBJECT_4 = this._rely_map;
			for (let key in ___OBJECT_4) {
				let value_map = ___OBJECT_4[key];
				if (value_map === undefined) continue;
				let ___OBJECT_5 = value_map;
				for (let value in ___OBJECT_5) {
					let _ = ___OBJECT_5[value];
					if (_ === undefined) continue;
					let sub_map = this._reverse_map[value];
					if (sub_map === undefined) {
						sub_map = {};
						this._reverse_map[value] = sub_map;
					}
					sub_map[key] = true;
				}
				this._file_count = this._file_count + (1);
			}
			if (typeof(importScripts) !== "undefined") {
				while (true) {
					if (this._file_count <= 0) {
						___COROUTINE(undefined); return;
					}
					let require_list = this.PopList();
					if (require_list === undefined) {
						___COROUTINE("require ring"); return;
					}
					let ___OBJECT_6 = require_list;
					for (let index = 1; index <= ___OBJECT_6.length; ++index) {
						let url = ___OBJECT_6[index - 1];
						if (url === undefined) break;
						this.RemoveReply(url);
					}
					let ___OBJECT_7 = require_list;
					for (let index = 1; index <= ___OBJECT_7.length; ++index) {
						let url = ___OBJECT_7[index - 1];
						if (url === undefined) break;
						importScripts("../../../" + url);
					}
				}
				___COROUTINE(undefined); return;
			}
			if (typeof(require) !== "undefined") {
				while (true) {
					if (this._file_count <= 0) {
						___COROUTINE(undefined); return;
					}
					let require_list = this.PopList();
					if (require_list === undefined) {
						___COROUTINE("require ring"); return;
					}
					let ___OBJECT_8 = require_list;
					for (let index = 1; index <= ___OBJECT_8.length; ++index) {
						let url = ___OBJECT_8[index - 1];
						if (url === undefined) break;
						this.RemoveReply(url);
					}
					let ___OBJECT_9 = require_list;
					for (let index = 1; index <= ___OBJECT_9.length; ++index) {
						let url = ___OBJECT_9[index - 1];
						if (url === undefined) break;
						require("../../../" + url);
					}
				}
				___COROUTINE(undefined); return;
			}
			this._thread = ___COROUTINE;
			this.DoNext();
			return;
		}).bind(this));
	},
	PopList : function() {
		let require_list = undefined;
		let ___OBJECT_10 = this._rely_map;
		for (let key in ___OBJECT_10) {
			let value_map = ___OBJECT_10[key];
			if (value_map === undefined) continue;
			let empty = true;
			let ___OBJECT_11 = value_map;
			for (let _1 in ___OBJECT_11) {
				let _v2 = ___OBJECT_11[_1];
				if (_v2 === undefined) continue;
				empty = false;
				break;
			}
			if (empty) {
				if (require_list === undefined) {
					require_list = [];
				}
				require_list.push(key);
			}
		}
		if (require_list === undefined) {
			return undefined;
		}
		let ___OBJECT_12 = require_list;
		for (let index = 1; index <= ___OBJECT_12.length; ++index) {
			let url = ___OBJECT_12[index - 1];
			if (url === undefined) break;
			delete this._rely_map[url];
			this._file_count = this._file_count - (1);
		}
		return require_list;
	},
	RemoveReply : function(value) {
		let sub_map = this._reverse_map[value];
		if (sub_map !== undefined) {
			let ___OBJECT_13 = sub_map;
			for (let key in ___OBJECT_13) {
				let _ = ___OBJECT_13[key];
				if (_ === undefined) continue;
				let rely_sub_map = this._rely_map[key];
				if (rely_sub_map !== undefined) {
					delete rely_sub_map[value];
				}
			}
		}
	},
}, "ALittle.Require");

}