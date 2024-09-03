const CALL_DELEGATE = function (...args) {
	this.call = this._createCall("sync");
	return this.call(...args);
};


class Hook {
	constructor(args = [], name = undefined) {
		// 保存初始化Hook时传递的参数
		this._args = args;
		// name参数没什么用可以忽略掉
		this.name = name;
		// 保存通过tap注册的内容
		this.taps = [];
		// 保存拦截器相关内容 我们暂时先忽略拦截器
		this.interceptors = [];
		// hook.call 调用方法
		this._call = CALL_DELEGATE;
		this.call = CALL_DELEGATE;
		// _x存放hook中所有通过tap注册的函数
		this._x = undefined;

		// 动态编译方法
		this.compile = this.compile;
		// 相关注册方法
		this.tap = this.tap;
		// 与SyncHook无关的代码
		// this._callAsync = CALL_ASYNC_DELEGATE;
		// this.callAsync = CALL_ASYNC_DELEGATE;
		// this._promise = PROMISE_DELEGATE;
		// this.promise = PROMISE_DELEGATE;
		// this.tapAsync = this.tapAsync;
		// this.tapPromise = this.tapPromise;

	}

	compile(options) {
		throw new Error("Abstract: should be overridden");
	}

	_createCall(type) {
		// 此时的compile是通过SyncHook重写了
		return this.compile({
			taps: this.taps,
			interceptors: this.interceptors,
			args: this._args,
			type: type
		});
	}

	/**
	 * 
	 * @param {*} type 注册的类型 promise、async、sync
	 * @param {*} options 注册时传递的第一个参数对象
	 * @param {*} fn 注册时传入监听的事件函数
	 */

	_tap(type, options, fn) {
		if (typeof options === "string") {
			options = {
				name: options.trim()
			};
		} else if (typeof options !== "object" || options === null) {
			 // 如果非对象或者传入null
			throw new Error("Invalid tap options");
		}
		// 那么此时剩下的options类型仅仅就只有object类型了
		if (typeof options.name !== "string" || options.name === "") {
			// 如果传入的options.name 不是字符串 或者是 空串
			throw new Error("Missing name for tap");
		}
		 // 合并参数 { type, fn,  name:'xxx'  }
		options = Object.assign({ type, fn }, options);
		options = this._runRegisterInterceptors(options);
		 // 将合并后的参数插入
		this._insert(options);
	}

	tap(options, fn) {
		// 这里额外多做了一层封装 是因为this._tap是一个通用方法
		// 这里我们使用的是同步 所以第一参数表示类型传入 sync
		// 如果是异步同理为sync、promise同理为 promise 这样就很好的区分了三种注册方式
		this._tap("sync", options, fn);
	}

	_runRegisterInterceptors(options) {
		for (const interceptor of this.interceptors) {
			if (interceptor.register) {
				const newOptions = interceptor.register(options);
				if (newOptions !== undefined) {
					options = newOptions;
				}
			}
		}
		return options;
	}

	isUsed() {
		return this.taps.length > 0 || this.interceptors.length > 0;
	}

	intercept(interceptor) {
		this._resetCompilation();
		this.interceptors.push(Object.assign({}, interceptor));
		if (interceptor.register) {
			for (let i = 0; i < this.taps.length; i++) {
				this.taps[i] = interceptor.register(this.taps[i]);
			}
		}
	}

	// 
	_resetCompilation() {
		this.call = this._call;
	}

	_insert(item) {
		/* 
			(function anonymous(arg1, arg2, arg3
			) {
			"use strict";
			var _context;
			var _x = this._x;
			var _fn0 = _x[0];
			_fn0(arg1, arg2, arg3);
			var _fn1 = _x[1];
			_fn1(arg1, arg2, arg3);

			})
		*/
		// 如果没加这个函数 那么 this._x还是2个函数, taps已经添加进去了，但是CALL_DELEGATE，已经生成要执行的函数了，所有需要重置，need run this._resetCompilation();
		// this._resetCompilation();
		
		let before;
		if (typeof item.before === "string") {
			before = new Set([item.before]);
		} else if (Array.isArray(item.before)) {
			before = new Set(item.before);
		}
		let stage = 0;
		if (typeof item.stage === "number") {
			stage = item.stage;
		}
		let i = this.taps.length;
		// 这儿通过断点调试，就是为了给有before配置或者afrer做位置位移
		while (i > 0) {
			i--;
			const x = this.taps[i];
			this.taps[i + 1] = x;
			const xStage = x.stage || 0;
			if (before) {
				if (before.has(x.name)) {
					before.delete(x.name);
					continue;
				}
				if (before.size > 0) {
					continue;
				}
			}
			if (xStage > stage) {
				continue;
			}
			i++;
			break;
		}
		this.taps[i] = item;
	}
}

Object.setPrototypeOf(Hook.prototype, null);

module.exports = Hook;