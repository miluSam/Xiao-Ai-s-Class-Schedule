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
  await loadTool('AIScheduleTools')
  const startDate = await AISchedulePrompt({
    titleText: '开学时间',
    tipText: '请输入(更改)本学年开学时间，格式为 20XX,X,XX',
    defaultText: '2025,2,17',
    validator: value => {
        // 检查输入是否符合 20XX,X,XX 格式
        const regex = /^20\d{2},\d{1,2},\d{1,2}$/;
        if (!regex.test(value)) {
            return '请输入正确的日期格式，如 20XX,X,XX';
        }

        // 解析输入的日期
        const [year, month, day] = value.split(',').map(Number);

        // 检查日期的有效性
        const date = new Date(year, month - 1, day);
        if (isNaN(date.getTime()) || date.getFullYear()!== year || date.getMonth()!== month - 1 || date.getDate()!== day) {
            return '请输入有效的日期';
        }

        // 检查年份范围
        if (year < 2000 || year > 2100) {
            return '请输入 2000 到 2100 之间的年份';
        }

        return false;
    }
});

  let startDateObj;
  // 后续处理
  if (startDate) {
    const [year, month, day] = startDate.split(',').map(Number);
    startDateObj = new Date(year, month - 1, day);
    console.log('用户输入的开学时间:', startDateObj);
  } else {
    console.log('用户未输入有效的开学时间');
    // 可以根据实际情况进行处理，这里简单使用默认日期
    startDateObj = new Date(2025, 1, 17);
  }

  // 生成开学时间的时间戳
  const startSemester = startDateObj.getTime().toString().padEnd(13, '0');

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