"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: url }),
    });
    
    const data = await res.json();
    if (data.shortCode) {
      setShortUrl(`${window.location.origin}/${data.shortCode}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#0a0a0a] text-white">
      <h1 className="text-4xl font-bold mb-8">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-xl">
        <input
          type="url"
          placeholder="Paste your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="p-3 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
        <button type="submit" className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          Shorten
        </button>
      </form>
      
      {shortUrl && (
        <div className="mt-8 flex flex-col items-center w-full max-w-md p-4 bg-green-950/30 border border-green-900/50 rounded-xl">
          <p className="text-neutral-400 text-sm mb-2">Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noreferrer" className="text-green-400 font-semibold hover:underline text-lg">
            {shortUrl}
          </a>
        </div>
      )}
    </main>
  );
}