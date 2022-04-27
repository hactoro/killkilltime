// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'MBTI',
    path: '/app',
    icon: getIcon('carbon:document-sentiment'),
  },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: getIcon('eva:people-fill'),
  // },
  {
    title: '퀴즈',
    path: '/products',
    icon: getIcon('ic:outline-quiz'),
  },
  {
    title: '이상형월드컵',
    path: '/Ideal',
    icon: getIcon('maki:racetrack'),
  },
  {
    title: '로그인',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: '가입',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  }
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
