import { Menu, TrendingUp, Terminal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: JSX.Element;
  items?: MenuItem[];
  onClick?: () => void;
}

interface NavbarProps {
  onNavClick?: (link: string) => void;
}

export const Navbar = ({ onNavClick }: NavbarProps) => {
  const handleNavigation = (url: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();

    if (url === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (onNavClick) onNavClick('home');
      return;
    }

    const id = url.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (onNavClick) onNavClick(id);
    }
  };

  const logo = {
    url: "#home",
    title: "AlphaLabs",
  };

  const menu: MenuItem[] = [
    {
      title: "Home",
      url: "#home",
      onClick: () => handleNavigation('#home')
    },
    {
      title: "Products",
      url: "#products",
      items: [
        {
          title: "Crypto Terminal",
          description: "Real-time order flow, CVD, and market intelligence for crypto futures traders.",
          icon: <TrendingUp className="size-5 shrink-0 text-[#FF6B6B]" />,
          url: "#product",
          onClick: () => handleNavigation('#product')
        },
        {
          title: "Data Trading Terminal",
          description: "Advanced forex analytics with currency strength meter and institutional feeds.",
          icon: <Terminal className="size-5 shrink-0 text-[#FF6B6B]" />,
          url: "#product",
          onClick: () => handleNavigation('#product')
        },
      ],
    },
    {
      title: "Pricing",
      url: "#pricing",
      onClick: () => handleNavigation('#pricing')
    },
    {
      title: "Social",
      url: "#social",
      onClick: () => handleNavigation('#social')
    },
  ];

  const auth = {
    login: { text: "Log in", url: "mailto:hello@alphalabs.xyz?subject=Login%20Request" },
    signup: { text: "Request Access", url: "mailto:hello@alphalabs.xyz?subject=Early%20Access%20Request" },
  };

  return (
    <section className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6">
        <nav className="hidden justify-between lg:flex py-4">
          <div className="flex items-center gap-6">
            <a
              href={logo.url}
              className="flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('#home');
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B6B] to-[#ff5252] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AL</span>
              </div>
              <span className="text-lg font-semibold text-white">{logo.title}</span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item, handleNavigation))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <a href={auth.login.url}>{auth.login.text}</a>
            </Button>
            <Button asChild size="sm" className="bg-[#FF6B6B] hover:bg-[#ff5252] text-black font-semibold">
              <a href={auth.signup.url}>{auth.signup.text}</a>
            </Button>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between py-4">
            <a
              href={logo.url}
              className="flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('#home');
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B6B] to-[#ff5252] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AL</span>
              </div>
              <span className="text-lg font-semibold text-white">{logo.title}</span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-black border-white/10">
                <SheetHeader>
                  <SheetTitle>
                    <a
                      href={logo.url}
                      className="flex items-center gap-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation('#home');
                      }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B6B] to-[#ff5252] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">AL</span>
                      </div>
                      <span className="text-lg font-semibold text-white">
                        {logo.title}
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item, handleNavigation))}
                  </Accordion>
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <a href={auth.login.url}>{auth.login.text}</a>
                    </Button>
                    <Button asChild className="bg-[#FF6B6B] hover:bg-[#ff5252] text-black font-semibold">
                      <a href={auth.signup.url}>{auth.signup.text}</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem, handleNavigation: (url: string, e?: React.MouseEvent) => void) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-zinc-300">
        <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3 bg-[#0a0e1a] border border-white/10">
            <NavigationMenuLink>
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <a
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 text-white"
                    href={subItem.url}
                    onClick={(e) => {
                      e.preventDefault();
                      if (subItem.onClick) {
                        subItem.onClick();
                      } else {
                        handleNavigation(subItem.url);
                      }
                    }}
                  >
                    {subItem.icon}
                    <div>
                      <div className="text-sm font-semibold">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-zinc-400">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <a
      key={item.title}
      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
      href={item.url}
      onClick={(e) => {
        e.preventDefault();
        if (item.onClick) {
          item.onClick();
        } else {
          handleNavigation(item.url);
        }
      }}
    >
      {item.title}
    </a>
  );
};

const renderMobileMenuItem = (item: MenuItem, handleNavigation: (url: string, e?: React.MouseEvent) => void) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b border-white/10">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline text-white">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-white/10 text-white"
              href={subItem.url}
              onClick={(e) => {
                e.preventDefault();
                if (subItem.onClick) {
                  subItem.onClick();
                } else {
                  handleNavigation(subItem.url);
                }
              }}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-zinc-400">
                    {subItem.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a
      key={item.title}
      href={item.url}
      className="font-semibold text-white hover:text-[#FF6B6B] transition-colors"
      onClick={(e) => {
        e.preventDefault();
        if (item.onClick) {
          item.onClick();
        } else {
          handleNavigation(item.url);
        }
      }}
    >
      {item.title}
    </a>
  );
};
