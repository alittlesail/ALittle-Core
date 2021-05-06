{
if (typeof ALittle === "undefined") window.ALittle = {};


ALittle.Require = JavaScript.Class(undefined, {
	Ctor : function() {
		this._rely_map = {};
		this._reverse_map = {};
		this._loading_count = 0;
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
			if (this.IsEmpty()) {
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
				let thread = this._thread;
				this._thread = undefined;
				if (thread !== undefined) {
					thread("require ring");
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
				let error = this.OnLoad.bind(this, "load failed:" + url);
				script.onabort = error;
				script.onerror = error;
				script.ontimeout = error;
				script.onload = this.OnLoad.bind(this, undefined);
				script.src = url + ".js";
				document.body.appendChild(script);
			}
		}
	},
	OnLoad : function(failed_reason) {
		-- this._loading_count;
		this.DoNext();
	},
	Start : function() {
		return new Promise((function(___COROUTINE, ___) {
			if (this._thread !== undefined) {
				___COROUTINE("doing require"); return;
			}
			if (typeof(importScripts) !== "undefined") {
				while (true) {
					if (this.IsEmpty()) {
						___COROUTINE(undefined); return;
					}
					let require_list = this.PopList();
					if (require_list === undefined) {
						___COROUTINE("require ring"); return;
					}
					let ___OBJECT_4 = require_list;
					for (let index = 1; index <= ___OBJECT_4.length; ++index) {
						let url = ___OBJECT_4[index - 1];
						if (url === undefined) break;
						importScripts("../../../" + url);
					}
				}
				___COROUTINE(undefined); return;
			}
			if (typeof(require) !== "undefined") {
				while (true) {
					if (this.IsEmpty()) {
						___COROUTINE(undefined); return;
					}
					let require_list = this.PopList();
					if (require_list === undefined) {
						___COROUTINE("require ring"); return;
					}
					let ___OBJECT_5 = require_list;
					for (let index = 1; index <= ___OBJECT_5.length; ++index) {
						let url = ___OBJECT_5[index - 1];
						if (url === undefined) break;
						require("../../../" + url);
					}
				}
				___COROUTINE(undefined); return;
			}
			this._thread = ___COROUTINE;
			this._reverse_map = {};
			let ___OBJECT_6 = this._rely_map;
			for (let key in ___OBJECT_6) {
				let value_map = ___OBJECT_6[key];
				if (value_map === undefined) continue;
				let ___OBJECT_7 = value_map;
				for (let value in ___OBJECT_7) {
					let _ = ___OBJECT_7[value];
					if (_ === undefined) continue;
					let sub_map = this._reverse_map[value];
					if (sub_map === undefined) {
						sub_map = {};
						this._reverse_map[value] = sub_map;
					}
					sub_map[key] = true;
				}
			}
			this.DoNext();
			return;
		}).bind(this));
	},
	IsEmpty : function() {
		let empty = true;
		empty = this._rely_map.size === 0;
		return empty;
	},
	PopList : function() {
		let require_list = undefined;
		let ___OBJECT_8 = this._rely_map;
		for (let key in ___OBJECT_8) {
			let value_map = ___OBJECT_8[key];
			if (value_map === undefined) continue;
			let empty = false;
			empty = value_map.size === 0;
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
		let ___OBJECT_9 = require_list;
		for (let index = 1; index <= ___OBJECT_9.length; ++index) {
			let value = ___OBJECT_9[index - 1];
			if (value === undefined) break;
			let sub_map = this._reverse_map[value];
			if (sub_map !== undefined) {
				let ___OBJECT_10 = sub_map;
				for (let key in ___OBJECT_10) {
					let _ = ___OBJECT_10[key];
					if (_ === undefined) continue;
					let rely_sub_map = this._rely_map[key];
					if (rely_sub_map !== undefined) {
						delete rely_sub_map[value];
					}
				}
			}
		}
		let ___OBJECT_11 = require_list;
		for (let index = 1; index <= ___OBJECT_11.length; ++index) {
			let url = ___OBJECT_11[index - 1];
			if (url === undefined) break;
			delete this._rely_map[url];
		}
		return require_list;
	},
}, "ALittle.Require");

}