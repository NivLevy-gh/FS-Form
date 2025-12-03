import { useState } from "react";

export default function Form() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("✅ handleSubmit RAN with:", { name, message });

    try {
      const res = await fetch("http://localhost:5001/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      console.log("✅ fetch returned Response object:", res);

      const data = await res.json();
      console.log("✅ backend JSON:", data);

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}