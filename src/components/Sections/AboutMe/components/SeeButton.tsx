// src/components/Sections/AboutMe/components/SeeButton.tsx
interface SeeButtonProps {
  href: string;
  label: string;
}

export default function SeeButton({ href, label }: SeeButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        px-4 py-2.5
        text-sm md:text-base font-semibold
        flex items-center justify-center
        transition-all duration-200
        hover:brightness-110 hover:-translate-y-[1px]
        focus:outline-none
        focus-visible:ring-2 focus-visible:ring-[var(--color-bg)]
        focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]
      "
      style={{
        color: "inherit",
      }}
    >
      {label}
    </a>
  );
}
