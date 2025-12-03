require('dotenv').config();     // MUST be first

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

app.use(express.json());
app.use(cors());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.get('/', (req, res) => {
  res.send("Backend is running");
});

app.post('/submit', async (req, res) => { 
  console.log("Received:", req.body);

  const { name, message } = req.body;

  try {
    const { data, error } = await supabase
      .from('hello')
      .insert([{ name, message }])
      .select();

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return res.status(500).json({ status: "error", message: error.message });
    }

    console.log("✅ Saved to Supabase:", data);
    res.json({ status: "ok", saved: data });

  } catch (err) {
    console.error("🔥 Unexpected server error:", err);
    res.status(500).json({ status: "error", message: "Server crashed" });
  }
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});