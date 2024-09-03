const Hook = require('./Hook')
const HookCodeFactory = require('./HookCodeFactory')

class SyncHookCodeFactory extends HookCodeFactory {
    content({ onError, onDone, rethrowIfPossible }) {
        return this.callTapsSeries({
            onError: (i, err) => onError(err),
            onDone,
            rethrowIfPossible
        });
    }
}

const factory = new SyncHookCodeFactory();

const TAP_ASYNC = () => {
    throw new Error("tapAsync is not supported on a SyncHook");
};

const TAP_PROMISE = () => {
    throw new Error("tapPromise is not supported on a SyncHook");
};


const COMPILE = function (options) {
    factory.setup(this, options);
    return factory.create(options);
};

function SyncHook(args = [], name = undefined) {
    const hook = new Hook(args, name);
    hook.constructor = SyncHook;
    hook.tapAsync = TAP_ASYNC;
    hook.tapPromise = TAP_PROMISE;
    hook.compile = COMPILE;
    return hook;
}


class SyncHook2 {
    constructor(args = [], name = undefined) {
        const hook = new Hook(args, name);
        hook.constructor = SyncHook;
        hook.tapAsync = TAP_ASYNC;
        hook.tapPromise = TAP_PROMISE;
        hook.compile = COMPILE;
        return hook;
    }
}

SyncHook.prototype = null;

module.exports = SyncHook;
module.exports = { SyncHook2 };


/*
这里我们补充了 SyncHook 函数的基础逻辑，在使用时我们清楚通过 new SyncHook 来实例化 Hook 对象。
所以这里当我们进行 new SyncHook 时

首先通过 new Hook(args, name) 创建了基础的 hook 实例对象。

同步的 hook 是不存在 tapAsync 和 tapPromise 方法的，所以这里给 hook 对象这两个方法分别赋予对应的错误函数。

返回 hook 实例对象，并且将 SyncHook 的原型置为 null。

此时我们通过 new SyncHook([1,2]) 时就会返回对应的 hook 实例对象。


*/