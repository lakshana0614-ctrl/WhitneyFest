const crypto=require('crypto');
const SECRET=process.env.WEEKEND_SESSION_SECRET || '';
const PASSWORD=process.env.LAKSHANA_PASSWORD || '';
function sign(value){return crypto.createHmac('sha256',SECRET).update(value).digest('hex')}
function parseCookies(req){const out={};for(const pair of (req.headers.cookie||'').split(';')){const i=pair.indexOf('=');if(i>0)out[pair.slice(0,i).trim()]=pair.slice(i+1).trim()}return out}
function valid(req){let val=parseCookies(req)['lakshana_auth'];if(!val)return false;const [exp,sig]=val.split('.');if(!exp||!sig||!/^\d+$/.test(exp)||Number(exp)<Date.now())return false;const expected=sign(exp);const a=Buffer.from(sig,'hex'),b=Buffer.from(expected,'hex');return a.length===b.length&&crypto.timingSafeEqual(a,b)}
function cookie(value,maxAge){const secure=(process.env.VERCEL || process.env.NODE_ENV==='production')?'; Secure':'';return 'lakshana_auth='+value+'; Path=/; HttpOnly; SameSite=Lax'+secure+'; Max-Age='+maxAge}
function goodPassword(input){if(!PASSWORD||!SECRET)return false;const a=Buffer.from(String(input||''));const b=Buffer.from(PASSWORD);return a.length===b.length&&crypto.timingSafeEqual(a,b)}
module.exports={valid,sign,cookie,goodPassword};
