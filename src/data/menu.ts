import type { MenuItem } from "@/types";

export const MainMenu: MenuItem[] = [
    {
        label: "Home",
        href: "/",
        // class: "hover:text-brand-blue",
        hoverClass: "hover:text-brand-blue",
        activeClass: "text-brand-blue",
    },
    {
        label: "About",
        href: "/about",
        hoverClass: "hover:text-brand-red",
        activeClass: "text-brand-red",
    },
    {
        label: "Resources",
        href: "/#",
        hoverClass: "hover:text-brand-blue",
        activeClass: "text-brand-blue",
        children: [
            {
              label: "Events List",
              href: "/events",
              hoverClass: "hover:text-brand-blue",
              activeClass: "text-brand-blue",
            },
            {
                label: "DIY Event Guides",
                href: "/diy-guides",
                hoverClass: "hover:text-brand-blue",
                activeClass: "text-brand-blue",
            },
            {
                label: "New England Armenian History Timeline",
                href: "/timeline",
                hoverClass: "hover:text-brand-blue",
                activeClass: "text-brand-blue",
            },
            {
                label: "Local Armenian Organizations",
                href: "/local-orgs",
                hoverClass: "hover:text-brand-blue",
                activeClass: "text-brand-blue",
            },
        ],
    },
    {
        label: "Contact",
        href: "/contact",
        hoverClass: "hover:text-brand-yellow",
        activeClass: "text-brand-yellow",
    },
];
