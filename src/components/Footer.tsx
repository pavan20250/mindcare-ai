export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">MindCare AI</h3>
            <p className="text-slate-400 text-sm">Intelligent automation. Personalized care.</p>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm">
            <a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#journey" className="text-slate-400 hover:text-white transition-colors">Journey</a>
            <a href="#benefits" className="text-slate-400 hover:text-white transition-colors">Benefits</a>
            <a href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} MindCare AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
