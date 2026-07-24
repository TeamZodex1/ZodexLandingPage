import { ExternalLink, Download, Globe, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '@typings/index';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const isApp = project.type === 'app';

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative rounded-2xl border border-white/[0.08] bg-[#1e1f25]/60 overflow-hidden shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:border-[#d0bcff]/25 transition-all duration-500"
    >
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          loading="lazy"
        />
        <div className="absolute top-3 right-3 z-10">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold backdrop-blur-sm ${
            isApp
              ? 'bg-[#4cd7f6]/15 text-[#4cd7f6] border border-[#4cd7f6]/25'
              : 'bg-[#d0bcff]/15 text-[#d0bcff] border border-[#d0bcff]/25'
          }`}>
            {isApp ? <Smartphone className="w-3 h-3" strokeWidth={2} /> : <Globe className="w-3 h-3" strokeWidth={2} />}
            {isApp ? 'تطبيق' : 'موقع إلكتروني'}
          </span>
        </div>

        {isApp ? (
          <motion.a
            href={project.apkDownloadUrl}
            download
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-[#090A0F]/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.8, y: 10 }}
              whileHover={{ scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#4cd7f6] text-[#003640] text-sm font-semibold shadow-xl shadow-black/30"
            >
              <Download className="w-4 h-4" />
              تنزيل التطبيق
            </motion.div>
          </motion.a>
        ) : (
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-[#090A0F]/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.8, y: 10 }}
              whileHover={{ scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#d0bcff] text-[#23005c] text-sm font-semibold shadow-xl shadow-black/30"
            >
              <ExternalLink className="w-4 h-4" />
              عرض المشروع
            </motion.div>
          </motion.a>
        )}
      </div>

      <div className="p-6 md:p-8">
        <h3 className="font-syne font-bold text-xl md:text-2xl mb-3 text-[#e3e1e9]">
          {project.title}
        </h3>
        <p className="text-sm md:text-base leading-relaxed mb-6 text-[#cbc3d7]">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techTags.map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-[#d0bcff]/20 text-[#d0bcff] bg-[#d0bcff]/8"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}