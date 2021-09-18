import { simpleCookie } from "./simple-cookie";
import { getUspByName } from "./url-search-params";

interface FacebookCookieObject {
  creationTime: number;
  subdomainIndex: number;
  payload: string;
}

const set = () => {
  const currTime = new Date().getTime();

  const fbclid = getUspByName('fbclid');
  if (fbclid) {
    const fbcIsUpToDate = simpleCookie.hasItem('_fbc') && simpleCookie.getItem('_fbc').includes(fbclid);
    if (!fbcIsUpToDate) packAndSetCookie('_fbc', fbclid, currTime);
  }

  if (!simpleCookie.hasItem('_fbp')) {
    const browserId = `${Math.round(2147483647 * Math.random())}`; // code taken from <pixel_id>.js
    packAndSetCookie('_fbp', browserId, currTime);
  }
}

const packAndSetCookie = (name: string, payload: string, currTime: number) => {
  const end = new Date(currTime + 90 * 24 * 60 * 60 * 1e3); // 90d (time taken from fbevents.js)
  const c: FacebookCookieObject = {
    creationTime: currTime,
    subdomainIndex: null,
    payload,
  };

  const hostname = window.location.hostname;
  const hostnameParts = hostname.split('.');
  for (let i = 0; i < hostnameParts.length; i++) {
    const f = hostnameParts.slice(hostnameParts.length - 1 - i).join('.');
    c.subdomainIndex = i;
    simpleCookie.setItem(name, packCookie(c), end, '/', f === 'localhost' ? null : `.${f}`);
  }
};

// also called pack in fbevents.js
const packCookie = (cookie: FacebookCookieObject) => ['fb', cookie.subdomainIndex, cookie.creationTime, cookie.payload].join('.');

export default set;
