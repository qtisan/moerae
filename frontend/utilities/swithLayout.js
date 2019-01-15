
import ManageLayout from '../components/layout/ManageLayout';
import WebsiteLayout from '../components/layout/WebsiteLayout';
import DefaultLayout from '../components/layout/DefaultLayout';

export default function switchLayout(router) {
  const { pathname } = router;
  if (pathname.indexOf('/manage/') == 0) {
    return ManageLayout;
  } else if (pathname.indexOf('/website/') == 0 || pathname === '/') {
    return WebsiteLayout;
  } else {
    return DefaultLayout;
  }
}