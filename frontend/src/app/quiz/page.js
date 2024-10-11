import Link from "next/link";

export default async function QuizListPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quiz`);
  if (!res.ok) {
    throw new Error("APIエラーが発生しました");
  }
  const quizzes = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">クイズ一覧</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="mb-4">
            <Link href={`/quiz/${quiz.id}`} className="block p-4 bg-white rounded shadow hover:bg-gray-100 transition">
              <h2 className="text-xl font-semibold">{quiz.title}</h2>
              <p className="text-gray-600 mt-2">{quiz.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
