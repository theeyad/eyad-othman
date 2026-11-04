"use client";

import React, {
  useEffect,
  useRef,
  useSyncExternalStore,
  forwardRef,
} from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ProjectWithImages, ScrollCarouselProps } from "@/lib/types";
import { ArrowRight, ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const subscribeDesktop = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(min-width: 768px)");
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
};

const getDesktopSnapshot = () =>
  typeof window !== "undefined"
    ? window.matchMedia("(min-width: 768px)").matches
    : false;

const useProjectAnimations = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  scrollContainerRef: React.RefObject<HTMLDivElement | null>,
  scrollContainerRef2: React.RefObject<HTMLDivElement | null>,
  progressBarRef: React.RefObject<HTMLDivElement | null>,
  cardRefs: React.RefObject<HTMLDivElement[]>,
  cardRefs2: React.RefObject<HTMLDivElement[]>,
  isDesktop: boolean,
  isAr: boolean,
  hasProjects: boolean,
  maxScrollHeight?: number,
) => {
  useEffect(() => {
    if (!hasProjects) return;

    const ctx = gsap.context(() => {
      if (isDesktop) {
        const scrollWidth1 = scrollContainerRef.current?.scrollWidth || 0;
        const scrollWidth2 = scrollContainerRef2.current?.scrollWidth || 0;
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
        const viewportOffset = (containerWidth - cardWidth) / 2;

        const finalOffset1 = scrollWidth1 - containerWidth + viewportOffset;
        const finalOffset2 = scrollWidth2 - containerWidth + viewportOffset;

        const scrollDistance = maxScrollHeight || finalOffset1;
        const dirMultiplier = isAr ? -1 : 1;

        if (scrollContainerRef2.current) {
          gsap.set(scrollContainerRef2.current, {
            x: dirMultiplier * (-finalOffset2 + viewportOffset * 2),
          });
        }

        if (scrollContainerRef.current && containerRef.current) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${scrollDistance}`,
                scrub: 1,
                pin: true,
              },
            })
            .fromTo(
              scrollContainerRef.current,
              { x: dirMultiplier * viewportOffset },
              {
                x: dirMultiplier * (-finalOffset1 + viewportOffset),
                ease: "none",
              },
            );
        }

        if (scrollContainerRef2.current && containerRef.current) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${scrollDistance}`,
                scrub: 1,
              },
            })
            .to(scrollContainerRef2.current, {
              x: dirMultiplier * viewportOffset,
              ease: "none",
            });
        }

        if (progressBarRef.current && containerRef.current) {
          gsap.to(progressBarRef.current, {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${scrollDistance}`,
              scrub: true,
            },
          });
        }
      } else {
        const allCards = [...cardRefs.current, ...cardRefs2.current];
        allCards.forEach((card, index) => {
          if (card) {
            gsap.fromTo(
              card,
              {
                opacity: 0,
                x: index % 2 === 0 ? -120 : 120,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none none",
                  once: true,
                },
              },
            );
          }
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [
    isDesktop,
    isAr,
    hasProjects,
    maxScrollHeight,
    cardRefs,
    cardRefs2,
    containerRef,
    progressBarRef,
    scrollContainerRef,
    scrollContainerRef2,
  ]);
};

export const ScrollCarousel = forwardRef<HTMLDivElement, ScrollCarouselProps>(
  ({ projects, isAr = false, className, maxScrollHeight }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef2 = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const cardRefs2 = useRef<HTMLDivElement[]>([]);

    const isDesktop = useSyncExternalStore(
      subscribeDesktop,
      getDesktopSnapshot,
      () => false,
    );

    const hasProjects = projects && projects.length > 0;
    const projectsRow2 = hasProjects ? [...projects].reverse() : [];

    useProjectAnimations(
      containerRef,
      scrollContainerRef,
      scrollContainerRef2,
      progressBarRef,
      cardRefs,
      cardRefs2,
      isDesktop,
      isAr,
      hasProjects,
      maxScrollHeight,
    );

    if (!hasProjects) {
      return null;
    }

    const renderProjectCards = (
      items: ProjectWithImages[],
      refs: React.RefObject<HTMLDivElement[]>,
      isDuplicate = false,
    ) =>
      items.map((project, index) => {
        const title = isAr ? project.title_ar : project.title;
        const category = isAr ? project.category_ar : project.category;
        const primaryImage =
          project.project_images.find((img) => img.is_primary)?.url ||
          project.project_images[0]?.url ||
          "";

        return (
          <div
            key={`${project.slug}-${index}${isDuplicate ? "-dup" : ""}`}
            ref={(el: HTMLDivElement | null) => {
              if (el) refs.current[index] = el;
            }}
            className="shrink-0 w-full sm:w-110 md:w-120 xl:w-110 2xl:w-120 z-10 my-2"
          >
            <Link
              href={`/projects/${project.slug}`}
              aria-label={isDuplicate ? undefined : `${title} - ${category}`}
              aria-hidden={isDuplicate ? "true" : undefined}
              tabIndex={isDuplicate ? -1 : undefined}
              className={cn(
                "group relative block h-87.5 sm:h-95 xl:h-65 2xl:h-68.75 rounded-3xl border border-border bg-card overflow-hidden",
                "transition-all duration-300 hover:border-foreground/30 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground",
              )}
            >
              {/* Background Project Image */}
              <div className="absolute inset-0 z-0 bg-muted">
                {primaryImage ? (
                  <Image
                    src={primaryImage}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : null}
              </div>

              {/* Card Content Overlay */}
              <div className="relative z-10 flex flex-col justify-between h-full p-5 sm:p-6 xl:p-5 2xl:p-6">
                {/* Top Badge: Category */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                    {category}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        );
      });

    return (
      <section
        className={cn(
          "bg-transparent text-foreground relative overflow-hidden",
          className,
        )}
        ref={ref}
      >
        <div
          ref={containerRef}
          className="relative overflow-hidden md:h-screen md:min-h-175 pt-4 sm:pt-6 md:pt-28 pb-6 md:pb-16 flex flex-col justify-center gap-2 z-10"
        >
          {/* Row 1 (Desktop + Mobile) */}
          <div
            ref={scrollContainerRef}
            className="flex flex-col md:flex-row gap-3 items-center px-4 md:px-0"
          >
            {renderProjectCards(projects, cardRefs)}
          </div>

          {/* Row 2 (Desktop alternate scroll - decorative duplicate) */}
          {projectsRow2.length > 1 && (
            <div
              ref={scrollContainerRef2}
              aria-hidden="true"
              inert
              className="hidden xl:flex flex-row gap-3 items-center px-0"
            >
              {renderProjectCards(projectsRow2, cardRefs2, true)}
            </div>
          )}

          {/* Progress Bar (Desktop only) */}
          {isDesktop && (
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-1.5 bg-border rounded-full overflow-hidden z-20"
            >
              <div
                ref={progressBarRef}
                className="h-full bg-foreground rounded-full transition-all duration-75"
                style={{ width: "0%" }}
              />
            </div>
          )}
        </div>
      </section>
    );
  },
);

ScrollCarousel.displayName = "ScrollCarousel";

export default ScrollCarousel;
