import { motion } from "motion/react";

interface ProjectCardsProps {
  phase: number;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
  },
};

const placeholders = [
  { title: "Project One", description: "A brief description of this project and the technologies used." },
  { title: "Project Two", description: "A brief description of this project and the technologies used." },
  { title: "Project Three", description: "A brief description of this project and the technologies used." },
  { title: "Project Four", description: "A brief description of this project and the technologies used." },
];

export default function ProjectCards({ phase }: ProjectCardsProps) {
  return (
    <motion.section
      id="projects"
      variants={containerVariants}
      initial="hidden"
      animate={phase >= 3 ? "visible" : "hidden"}
      className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 pb-24 md:grid-cols-2"
    >
      {placeholders.map((project, i) => (
        <motion.div
          key={i}
          variants={cardVariants}
          className="group rounded-2xl border border-neutral-100 bg-neutral-50/80 p-6 transition-shadow duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        >
          <div className="mb-4 h-40 rounded-xl bg-neutral-200/60" />
          <h3 className="text-lg font-semibold text-neutral-900">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            {project.description}
          </p>
        </motion.div>
      ))}
    </motion.section>
  );
}
