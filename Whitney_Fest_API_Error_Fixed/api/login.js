const {sign,cookie,goodPassword}=require('./_auth');
module.exports=(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  let body=req.body;
  if(typeof body==='string'){try{body=JSON.parse(body)}catch(e){return res.status(400).json({error:'Invalid JSON request'})}}
  if(!goodPassword(body?.password))return res.status(401).json({error:'Incorrect password'});
  const exp=String(Date.now()+2*24*60*60*1000);
  res.setHeader('Set-Cookie',cookie(exp+'.'+sign(exp),172800));
  return res.status(200).json({ok:true});
};
