import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
const navLinks = [
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Documentation",
    href: "/docs",
  },
];
const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed inset-x-0 top-0 z-40 border-b bg-background/60 backdrop-blur">
        {/* replace 'container' with explicit sizing + flex row */}
        <div
          className="mx-auto w-full max-w-[1400px] h-16 px-4 sm:px-6 lg:px-8
                  flex flex-row items-center justify-between"
        >
          <MainNav items={navLinks} />
        </div>
      </header>
      <main className="flex-1 pt-20 flex flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
};
export default MainLayout;
