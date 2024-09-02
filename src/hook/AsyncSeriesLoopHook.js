const { AsyncSeriesLoopHook } = require('tapable')
// SyncLoopHook 会在任意一个被监听的函数存在非 undefined 返回值时返回重头开始执行：

// init SyncHook
const hook = new AsyncSeriesLoopHook(['arg1', 'arg2', 'arg3'])

hook.tap('flag1', (arg1, arg2, arg3) => {
    console.log('flag1', arg1, arg2, arg3);
    if(Math.random() * 10 < 5) return '2222xeq'
})

hook.tap('flag2', (arg1, arg2, arg3) => {
    console.log('flag2', arg1, arg2, arg3);
})

hook.tap('flag3', (arg1, arg2, arg3) => {
    console.log('flag3', arg1, arg2, arg3);
    if(Math.random() * 10 < 5) return '2222xeq'
})



hook.callAsync('test1', 'test2', 'test3', () => {
    console.log('done');
})