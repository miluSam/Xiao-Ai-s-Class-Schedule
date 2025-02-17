async function scheduleHtmlProvider() {
    try {
        const url = 'http://202.114.190.75/student/courseSelect/thisSemesterCurriculum/ajaxStudentSchedule/callback';

        // 发起请求
        const res = await fetch(url, {
            method: "GET",
            headers: {
                accept: "*/*",
                "x-requested-with": "XMLHttpRequest"
            }
        });
        console.log('请求发出');

        // 检查响应状态
        if (!res.ok) {
            const errorText = await res.text();  // 读取错误信息
            console.error('请求失败，状态码:', res.status, errorText);
            throw new Error(`网络请求失败，状态码: ${res.status}`);
        }

        // 解析响应内容
        const data = await res.json();

        // 返回数据或处理
        if (data.xkxx && data.xkxx.length > 0) {
            return JSON.stringify(data.xkxx);  // 如果有课程，返回 JSON 字符串
        } else {
            console.warn('课程列表为空');
            return JSON.stringify([]);  // 如果没有课程，返回空数组的 JSON 字符串
        }
    } catch (error) {
        console.error('发生错误:', error);
        return JSON.stringify([]);  // 错误时返回空数组
    }
}

async function callScheduleProvider() {
    const result = await scheduleHtmlProvider();
}

