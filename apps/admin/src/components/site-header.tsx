import LogoutButton from "./ui/LogoutButton";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

const SiteHeader = () => {
  return (
    <header className="flex items-center justify-between border-border px-5 pb-0 pt-2 md:border-b-[1px] md:py-3">
      <MainNav />
      <MobileNav />
      <LogoutButton />
    </header>
  );
};

export default SiteHeader;
