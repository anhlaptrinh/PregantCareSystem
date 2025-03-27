export const API_CONFIG = {
  BASE_URL: 'https://2baf-42-118-214-16.ngrok-free.app/api',
  ENDPOINTS: {
    BLOGS: {
      POSTS: '/blogs/posts',
      ARTICLES: '/blogs/articles',
      POST_DETAIL: (id) => `/blogs/post-detail/${id}`,
      ARTICLE_DETAIL: (slug) => `/blogs/article-detail/${slug}`,
      MY_POSTS: '/blogs/my-posts',
      ALL: '/blogs',
      CREATE: '/blogs',
      UPDATE: (id) => `/blogs/${id}`,
      DELETE: (id) => `/blogs/${id}`,
      TRASH: (id) => `/blogs/trash/${id}`,
      STATUS: (id) => `/blogs/status/${id}`,
      RESTORE: (id) => `/blogs/restoration/${id}`
    },
    USERS: {
      ALL: '/users',
      MY_INFO: '/users/my-info',
      EXPERTS: '/users/experts',
      EXPERT_DETAIL: (id) => `/users/experts/${id}`,
      UPDATE: (id) => `/users/${id}`,
      DELETE: (id) => `/users/${id}`
    },
    PACKAGES: {
      LIST: '/packages',
      DETAIL: (id) => `/packages/${id}`,
      CREATE: '/packages',
      UPDATE: (id) => `/packages/${id}`,
      DELETE: (id) => `/packages/${id}`
    },
    AUTH: {
      LOGIN: '/authentication/login',
      REGISTER: '/authentication/register',
      FORGOT_PASSWORD: '/authentication/forgot-password',
      CHANGE_PASSWORD: '/authentication/change-password',
      VERIFY: '/authentication/verification-code'
    },
    FETUS: {
      ALL: '/fetus',
      MY_FETUS: '/fetus/MyFetus',
      WHO_STANDARDS: '/fetus/Who',
      FETUS_WEEK: (id) => `/fetus/My-Fetus-Week/${id}`,
      CREATE: '/fetus',
      UPDATE: (id) => `/fetus/${id}`,
      DELETE: (id) => `/fetus/${id}`,
      GROWTH: {
        WEIGHT: (week) => `/fetal-growth/weight/${week}`,
        LENGTH: (week) => `/fetal-growth/length/${week}`,
        HEAD: (week) => `/fetal-growth/head-circumference/${week}`,
        COMPARE: '/fetal-growth/compare'
      },
      RECORDS: {
        GET: '/fetus-record/findById',
        STATS: '/fetus-record/Statistic/findById',
        CREATE: '/fetus-record',
        UPDATE: '/fetus-record',
        DELETE: (id) => `/fetus-record/${id}`
      }
    },
    GROUPS: {
      ALL: '/groups',
      MY_GROUPS: '/groups/my-groups',
      DETAIL: (id) => `/groups/${id}`,
      CREATE: '/groups',
      UPDATE: (id) => `/groups/${id}`,
      DELETE: (id) => `/groups/${id}`,
      REGISTER: (groupId) => `/groups/register/${groupId}`
    },
    COMMENTS: {
      ALL: (blogId) => `/blog-comments/${blogId}`,
      MY_COMMENTS: '/blog-comments/my-comments',
      CREATE: '/blog-comments',
      UPDATE: (id) => `/blog-comments/${id}`,
      DELETE: (id) => `/blog-comments/${id}`
    },
    DUE_DATE: {
      ULTRASOUND: '/due-date-calculator/ultrasound',
      LAST_PERIOD: '/due-date-calculator/last-period',
      IVF: '/due-date-calculator/ivf',
      FROM_DUE_DATE: '/due-date-calculator/from-due-date',
      CONCEPTION: '/due-date-calculator/conception-date'
    },
    APPOINTMENTS: {
      ALL: '/appointment',
      CREATE: '/appointment',
      UPDATE: '/appointment/event',
      DELETE: (id) => `/appointment/${id}`,
      SCHEDULE: {
        ALL: '/appointment/schedule',
        CREATE: '/appointment/schedule',
        UPDATE: '/appointment/schedule/edit-schedule',
        DELETE: (id) => `/appointment/schedule/${id}`,
        SEND_EMAILS: '/appointment/schedule/send-emails'
      }
    },
    ADVICES: {
      ALL: '/advices',
      MEMBER: '/advices/members',
      CREATE: '/advices',
      STATUS: (id) => `/advices/status/${id}`,
      DELETE: (id) => `/advices/${id}`
    },
    PAYMENT: {
      CREATE: '/paypal/create',
      SUCCESS: '/paypal/success',
      CANCEL: '/paypal/cancel'
    }
  }
};