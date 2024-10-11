import Link from "next/link";

export default async function QuizStartPage({ params }) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quiz/${id}`);
  if (!res.ok) {
    throw new Error("APIエラーが発生しました");
  }
  const quiz = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
      <p className="mb-6">{quiz.description}</p>
      <Link href={`/quiz/${id}/question/0`}>
        <h2 className="px-4 py-2 bg-blue-600 text-white rounded">クイズを開始</h2>
      </Link>
    </div>
  );
}