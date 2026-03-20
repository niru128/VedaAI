export const parseAIResponse = (text: string) => {
  try {
    // 🔥 Extract JSON part only
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No JSON found");
    }

    const jsonString = text.slice(jsonStart, jsonEnd + 1);
    console.log("Extracted JSON string:", jsonString);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Raw AI response:", text);
    throw new Error("Invalid AI response");
  }
};