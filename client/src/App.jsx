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
        {/* Replace the old {result && ...} block with this */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
            {/* Impact Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-100 font-medium">
                    Estimated Annual Income Increase
                  </p>
                  <h3 className="text-4xl font-bold">
                    {result.salary_delta || "+$18,500"}
                  </h3>
                </div>
                <TrendingUp className="w-12 h-12 text-blue-200 opacity-50" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Skills Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <GraduationCap className="text-blue-600" /> Transferable
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.transferable_skills?.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Briefcase className="text-amber-600" /> Gap to Close
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.missing_skills?.map((skill) => (
                    <span
                      key={skill}
                      className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium border border-amber-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Roadmap Section */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 uppercase tracking-wider text-sm">
                Your 30-Day Transition Sprint
              </h3>
              <div className="space-y-6">
                {result.roadmap?.map((step) => (
                  <div key={step.week} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {step.week}
                      </div>
                      {step.week !== 4 && (
                        <div className="w-0.5 h-full bg-slate-100 my-1"></div>
                      )}
                    </div>
                    <div className="pb-4">
                      <h4 className="font-bold text-slate-800">
                        Week {step.week}: {step.focus}
                      </h4>
                      <p className="text-slate-600 text-sm">{step.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
