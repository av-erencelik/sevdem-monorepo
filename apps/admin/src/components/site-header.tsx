import LogoutButton from "./ui/LogoutButton";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

const SiteHeader = () => {
  return (
    <header className="flex items-center justify-between border-b-[1px] border-border px-5 py-4">
      <MainNav />
      <MobileNav />
      <LogoutButton />
    </header>
  );
};

export default SiteHeader;
