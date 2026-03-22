export const parseAIResponse = (raw: string) => {
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found");

    const parsed = JSON.parse(jsonMatch[0]);

    if (!parsed.sections || parsed.sections.length === 0) {
      throw new Error("Empty sections");
    }

    return parsed;
  } catch (err) {
    console.log("❌ Parser failed, using fallback");

    return {
      sections: [
        {
          title: "Fallback Section",
          questions: [
            {
              text: "Sample question",
              difficulty: "easy",
              marks: 1,
            },
          ],
        },
      ],
    };
  }
};