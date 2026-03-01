'use client';

import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function ChallengesSection() {
  return (
    <section id="challenges" className="section-padding relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10 space-y-3"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] text-teal-300 text-xs font-semibold uppercase tracking-wider border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            Why NeuralCare
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.2]">
            Care without <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">compromise</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
            We replace the bottlenecks between patients and the help they deserve.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <motion.div variants={item} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="group">
              <div className="h-full bg-white/[0.04] backdrop-blur-lg rounded-xl p-4 sm:p-5 shadow-lg shadow-black/10 border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.12]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">No more long waits</h3>
                    <p className="text-slate-500 text-xs">From 48 days down to instant access</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-rose-500/[0.06] rounded-lg px-3 py-2 border border-rose-500/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] text-slate-500 line-through">Traditional: 48 days</span>
                      <span className="text-[9px] text-teal-400 font-semibold">With AI: &lt;2 min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex-1">
                          <div className={`w-full h-1.5 rounded-full ${i <= 5 ? 'bg-gradient-to-r from-teal-400 to-emerald-400' : 'bg-white/[0.06]'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/[0.04] rounded-lg px-3 py-2 border border-white/[0.06]">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <svg className="w-3 h-3 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                      <span className="text-[9px] text-slate-300 font-medium">Complete history maintained</span>
                    </div>
                    <div className="space-y-1">
                      {[
                        { date: 'Jan 15', note: 'Initial screening completed' },
                        { date: 'Feb 02', note: 'Follow-up — mood improved' },
                        { date: 'Mar 01', note: 'Next session reminder sent' },
                      ].map((r) => (
                        <div key={r.date} className="flex items-center gap-2">
                          <span className="text-[8px] text-slate-600 w-9 shrink-0">{r.date}</span>
                          <div className="w-1 h-1 rounded-full bg-teal-400/60 shrink-0" />
                          <span className="text-[8px] text-slate-400 truncate">{r.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="group">
              <div className="h-full bg-white/[0.04] backdrop-blur-lg rounded-xl p-4 sm:p-5 shadow-lg shadow-black/10 border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.12]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">AI-powered care insights</h3>
                    <p className="text-slate-500 text-xs">Analyze records, suggest next steps</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-violet-500/[0.06] rounded-lg px-3 py-2 border border-violet-500/10">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <svg className="w-3 h-3 text-violet-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                      <span className="text-[9px] text-violet-300 font-medium">AI Recommendation</span>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-relaxed">Based on 3 sessions, patient shows improvement in anxiety (GAD-7: 14→9). Suggest transitioning to bi-weekly CBT.</p>
                  </div>
                  <div className="bg-white/[0.04] rounded-lg px-3 py-2 border border-white/[0.06]">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <svg className="w-3 h-3 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
                      <span className="text-[9px] text-slate-300 font-medium">Smart Reminders</span>
                    </div>
                    <div className="space-y-1">
                      {[
                        { text: 'Follow-up with Dr. Patel — Mar 5', color: 'text-teal-400' },
                        { text: 'Medication review due — Mar 8', color: 'text-amber-400' },
                        { text: 'Wellness check-in — Mar 12', color: 'text-blue-400' },
                      ].map((r) => (
                        <div key={r.text} className="flex items-center gap-1.5">
                          <div className={`w-1 h-1 rounded-full ${r.color} shrink-0`} />
                          <span className="text-[8px] text-slate-400">{r.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={item} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <div className="relative overflow-hidden rounded-xl bg-teal-500/[0.08] backdrop-blur-lg p-4 sm:p-5 border border-teal-500/20 shadow-lg shadow-teal-500/10 transition-all duration-300 hover:bg-teal-500/[0.12]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-400/[0.06] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-teal-200 text-sm">Smarter care, less effort</h3>
                    <p className="text-teal-300/60 text-xs">AI remembers, analyzes, and reminds — so nothing falls through</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-1 sm:justify-end">
                  {[
                    { value: '100%', label: 'Records kept' },
                    { value: 'Auto', label: 'Reminders' },
                    { value: 'AI', label: 'Care plans' },
                  ].map((m) => (
                    <div key={m.label} className="flex-1 sm:flex-initial sm:w-24 bg-teal-400/[0.08] rounded-lg px-2.5 py-1.5 text-center border border-teal-400/10">
                      <p className="text-sm font-bold text-teal-200">{m.value}</p>
                      <p className="text-[8px] text-teal-300/50">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
