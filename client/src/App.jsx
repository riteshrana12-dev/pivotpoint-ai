import React, { useState } from "react";
import {
  Briefcase,
  GraduationCap,
  TrendingUp,
  Sparkles,
  Loader2,
} from "lucide-react";

function App() {
  const [resume, setResume] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume) return alert("Please paste a resume first!");

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_text: resume,
          job_description: "General Technical Role", // We can expand this later
        }),
      });
      const resData = await response.json();
      setResult(resData.data);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert(
        "Backend not responding. Make sure your FastAPI server is running!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-800">
              PivotPoint AI
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Paste Experience
          </label>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none mb-4"
            placeholder="Paste your resume or job history here..."
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Generate My Pivot Plan"
            )}
          </button>
        </div>

        {/* Display Results if they exist */}
        {result && (
          <div className="bg-white p-8 rounded-2xl border-2 border-blue-100 shadow-xl animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="text-blue-600" /> Your 30-Day Roadmap
            </h2>
            <pre className="whitespace-pre-wrap bg-slate-50 p-4 rounded-lg text-sm text-slate-700">
              {typeof result === "string"
                ? result
                : JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
