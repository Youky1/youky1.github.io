<template>
    <div id="container">
            <aside>
                <img src="../public/author.jpg" id="avatar" @click="goMain">
                <p class="medium">Youky</p>
                <div class="medium">
                    <span style="margin-right:2px">{{age}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span style="margin-left:2px">♂</span>
                </div>
                <div class="line" v-for="item in info" :key="item.icon">
                    <div class="left">
                        <span :class="'iconfont ' + item.icon"></span>
                    </div>
                    <a target="_blank" v-if="item.href" :href="item.href">{{item.content}}</a>
                    <span v-else class="little">{{item.content}}</span>
                </div>
                <div class="progressBox">
                    <span>Undergraduate</span>
                    <el-progress type="circle" :percentage="underGraduate"></el-progress>
                </div>
                <div class="progressBox">
                    <span>Postgraduate</span>
                    <el-progress type="circle" :percentage="0"></el-progress>
                </div>
            </aside>
            <main>
                <div v-for="item in cv" :key="item.title">
                    <h2 class="title">
                        <span :class="'iconfont ' + item.icon"></span> {{item.title}}
                    </h2>
                    <ul>
                        <li v-for="li in item.list" :key="li[0]">
                            <div class="flexBox">
                                <div>{{li[0]}}</div>
                                <div>{{li[1]}}</div>
                                <div>{{li[2]}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </main>
    </div>
</template>

<script>
export default {
    data(){
        return{
            info:[
                {
                    icon:'icondidian',
                    content:'WHUT'
                },
                {
                    icon:'iconyouxiang',
                    content:'youkyf@qq.com'
                },
                {
                    icon:'icongithub',
                    content:'GitHub',
                    href:'https://github.com/Youky1'
                },
                {
                    icon:'iconzhihu-circle-fill',
                    content:'知乎',
                    href:'https://www.zhihu.com/people/feng-yong-qi-76'
                }
            ],
            cv:[
                {
                    title:'Education',
                    icon:'iconjiaoyuweidianji',
                    list:[
                        [
                            '武汉理工大学',
                            '计算机科学与技术',
                            '2018 - 2022',
                        ]
                    ],
                },
                {
                    title:'Awards and achievement',
                    icon:'iconkeyan',
                    list:[
                        [
                            '全国大学生交通运输科技大赛',
                            '国家一等奖',
                            '2020.11'
                        ],
                        [
                            '中国大学生计算机设计大赛',
                            '中南赛区一等奖',
                            '2020.7'
                        ],
                        [
                            '国家级大学生创新训练计划',
                            '负责人',
                            '2020 - 2021'
                        ],
                        [
                            '软件著作权',
                            '两项',
                            '2020 - 2021'
                        ],
                    ],
                },
                {
                    title:'Intern experience',
                    icon:'iconshixi',
                    list:[
                        [
                            '阿里巴巴-阿里云',
                            '前端开发',
                            '2021.7 - 2021.8'
                        ]
                    ],
                },
                {
                    title:'Programming skills',
                    icon:'iconbiancheng',
                    list:[
                        ['HTML/CSS/JavsScript'],
                        ['Node/TS'],
                        ['Vue/React'],
                        ['Java'],
                        ['Python'],
                    ],
                },
                {
                    title:'Club experience',
                    icon:'iconshetuanhuodong',
                    list:[
                        ['计算机学院辩论队','','2018-2020'],
                        ['WHUT开源技术协会','前端组组长','2019-2021'],
                        ['Token技术协会','技术部','2020-2021'],
                    ]
                },
                
            ]
        }
    },
    computed:{
        age(){     
            var returnAge;
            var birthYear = 1999;
            var birthMonth = 11;
            var birthDay = 18;

            const d = new Date();
            var nowYear = d.getFullYear();
            var nowMonth = d.getMonth() + 1;
            var nowDay = d.getDate();

            if(nowYear == birthYear){
                returnAge = 0;//同年 则为0岁
            }
            else{
                var ageDiff = nowYear - birthYear ; //年之差
                if(ageDiff > 0){
                    if(nowMonth == birthMonth) {
                        var dayDiff = nowDay - birthDay;//日之差
                        if(dayDiff < 0)
                        {
                            returnAge = ageDiff - 1;
                        }
                        else
                        {
                            returnAge = ageDiff ;
                        }
                    }
                    else
                    {
                        var monthDiff = nowMonth - birthMonth;//月之差
                        if(monthDiff < 0)
                        {
                            returnAge = ageDiff - 1;
                        }
                        else
                        {
                            returnAge = ageDiff ;
                        }
                    }
                }
                else
                {
                    returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
                }
            }
            return returnAge;//返回周岁年龄
        },

        // 本科进度条
        underGraduate(){
            const now = new Date();
            const start = new Date('2018-09-08');
            const end = new Date('2022-6-10');
            return Number((100 * (now - start) / (end - start)).toFixed(2));
        }
    },
    methods:{
        goMain(){
            window.location.href = '/';
        },
    }
}
</script>

<style lang="stylus" scoped>
@import '//at.alicdn.com/t/font_2467617_eyw27qqkkpd.css';
flex(x = center, y = center)
    display flex
    justify-content x
    align-items y

display
#container
    height 100vh
    display flex
    aside
        width 20vw
        height 100%
        background-color #8EE5EE
        flex(flex-start)
        flex-direction column
        >>> .el-divider
            background-color #000
        #avatar
            height 100px
            border-radius 50px
            margin-top 10px
            margin-bottom 10px
            &:hover
                cursor pointer
        .medium
            font-size 18px
            margin-bottom 10px
        .little
            font-size 14px
            
        .line
            width 16vw
            margin 10px 0
            display flex
            .left
                width 40px
            a
                text-decoration none
                color #777
        .progressBox
            width 100%
            flex(space-around,center)
            margin-bottom 20px
    main
        width 80vw
        height 100%
        overflow-y scroll
        .title
            background-color #F0F8FF
            margin-bottom 10px
            padding-left 20px
            font-family '宋体'
            color #333
            span
                font-size 24px
        ul 
            list-style-position inside
            margin-left 30px
            margin-bottom 30px
            li
                height 40px
                width 72vw
                font-size 18px
                list-style-position outside 
                .flexBox
                    width 100%
                    flex()
                div
                    width 24vw
</style>