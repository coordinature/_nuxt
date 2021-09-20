<template>
    <div class="container">
  <div class="leftbox">
    <nav>
      <a id="dashboard"><i class="fas fa-tachometer-alt"></i></a>
      <a id="profile"> <i class="fas fa-user"></i> </a>
      <a id="settings"> <i class="fas fa-cog"></i> </a>
      <a id="messages"> <i class="fas fa-comments"></i> </a>
      <a id="notification"> <i class="fas fa-bell"></i> </a>
    </nav>
  </div>
  <div class="rightbox">
    <div class="rb-container">
      <ul class="rb">
        <li class="rb-item" ng-repeat="itembx">
          <div class="timestamp">
            Oktober 2021
          </div>
          <div class="item-title">KPN Families only</div>
          <p class="tp">During this phase we are expecting to...</p>

        </li>
        <li class="rb-item" ng-repeat="itembx">
          <div class="timestamp">
            January 2022
          </div>
          <div class="item-title">Beta for pre-orders</div>
          <p class="tp">During this phase we are expecting to...</p>
        </li>

        <li class="rb-item" ng-repeat="itembx">
          <div class="timestamp">
            March 2022
          </div>
          <div class="item-title">Beta for public</div>
          <p class="tp">During this phase we are expecting to...</p>
        </li>

      </ul>

    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Timeline',

}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans&display=swap");



.container {
  background: #ffffff;
  width: 540px;
  height: 600px;
  margin: 0 auto;
  position: relative;
  margin-top: 10%;
  box-shadow: 2px 5px 20px rgba(119, 119, 119, 0.05);
}

.leftbox {
  top: -5%;
  left: 5%;
  position: absolute;
  width: 12%;
  height: 110%;
  background-color: #51BCA7;
  box-shadow: 3px 3px 15px rgba(119, 119, 119, 0.3);
}

nav {
  margin: 2.6em auto;
}

nav a {
  list-style: none;
  padding: 35px;
  color: #232931;
  font-size: 1.1em;
  display: block;
  transition: all 0.5s ease-in-out;
}

.rightbox {
  padding: 0em 34rem 0em 0em;
  height: 100%;
}

.rb-container {
  font-family: "PT Sans", sans-serif;
  width: 50%;
  margin: auto;
  display: block;
  position: relative;
}

.rb-container ul.rb {
  margin: 2.5em 0;
  padding: 0;
  display: inline-block;
}

.rb-container ul.rb li {
  list-style: none;
  margin: auto;
  margin-left: 10em;
  min-height: 50px;
  border-left: 1px dashed #4f5b66;
  padding: 0 0 50px 30px;
  position: relative;
}

.rb-container ul.rb li:last-child {
  border-left: 0;
}

.rb-container ul.rb li::before {
  position: absolute;
  left: -18px;
  top: -5px;
  content: " ";
  border: 8px solid #4f5b66;
  border-radius: 500%;
  background: #51BCA7;
  height: 20px;
  width: 20px;
  transition: all 500ms ease-in-out;
}

.rb-container ul.rb li:hover::before {
  border-color: #97a8b8;
  transition: all 1000ms ease-in-out;
}

ul.rb li .timestamp {
  color: #51BCA7;
  position: relative;
  width: 100px;
  font-size: 12px;
}

.item-title {
  color: #878d92;
}

.container-3 {
  width: 5em;
  vertical-align: right;
  white-space: nowrap;
  position: absolute;
}
.tp{
   font-size: 12px;
}

.container-3 .icon {
  margin: 1.3em 3em 0 31.5em;
  position: absolute;
  width: 150px;
  height: 30px;
  z-index: 1;
  color: #4f5b66;
}


</style>