import Link from "next/link";

export default async function QuizListPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quiz`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("APIエラーが発生しました");
  }
  const quizzes = await res.json();

  return (
    <div>
      <div
        className="bg-cover bg-center h-96 flex items-center justify-center"
        style={{ backgroundImage: "url('/images/code.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50 h-96"></div>
        <h1 className="text-4xl font-bold text-white text-shadow relative">
          ようこそ Programming Quizへ
        </h1>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mt-6 text-white">クイズ一覧</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {quizzes.map((quiz) => (
            <Link key={quiz.id} href={`/quiz/${quiz.id}`} className="block">
                <div className="bg-white rounded overflow-hidden shadow hover:shadow-lg transition duration-300 transform hover:scale-105">
                  <div className="relative h-64 p-4">
                    <img
                      src={`/images/program-${quiz.id}.png`}
                      alt={quiz.title}
                      className="object-contain w-full h-full"
                    />
                    <div className="absolute inset-0"></div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600">{quiz.title}</p>
                  </div>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
