import { Link } from "@/i18n/navigation";

export default function MainActionButton({
  title,
  url,
  className,
}: {
  title: string;
  url: string;
  className?: string;
}) {
  return (
    <>
      <Link
        href={url}
        className={`inline-flex items-center justify-center rounded-full bg-[#111111] text-[#ffffff] dark:bg-[#ffffff] dark:text-[#111111] px-6 py-2.5 text-sm font-semibold transition-transform duration-200 hover:scale-105 active:scale-95 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-foreground ${
          className || ""
        }`}
      >
        {title}
      </Link>
    </>
  );
}
