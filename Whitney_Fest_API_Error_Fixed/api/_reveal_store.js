const KEY = 'whitneyfest:reveal:v1';
const IDS = ['thursday','friday','saturday','sunday'];
function config() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error('Reveal storage not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in Vercel.');
  if (!url.startsWith('https://')) throw new Error('Invalid Redis endpoint.');
  return {url:url.replace(/\/$/,''),token};
}
async function command(args) {
  const {url,token}=config();
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),5000);
  try {
    const r=await fetch(url,{method:'POST',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(args),signal:controller.signal});
    if (!r.ok) throw new Error('Reveal storage request failed ('+r.status+').');
    const out=await r.json();
    if (out.error) throw new Error('Reveal storage returned an error.');
    return out.result;
  } finally {clearTimeout(timeout)}
}
function normalize(value) {
  const out=Object.fromEntries(IDS.map(id=>[id,false]));
  if (value && typeof value==='object') for(const id of IDS) out[id]=value[id]===true;
  return out;
}
async function readReveals(){
  const raw=await command(['GET',KEY]);
  try{return normalize(raw ? JSON.parse(raw):null)}catch{return normalize(null)}
}
async function writeReveals(value){
  const safe=normalize(value);
  await command(['SET',KEY,JSON.stringify(safe)]);
  return safe;
}
module.exports={IDS,readReveals,writeReveals};
