import type { MenuItem } from "@/types";

export const MainMenu: MenuItem[] = [
    {
        label: "Home",
        href: "/hamaynk/",
        // class: "hover:text-brand-blue",
        hoverClass: "hover:text-brand-blue",
        activeClass: "text-brand-blue",
    },
    {
        label: "About",
        href: "/hamaynk/about",
        hoverClass: "hover:text-brand-red",
        activeClass: "text-brand-red",
    },
    {
        label: "Resources",
        href: "/hamaynk/#",
        hoverClass: "hover:text-brand-blue",
        activeClass: "text-brand-blue",
        children: [
            {
              label: "Events List",
              href: "/hamaynk/events",
              hoverClass: "hover:text-brand-blue",
              activeClass: "text-brand-blue",
            },
            {
                label: "DIY Event Guides",
                href: "/hamaynk/diy-guides",
                hoverClass: "hover:text-brand-blue",
                activeClass: "text-brand-blue",
            },
            {
                label: "New England Armenian History Timeline",
                href: "/hamaynk/timeline",
                hoverClass: "hover:text-brand-blue",
                activeClass: "text-brand-blue",
            },
            {
                label: "Local Armenian Organizations",
                href: "/hamaynk/local-orgs",
                hoverClass: "hover:text-brand-blue",
                activeClass: "text-brand-blue",
            },
        ],
    },
    {
        label: "Contact",
        href: "/hamaynk/contact",
        hoverClass: "hover:text-brand-yellow",
        activeClass: "text-brand-yellow",
    },
];
