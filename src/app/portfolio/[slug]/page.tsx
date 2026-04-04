import Image from "next/image";

interface Project {
  title: string;
  description: string;
  heroImage: string;
}

interface ProjectsData {
  [key: string]: Project;
}

const projectsData: ProjectsData = {
  "modern-saas": {
    title: "Modern SaaS Platform",
    description:
      "A scalable SaaS platform engineered for performance and rapid growth.",
    heroImage: "/scraped/tech-18.jpg",
  },
  "ai-dashboard": {
    title: "AI Automation Dashboard",
    description:
      "AI-driven automation system with real-time insights.",
    heroImage: "/scraped/tech-19.jpg",
  },
  "luxury-web": {
    title: "Luxury Brand Website",
    description:
      "Premium high-end website engineered for global brands.",
    heroImage: "/scraped/tech-20.jpg",
  },
};

export default function CaseStudy({
  params,
}: {
  params: { slug: string };
}) {
  const project = projectsData[params.slug];

  if (!project) {
    return (
      <div className="py-40 text-center text-white">
        Project Not Found
      </div>
    );
  }

  return (
    <main className="text-white">

      {/* HERO */}
      <section className="relative h-[70vh] flex items-center justify-center text-center">

        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10">
          <h1 className="text-6xl font-light mb-6">
            {project.title}
          </h1>
          <p className="text-lightgray text-xl max-w-3xl mx-auto">
            {project.description}
          </p>
        </div>
      </section>

    </main>
  );
}