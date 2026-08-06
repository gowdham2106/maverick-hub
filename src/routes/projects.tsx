import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  FileImage,
  FileText,
  FolderOpen,
  Layers,
  Lightbulb,
  PlayCircle,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";

import {
  Chip,
  EmptyState,
  ErrorState,
  GlassCard,
  Meter,
  PageHeader,
  Reveal,
  Skeleton,
} from "@/components/ui-kit";

import { BRAND } from "@/data/team";
import { useProject } from "@/hooks/use-portal";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      {
        title: "Claim Shield Plus — Mission Mavericks Hub",
      },
      {
        name: "description",
        content:
          "Claim Shield Plus is an AI powered Motor Insurance Claims Management Platform.",
      },
      {
        property: "og:title",
        content: "Claim Shield Plus",
      },
      {
        property: "og:description",
        content:
          "AI Powered Motor Insurance Claims Platform built by Mission Mavericks.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),

  component: ProjectPage,
});

/* ===========================================================
   PROJECT JOURNEY
=========================================================== */

const PROJECT_JOURNEY = [
  {
    id: 1,
    title: "Project Overview",
    icon: Layers,
    description:
      "Overview of Claim Shield Plus including objectives, business value and expected outcomes.",
    type: "info",
  },

  {
    id: 2,
    title: "Project Discovery",
    icon: Lightbulb,
    description:
      "Business Analysis, Requirement Gathering, Stakeholder Meetings and Requirement Discovery.",
    type: "info",
  },

  {
    id: 3,
    title: "Project Charter",
    icon: FileText,
    description:
      "Click to view or download the Project Charter.",
    type: "pdf",

    url: "#",
  },

  {
    id: 4,
    title: "Project Pitch",
    icon: FileText,
    description:
      "Project Pitch presentation used during proposal.",
    type: "pdf",

    url: "#",
  },

  {
    id: 5,
    title: "Statement of Work (SOW)",
    icon: FileText,
    description:
      "Complete Statement of Work with Deliverables and Scope.",
    type: "pdf",

    url: "#",
  },

  {
    id: 6,
    title: "Workflow",
    icon: Workflow,
    description:
      "Business workflow and system flow diagrams.",

    type: "workflow",

    files: [
      {
        title: "Workflow Diagram 1",
        url: "#",
      },

      {
        title: "Workflow Diagram 2",
        url: "#",
      },

      {
        title: "Workflow Diagram 3",
        url: "#",
      },
    ],
  },

  {
    id: 7,
    title: "Functional Requirement Specification (FRS)",
    icon: FileText,

    description:
      "Complete Functional Requirement Specification Document.",

    type: "pdf",

    url: "#",
  },

  {
    id: 8,
    title: "Testing",
    icon: CheckCircle2,

    description:
      "Testing Artifacts.",

    type: "testing",

    files: [
      {
        title: "Test Cases",
        url: "#",
      },

      {
        title: "Test Result Summary",
        url: "#",
      },
    ],
  },

  {
    id: 9,

    title: "Demo Video",

    icon: PlayCircle,

    description:
      "Watch the complete working demonstration.",

    type: "video",

    url: "#",
  },

  {
    id: 10,

    title: "Project Documents",

    icon: FolderOpen,

    description:
      "Complete repository containing all project documents.",

    type: "documents",

    url: "/documents",
  },
];

/* ===========================================================
   PROJECT PAGE
=========================================================== */

function ProjectPage() {
  const { data: project, isLoading, isError, refetch } = useProject();

  if (isLoading) {
    return (
      <div className="space-y-5">
        <Skeleton
          className="rounded-3xl"
          style={{ height: 180 }}
        />

        <Skeleton
          className="rounded-3xl"
          style={{ height: 220 }}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        message="The project details could not be loaded."
        onRetry={() => refetch()}
      />
    );
  }

  if (!project) {
    return (
      <EmptyState
        title="No project published"
        description="Project details will appear here once an administrator publishes them."
      />
    );
  }

  return (
    <div>

      <PageHeader
        eyebrow="Project"
        title={project.name}
        description={project.category}
      />
      {/* ===========================================================
    PROJECT SUMMARY
=========================================================== */}

<Reveal>
  <GlassCard className="overflow-hidden">

    <div
      className="relative h-40"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.63 0.20 264), oklch(0.58 0.21 305))",
      }}
    >
      <div className="absolute inset-0 bg-black/10" />

      <div className="absolute bottom-6 left-6">

        <p className="text-sm text-primary-foreground/80 uppercase tracking-[0.25em]">
          Mission Mavericks
        </p>

        <h1 className="font-display text-3xl font-extrabold text-primary-foreground">
          {BRAND.projectName}
        </h1>

      </div>
    </div>

    <div className="grid gap-6 p-6 md:grid-cols-3">

      <div>

        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Status
        </p>

        <h3 className="mt-2 text-lg font-semibold text-primary">
          {project.status}
        </h3>

      </div>

      <div>

        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Current Phase
        </p>

        <h3 className="mt-2 text-lg font-semibold">
          {project.current_phase}
        </h3>

      </div>

      <div>

        <Meter
          value={project.progress}
          label="Overall Progress"
        />

      </div>

    </div>

  </GlassCard>
</Reveal>

{/* ===========================================================
    PROBLEM & SOLUTION
=========================================================== */}

<div className="mt-6 grid gap-5 lg:grid-cols-2">

  <Reveal>

    <GlassCard
      interactive
      className="h-full p-7"
    >

      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-warning/15">

        <AlertTriangle
          className="h-6 w-6 text-warning"
        />

      </span>

      <h2 className="mt-5 text-xl font-semibold">
        Problem Statement
      </h2>

      <p className="mt-3 leading-7 text-muted-foreground">
        {project.problem}
      </p>

    </GlassCard>

  </Reveal>

  <Reveal delay={0.06}>

    <GlassCard
      interactive
      className="h-full p-7"
    >

      <span className="gradient-brand grid h-12 w-12 place-items-center rounded-2xl">

        <Lightbulb
          className="h-6 w-6 text-primary-foreground"
        />

      </span>

      <h2 className="mt-5 text-xl font-semibold">
        Our Solution
      </h2>

      <p className="mt-3 leading-7 text-muted-foreground">
        {project.solution}
      </p>

    </GlassCard>

  </Reveal>

</div>

{/* ===========================================================
    KEY FEATURES
=========================================================== */}

<h2 className="mt-10 mb-5 flex items-center gap-2 text-xl font-semibold">

  <Sparkles
    className="h-5 w-5 text-primary"
  />

  Key Features

</h2>

<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

  {project.features.map((feature, index) => (

    <Reveal
      key={feature}
      delay={index * 0.05}
    >

      <GlassCard
        interactive
        className="flex h-full items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-1"
      >

        <div className="gradient-brand flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white">

          {String(index + 1).padStart(2, "0")}

        </div>

        <div>

          <p className="font-medium">
            {feature}
          </p>

        </div>

      </GlassCard>

    </Reveal>

  ))}

</div>{/* ===========================================================
    PROJECT JOURNEY
=========================================================== */}

<h2 className="mt-12 mb-6 flex items-center gap-2 text-xl font-bold">

  <Workflow className="h-6 w-6 text-primary" />

  Project Journey

</h2>

<Reveal>

  <GlassCard className="p-7">

    <div className="space-y-6">

      {PROJECT_JOURNEY.map((step, index) => {

        const Icon = step.icon;

        return (

          <div
            key={step.id}
            className="flex gap-6"
          >

            {/* Timeline */}

            <div className="flex flex-col items-center">

              <div className="gradient-brand flex h-12 w-12 items-center justify-center rounded-full shadow-lg">

                <span className="text-sm font-bold text-white">

                  {step.id}

                </span>

              </div>

              {index !== PROJECT_JOURNEY.length - 1 && (

                <div className="mt-2 h-24 w-[3px] rounded-full bg-primary/20" />

              )}

            </div>

            {/* Card */}

            <GlassCard
              interactive
              className="flex-1 border border-border p-6 transition-all duration-300 hover:border-primary hover:shadow-xl"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-4">

                  <div className="gradient-brand flex h-12 w-12 items-center justify-center rounded-xl">

                    <Icon className="h-6 w-6 text-white" />

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold">

                      {step.title}

                    </h3>

                    <p className="mt-2 text-sm leading-7 text-muted-foreground">

                      {step.description}

                    </p>

                  </div>

                </div>

                {step.url && (

                  <a
                    href={step.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white"
                  >

                    Open

                  </a>

                )}

              </div>

              {/* Workflow Files */}

              {step.type === "workflow" && step.files && (

                <div className="mt-6">

                  <p className="mb-3 font-semibold">

                    Workflow Diagrams

                  </p>

                  <div className="grid gap-3">

                    {step.files.map((file) => (

                      <a
                        key={file.title}
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl border border-border bg-card/50 px-4 py-4 transition-all hover:border-primary hover:bg-primary/5"
                      >

                        <div className="flex items-center gap-3">

                          <FileImage className="h-5 w-5 text-primary" />

                          <span className="text-sm">

                            {file.title}

                          </span>

                        </div>

                        <ChevronRight className="h-5 w-5 text-primary" />

                      </a>

                    ))}

                  </div>

                </div>

              )}

              {/* Testing Files */}

              {step.type === "testing" && step.files && (

                <div className="mt-6">

                  <p className="mb-3 font-semibold">

                    Testing Documents

                  </p>

                  <div className="grid gap-3">

                    {step.files.map((file) => (

                      <a
                        key={file.title}
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl border border-border bg-card/50 px-4 py-4 transition-all hover:border-primary hover:bg-primary/5"
                      >

                        <div className="flex items-center gap-3">

                          <FileText className="h-5 w-5 text-primary" />

                          <span>

                            {file.title}

                          </span>

                        </div>

                        <ChevronRight className="h-5 w-5 text-primary" />

                      </a>

                    ))}

                  </div>

                </div>

              )}

            </GlassCard>

          </div>

        );

      })}

    </div>

  </GlassCard>

</Reveal>
{/* ===========================================================
    EXPECTED OUTCOMES & BUSINESS BENEFITS
=========================================================== */}

<div className="mt-10 grid gap-5 lg:grid-cols-2">

  <Reveal>

    <GlassCard className="h-full p-7">

      <h2 className="flex items-center gap-2 text-lg font-semibold">

        <CheckCircle2
          className="h-5 w-5 text-success"
        />

        Expected Outcomes

      </h2>

      <ul className="mt-5 space-y-4">

        {project.outcomes.map((item) => (

          <li
            key={item}
            className="flex items-start gap-3"
          >

            <CheckCircle2
              className="mt-1 h-4 w-4 shrink-0 text-success"
            />

            <span className="text-sm leading-7 text-muted-foreground">

              {item}

            </span>

          </li>

        ))}

      </ul>

    </GlassCard>

  </Reveal>

  <Reveal delay={0.06}>

    <GlassCard className="h-full p-7">

      <h2 className="flex items-center gap-2 text-lg font-semibold">

        <TrendingUp
          className="h-5 w-5 text-primary"
        />

        Business Benefits

      </h2>

      <ul className="mt-5 space-y-4">

        {project.business_benefits.map((item) => (

          <li
            key={item}
            className="flex items-start gap-3"
          >

            <CheckCircle2
              className="mt-1 h-4 w-4 shrink-0 text-primary"
            />

            <span className="text-sm leading-7 text-muted-foreground">

              {item}

            </span>

          </li>

        ))}

      </ul>

    </GlassCard>

  </Reveal>

</div>

{/* ===========================================================
    BUSINESS IMPACT
=========================================================== */}

<Reveal delay={0.08}>

  <GlassCard className="mt-8 p-8">

    <h2 className="flex items-center gap-2 text-xl font-semibold">

      <TrendingUp
        className="h-6 w-6 text-primary"
      />

      Business Impact

    </h2>

    <p className="mt-4 leading-8 text-muted-foreground">

      {project.business_impact}

    </p>

  </GlassCard>

</Reveal>

{/* ===========================================================
    TECHNOLOGY STACK
=========================================================== */}

<Reveal delay={0.1}>

  <GlassCard className="mt-8 p-8">

    <h2 className="flex items-center gap-2 text-xl font-semibold">

      <Layers
        className="h-6 w-6 text-primary"
      />

      Technology Stack

    </h2>

    <div className="mt-6 flex flex-wrap gap-3">

      {project.technologies.map((tech) => (

        <Chip
          key={tech}
          className="px-4 py-2 text-sm"
        >

          {tech}

        </Chip>

      ))}

    </div>

  </GlassCard>

</Reveal>

</div>

);
}