import { createRouter, createWebHashHistory } from "vue-router";
import Login from "~/pages/login.vue";
import Signup from "~/pages/signUp.vue";
import Admin from "~/layouts/admin.vue";
import NotFound from "~/pages/404.vue";
import Index from "~/pages/index.vue";
import WordDirection from "~/pages/word/list.vue";
import WordList from "~/pages/word/wordList.vue"
import Sentencedictation from "~/pages/sentence/list.vue";
import Chat from "~/pages/chat/chat.vue";
import Song from "~/pages/song/song.vue";
import UserInfo from "~/pages/setting/UserInfo.vue";
import Novel from "~/pages/novel/novel.vue";
import NovelMain from "~/pages/novel/novelMain.vue"
import NovelDirectory from "~/pages/novel/novelDirectory.vue"
import NovelReader from "~/pages/novel/novelReader.vue"
const routes = [
  {
    path: "/",
    component: Admin,
    // 子路由
    children: [
      {
        path: "/l",
        component: Index,
        meta: {
          title: "后台首页",
        },
      },
      {
        path: "/worddictation",
        component: WordDirection,
        meta: {
          title: "单词听写",
        },
      },
      {
        path: "/wordList",
        component: WordList,
        meta: {
          title: "单词听写",
        },
      },
      {
        path: "/sentencedictation/:id",
        props: true,
        component: Sentencedictation,
        meta: {
          title: "句子听写",
        },
      },
      {
        path: "/chat",
        component: Chat,
        meta: {
          title: "Chat Room",
        },
      },
      {
        path: "/shortStory",
        component: Novel,
        meta: {
          title: "Story",
        },
        children:[
          {
            path: "main",
            component: NovelMain,
            meta: {
              title: "Story",
            },
          },
          {
            path: "directory/:id",
            component: NovelDirectory,
            props: true,
            meta: {
              title: "Directory",
            },
          },
]
      },

      {
        path: "/songs",
        component: Song,
        meta: {
          title: "Song",
        },
      },
      {
        path: "/userInfo",
        component: UserInfo,
        meta: {
          title: "Setting",
        },
      },

      {
        path: "/signup",
        component: Signup,
        meta: {
          title: "注册页",
        },
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登录页",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path:"/read/book/:bookId/chapter/:chapterId",
    component: NovelReader,
    props: true,
    meta: {
      title: "Read",
    },
  }
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//默认路由
