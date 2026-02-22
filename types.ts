
export interface ArchiveItem {
  id: string;
  name: string;
  brand: string;
  modelNumber?: string;
  nickname?: string;
  
  // Chronology (2)
  year: number;
  announceYear?: number;
  releaseDate?: string;
  launchEvent?: string;
  originCountry?: string;
  manufactureCountry?: string;
  oem?: string;

  // Design (3)
  category: string;
  subCategory?: string;
  designers?: string[];
  designLanguage?: string;
  formFactor?: string;
  launchColors?: string[]; // Official names
  dominantHex?: string;
  materials?: string[];
  finish?: string;

  // Visuals
  imageUrl: string;
  gallery?: string[];
  
  // Description
  description: string;
  wikiUrl?: string;
  
  // Physical (4)
  dimensions?: string; // HxWxD
  weight?: string; // grams
  
  // Specs (6)
  architecture?: string;
  mediaSupport?: string[];
  storage?: string;
  hmiOnboard?: string[];
  hmiPeripheral?: string[]; // Added
  io?: string[];
  displayTech?: string; // Added
  specs: Record<string, string>; // Generic fallback
  
  // Commercial (5)
  launchPrice?: number;
  inflationAdjustedPrice?: number;
  unitsSold?: string;
  slogan?: string;
  adAgency?: string;
  adMusic?: string;

  // Legacy (7)
  predecessor?: string;
  successor?: string;
  productFamily?: string;
  competitors?: string[];
  culturalCameos?: string[];

  // Electrical (9)
  powerType?: string;
  batteryType?: string;
  certifications?: string[];

  // Ecosystem (10)
  os?: string[];
  
  // Assets (8)
  manualUrl?: string;
  schematicUrl?: string;
  adVideoUrl?: string;
  audioUrl?: string;
  packagingUrl?: string;
  pressKitUrl?: string;
  explodedViewUrl?: string;
  uiCapturesUrl?: string;
  easterEggs?: string[];
  wallpapersUrl?: string;
  ringtonesUrl?: string;
  magCoversUrl?: string;
  vectorLogoUrl?: string;

  tags: string[];

  // Meta (11)
  views?: number;
  likes?: number;
  uploadedBy?: string;
  createdDate?: string;
  lastModified?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface TickerItem {
  id: string;
  text: string;
  type: 'NEW' | 'UPDATE' | 'INFO';
  timestamp: string;
}