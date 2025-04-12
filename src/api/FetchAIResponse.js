export const fetchAIResponse = async (prompt, onStreamUpdate) => {
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: prompt,
        stream: true,
      }),
    });

    if (!response.body) throw new Error("Response body is null");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let completeResponse = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true }).trim(); // received chunk of data

      //division data by line
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (!line) continue; // remove empty lines

        try {
          const parsed = JSON.parse(line); //convert text to jason object
          if (parsed.response) {
            completeResponse += parsed.response; // add text to final response
            onStreamUpdate(completeResponse); //send to UI
          }
        } catch (err) {
          console.error("Error parsing chunk:", err, line);
        }
      }
    }

    return {
      id: Date.now(),
      text: completeResponse,
      sender: "ai",
    };
  } catch (e) {
    console.error("Error fetching AI response:", e);
    return {
      id: Date.now(),
      text: "Failed to get response from AI.",
      sender: "ai",
    };
  }
};

