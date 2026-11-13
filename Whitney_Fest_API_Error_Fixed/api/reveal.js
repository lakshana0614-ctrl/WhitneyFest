const {valid}=require('./_auth');
const {IDS,readReveals,writeReveals}=require('./_reveal_store');
module.exports=async (req,res)=>{
 res.setHeader('Cache-Control','private, no-store');
 if(!valid(req))return res.status(401).json({error:'Lakshana Mode login required.'});
 if(req.method!=='GET' && req.method!=='POST')return res.status(405).json({error:'Method not allowed.'});
 try {
  if(req.method==='GET')return res.status(200).json({revealed:await readReveals()});
  let body=req.body;
  if(typeof body==='string'){try{body=JSON.parse(body)}catch{return res.status(400).json({error:'Invalid JSON.'})}}
  if(!body || typeof body!=='object')return res.status(400).json({error:'Invalid update.'});
  const day=body.day;
  if(day!=='all' && !IDS.includes(day))return res.status(400).json({error:'Unknown day.'});
  if(typeof body.revealed!=='boolean')return res.status(400).json({error:'Must provide true or false.'});
  const state=await readReveals();
  if(day==='all')for(const id of IDS)state[id]=body.revealed;
  else state[day]=body.revealed;
  return res.status(200).json({revealed:await writeReveals(state)});
 }catch(err){return res.status(503).json({error:err.message||'Reveal storage unavailable.'})}
};
