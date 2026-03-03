'use client';

export default function TestePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-10 text-white">
        Traffic OS &mdash; Diagnóstico de Sistema
      </h1>

      <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl p-8 flex items-center gap-5 mb-8 w-full max-w-md">
        <span className="relative flex h-4 w-4 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500" />
        </span>
        <span className="text-lg font-medium text-gray-100">
          Ambiente Local: <span className="text-green-400 font-semibold">Online</span>
        </span>
      </div>

      <button
        onClick={() => alert('O Claude tem permissão de escrita e o Next.js está rodando!')}
        className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors duration-150 text-white font-semibold px-8 py-3 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-950"
      >
        Testar Interatividade
      </button>
    </main>
  );
}
