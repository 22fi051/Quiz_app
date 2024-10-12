import Image from "next/image";
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
      <div className="bg-white p-8 rounded-lg text-center text-black shadow-lg">
        <Image
          src={`/images/program-${id}.png`}
          width={300}
          height={300}
          alt={quiz.title}
          className="mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
        <p className="mb-6">{quiz.description}</p>
        <Link href={`/quiz/${id}/question/0`} className="inline-block">
          <div className="px-6 py-3 border border-indigo-700 text-indigo-700 font-semibold rounded hover:bg-indigo-700 hover:text-white transition">
            クイズを開始
          </div>
        </Link>
      </div>
    </div>
  );
}