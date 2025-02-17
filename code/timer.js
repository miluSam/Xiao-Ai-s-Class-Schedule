async function scheduleTimer({
  providerRes,
  parserRes
} = {}) {
  // 支持异步操作 推荐await写法

  // 这是一个示例函数，用于演示，正常用不到可以删掉
  const someAsyncFunc = () => new Promise(resolve => {
    setTimeout(() => resolve(), 1)
  })
  await someAsyncFunc();

  // 生成开学时间的时间戳
  const startDate = new Date(2025, 1, 17); // 假设开学时间是 2025 年 2 月 17 日
  const startSemester = startDate.getTime().toString().padEnd(13, '0');

  // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
  return {
    totalWeek: 20, // 总周数：[1, 30]之间的整数
    startSemester: startSemester, // 开学时间：时间戳，13位长度字符串，推荐用代码生成
    startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
    showWeekend: true, // 是否显示周末
    forenoon: 4, // 上午课程节数：[1, 10]之间的整数
    afternoon: 4, // 下午课程节数：[0, 10]之间的整数
    night: 2, // 晚间课程节数：[0, 10]之间的整数
    sections: [
      {
        section: 1, // 节次：[1, 30]之间的整数
        startTime: '08:20', // 开始时间：参照这个标准格式5位长度字符串
        endTime: '09:05' // 结束时间：同上
      },
      {
        section: 2, // 节次：[1, 30]之间的整数
        startTime: '09:10', // 开始时间：参照这个标准格式5位长度字符串
        endTime: '09:55' // 结束时间：同上
      },
      {
        section: 3, // 节次：[1, 30]之间的整数
        startTime: '10:15', // 开始时间：参照这个标准格式5位长度字符串
        endTime: '11:00' // 结束时间：同上
      },
      {
        section: 4, // 节次：[1, 30]之间的整数
        startTime: '11:05', // 开始时间：参照这个标准格式5位长度字符串
        endTime: '11:50' // 结束时间：同上
      },
      {
        section: 5, // 节次：[1, 30]之间的整数
        startTime: '14:00', // 开始时间：参照这个标准格式5位长度字符串
        endTime: '14:45' // 结束时间：同上
      },
      {
        section: 6, // 节次：[1, 30]之间的整数
        startTime: '14:50', // 开始时间：参照这个标准格式5位长度字符串
        endTime: '15:35' // 结束时间：同上
      },
      {
        section: 7, // 节次：[1, 30]之间的整数
        startTime: '15:55', // 开始时间：参照这个标准格式5位长度字符串
        endTime: '16:40' // 结束时间：同上
      },
      {
        section: 8, // 节次：[1, 30]之间的整数
        startTime: '16:45', // 开始时间：参照这个标准格式5位长度字符串
        endTime: '17:30' // 结束时间：同上
      },
      {
        section: 9, // 节次：[1, 30]之间的整数
        startTime: '18:30', // 开始时间：参照这个标准格式5位长度字符串
        endTime: '19:15' // 结束时间：同上
      },
      {
        section: 10, // 节次：[1, 30]之间的整数
        startTime: '19:20', // 开始时间：参照这个标准格式5位长度字符串
        endTime: '20:05' // 结束时间：同上
      }
    ] // 课程时间表，注意：总长度要和上边配置的节数加和对齐
  };
  // PS: 夏令时什么的还是让用户在夏令时的时候重新导入一遍吧，在这个函数里边适配吧！奥里给！————不愿意透露姓名的嘤某人
}