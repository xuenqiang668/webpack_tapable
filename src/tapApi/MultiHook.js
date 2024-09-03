const { MultiHook, SyncHook, } = require('tapable');
// HookMap 本质上就是一个辅助类，通过 HookMap 我们可以更好的管理 Hook ：

// 创建HookMap实例
const keyedHook = new MultiHook([new SyncHook(['arg','arg2']), new SyncHook(['arg'])], 'MultiHookName');

// 在keyedHook中创建一个name为key1的hook，同时为该hook通过tap注册事件 
keyedHook.tap('Plugin 1', (arg) => {
    console.log('Plugin 1', arg);
});

// 在keyedHook中创建一个name为key2的hook，同时为该hook通过tap注册事件
keyedHook.tap('Plugin 2', (arg) => {
    console.log('Plugin 2', arg);
});



console.log(keyedHook);
keyedHook.hooks.map(h => h.call('222', 222))