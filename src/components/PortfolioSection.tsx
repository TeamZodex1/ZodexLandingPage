import { Globe, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '@typings/index';
import ProjectCard from '@components/ProjectCard';

interface PortfolioSectionProps {
  websiteProjects: Project[];
  appProjects: Project[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

export default function PortfolioSection({ websiteProjects, appProjects }: PortfolioSectionProps) {
  return (
    <section id="portfolio" className="py-24 md:py-32 relative" dir="rtl">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full blur-[120px] opacity-8 bg-[#d0bcff]" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-[80px] opacity-6 bg-[#4cd7f6]" />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-wider mb-4 text-[#d0bcff]">
            أعمالنا
          </span>
          <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-[#e3e1e9]">
            مشاريعنا
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto text-[#cbc3d7]">
            مجموعة من المشاريع التي تعكس جودة عملنا واحترافيتنا
          </p>
        </motion.div>

        <div id="portfolio-websites" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-8 rounded-lg bg-[#d0bcff]/10 flex items-center justify-center">
              <Globe className="w-4 h-4 text-[#d0bcff]" strokeWidth={1.5} />
            </div>
            <h3 className="font-syne font-bold text-xl md:text-2xl text-[#e3e1e9]">
              المواقع الإلكترونية
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#d0bcff]/30 to-transparent" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {websiteProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>

        <div id="portfolio-apps">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-8 rounded-lg bg-[#4cd7f6]/10 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-[#4cd7f6]" strokeWidth={1.5} />
            </div>
            <h3 className="font-syne font-bold text-xl md:text-2xl text-[#e3e1e9]">
              التطبيقات
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#4cd7f6]/30 to-transparent" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {appProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}