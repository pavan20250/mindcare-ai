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
    shadow: 'shadow-rose-500/20',
    rotate: '-1deg',
  },
  {
    title: 'Paperwork overload',
    desc: 'Hours on docs, not care',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
    gradient: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-500/20',
    rotate: '1deg',
  },
];

export default function ChallengesSection() {
  return (
    <section id="challenges" className="section-padding relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 text-center lg:text-left space-y-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] text-teal-300 text-xs font-semibold uppercase tracking-wider border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              The Problem
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.2]">
              Built for care,
              <span className="block text-slate-400 font-medium mt-1">not paperwork</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
              We eliminate the friction between patients and the care they need.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full max-w-[420px] mx-auto">
              <div className="absolute -top-8 -left-8 w-56 h-56 bg-teal-500/[0.06] rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -right-6 w-44 h-44 bg-rose-500/[0.04] rounded-full blur-3xl" />

              <div className="relative space-y-4">
                {challenges.map((c, i) => (
                  <motion.div
                    key={c.title}
                    variants={item}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative"
                  >
                    <div
                      className="relative bg-white/[0.04] backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-lg shadow-black/10 border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.12]"
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
                          <h3 className="font-semibold text-white text-base">{c.title}</h3>
                          <p className="text-slate-400 text-sm mt-0.5">{c.desc}</p>
                        </div>
                      </div>
                    </div>
                    {i === 0 && (
                      <div className="flex justify-center py-2">
                        <motion.div
                          variants={item}
                          className="flex flex-col items-center gap-1"
                        >
                          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Then</span>
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                ))}

                <motion.div variants={item} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="relative overflow-hidden rounded-xl bg-teal-500/[0.08] backdrop-blur-lg p-4 sm:p-6 border border-teal-500/20 shadow-lg shadow-teal-500/10 transition-all duration-300 hover:bg-teal-500/[0.12]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/[0.06] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-teal-200 text-base">AI handles the rest</h3>
                        <p className="text-teal-300/70 text-sm mt-0.5">Instant intake, auto-triage, zero friction</p>
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
