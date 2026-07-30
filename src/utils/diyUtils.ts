export type DIYInterest =
  | "Arts"
  | "Causes"
  | "Culture"
  | "Education"
  | "Religion"
  | "Social"
  | "Sports";

const interestColorMap: Record<DIYInterest, string> = {
  Arts: "bg-brand-blue",
  Causes: "bg-brand-purple",
  Culture: "bg-brand-green",
  Education: "bg-brand-orange",
  Religion: "bg-brand-pink",
  Social: "bg-brand-yellow",
  Sports: "bg-brand-red",
};

const interestLabelMap: Record<DIYInterest, string> = {
  Arts: "Arts",
  Causes: "Causes",
  Culture: "Culture",
  Education: "Education",
  Religion: "Religion",
  Social: "Social",
  Sports: "Sports",
};

export function interestBgColor(interest: DIYInterest): string {
  return interestColorMap[interest] || "bg-gray-300";
}

export function interestLabel(interest: DIYInterest): string {
  return interestLabelMap[interest] || interest;
}
