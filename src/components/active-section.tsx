interface ActiveSectionProps {
  activeSection: string;
  id: string;
  children: React.ReactNode;
}

export default function ActiveSection({
  activeSection,
  id,
  children,
}: ActiveSectionProps) {
  return (
    <a
      href={`#${id}`}
      className={`transition-colors relative ${
        activeSection === id
          ? "text-blue-500"
          : "text-foreground hover:text-blue-500"
      }`}
    >
      {children}
    </a>
  );
}
