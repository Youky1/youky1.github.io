<template>
  <div id="bg" :style="bgColor">
    <a
      href="https://github.com/Youky1/Youky1.github.io"
      target="__blank"
      class="github"
    >
      <img
        src="https://cdn.staticaly.com/gh/Youky1/picture_bed@master/github.4wprxhzfbgg0.webp"
      />
    </a>
    <img src="../public/author.jpg" class="avatar" />
    <div class="info">
      <div v-for="(item, index) in infos" :key="item.text" style="display:flex">
        <div v-if="index !== 0" class="line"></div>
        <a :href="item.link" class="center">
          <img :src="item.icon" class="icon" />{{ item.text }}
        </a>
      </div>
    </div>
    <footer>
      <a
        v-for="item in links"
        :key="item.text"
        :href="item.url"
        class="center sites"
        target="__blank"
        >{{ item.text }}</a
      >
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infos: [
        {
          text: "博客",
          link: "/article",
          icon:
            "https://cdn.staticaly.com/gh/Youky1/picture_bed@master/blog.1tj45u2jz2dc.webp"
        },
        {
          text: "Timeline",
          link: "/timeline",
          icon:
            "https://cdn.staticaly.com/gh/Youky1/picture_bed@master/timeline.5359j2vsle00.webp"
        },
        {
          text: "分类",
          link: "/category",
          icon:
            "https://cdn.staticaly.com/gh/Youky1/picture_bed@master/category.1x5z2nsae8sg.webp"
        },
        {
          text: "Tag",
          link: "/tag",
          icon:
            "https://cdn.staticaly.com/gh/Youky1/picture_bed@master/tag.69lx28acdoo0.webp"
        }
      ],
      links: [
        { text: "GitHub", url: "https://github.com/Youky1" },
        { text: "知乎", url: "https://www.zhihu.com/people/feng-yong-qi-76" },
        { text: "掘金", url: "https://juejin.cn/user/3139860942306360" }
      ]
    };
  },
  computed: {
    bgColor() {
      return {
        background: `linear-gradient(to left bottom, hsl(${Math.floor(
          255 * Math.random()
        )}, 100%, 85%) 0%,hsl(${Math.floor(
          255 * Math.random()
        )}, 100%, 85%) 100%)`
      };
    }
  }
};
</script>

<style lang="stylus" scoped>
#bg
  height: 100vh
  display: flex
  align-items: center
  flex-direction: column
  .github
    position absolute
    top 0
    right 0
    img
      width: 40px
      height 40px
      &:hover
        cursor pointer

  .avatar
    margin-top 200px
    width: 140px
    height 140px
    border-radius: 70px
  .title
    font-size 50px
  .info
    display: flex
    margin-top: 40px
    .line
      margin 0 20px
  .center
    display: flex
    align-items: center
  .icon
    height 20px
    width 20px
    margin-right 4px
  footer
    position absolute
    bottom: 4vh
    display: flex
    .sites
      color: #fff
      margin: 0 10px
      text-align: center
      &:hover
        color #777
</style>
