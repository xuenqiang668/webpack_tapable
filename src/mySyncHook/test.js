// SyncHook是最基础的同步钩子：

const { SyncHook2 } = require('./core/index')

// init SyncHook
const hook = new SyncHook2(['arg1', 'arg2', 'arg3'])

hook.tap('flag1', (arg1, arg2, arg3) => {
    console.log('flag1', arg1, arg2, arg3);
})

hook.tap({
    name: 'flag2',
    before: "flag1"
}, (arg1, arg2, arg3) => {
    console.log('flag2', arg1, arg2, arg3);
})


hook.call('test1', 'test2', 'test3')

// 再次添加一个tap事件函数
hook.tap('flag3', () => {
    console.log(3);
});


// 同时再次调用
hook.call('arg1', 'arg2');