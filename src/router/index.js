import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/views/home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/views/login/login.vue"),
      meta: {
        title: "登录"
      }
    },
    {
      path: '/project',
      name: 'project',
      component: () => import("@/views/project/index.vue"),
      meta: {
        title: "融资项目",
        keepAlive: true
      }
    },
    {
      path: '/news',
      name: 'news',
      component: () => import("@/views/news/index.vue"),
      meta: {
        title: "资讯列表",
        keepAlive: true
      }
    },
		{
		  path: '/cooperation',
		  name: 'cooperation',
		  component: () => import("@/views/cooperation/index.vue"),
		  meta: {
		    title: "合作机构",
		    keepAlive: true
		  }
		},
		{
		  path: '/cooperation_info',
		  name: 'cooperation_info',
		  component: () => import("@/views/cooperation_info/index.vue"),
		  meta: {
		    title: "合作机构详情",
		    keepAlive: true
		  }
		},
    {
      path: '/money',
      name: 'money',
      component: () => import("@/views/money/index.vue"),
      meta: {
        title: "投资信息列表",
        keepAlive: true
      },
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import("@/views/activity/index.vue"),
      meta: {
        title: "会议活动",
        keepAlive: true
      }
    },
    {
      path: '/actComments',
      name: 'actComments',
      component: () => import("@/views/activity/comments.vue"),
      meta: {
        title: "发表评论",
      }
    },
    {
      path: '/activityComments',
      name: 'activityComments',
      component: () => import("@/views/activity/activityComment.vue"),
      meta: {
        title: "评论列表",
      }
    },
    {
      path: '/comments',
      name: 'comments',
      component: () => import("@/views/news/comments.vue"),
      meta: {
        title: "发表评论"
      }
    },
    {
      path: '/project/projectDetail',
      name: 'projectDetail',
      component: () => import("@/views/project/projectDetail.vue"),
      meta: {
        title: "项目介绍"
      }
    },
    {
      path: '/issueProject',
      name: 'issueProject',
      component: () => import("@/views/project/issueProject.vue"),
      meta: {
        title: "发布项目"
      }
    },
    {
      path: '/issueMoney',
      name: 'issueMoney',
      component: () => import("@/views/money/issueMoney.vue"),
      meta: {
        title: "发布资金"
      }
    },
    {
      path: '/message',
      name: 'message',
      redirect:"/message/sysMessage",
      component: () => import("@/views/message/index.vue"),
      meta: {
        title: "我的消息"
      },
      children:[
        {
          path: 'sysMessage',
          name: 'sysMessage',
          component: () => import("@/views/message/sysMessage.vue"),
        },
        {
          path: 'stateMoney',
          name: 'stateMoney',
          component: () => import("@/views/message/stateMoney.vue"),
        },
        {
          path: 'projectProgress',
          name: 'projectProgress',
          component: () => import("@/views/message/projectProgress.vue"),
        },
        {
          path: 'sysMessage',
          name: 'sysMessage',
          component: () => import("@/views/message/sysMessage.vue"),
        },
      ]
    },
    {
      path: '/money/moneyDetail',
      name: 'moneyDetail',
      component: () => import("@/views/money/moneyDetail.vue"),
      meta: {
        title: "投资信息详情"
      }
    },
    {
      path: '/mayMoney',
      name: 'mayMoney',
      component: () => import("@/views/money/mayMoney.vue"),
      meta: {
        title: "可能感兴趣的项目"
      }
    },
    {
      path: '/projectProgress',
      name: 'progress',
      component: () => import("@/views/money/progress.vue"),
      meta: {
        title: "项目进展"
      }
    },
    {
      path: '/money/investors',
      name: 'investors',
      component: () => import("@/views/money/investors.vue"),
      meta: {
        title: "投资人详情"
      }
    },
    {
      path: '/money/moreMoney',
      name: 'moreMoney',
      component: () => import("@/views/money/moreMoney.vue"),
      meta: {
        title: "更多资金"
      }
    },
    {
      path: '/project/moreProject',
      name: 'moreProject',
      component: () => import("@/views/project/moreProject.vue"),
      meta: {
        title: "更多项目"
      }
    },
    {
      path: '/project/mayProject',
      name: 'mayProject',
      component: () => import("@/views/project/mayProject.vue"),
      meta: {
        title: "更多项目"
      }
    },
    {
      path: '/project/investors',
      name: 'projectInvestors',
      component: () => import("@/views/project/investors.vue"),
      meta: {
        title: "投资人详情"
      }
    },
    {
      path: '/my',
      name: 'my',
      component: () => import("@/views/my/index.vue"),
      // meta: {
      //   title: "个人中心"
      // }
    },
    {
      path: '/fastNews',
      name: 'fastNews',
      component: () => import("@/views/my/fastNews/index.vue"),
      meta: {
        title: "及时快报"
      }
    },
    {
      path: '/vip',
      name: 'vip',
      component: () => import("@/views/my/vip.vue"),
      meta: {
        title: "会员"
      }
    },
    {
      path: '/activityDetail',
      name: 'activityDetail',
      component: () => import("@/views/activity/activityDetail.vue"),
      meta: {
        title: "活动详情"
      }
    },
    {
      path: '/news/newsDetail',
      name: 'newsDetail',
      component: () => import("@/views/news/newsDetail.vue"),
      meta: {
        title: "资讯详情"
      }
    },
    {
      path: '/news/newsComment',
      name: 'comment',
      component: () => import("@/views/news/newsComment.vue"),
      meta: {
        title: "评论列表"
      }
    },
    {
      path: '/sendProject',
      name: 'sendProject',
      component: () => import("@/views/money/sendProject.vue"),
      meta: {
        title: "投递项目"
      }
    },
    {
      path: "/weekList",
      name: "weekList",
      component: () => import("@/views/my/weekList.vue"),
      meta: {
        title: "周报列表"
      }
    },
    {
      path: "/weekDetail",
      name: "weekDetail",
      component: () => import("@/views/my/weekDetail.vue"),
      meta: {
        title: "周报详情"
      }
    },
    {
      path: "/center",
      name: "center",
      component: () => import("@/views/my/memberCenter.vue"),
      meta: {
        title: "会员权益中心"
      }
    },
    {
      path: "/member",
      name: "member",
      component: () => import("@/views/my/member.vue"),
      meta: {
        title: "会员认证"
      }
    },
    {
      path: "/myFocus",
      name: "myFocus",
      redirect: "/myFocus/focusProject",
      component: () => import("@/views/my/myFocus/index.vue"),
      meta: {
        title: "我的关注"
      },
      children: [
        {
          path: "focusMoney",
          name: "focusMoney",
          component: () => import("@/views/my/myFocus/focusMoney.vue"),
          meta: {
            title: "我的关注"
          },
        },
        {
          path: "focusProject",
          name: "focusProject",
          component: () => import("@/views/my/myFocus/focusProject.vue"),
          meta: {
            title: "我的关注"
          },
        },
        {
          path: "focusActivity",
          name: "focusActivity",
          component: () => import("@/views/my/myFocus/focusActivity.vue"),
          meta: {
            title: "我的关注"
          },
        },
        {
          path: "label",
          name: "label",
          component: () => import("@/views//my/myFocus/label.vue"),
          meta: {
            title: "我的关注"
          },
        }
      ]
    },
    {
      path: "/myProject",
      name: "myProject",
      component: () => import("@/views/my/myProject/myProject.vue"),
      meta: {
        title: "我的项目"
      }
    },
    {
      path: "/projectDeliver",
      name: "projectDeliver",
      component: () => import("@/views/my/myProject/sendProject.vue"),
      meta: {
        title: "项目约谈"
      }
    },
    {
      path: "/sendMoney",
      name: "sendMoney",
      component: () => import("@/views/my/myMoney/sendMoney.vue"),
      meta: {
        title: "资金投递"
      }
    },
    {
      path: "/manageProject",
      name: "manageProject",
      component: () => import("@/views/my/myProject/manageProject.vue"),
      meta: {
        title: "项目进展"
      }
    },
    {
      path: "/uploadMoney",
      name: "uploadMoney",
      component: () => import("@/views/my/mymoney/uploadMoney.vue"),
      meta: {
        title: "快速上传资金"
      }
    },
    {
      path: "/uploadProject",
      name: "uploadproject",
      component: () => import("@/views/my/myProject/uploadProject.vue"),
      meta: {
        title: "快速上传项目"
      }
    },
    {
      path: "/manageMoney",
      name: "manageMoney",
      component: () => import("@/views/my/myMoney/manageMoney.vue"),
      meta: {
        title: "资金动态"
      }
    },
    {
      path: "/addManageMoney",
      name: "addManageMoney",
      component: () => import("@/views/my/myMoney/addManageMoney.vue"),
      meta: {
        title: "添加动态"
      }
    },
    {
      path: "/addManageProject",
      name: "addManageProject",
      component: () => import("@/views/my/myProject/addManageProject.vue"),
      meta: {
        title: "添加进展"
      }
    },
    {
      path: "/myMoney",
      name: "myMoney",
      component: () => import("@/views/my/myMoney/myMoney.vue"),
      meta: {
        title: "我的资金"
      }
    },
    {
      path: "/myactivity",
      name: "myactivity",
      component: () => import("@/views/my/myactivity.vue"),
      meta: {
        title: "我的活动"
      }
    },
    {
      path: "/setting",
      name: "setting",
      component: () => import("@/views/my/setting/setting.vue"),
      meta: {
        title: "系统设置"
      }
    },
    {
      path: "/demand",
      name: "demand",
      redirect:"/demand/demanda",
      component: () => import("@/views/my/demand/index.vue"),
      meta: {
        title: "需求填报"
      },
      children:[
        {
          path: "demanda",
          name: "demanda",
          component: () => import("@/views/my/demand/demand.vue"),
        },
        {
          path: "recommend",
          name: "recommend",
          component: () => import("@/views/my/demand/recommend.vue"),
        },
        {
          path: "other",
          name: "other",
          component: () => import("@/views/my/demand/other.vue"),
        },
        {
          path: "lookDemand",
          name: "lookDemand",
          component: () => import("@/views/my/demand/lookDemand.vue"),
        },
      ]
    },
    {
      path: "/service",
      name: "service",
      component: () => import("@/views/my/service.vue"),
      meta: {
        title: "在线客服"
      }
    },
    {
      path: "/callMe",
      name: "callMe",
      component: () => import("@/views/my/setting/callMe.vue"),
      meta: {
        title: "联系我们"
      }
    },
    {
      path: "/aboutUs",
      name: "aboutUs",
      component: () => import("@/views/my/setting/aboutApp.vue"),
      meta: {
        title: "关于我们"
      }
    },
    {
      path: "/userInfo",
      name: "userInfo",
      component: () => import("@/views/my/userInfo.vue"),
      meta: {
        title: "会员信息"
      }
    },
    {
      path: "/agreement",
      name: "agreement",
      component: () => import("@/views/login/desc.vue"),
      meta:{
        title:"服务协议"
      }
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/search/index.vue"),
      meta:{
        title:"搜索列表"
      },
      children:[
        {
          path: "searchProject",
          name: "searchProject",
          component: () => import("@/views/search/searchProject.vue"),
          meta:{
            title:"搜索列表"
          }
        },
        {
          path: "searchMoney",
          name: "searchMoney",
          component: () => import("@/views/search/searchMoney.vue"),
          meta:{
            title:"搜索列表"
          }
        },
        {
          path: "searchNews",
          name: "searchNews",
          component: () => import("@/views/search/searchNews.vue"),
          meta:{
            title:"搜索列表"
          }
        },
        {
          path: "searchActivity",
          name: "searchActivity",
          component: () => import("@/views/search/searchActivity.vue"),
          meta:{
            title:"搜索列表"
          }
        },
        {
          path: "labelProject",
          name: "labelProject",
          component: () => import("@/views/search/labelProject.vue"),
          meta:{
            title:"搜索列表"
          }
        },
        {
          path: "labelMoney",
          name: "labelMoney",
          component: () => import("@/views/search/labelMoney.vue"),
          meta:{
            title:"搜索列表"
          }
        },
      ]
    },
    {
      path: "/searchList",
      name: "searchList",
      component: () => import("@/views/search/search.vue"),
      // meta:{
      //   title:"搜索活动"
      // }
    },
  ],

})

// router.beforeEach((to, from, next) => {
//   const toDepth = to.path.split('/').length
//   const fromDepth = from.path.split('/').length
//   if (toDepth < fromDepth) {
//     console.log("back")
//     from.meta.keepAlive = false
//     to.meta.keepAlive = true
//   }
//   next()
// })


// router.beforeEach((to, from, next) => {
//   const toDepth = to.path.substring(to.path.length - 2, to.path.length)
//   const fromDepth = from.path.substring(from.path.length - 2, from.path.length)
//   if (toDepth < fromDepth) {
//     // 有tab界面时需要添加此判断 from的KeepAlive不需要置为false
//     // if (from.path !== '/Dtab1_04' && from.path !== '/Dtab2_04') {
//     from.meta.keepAlive = true
//     // }
//     to.meta.keepAlive = false
//   }
//   next()
// })

// router.beforeEach((to, from, next) => {
//   const toDepth = to.path.split('/').length
//   const fromDepth = from.path.split('/').length
//   if (toDepth < fromDepth) {
//     console.log('后退。。。')
//     from.meta.keepAlive = false
//     to.meta.keepAlive = true
//   }
//   next()
// })

let routerList = []
router.beforeEach((to, from, next) => {
    if (routerList.length && routerList.indexOf(to.name) === routerList.length - 1) {
      // 后退
      routerList.splice(routerList.length - 1, 1)
      to.meta.isBack = true
    } else {
      // 前进
      routerList.push(from.name || '/')
      to.meta.isBack = false
    }
    next()
})

// ------------------------------------------
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
// router.beforeEach((to, from, next) => {
//   window.document.title = to.meta.title;
//   next()
// })
export default router

