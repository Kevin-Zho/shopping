<template>
<div class='myfooter'>
    <div class="wrap">
        <p>

        <span>Region</span>
        <select name="" id="">
            <option value="">USA</option>
            <option value="">CHINA</option>
        </select>
        </p>
        <p>Copyright © 2017 IMooc All Rights Reserved . About Us  Terns & Conditions Privacy Policy</p>
    </div> 
</div>
</template>

<script>
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
methods: {

}
}
</script>
<style lang='less' scoped>
.myfooter{
    border-top: 1px solid #ccc;
    color: #bbb;
    padding: 50px;
    .wrap{
        width: 1300px;
        margin: 0 auto;
        display: flex;
        justify-content:space-between;
    }
}

</style>