import { TypographyBlockquote } from "ui";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { quotes } from "@/config/quotes";
import Link from "next/link";
import Summary from "@/components/summary";
import Tasks from "@/components/tasks";
dayjs.locale("tr");

export const revalidate = 0;

export default async function Home() {
  const day = dayjs().day();
  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-2 rounded-md border border-border p-5 shadow-md">
        <TypographyBlockquote classname="text-foreground border-l-0 pl-0 mt-0">
          "{quotes[day].text}"
        </TypographyBlockquote>
        <Link
          href={quotes[day].vikiUrl}
          className="text-sm text-muted-foreground hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          {quotes[day].sayer}
        </Link>
      </div>
      {/* @ts-expect-error Server Component */}
      <Summary />
      {/* @ts-expect-error Server Component */}
      <Tasks />
    </section>
  );
}
