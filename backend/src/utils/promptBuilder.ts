export const buildPrompt = async (data: any) => {
  const { questionTypes, instructions } = data;

  let sections = "";

  questionTypes.forEach((q: any, index: number) => {
    sections += `Section ${String.fromCharCode(65 + index)}:-${q.count} ${q.type} questions - ${q.marks} marks each`;
  });

  return `Generate a question paper.
    
    ${sections}

    Instructions
    ${instructions || "None"}

    STRICT RULES:
- Output ONLY JSON
- No explanation
- No markdown
    {
         "sections": [
            {
                "title": "Section A",
                 "questions": [
                    {
                        "text": "Question text",
                        "difficulty": "easy | medium | hard",
                        "marks": number
                     }
                ]
            }
        ]
    }

    `;
};
