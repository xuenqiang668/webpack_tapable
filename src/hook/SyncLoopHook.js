const { SyncLoopHook } = require('tapable')
// SyncLoopHook 会在任意一个被监听的函数存在非 undefined 返回值时返回重头开始执行：

// init SyncHook
const hook = new SyncLoopHook(['arg1', 'arg2', 'arg3'])

hook.tap('flag1', (arg1, arg2, arg3) => {
    console.log('flag1', arg1, arg2, arg3);
    let flag = undefined
    if(Math.random() * 10 < 5) flag = 'flag'
    else flag = undefined
    return flag
})

hook.tap('flag2', (arg1, arg2, arg3) => {
    console.log('flag2', arg1, arg2, arg3);
    return undefined
})

hook.tap('flag3', (arg1, arg2, arg3) => {
    console.log('flag3', arg1, arg2, arg3);
    return undefined
})



hook.call('test1', 'test2', 'test3')