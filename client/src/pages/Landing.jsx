import { Sparkles, ArrowRight, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6 font-medium">
          <Sparkles size={16} /> 2026 Hackathon Winner
        </div>
        <h1 className="text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Stop Guessing. <span className="text-blue-600">Start Pivoting.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          PivotPoint AI analyzes your past experience and maps out the exact
          30-day path to your dream career in tech.
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center gap-2 mx-auto w-fit"
        >
          Get Started for Free <ArrowRight size={20} />
        </Link>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-6 py-20 bg-slate-50">
        <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
          <Zap className="text-blue-600 mb-4" />
          <h3 className="font-bold text-xl mb-2">Instant Roadmap</h3>
          <p className="text-slate-600 text-sm">
            Get a week-by-week guide to your transition immediately.
          </p>
        </div>
        <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
          <Shield className="text-blue-600 mb-4" />
          <h3 className="font-bold text-xl mb-2">Skill Gap Analysis</h3>
          <p className="text-slate-600 text-sm">
            We identify exactly what you're missing and what you already have.
          </p>
        </div>
        <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
          <Sparkles className="text-blue-600 mb-4" />
          <h3 className="font-bold text-xl mb-2">Salary Insights</h3>
          <p className="text-slate-600 text-sm">
            See the financial potential of your move before you make it.
          </p>
        </div>
      </section>
    </div>
  );
}
