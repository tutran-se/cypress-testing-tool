// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { email } = req.body;
  if (email === "exist@gmail.com") {
    return res.status(401).json({ error: "Email already exists" });
  }

  res.status(200).json({ ok: true });
}
