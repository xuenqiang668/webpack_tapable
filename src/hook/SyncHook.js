// SyncHook是最基础的同步钩子：

const { SyncHook } = require('tapable')

// init SyncHook
const hook = new SyncHook(['arg1', 'arg2', 'arg3'])

hook.tap('flag1', (arg1, arg2, arg3) => {
    console.log('flag1', arg1, arg2, arg3);
})

hook.tap('flag2', (arg1, arg2, arg3) => {
    console.log('flag2', arg1, arg2, arg3);
})


hook.call('test1', 'test2', 'test3')

