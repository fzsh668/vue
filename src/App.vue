<template>
  <div id="app" @click="isDo()">
    <router-view/>
  </div>
</template>

<script>
export default {
 data(){
   return{
     lastTime: null, //最后一次点击的时间
     currentTime: null, //当前点击的时间
     timeOut: 10*60*1000, //设置超时时间： 10分钟
   }

 },
  created(){
    this.lastTime = new Date().getTime();
  },
  methods:{
    isDo() {
      this.currentTime = new Date().getTime(); //记录这次点击的时间
      if (this.currentTime - this.lastTime > this.timeOut) {
        //判断上次最后一次点击的时间和这次点击的时间间隔是否大于30分钟
        // 登录状态过期后，清空本地PC端和mobile端缓存信息
        localStorage.removeItem("user");
      } else {
        this.lastTime = new Date().getTime(); //如果在30分钟内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
      }
    },
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,body,#app{
  height: 100%;
}
p,h1,h2,h3,h4,h5{
  margin: 0;
  padding: 0;
  color: rgba(146, 142, 142,1);
}
</style>
