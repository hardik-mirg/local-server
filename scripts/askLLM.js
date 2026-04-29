const askLLM = async (prompt) => {
    const res = await fetch(`http://localhost:${process.env.LLM_PORT}/completion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: prompt,
      n_predict: 32,
      temperature: 0.2,
      stop: ["\n", "}"]
    })
  });

  const data = await res.json();

  // llama.cpp usually returns: { content: "..." }
  let output = data.content || "";

  // If we stopped at "}", add it back (important for valid JSON)
  if (output.includes("{") && !output.trim().endsWith("}")) {
    output = output.trim() + "}";
  }

  return output.trim();
}

module.exports = askLLM