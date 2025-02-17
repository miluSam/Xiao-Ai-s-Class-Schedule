function scheduleHtmlParser(json_str) {
    try {
        const data = JSON.parse(json_str);
        // 由于 data 是数组，直接使用 data[0]
        const coursesData = data[0];
        let allCourseInfo = [];

        // 遍历 coursesData 对象中的每个课程
        for (let courseKey in coursesData) {
            const courses = coursesData[courseKey];
            const courseTeacher = courses.attendClassTeacher.slice(0, 25); // 限制教师名称长度为 50 字节

            // 遍历课程所有上课时间安排
            courses.timeAndPlaceList.forEach(function (content) {
                // 调试信息：输出当前处理的课程对象
                console.log('当前处理的课程对象:', content);

                // 获取课程名称，优先使用 content.courseName，如果不存在则使用 courses.courseName
                const courseName = (content.courseName || courses.courseName || '').slice(0, 25);

                let courseObj = {
                    name: courseName,
                    position: (content.campusName + content.teachingBuildingName + content.classroomName).slice(0, 25), // 限制上课地点长度为 50 字节
                    teacher: courseTeacher,
                    weeks: [],
                    day: Math.min(7, Math.max(1, content.classDay)), // 确保星期在 [1, 7] 之间
                    sections: []
                };

                // 处理上课周期
                const courseWeekOri = content.classWeek.slice();
                for (let i = 1; i <= content.classWeek.length; i++) {
                    if (courseWeekOri[i - 1] === '1' && i >= 1 && i <= 30) {
                        courseObj.weeks.push(i); // 确保周数在 [1, 30] 之间
                    }
                }

                // 处理上课时间段
                const startSections = content.classSessions;
                const continuingSections = content.continuingSession;
                for (let i = 0; i < continuingSections; i++) {
                    const section = startSections + i;
                    if (section >= 1 && section <= 30) {
                        courseObj.sections.push(section); // 确保节次在 [1, 30] 之间
                    }
                }

                allCourseInfo.push(courseObj);
            });
        }

        return allCourseInfo;
    } catch (error) {
        console.error('解析 JSON 数据时出错:', error);
        return [];
    }
}