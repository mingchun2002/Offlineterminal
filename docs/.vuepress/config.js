module.exports = {
    title: '外业离线端',
    description: '外业离线端开发文档',
    port: 6066,
    base: '/Offlineterminal/',
    markdown: {
        toc: { includeLevel: [1, 2, 3] },
        lineNumbers: true
    },
    plugins: ['@vuepress/back-to-top'],
    // 主题配置
    themeConfig: {
        // 网站logo
        logo: '/logo.png',
        // 顶部导航栏
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/guide/' },
            { text: 'Electron文档', link: 'https://www.electronjs.org/docs' },
            { text: 'Vue文档', link: 'https://cn.vuejs.org/v2/guide/' },
            { text: 'View UI文档', link: 'https://www.iviewui.com/docs/guide/start' },
        ],
        activeHeaderLinks: false,
        sidebar: [{
            title: "指南",
            collapsable: false,
            children: [
                ['/guide/', '项目介绍'],
                ['/guide/Technical', '技术路线'],
                ['/guide/Standard', '开发规范'],
                ['/guide/Progress', '开发进度'],
                ['/guide/Issue', '问题反馈'],
                ['/guide/UpdateLog', '更新日志'],
            ]
        }, {
            title: "深入",
            collapsable: false,
            children: [
                ['/guide/Api', 'Api接口文档'],
            ]
        }, ]
    }
}