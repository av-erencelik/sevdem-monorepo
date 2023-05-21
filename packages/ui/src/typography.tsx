import { cn } from "../lib/utils";

type TypographyProps = {
  children: React.ReactNode;
  classname?: string;
};

type TypographyPropsWithChildren = {};

export function TypographyH1({ children, classname }: TypographyProps) {
  return (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", classname)}>{children}</h1>
  );
}

export function TypographyH2({ children, classname }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        classname
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ children, classname }: TypographyProps) {
  return <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", classname)}>{children}</h3>;
}
export function TypographyH4({ children, classname }: TypographyProps) {
  return <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", classname)}>{children}</h4>;
}
export function TypographyP({ children, classname }: TypographyProps) {
  return <p className={cn("leading-7 [&:not(:first-child)]:mt-6", classname)}>{children}</p>;
}
export function TypographyBlockquote({ children, classname }: TypographyProps) {
  return <blockquote className={cn("mt-6 border-l-2 pl-6 italic", classname)}>{children}</blockquote>;
}
export function TypographyList({ children, classname }: TypographyProps) {
  return <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", classname)}>{children}</ul>;
}
export function TypographyLead({ children, classname }: TypographyProps) {
  return <p className={cn("text-xl text-muted-foreground", classname)}>{children}</p>;
}
export function TypographyLarge({ children, classname }: TypographyProps) {
  return <div className={cn("text-lg font-semibold", classname)}>{children}</div>;
}
export function TypographySmall({ children, classname }: TypographyProps) {
  return <small className={cn("text-sm font-medium leading-none", classname)}>{children}</small>;
}
export function TypographyMuted({ children, classname }: TypographyProps) {
  return <p className={cn("text-sm text-muted-foreground", classname)}>{children}</p>;
}
