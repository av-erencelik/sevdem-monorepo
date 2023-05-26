import { TypographyBlockquote, TypographyH3, TypographyH4, TypographyP, TypographySmall } from "ui";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { quotes } from "@/config/quotes";
import Link from "next/link";
dayjs.locale("tr");
export default async function Home() {
  const day = dayjs().day();
  return (
    <section>
      <div className="flex flex-col gap-2 rounded-md border border-border p-5 shadow-lg">
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
    </section>
  );
}
