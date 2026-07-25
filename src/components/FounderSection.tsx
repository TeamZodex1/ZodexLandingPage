import { motion } from 'framer-motion';
import { Award, Briefcase, Layers, BookOpen } from 'lucide-react';

const mainSkills = [
  { label: 'HTML', pct: 95 },
  { label: 'CSS', pct: 95 },
  { label: 'JavaScript', pct: 90 },
  { label: 'React.js', pct: 90 },
  { label: 'TypeScript', pct: 85 },
  { label: 'WordPress', pct: 90 },
];

const learningSkills = [
  { label: 'Node.js', pct: 45 },
  { label: 'Express.js', pct: 40 },
  { label: 'MongoDB', pct: 35 },
];

const stats = [
  { icon: Award, value: '2+', label: 'سنوات الخبرة' },
  { icon: Briefcase, value: '3+', label: 'المشاريع المنجزة' },
  { icon: Layers, value: '15+', label: 'المهارات' },
];

function SkillBar({ label, pct, index }: { label: string; pct: number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
      className="mb-3"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-[#e3e1e9] font-inter">{pct}%</span>
        <span className="text-xs font-medium text-[#cbc3d7]">{label}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-full rounded-full bg-gradient-to-l from-[#d0bcff] to-[#a078ff]"
        />
      </div>
    </motion.div>
  );
}

export default function FounderSection() {
  return (
    <section id="about" className="py-24 md:py-32 relative" dir="rtl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[120px] opacity-10 bg-[#ffb869]" />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-wider mb-4 text-[#ffb869]">
            من نحن
          </span>
          <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-[#e3e1e9]">
            المؤسس والقائد
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative p-8 md:p-10 rounded-2xl border glass bg-[#1e1f25]/60 border-white/[0.06]"
          >
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="text-center">
                <h3 className="font-syne font-bold text-2xl mb-1 text-[#e3e1e9]">
                  عز الدين السادات
                </h3>
                <p className="text-sm font-medium text-[#4cd7f6]">
                  مؤسس ومهندس برمجيات
                </p>
                <p className="text-sm mt-2 leading-relaxed text-[#958ea0]">
                  شغوف ببناء منتجات رقمية تترك أثراً. أؤمن بأن التفاصيل الصغيرة تصنع الفرق الكبير.
                </p>
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-6">
              <h4 className="text-xs font-semibold tracking-wider text-[#4cd7f6] mb-5">
                المهارات الأساسية
              </h4>
              {mainSkills.map((skill, i) => (
                <SkillBar key={skill.label} label={skill.label} pct={skill.pct} index={i} />
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/[0.04]">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-3.5 h-3.5 text-[#ffb869]" strokeWidth={1.5} />
                <h4 className="text-xs font-semibold tracking-wider text-[#ffb869]">
                  ما زلت أتعلم
                </h4>
              </div>
              {learningSkills.map((skill, i) => (
                <SkillBar key={skill.label} label={skill.label} pct={skill.pct} index={i + mainSkills.length} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5 sticky top-32"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="p-6 rounded-xl border text-center lg:text-right transition-all duration-300 bg-[#1e1f25]/40 border-white/[0.06] hover:border-[#d0bcff]/15"
              >
                <stat.icon className="w-6 h-6 mb-3 mx-auto lg:mx-0 text-[#d0bcff]" strokeWidth={1.5} />
                <div className="font-syne font-bold text-3xl mb-1 text-[#e3e1e9]">
                  {stat.value}
                </div>
                <div className="text-sm text-[#958ea0]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
