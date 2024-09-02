const { AsyncParallelBailHook } = require('tapable');

// 初始化同步钩子
const hook = new AsyncParallelBailHook(['arg1', 'arg2', 'arg3']);

console.time('timer');

// 注册事件
hook.tapPromise('flag1', (arg1, arg2, arg3) => {
  return new Promise((resolve, reject) => {
    console.log('flag1 done:', arg1, arg2, arg3);
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
});

hook.tapAsync('flag2', (arg1, arg2, arg3, callback) => {
  setTimeout(() => {
    console.log('flag2 done:', arg1, arg2, arg3);
    callback();
  }, 3000);
});

hook.callAsync('19Qingfeng', 'wang', 'haoyu', () => {
  console.log('全部执行完毕 done');
  console.timeEnd('timer');
});

// 执行结果
// flag1 done: 19Qingfeng wang haoyu
// 全部执行完毕 done
// timer: 1.013s
// flag2 done: 19Qingfeng wang haoyu

