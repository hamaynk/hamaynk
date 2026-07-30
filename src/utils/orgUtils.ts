export type OrgState = "CT" | "ME" | "MA" | "NH" | "RI" | "VT";
export type OrgType =
  | "religious"
  | "cultural"
  | "educational"
  | "politically affiliated"
  | "athletics"
  | "professional"
  | "humanitarian"
  | "media";

// Color mappings for states
export const stateColorMap: Record<OrgState, string> = {
  CT: "bg-brand-blue",
  ME: "bg-brand-green",
  MA: "bg-brand-yellow",
  NH: "bg-brand-red",
  RI: "bg-purple-300",
  VT: "bg-orange-300",
};

// Color mappings for types
export const typeColorMap: Record<OrgType, string> = {
  religious: "bg-brand-blue",
  cultural: "bg-brand-green",
  educational: "bg-brand-yellow",
  "politically affiliated": "bg-brand-red",
  athletics: "bg-pink-300",
  professional: "bg-gray-300",
  humanitarian: "bg-orange-300",
  media: "bg-purple-300",
};

// Human-readable labels for types
export const typeLabels: Record<OrgType, string> = {
  religious: "Religious",
  cultural: "Cultural",
  educational: "Educational",
  "politically affiliated": "Politically Affiliated",
  athletics: "Athletics",
  professional: "Professional",
  humanitarian: "Humanitarian",
  media: "Media",
};

// Lowercase conversion for type strings
const lowerCaseTypeMap: Record<string, OrgType> = {
  religious: "religious",
  cultural: "cultural",
  educational: "educational",
  "politically affiliated": "politically affiliated",
  athletics: "athletics",
  professional: "professional",
  humanitarian: "humanitarian",
  media: "media",
};

// State label function
export const stateLabel = (state: OrgState): string => state;

// Type label function
export const typeLabel = (type: OrgType): string => typeLabels[type];

// Normalize type(s) to a lowercase OrgType array
export const normalizeType = (type: string | string[] | OrgType | OrgType[]): OrgType[] => {
  const input = Array.isArray(type) ? type : [type];

  return input
    .map((t) => {
      const lowercase = String(t).toLowerCase() as OrgType;
      return lowerCaseTypeMap[lowercase] || lowercase;
    })
    .filter(Boolean);
};

// Background color for state
export const stateBgColor = (state: OrgState): string => stateColorMap[state];

// Background color for type
export const typeBgColor = (type: OrgType): string => typeColorMap[type];
