import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Accept","xc-auth"],
}));

// ---- DIAGNOSTIC: see what the server actually receives
app.use((req, _res, next) => {
  console.log(req.method, req.originalUrl);  // e.g. POST /api/inft3050/login
  next();
});

// ===== 1) DEFINE LOGIN/LOGOUT FIRST (unguarded) =====
const ADMIN_USER = "adminAccount";
const ADMIN_PASS = "adminPW";
const JWT_SECRET = "dev-secret";

app.post("/api/inft3050/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "2h" });
  res.cookie("sid", token, {
    httpOnly: true,
    sameSite: "None",
    secure: false,            // set true if using HTTPS
    maxAge: 2 * 60 * 60 * 1000,
  });
  res.json({ ok: true });
});

app.post("/api/inft3050/logout", (req, res) => {
  res.clearCookie("sid", { httpOnly: true, sameSite: "None", secure: false });
  res.json({ ok: true });
});

// ===== 2) SHORT-CIRCUIT OPTIONS (preflight) =====
app.use((req, res, next) => {
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// ===== 3) AUTH GUARD FOR EVERYTHING AFTER THIS POINT =====
function requireAuth(req, res, next) {
  const token = req.cookies?.sid;
  if (!token) return res.status(401).json({ error: "Forbidden: authentication required" });
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Forbidden: authentication required" });
  }
}
app.use("/api/inft3050", (req, res, next) => {
  // If you somehow call /api/inft3050/login again down here, skip guard
  const p = req.originalUrl.toLowerCase();
  if (p.startsWith("/api/inft3050/login") || p.startsWith("/api/inft3050/logout")) return next();
  return requireAuth(req, res, next);
});

// ===== 4) PROTECTED ROUTES BELOW =====
app.get("/api/inft3050/patrons", (req, res) => {
  res.json({ list: [{ Email: "user@example.com" }] });
});

app.listen(3001, () => console.log("API on http://localhost:3001"));
