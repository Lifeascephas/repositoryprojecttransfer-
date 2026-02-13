interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
}

export function SectionHeader({ title, subtitle, alignment = "center" }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${alignment === "center" ? "text-center" : "text-left"}`}>
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-500 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className={`h-1 w-16 bg-primary mt-4 rounded-full ${alignment === "center" ? "mx-auto" : ""}`} />
      </div>
    </div>
  );
}
