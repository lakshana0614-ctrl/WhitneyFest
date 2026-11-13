module.exports = (req,res) => {
  res.setHeader('Cache-Control','no-store');
  res.status(200).json({
    ok:true,service:'Whitney Fest API',
    authenticationConfigured: Boolean(process.env.LAKSHANA_PASSWORD && process.env.WEEKEND_SESSION_SECRET),
    revealStorageConfigured: Boolean((process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) && (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN))
  });
};
