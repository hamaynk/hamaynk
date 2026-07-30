export type State = "CT" | "ME" | "MA" | "NH" | "RI" | "VT";
export type Category = "Arts" | "Causes" | "Culture" | "Education" | "Religion" | "Social" | "Sports";
export type AgeGroup = "Kids" | "Teens" | "18+" | "21+" | "All ages";

const stateColorMap: Record<State, string> = {
	CT: "bg-brand-blue",
	ME: "bg-brand-green",
	MA: "bg-brand-yellow",
	NH: "bg-brand-red",
	RI: "bg-brand-red",
	VT: "bg-brand-red",
};

/**
 * Returns the Tailwind bg-color class for a given state.
 * Used to produce a colored left accent bar on cards.
 */
export function stateBgColor(state: string): string {
	return stateColorMap[state as State] ?? "bg-brand-blue";
}

/**
 * Returns an array of categories, handling both single and multiple inputs.
 */
export function categoryLabels(categories: Category | Category[]): Category[] {
	return Array.isArray(categories) ? categories : [categories];
}

/**
 * Returns an array of age groups, handling both single and multiple inputs.
 */
export function ageGroupLabels(ageGroups: AgeGroup | AgeGroup[]): AgeGroup[] {
	return Array.isArray(ageGroups) ? ageGroups : [ageGroups];
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

/**
 * Returns the month name for a given date.
 */
export function getMonthName(date: Date): string {
	return date.toLocaleDateString("en-US", { month: "long" });
}

/**
 * Returns the month-year key for a given date (e.g., "January-2026").
 */
export function getMonthYearKey(date: Date): string {
	return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/**
 * Determines which date filter category an event belongs to.
 * Returns: "this-week", "this-month", or the month-year key (e.g., "January-2026")
 */
export function getDateCategory(eventDate: Date): string {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const eventDateNormalized = new Date(eventDate);
	eventDateNormalized.setHours(0, 0, 0, 0);

	const daysUntilEvent = Math.floor(
		(eventDateNormalized.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
	);

	// Check if event is this week (0-6 days from today)
	if (daysUntilEvent >= 0 && daysUntilEvent <= 6) {
		return "this-week";
	}

	// Check if event is this month
	if (
		eventDateNormalized.getMonth() === today.getMonth() &&
		eventDateNormalized.getFullYear() === today.getFullYear()
	) {
		return "this-month";
	}

	// Return the month-year key for all other events
	return getMonthYearKey(eventDate);
}

/**
 * Gets all unique date categories from an array of dates.
 * Returns an array with "this-week" and "this-month" first, then all other months in chronological order.
 */
export function getAllDateCategories(dates: Date[]): string[] {
	const categories = new Set<string>();

	dates.forEach((date) => {
		categories.add(getDateCategory(date));
	});

	const thisWeek = categories.has("this-week");
	const thisMonth = categories.has("this-month");
	const otherMonths = Array.from(categories)
		.filter((cat) => cat !== "this-week" && cat !== "this-month")
		.sort((a, b) => {
			const dateA = new Date(a + " 1");
			const dateB = new Date(b + " 1");
			return dateA.getTime() - dateB.getTime();
		});

	const result: string[] = [];
	if (thisWeek) result.push("this-week");
	if (thisMonth) result.push("this-month");
	result.push(...otherMonths);

	return result;
}

/**
 * Gets a display label for a date category filter.
 */
export function getDateCategoryLabel(category: string): string {
	if (category === "this-week") return "This Week";
	if (category === "this-month") return "This Month";
	return category; // Returns "January 2026", "February 2026", etc.
}
