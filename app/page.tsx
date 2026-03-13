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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="url"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="p-2 border rounded text-black"
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded">
          Shorten
        </button>
      </form>
      {shortUrl && (
        <div className="mt-8">
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" className="text-blue-500 underline">
            {shortUrl}
          </a>
        </div>
      )}
    </main>
  );
}