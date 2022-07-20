// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { email, password } = req.body;
  if (email !== "test@gmail.com") {
    return res.status(401).json({ error: "Invalid email" });
  }
  if (password !== "@Password123") {
    return res.status(401).json({ error: "Invalid password" });
  }
  res.status(200).json({ ok: true });
}
