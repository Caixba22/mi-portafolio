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
        px-4 sm:px-5 py-2.5
        text-[0.78rem] sm:text-[0.84rem]
        font-semibold
        uppercase
        tracking-[0.16em]
        flex items-center justify-center
        transition-all duration-200
        hover:bg-[color-mix(in_oklab,var(--color-primary)_18%,transparent)]
        hover:text-white
        hover:-translate-y-[1px]
        active:translate-y-0
        focus:outline-none
        focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]
        focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]
      "
      style={{
        color: "inherit",
      }}
    >
      {label}
    </a>
  );
}
