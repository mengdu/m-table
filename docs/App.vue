<template>
  <div id="app">
    <!-- <fork-link :repo="repo" /> -->
    <header>
      <!-- <img src="./assets/logo.png"> -->
      <h1 style="font-weight: 100">m-button 按钮组件</h1>
      <!-- <div style="margin-bottom: 50px;">
        <a :href="repo" target="_blank"><m-button type="info" size="large" round>Github</m-button></a>
        &nbsp;
        <a href="#button-zhi-chi-5-chong-zhu-ti-lei-xing"><m-button type="success" size="large" plain round>Example</m-button></a>
      </div> -->
    </header>
    <div style="width: 800px; margin: 100px auto">
      <m-table :data="data" stripe border>
        <m-table-column index label="编号" width="80px"></m-table-column>
        <m-table-column prop="name" label="名字"></m-table-column>
        <m-table-column prop="age" label="年龄"></m-table-column>
        <m-table-column prop="login" label="username"></m-table-column>
        <m-table-column label="操作">
          <template slot-scope="scope">
            <a href="#">{{scope.row.login}}</a>
            <a href="#">{{scope.row.login}}</a>
          </template>
        </m-table-column>
        <m-table-column :label="label">
          <template slot-scope="scope">
            <m-button type="info" size="mini" >信息</m-button>
          </template>
        </m-table-column>
      </m-table>
    </div>
    <!-- <main class="doc-block">
      <readme />
      <Doc/>
    </main> -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import LayoutFooter from './components/footer'
import ForkLink from './components/fork-link'
// import Readme from '~/README.md'
// import Doc from './doc.md'
import pkg from '~/package.json'

export default {
  name: 'App',
  components: {
    // Doc,
    // Readme,
    LayoutFooter,
    ForkLink
  },
  data () {
    return {
      pkg,
      label: 'test',
      data: [
        {name: '张三', age: 19, login: 'zhangsan'},
        {name: '李四', age: 18, login: 'lisi'},
        {name: '王五', age: 20, login: 'wangwu'},
        {name: '测试员', age: 21, login: 'ceshi'},
        {name: 'ADMIN', age: 22, login: 'TEST'},
        {name: 'TEST', age: 17, login: 'ADMIN'}
      ]
    }
  },
  computed: {
    repo () {
      return pkg.repository.url.replace(/git\+/, '')
    },
    html () {
      return <div>aaa</div>
    }
  },
  created () {
    window.label = this.label
  }
}
</script>

<style>
  body{
    padding: 0;
    margin: 0;
    color: #2c3e50;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #F6F6F6;
    font-size: 14px;
  }
  header {
    font-family: 'Cabin Sketch', 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    padding-top: 50px;
    padding-bottom: 15px;
    background: #f3f3f3;
  }
  main {
    margin: 0 auto;
    padding: 15px;
    max-width: 800px;
    margin-bottom: 100px;
    background: #fff;
  }
  blockquote {
    margin: 0;
    padding: 0.05em 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
    background: #f3f3f3;
  }
  a{
    color: #0366D6;
    text-decoration: none;
  }
  .hljs{
    background: #FAFAFA;
  }
  code {
    color: #ED4C6B;
    background-color: #F6F8FA;
    margin: 0 4px;
    display: inline-block;
    padding: 1px 5px;
    font-size: 12px;
    border-radius: 3px;
    line-height: 18px;
    font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
  }
  .doc-block table {
    border-collapse: collapse;
    width: 100%;
    background-color: #fff;
    font-size: 14px;
    margin-bottom: 45px;
    line-height: 1.5em;
    text-align: left;
  }
  .doc-block table td,
  .doc-block table th
  {
    border-bottom: 1px solid #d8d8d8;
    padding: 15px;
    max-width: 250px;
  }
</style>
