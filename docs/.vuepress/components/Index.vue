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
    main
        height 100vh
        p
            color #fff

// PC端
@media screen and (min-width:640px)
    main
        background-image url('../public/bg.jpg')
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
@media screen and (max-width:640px) 
    main
        background-image url('../public/bg_phone.jpg')
    #slogan
        height 60vh
        padding-top 10vh
        display flex
        justify-content space-around
        align-items center
        flex-direction column
        .bigSlogan
            font-size 24px
            margin-bottom 50px
            word-wrap break-word/*英文的时候需要加上这句，自动换行*/
            word-break break-all
        .littleSlogan
            font-size 20px
            margin 50px
            width 200px
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