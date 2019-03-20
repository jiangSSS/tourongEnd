<template>
  <div>
    <p class="project_title">
      <span class="project_">已关注的标签</span>
    </p>
    <div class="babel_list">
      <span v-for="(item, index) in followLabel" :key="index" class="babel_btn" :class="(item.industryName.length > 2 ) + (item.isFollow == 0 ? ' nolike' : ' like')">{{item.industryName}}</span>
    </div>
    <p class="project_title">
      <span class="project_">请选择感兴趣的标签</span>
      <span class="project_more flr" @click="followAll" :checked="checked">
        <label class="my_protocol">
          <input class="input_agreement_protocol" type="checkbox">
          <span></span>
        </label>
        全选
      </span>
    </p>
    <div class="babel_list">
      <span v-for="(item, index) in labelData" :key="index" class="babel_btn" :class="(item.industryName.length > 2 ) + (item.isFollow == 0 ? ' nolike' : ' like')"
        @click="babelFollow(item.industryValue,index)">{{item.industryName}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelData: [],
        followLabel: [],
        checked: false,
      };
    },
    methods: {
      babelFollow(industryValue, index) {
        this.checked = false
        if (this.labelData[index].isFollow == '0') {
          this.$axios.get('/jsp/wap/center/do/doFollowIndustry.jsp', { params: { industryValue } }).then(res => {
            console.log("1111",res)
            this.labelData[index].isFollow = '1'
            this.followLabel.push(this.labelData[index])
          })
        } else {
          this.$axios.get('/jsp/wap/center/do/doUnfollowIndustry.jsp', { params: { industryValue } }).then(res => {
            console.log('222',res)
            this.labelData[index].isFollow = '0'
            this.followLabel.remove(this.labelData[index])
          })
        }
      },
      followAll(e) {
        this.checked = e.target.checked
        if (this.checked) {
          var industry = []
          this.labelData.forEach(item => {
            industry.push(item.industryValue)
          })
          var industryValue = industry.join(',')
          this.$axios.get('/jsp/wap/center/do/doFollowIndustry.jsp', { params: { industryValue } }).then(res => {

            this.labelData.forEach(item => {
              item.isFollow = '1'
            })
            this.followLabel = []
            this.labelData.forEach(item => {
              if (item.isFollow == '1') {
                this.followLabel.push(item)
              }
            })
          })
        }
      },
      getData() {
        this.$axios.get('/jsp/wap/center/ctrl/jsonIndustry.jsp').then(res => {
          console.log(res)
          var label = res.data
          label.forEach(item => {
            if (item.isFollow == '1') {
              this.followLabel.push(item)
            } 
          })
          this.labelData = res.data
        })
      },
      searchLabel(labelId) {
        let { href } = this.$router.resolve({
          name: "searchLabelMoney",
          query: { labelId }
        });
        window.open(href, "_blank");
      },
    },
    created() {
      this.getData()
    }
  };
</script>

<style scoped lang="scss">
  .project_title {
    margin-top: .4rem;
    font-size: .36rem;
    font-family: "Microsoft YaHei";
    color: rgb(0, 83, 133);
    font-weight: bold;
    padding-bottom: .2rem; // border-bottom: 1px dashed #cdcdcd;
    .project_ {
      padding-left: .3rem; // border-left: .1rem solid #005982;
    }
    .project_more {
      font-size: .28rem;
      font-family: "Microsoft YaHei";
      color: rgb(153, 153, 153);
      margin-right: .3rem
    }
  }

  /*隐藏掉我们模型的checkbox*/

  // .my_protocol .input_agreement_protocol {
  //   appearance: none;
  //   -webkit-appearance: none;
  //   outline: none;
  //   display: none;
  // }
  // /*未选中时*/
  // .my_protocol .input_agreement_protocol + span {
  //   width: .32rem;
  //   height: .32rem;
  //   background-color: #fff;
  //   display: inline-block;
  //   background-size: contain;
  //   position: relative;
  //   top: 3px;
  // }
  // /*选中checkbox时,修改背景图片的位置*/
  // .my_protocol .input_agreement_protocol:checked + span {
  //   background-size: contain;
  // }
  .babel_list {
    width: 7.5rem;
    padding: 0 .3rem;

    .babel_btn {
      margin-bottom: .3rem;
      margin-right: .22rem;

    }
  }

  .nolike {
    width: 1.5rem;
    height: .7rem;
    line-height: .7rem;
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    transition: 0.1s;
    font-weight: 500;
    border-radius: 4%;
    color: #999;
    background: #fff;
    border: 1.5px solid #999;
    border-color: #dcdfe6;
  }

  .like {
    width: 1.5rem;
    height: .7rem;
    line-height: .7rem;
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    transition: 0.1s;
    font-weight: 500;
    border-radius: 4%;
    color: #005982;
    background: #fff;
    border: 1.5px solid #999;
    border-color: #005982;
  }
</style>