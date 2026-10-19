"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Html5Icon,
  Css3Icon,
  JsIcon,
  TsIcon,
  ReactIcon,
  NextjsIcon,
  GitIcon,
  BootstrapIcon,
  TailwindIcon,
  AxiosIcon,
  ReactHookFormIcon,
  ZustandIcon,
  ShadcnIcon,
  SupabaseIcon,
  MuiIcon,
} from "@/components/icons";
import { SkillItem } from "@/lib/types";

const SKILLS: SkillItem[] = [
  {
    name: "HTML",
    icon: <Html5Icon className="size-4 text-foreground shrink-0" />,
  },
  {
    name: "CSS",
    icon: <Css3Icon className="size-4 text-foreground shrink-0" />,
  },
  {
    name: "JS",
    icon: <JsIcon className="size-4 text-foreground shrink-0" />,
  },
  {
    name: "TS",
    icon: <TsIcon className="size-4 text-foreground shrink-0" />,
  },
  {
    name: "React",
    icon: <ReactIcon className="size-4 text-foreground shrink-0" />,
  },
  {
    name: "Next",
    icon: <NextjsIcon className="size-4 text-foreground shrink-0" />,
  },
  {
    name: "Git",
    icon: <GitIcon className="size-4 text-foreground shrink-0" />,
  },
  {
    name: "Bootstrap",
    icon: <BootstrapIcon className="size-4 text-foreground shrink-0" />,
  },
  {
    name: "Tailwind",
    icon: <TailwindIcon className="size-4 text-foreground shrink-0" />,
  },
  {
    name: "React Hook Form",
    icon: <ReactHookFormIcon className="size-4 text-foreground shrink-0" />,
  },
  {
    name: "Zustand",
    icon: <ZustandIcon className="size-4 shrink-0" />,
  },
  {
    name: "shadcn/ui",
    icon: <ShadcnIcon className="size-4 text-foreground shrink-0" />,
  },
  {
    name: "Supabase",
    icon: <SupabaseIcon className="size-4 text-foreground shrink-0" />,
  },
  {
    name: "Axios",
    icon: <AxiosIcon className="size-4 text-foreground shrink-0" />,
  },
  {
    name: "MUI",
    icon: <MuiIcon className="size-4 text-foreground shrink-0" />,
  },
];

export function SkillsLoop() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const transitionPlaybackRate = (targetRate: number, durationMs: number) => {
    const el = trackRef.current;
    if (!el) return;
    const anims = el.getAnimations();
    if (anims.length === 0) return;
    const anim = anims[0];

    const startRate = anim.playbackRate;
    const startTime = performance.now();

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Cubic ease-out: smooth decelerate / gentle start
      const ease = 1 - Math.pow(1 - progress, 3);
      anim.playbackRate = startRate + (targetRate - startRate) * ease;

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        anim.playbackRate = targetRate;
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      className="group relative w-full overflow-hidden py-4 select-none mask-[linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]"
      role="region"
      aria-label="Skills & Technologies"
      onMouseEnter={() => transitionPlaybackRate(0, 800)}
      onMouseLeave={() => transitionPlaybackRate(1, 900)}
    >
      <div ref={trackRef} className="flex w-max gap-4 animate-logoloop">
        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-4">
          {SKILLS.map((skill) => (
            <div
              key={`track1-${skill.name}`}
              className={cn(
                "inline-flex items-center gap-2.5 rounded-[14px] border border-border bg-card px-5 py-3 text-[13px] font-semibold text-foreground",
                "transition-transform duration-200 hover:scale-115 active:scale-95 cursor-default",
              )}
            >
              {skill.icon}
              <span>{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Track 2 (Duplicated for seamless infinite ticker) */}
        <div className="flex shrink-0 items-center gap-4" aria-hidden="true">
          {SKILLS.map((skill) => (
            <div
              key={`track2-${skill.name}`}
              className={cn(
                "inline-flex items-center gap-2.5 rounded-[14px] border border-border bg-card px-5 py-3 text-[13px] font-semibold text-foreground",
                "transition-transform duration-200 hover:scale-115 active:scale-95 cursor-default",
              )}
            >
              {skill.icon}
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillsLoop;
