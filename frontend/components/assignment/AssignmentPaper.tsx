import StudentInfo from "./StudentInfo";
import SectionBlock from "./SectionBlock";

export default function AssignmentPaper({ assignment }: any) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-yellow-400 h-350">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-lg font-bold">
          Delhi Public School, Sector-4, Bokaro
        </h1>
        <p>Subject: Science</p>
        <p>Class: 10</p>
      </div>

      {/* Meta */}
      <div className="flex justify-between mt-4 text-sm">
        <p>Time Allowed: 45 minutes</p>
        <p>Maximum Marks: 20</p>
      </div>

      <p className="text-sm mt-2">
        All questions are compulsory unless stated otherwise.
      </p>

      {/* Student Info */}
      <StudentInfo />

      {/* Sections */}
      {assignment.sections.map((section: any, i: number) => (
        <SectionBlock key={i} section={section} />
      ))}

    </div>
  );
}