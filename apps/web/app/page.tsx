"use client";

import Link from "next/link";
import { env } from "@/config/env";
import { routes } from "@/config/routes";
import { useAuth } from "@/providers/auth-provider";

const features = [
  {
    title: "Driver Management",
    description:
      "Maintain centralized records for driver identities, history, and enforcement context.",
    accent: "from-slate-900 to-slate-700",
  },
  {
    title: "Violation Management",
    description:
      "Track each incident from detection to resolution with a clear operational trail.",
    accent: "from-zinc-900 to-zinc-700",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Monitor trends, hotspots, and enforcement performance from a unified command view.",
    accent: "from-stone-900 to-stone-700",
  },
  {
    title: "Automated Notifications",
    description:
      "Send consistent alerts and updates to reduce manual follow-up work.",
    accent: "from-neutral-900 to-neutral-700",
  },
  {
    title: "AI-Assisted Detection",
    description:
      "Support faster review with detection workflows designed for high-volume traffic events.",
    accent: "from-slate-800 to-zinc-700",
  },
];

const workflow = [
  "Traffic camera detects violation",
  "Violation is processed",
  "Driver is identified",
  "Notification is sent",
  "Administrators monitor through dashboard",
];

const benefits = [
  "Faster enforcement",
  "Reduced manual work",
  "Better visibility",
  "Automated communication",
  "Centralized management",
];

export default function Home() {
  const { isAuthenticated, isInitialized } = useAuth();
  const dashboardLabel = isAuthenticated ? "Open dashboard" : "Dashboard access";

  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(9,9,11,0.08),_transparent_35%),linear-gradient(180deg,#fafafa_0%,#f4f4f5_48%,#ffffff_100%)] text-zinc-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-9rem] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(24,24,27,0.12),transparent_70%)] blur-3xl" />
        <div className="absolute right-[-8rem] top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(39,39,42,0.10),transparent_68%)] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(9,9,11,0.06),transparent_72%)] blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-zinc-200/70 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-950 text-sm font-semibold text-white shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
              TV
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
                {env.NEXT_PUBLIC_APP_NAME}
              </p>
              <p className="text-sm font-semibold tracking-tight text-zinc-950">
                Traffic Violation Management System
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-600 md:flex">
            <a className="transition-colors hover:text-zinc-950" href="#features">
              Features
            </a>
            <a className="transition-colors hover:text-zinc-950" href="#how-it-works">
              How It Works
            </a>
            <a className="transition-colors hover:text-zinc-950" href="#dashboard-preview">
              Dashboard Access
            </a>
          </nav>

          <Link
            href={routes.dashboard}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800"
          >
            {dashboardLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-20 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Public showcase for enforcement operations
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl lg:text-6xl">
              A professional traffic violation platform for detection, enforcement, and analytics.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
              {env.NEXT_PUBLIC_APP_NAME} helps agencies and administrators detect traffic violations,
              manage offenders, monitor operational analytics, and automate notifications from one
              secure dashboard.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={routes.dashboard}
                className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-zinc-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800"
              >
                {dashboardLabel}
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-50"
              >
                See how it works
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Violation lifecycle", "Tracked end to end"],
                ["Traffic analytics", "Operational visibility"],
                ["Notifications", "Automated communication"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-zinc-950">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(244,244,245,0.85))] blur-2xl" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-zinc-200/80 bg-white p-5 shadow-[0_20px_60px_rgba(9,9,11,0.08)] transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-zinc-950">Live analytics</p>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                    Active
                  </span>
                </div>
                <div className="mt-5 h-36 rounded-2xl bg-[linear-gradient(180deg,#18181b,#3f3f46)] p-4 text-white">
                  <div className="flex items-end justify-between">
                    {[62, 78, 51, 88, 69, 95].map((height, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div
                          className="w-3 rounded-full bg-white/90 shadow-sm"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-[10px] text-white/65">W{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm text-zinc-600">
                  Trend overview for violations, camera activity, and response volume.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-zinc-200/80 bg-white p-5 shadow-[0_20px_60px_rgba(9,9,11,0.08)] transition-transform duration-300 hover:-translate-y-1">
                <p className="text-sm font-semibold text-zinc-950">Operational summary</p>
                <div className="mt-4 space-y-3">
                  {[
                    ["Drivers", "12,480 records"],
                    ["Violations", "1,204 open cases"],
                    ["Notifications", "Automated delivery"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3">
                      <span className="text-sm font-medium text-zinc-700">{label}</span>
                      <span className="text-sm font-semibold text-zinc-950">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-950 p-4 text-white">
                  <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">System status</p>
                  <p className="mt-2 text-sm font-medium">Ready for dashboard access</p>
                  <p className="mt-1 text-sm text-zinc-300">
                    Protected routes, authentication, and administrative workflows remain intact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-500">Features</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
            Built to support enforcement, reporting, and daily operations.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="group rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${feature.accent}`} />
              <p className="mt-5 text-lg font-semibold tracking-tight text-zinc-950">
                {String(index + 1).padStart(2, "0")} {feature.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-500">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
              A clear workflow from detection to oversight.
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              The system is designed to move each violation through a structured lifecycle so teams can
              focus on enforcement quality, not manual coordination.
            </p>
          </div>

          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="space-y-5">
              {workflow.map((item, index) => (
                <div key={item} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white shadow-sm">
                      0{index + 1}
                    </div>
                    {index < workflow.length - 1 ? (
                      <div className="h-full w-px bg-zinc-200" />
                    ) : null}
                  </div>
                  <div className="pb-5">
                    <p className="text-sm font-semibold text-zinc-950">{item}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">
                      Structured processing keeps each case visible and ready for review.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard-preview" className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-500">Dashboard preview</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
            A presentation-ready view of the operational workspace.
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            These preview cards are designed to communicate the dashboard experience without using fake
            screenshots or fabricated interface captures.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-zinc-950">Analytics snapshot</p>
                <p className="mt-1 text-sm text-zinc-500">Traffic trends and enforcement performance</p>
              </div>
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">
                Updated recently
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Violation rate", "18.4%", "down 6%"],
                ["Drivers tracked", "12.5k", "centralized"],
                ["Notifications sent", "8.9k", "automated"],
              ].map(([label, value, meta]) => (
                <div key={label} className="rounded-[1.5rem] bg-zinc-50 p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">{label}</p>
                  <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">{value}</p>
                  <p className="mt-2 text-sm text-zinc-600">{meta}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-zinc-200 bg-zinc-950 p-5 text-white">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Review pipeline</p>
                  <p className="mt-1 text-sm text-zinc-300">Alerts, verification, and response in one place.</p>
                </div>
                <div className="flex gap-2 text-xs text-zinc-300">
                  <span className="rounded-full border border-white/10 px-3 py-1">Drivers</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">Violations</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">Notifications</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-zinc-950">Drivers</p>
              <div className="mt-4 space-y-3">
                {[
                  ["J. Adeyemi", "Active case review"],
                  ["A. Rahman", "Resolved violation"],
                  ["M. Chen", "Pending notification"],
                ].map(([name, status]) => (
                  <div key={name} className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3">
                    <span className="text-sm font-medium text-zinc-900">{name}</span>
                    <span className="text-sm text-zinc-600">{status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-zinc-950">Notifications</p>
              <div className="mt-4 space-y-3">
                {[
                  ["Over-speed violation detected", "2 min ago"],
                  ["Officer review completed", "11 min ago"],
                  ["Notice dispatched to driver", "29 min ago"],
                ].map(([message, time]) => (
                  <div key={message} className="flex items-center justify-between rounded-2xl border border-zinc-200 px-4 py-3">
                    <span className="text-sm text-zinc-700">{message}</span>
                    <span className="text-xs uppercase tracking-[0.18em] text-zinc-400">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-zinc-500">Benefits</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
              Designed to improve speed, clarity, and accountability.
            </h2>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white"
              >
                {benefit}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              ["Faster enforcement", "Reduce delays between detection and review."],
              ["Reduced manual work", "Automate repetitive administrative tasks."],
              ["Better visibility", "See the full operational picture in one place."],
              ["Automated communication", "Keep drivers and teams informed consistently."],
              ["Centralized management", "Operate drivers, violations, and analytics together."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-[1.5rem] border border-zinc-200 p-5">
                <p className="text-sm font-semibold text-zinc-950">{title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-zinc-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold text-zinc-950">{env.NEXT_PUBLIC_APP_NAME}</p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-600">
              Traffic Violation Management System for public demonstration, administrative oversight,
              and professional project presentation.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={routes.dashboard}
              className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-50"
            >
              Dashboard access
            </Link>
            <span className="text-sm text-zinc-500">
              {isInitialized ? "Live session aware" : "Loading session state"}
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
