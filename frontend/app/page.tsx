"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Trend {
  id: string;
  tag: string;
  category: string;
  count: number;
  source: string;
}

export default function Home() {
  const [trends, setTrends] = useState<Trend[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/trends")
      .then((res) => res.json())
      .then((data) => setTrends(data));
  }, []);

  const sorted = [...trends].sort((a, b) => b.count - a.count);

  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <header className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">⚡ TechTrendly</h1>
        <nav className="flex gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">Languages</Link>
          <Link href="/" className="hover:text-white">Jobs</Link>
          <Link href="/" className="hover:text-white">Domains</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="text-center py-20 px-4">
        <h2 className="text-5xl font-bold mb-4">
          Track What's <span className="text-blue-500">Trending</span> in Tech
        </h2>
        <p className="text-gray-400 text-lg">
          Real-time trends for jobs, languages, domains & technologies
        </p>
      </section>

      {/* Live Rankings */}
      <section className="max-w-3xl mx-auto px-8 pb-20">
        <h3 className="text-2xl font-semibold mb-6">🔥 Live Language Rankings</h3>
        <div className="flex flex-col gap-3">
          {sorted.map((trend, index) => (
            <div key={trend.id} className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 flex items-center justify-between hover:border-blue-500 transition">
              <div className="flex items-center gap-4">
                <span className="text-gray-500 w-6">#{index + 1}</span>
                <span className="font-semibold capitalize">{trend.tag}</span>
              </div>
              <div className="flex items-center gap-4">
                {/* Progress bar */}
                <div className="w-40 bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(trend.count / sorted[0]?.count) * 100}%` }}
                  />
                </div>
                <span className="text-gray-400 text-sm w-20 text-right">
                  {trend.count.toLocaleString()} repos
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
