export type EventsCategory = "CT" | "ME" | "MA" | "NH" | "RI" | "VT";

const categoryColorMap: Record<EventsCategory, string> = {
	CT: "bg-brand-blue",
	ME: "bg-brand-green",
	MA: "bg-brand-yellow",
  NH: "bg-brand-red",
  RI: "bg-brand-red",
  VT: "bg-brand-red",
};

/**
 * Returns the Tailwind bg-color class for a given event category.
 * Used to produce a colored left accent bar on cards.
 */
export function categoryBgColor(category: string): string {
	return categoryColorMap[category as EventsCategory] ?? "bg-brand-blue";
}

export function categoryLabel(category: string): string {
	return category.charAt(0).toUpperCase() + category.slice(1);
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
