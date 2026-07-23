export type DIYCategory = "Arts" | "Culture" | "Social" | "Sports";

const categoryColorMap: Record<DIYCategory, string> = {
	Arts: "bg-brand-blue",
	Culture: "bg-brand-green",
	Social: "bg-brand-yellow",
  Sports: "bg-brand-red",
};

/**
 * Returns the Tailwind bg-color class for a given event category.
 * Used to produce a colored left accent bar on cards.
 */
export function categoryBgColor(category: string): string {
	return categoryColorMap[category as DIYCategory] ?? "bg-brand-blue";
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
