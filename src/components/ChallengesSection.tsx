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

const challenges = [
  {
    title: 'Long wait times',
    desc: '48-day avg for first appointment',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    gradient: 'from-rose-500 to-red-500',
    shadow: 'shadow-rose-200/50',
    rotate: '-1deg',
  },
  {
    title: 'Paperwork overload',
    desc: 'Hours on docs, not care',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
    gradient: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-200/50',
    rotate: '1deg',
  },
];

export default function ChallengesSection() {
  return (
    <section id="challenges" className="section-padding section-bg-alt relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(99,102,241,0.06),transparent)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 text-center lg:text-left space-y-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold uppercase tracking-wider border border-indigo-100/80">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              The Problem
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-[1.2]">
              Built for care,
              <span className="block text-slate-500 font-medium mt-1">not paperwork</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
              We eliminate the friction between patients and the care they need.
            </p>
          </motion.div>

          {/* Right: Card stack */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full max-w-[420px] mx-auto">
              {/* Ambient glow */}
              <div className="absolute -top-8 -left-8 w-56 h-56 bg-indigo-200/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -right-6 w-44 h-44 bg-rose-200/25 rounded-full blur-3xl" />

              <div className="relative space-y-4">
                {challenges.map((c, i) => (
                  <motion.div
                    key={c.title}
                    variants={item}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative"
                  >
                    <div
                      className="relative bg-white rounded-2xl p-5 sm:p-6 shadow-lg shadow-slate-200/50 border border-slate-100/90 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:border-slate-200/80"
                      style={{ transform: `rotate(${c.rotate})` }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shrink-0 shadow-lg ${c.shadow}`}
                        >
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            {c.icon}
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-900 text-base">{c.title}</h3>
                          <p className="text-slate-500 text-sm mt-0.5">{c.desc}</p>
                        </div>
                      </div>
                    </div>
                    {i === 0 && (
                      <div className="flex justify-center py-2">
                        <motion.div
                          variants={item}
                          className="flex flex-col items-center gap-1"
                        >
                          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Then</span>
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200/50">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Solution card */}
                <motion.div variants={item} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-violet-50/80 p-5 sm:p-6 border border-indigo-100/90 shadow-lg shadow-indigo-100/40 ring-1 ring-indigo-50/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100/50 hover:ring-indigo-100/80">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200/50">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-indigo-900 text-base">AI handles the rest</h3>
                        <p className="text-indigo-600/90 text-sm mt-0.5">Instant intake, auto-triage, zero friction</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
