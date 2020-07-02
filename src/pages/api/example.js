// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({ code: 0, data: { count: 10 }, msg: '' });
};
