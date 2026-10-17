import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

interface NavTabProps {
  href: string;
  label: string;
  isActive?: boolean;
  isAr: boolean;
  isExternal?: boolean;
  download?: string;
}

export default function NavTab({
  href,
  label,
  isActive,
  isAr,
  isExternal,
  download,
}: NavTabProps) {
  const Component = isExternal ? "a" : Link;
  const extraProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer", download }
    : {};

  return (
    <Component
      href={href}
      {...extraProps}
      className={cn(
        "group relative overflow-hidden rounded-full px-5 py-2 select-none block transition-colors duration-200",
        "bg-[#ffffff] dark:bg-[#111111]",
        isAr
          ? "font-cairo text-sm font-medium"
          : "font-oswald text-base tracking-tight uppercase font-normal",
      )}
    >
      {/* 1. Circular Dome Sweep Background */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 size-48 rounded-full bg-[#111111] dark:bg-[#ffffff] scale-0 group-hover:scale-100 transition-transform duration-350 ease-[cubic-bezier(0.25,1,0.5,1)]"
      />

      {/* 2. Text Flip Container with safe padding for descenders and glyph overhangs */}
      <span className="relative z-10 block overflow-hidden px-1 -mx-1 py-1 -my-1 leading-normal">
        {/* Default Text */}
        <span className="block text-[#111111] dark:text-[#ffffff] transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-[-120%]">
          {label}
        </span>
        {/* Inverted Flipped Text (Exact same font weight & metrics) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 px-1 py-1 block text-[#ffffff] dark:text-[#111111] translate-y-[120%] transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0"
        >
          {label}
        </span>
      </span>

      {/* 3. Active Tab Cut-in Notch */}
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-[#111111] dark:bg-[#ffffff] z-20"
        />
      )}
    </Component>
  );
}
