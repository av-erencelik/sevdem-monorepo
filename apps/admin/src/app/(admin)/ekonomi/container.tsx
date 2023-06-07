import { TypographyH4 } from "ui";

const Container = ({ children, title }: { children: React.JSX.Element; title: string }) => {
  return (
    <div className="mt-6 rounded-lg border border-border p-10 pb-16 shadow-md">
      <TypographyH4>{title}</TypographyH4>
      {children}
    </div>
  );
};

export default Container;
