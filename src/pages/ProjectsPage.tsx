import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Smartphone, ArrowRight } from 'lucide-react';
import ProjectCard from '@components/ProjectCard';
import { websiteProjects, appProjects } from '@data/initialData';

export default function ProjectsPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [location.state]);

  const websiteSectionId = 'projects-websites';
  const appsSectionId = 'projects-apps';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen pt-32 pb-24" dir="rtl">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-wider mb-4 text-[#d0bcff]">
            أعمالنا
          </span>
          <h1 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-[#e3e1e9]">
            جميع مشاريعنا
          </h1>
          <p className="text-base md:text-lg max-w-xl mx-auto text-[#cbc3d7] mb-10">
            تصفح أعمالنا الكاملة وتفاصيل كل مشروع
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo(websiteSectionId)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#d0bcff]/10 text-[#d0bcff] hover:bg-[#d0bcff]/20 border border-[#d0bcff]/20 transition-all duration-300"
            >
              <Globe className="w-4 h-4" strokeWidth={1.5} />
              المواقع الإلكترونية
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo(appsSectionId)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#4cd7f6]/10 text-[#4cd7f6] hover:bg-[#4cd7f6]/20 border border-[#4cd7f6]/20 transition-all duration-300"
            >
              <Smartphone className="w-4 h-4" strokeWidth={1.5} />
              التطبيقات
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </motion.button>
          </div>
        </motion.div>

        <div id={websiteSectionId} className="mb-20 scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-10 h-10 rounded-xl bg-[#d0bcff]/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#d0bcff]" strokeWidth={1.5} />
            </div>
            <h2 className="font-syne font-bold text-2xl md:text-3xl text-[#e3e1e9]">
              المواقع الإلكترونية
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#d0bcff]/30 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {websiteProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div id={appsSectionId} className="scroll-mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-10 h-10 rounded-xl bg-[#4cd7f6]/10 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-[#4cd7f6]" strokeWidth={1.5} />
            </div>
            <h2 className="font-syne font-bold text-2xl md:text-3xl text-[#e3e1e9]">
              التطبيقات
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#4cd7f6]/30 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}