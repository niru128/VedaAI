import QuestionItem from "./QuestionItem";

export default function SectionBlock({ section }: any) {
  return (
    <div className="mt-6">
      
      <h3 className="text-center font-semibold">
        {section.title}
      </h3>

      <p className="text-sm text-center mb-3">
        Attempt all questions
      </p>

      {section.questions.map((q: any, i: number) => (
        <QuestionItem key={i} q={q} index={i} />
      ))}
    </div>
  );
}