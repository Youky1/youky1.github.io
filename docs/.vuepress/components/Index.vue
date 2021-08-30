<template>
    <main>
        <div id="slogan">
            <p class="bigSlogan">{{slogan.big}}</p>
            <p class="littleSlogan">{{slogan.little}}</p>
        </div>
        <div id="btnContainer">
            <button round type="primary" style="margin-right:10vw;" class="size" @click="goBlog">
                <span class="iconfont iconboke"></span>
                Blog
            </button>
            <button round type="primary" class="size" @click="goCV">
                <span class="iconfont iconjianli1"></span>
                CV
            </button>
        </div>
    </main>
</template>

<script>
export default {
    data(){
        return {
            slogan:{
                big:'諦めない人は何も変えられない',
                little:'什么都无法放弃的人，什么都改变不了'
            }
        }
    },
    methods:{
        goBlog(){
            window.location.href += 'article/'
        },
        goCV(){
            window.location.href += 'CV'
        },
    }
}
</script>

<style lang="stylus" scoped>
// @media screen and (min-width:960px)
    main
        height mainHeight 
        #slogan
            height 60vh
            padding-top 10vh
            display flex
            justify-content center
            align-items center
            flex-direction column
            .bigSlogan
                font-size 80px
                margin-bottom 50px
            .littleSlogan
                font-size 40px
                margin 50px
        #btnContainer
            height 20vh
            width 100vw
            display flex
            justify-content center
            align-items center
            button
                height 60px
                width 140px
                background-color #409EFF
                color #fff
                border-radius 10px
                font-size 18px
                font-family Tahoma
</style>