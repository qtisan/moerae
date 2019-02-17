
import cookie from 'js-cookie';

export default function (ctx) {
  ctx.setCookie = (name, value) => process.client ? cookie.set(name, value) : ctx.res.cookie(name, value);
  ctx.getCookie = name => process.client ? cookie.get(name) : ctx.req.cookies[name];

  // do something.
}
