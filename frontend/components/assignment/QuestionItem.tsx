export default function QuestionItem({ q, index }: any) {
  const color =
    q.difficulty === "easy"
      ? "text-green-600"
      : q.difficulty === "medium"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="mb-2">
      <p className="text-sm">
        {index + 1}. [{q.difficulty}] {q.text} ({q.marks} Marks)
      </p>
    </div>
  );
}