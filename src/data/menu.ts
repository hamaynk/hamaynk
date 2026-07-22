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
        href: "/#about",
        hoverClass: "hover:text-brand-red",
        activeClass: "text-brand-red",
    },
    {
        label: "Teachers",
        href: "/teachers",
        hoverClass: "hover:text-brand-blue",
        activeClass: "text-brand-blue",
    },
    {
        label: "Blog",
        href: "/blog",
        hoverClass: "hover:text-brand-green",
        activeClass: "text-brand-green",
    },
    {
        label: "Contact",
        href: "/contact",
        hoverClass: "hover:text-brand-yellow",
        activeClass: "text-brand-yellow",
    },
];