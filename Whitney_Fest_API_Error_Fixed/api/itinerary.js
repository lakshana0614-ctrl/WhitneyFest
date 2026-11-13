const data=require('./_data');
const {valid}=require('./_auth');
const {readReveals}=require('./_reveal_store');
module.exports=async(req,res)=>{
 res.setHeader('Cache-Control','private, no-store');
 if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
 const owner=valid(req);
 const day=data.days.find(x=>x.id===req.query.day)||data.days[0];
 let revealed=false;
 if(!owner){
   try{revealed=(await readReveals())[day.id]===true}
   catch(e){revealed=false;res.setHeader('X-Reveal-Storage','unavailable')}
 }
 const unlocked=owner||revealed;
 const sanitized=unlocked?day:{id:day.id,date:day.date,dow:day.dow,tag:day.tag,title:day.title,emoji:day.emoji};
 return res.status(200).json({owner,unlocked,day:sanitized,shopping:unlocked?data.shopping:[],activities:unlocked&&day.id==='sunday'?data.activities:[],dinners:unlocked&&day.id==='sunday'?data.dinners:[]});
};
