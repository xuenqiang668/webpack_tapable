const { SyncWaterfallHook } = require('tapable')


// init SyncHook
const hook = new SyncWaterfallHook(['arg1', 'arg2', 'arg3'])

hook.tap('flag1', (arg1, arg2, arg3) => {
    console.log('flag1', arg1, arg2, arg3);
    return 'xeq'
})

hook.tap('flag2', (arg1, arg2, arg3) => {
    console.log('flag2', arg1, arg2, arg3);
    return 'hello'
})

hook.tap('flag3', (arg1, arg2, arg3) => {
    console.log('flag3', arg1, arg2, arg3);
})



hook.call('test1', 'test2', 'test3')

