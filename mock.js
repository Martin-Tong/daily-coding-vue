const Mock = require('mockjs') //eslint-disable-line
window.Mock = Mock

Mock.mock('/api/echarts-dataset-json', {
    'key|1-5': ['@integer(1,1000)']
})
