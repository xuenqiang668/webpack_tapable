// SyncBailHook 中如果任何事件函数存在返回值，那么会立即中断后续事件函数的调用：

const { SyncBailHook } = require('tapable')

// init SyncHook
const hook = new SyncBailHook(['arg1', 'arg2', 'arg3'])

hook.tap('flag1', (arg1, arg2, arg3) => {
    console.log('flag1', arg1, arg2, arg3);
    return true
})

hook.tap('flag2', (arg1, arg2, arg3) => {
    console.log('flag2', arg1, arg2, arg3);
})


hook.call('test1', 'test2', 'test3')

