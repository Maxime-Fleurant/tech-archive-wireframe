
import { ArchiveItem, TickerItem } from './types';
import { 
    LayoutGrid, MonitorPlay, LayoutTemplate, Users, 
    FileText, Package, Cpu, Archive 
} from 'lucide-react';

// --- TICKER & HERO ---

export const TICKER_ITEMS: TickerItem[] = [
  { id: '1', text: 'SONY WALKMAN TPS-L2 ADDED TO ARCHIVE', type: 'NEW', timestamp: '09:42:01' },
  { id: '2', text: 'BRAUN ET66 CALCULATOR SPECS UPDATED', type: 'UPDATE', timestamp: '09:45:12' },
  { id: '3', text: 'ARCHIVE MAINTENANCE SCHEDULED 23:00 UTC', type: 'INFO', timestamp: '10:00:00' },
  { id: '4', text: 'NINTENDO GAME BOY [DMG-01] HI-RES SCANS UPLOADED', type: 'NEW', timestamp: '10:15:33' },
  { id: '5', text: 'APPLE MACINTOSH 128K SYSTEM SCHEMATICS', type: 'NEW', timestamp: '10:30:00' },
  { id: '6', text: 'USER_8829 JOINED THE ARCHIVE', type: 'INFO', timestamp: '10:45:22' },
];

export const HERO_ITEMS = [
  {
    id: 'h1',
    name: 'TEENAGE ENGINEERING OP-1',
    year: 2011,
    image: 'https://images.unsplash.com/photo-1629739884942-8678d138dd64?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: 'h2',
    name: 'SONY PVM-20L5',
    year: 2002,
    image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=2787&auto=format&fit=crop'
  },
  {
    id: 'h3',
    name: 'LEICA M6',
    year: 1984,
    image: 'https://images.unsplash.com/photo-1539609657022-7776dbdc524a?q=80&w=2835&auto=format&fit=crop'
  }
];

export const ITEM_OF_THE_DAY: ArchiveItem = {
  id: 'iotd-1',
  name: 'SONY DISCMAN D-50',
  brand: 'SONY CORP',
  year: 1984,
  category: 'AUDIO',
  imageUrl: 'https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=2787&auto=format&fit=crop', 
  description: "The D-50 was the first portable CD player. It was instrumental in popularizing the CD format and was priced to match the cost of the player itself.",
  specs: {
    "DIMENSIONS": "127 x 36.9 x 132.5 mm",
    "WEIGHT": "590g",
    "POWER": "9V DC / 6x AA Batteries",
    "FREQ RESPONSE": "20Hz - 20kHz",
    "DAC": "16-bit linear"
  },
  tags: ["PORTABLE", "HI-FI", "ALUMINUM", "REVOLUTIONARY"]
};

// --- MOCK PRODUCT BASE ---

export const MOCK_PRODUCT: ArchiveItem & { dashboardContextImages: string[]; dashboardContextVideo?: string } = {
    id: 'prod-001',
    name: 'WALKMAN TPS-L2',
    brand: 'SONY',
    modelNumber: 'TPS-L2',
    nickname: 'The Soundabout (US)',
    year: 1979,
    announceYear: 1979,
    releaseDate: '1979-07-01',
    launchEvent: 'SONY BUILDING TOKYO PRESS EVENT',
    originCountry: 'JAPAN',
    manufactureCountry: 'JAPAN',
    oem: 'SONY AUDIO DIV.',
    category: 'AUDIO',
    subCategory: 'PERSONAL CASSETTE PLAYER',
    designers: ['NOBUTOSHI KIHARA', 'AKIO MORITA (CONCEPT)', 'KOZO OHSQNE'],
    designLanguage: 'CONSTRUCTIVIST INDUSTRIAL',
    formFactor: 'BRICK / BELT-CLIP',
    launchColors: ['METALLIC BLUE / SILVER', 'GUYS & DOLLS (Red/Blue/White)'],
    dominantHex: '#3d5c94',
    materials: ['STAMPED ALUMINUM', 'ABS PLASTIC', 'FAUX LEATHER'],
    finish: 'ANODIZED SATIN',
    imageUrl: 'https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,trim=0;0;0;0,width=2560,height=2560/image/485432104/d9084f50-9e2a-4579-9ea3-4b62de608e66.png',
    dashboardContextImages: [
        'https://www.walkman-archive.com/gadgets/sony/tps-l2/sony_tps-l2_cat_05.jpg', 
        'https://img.walkman.land/sony/tps-l2/adv/1981_-_Sony_Audio_Neuheiten_TPS-L2_German.jpg', 
        'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1000&auto=format&fit=crop'
    ],
    dashboardContextVideo: 'Q2D8cqOslwk',
    description: "The TPS-L2 was the world's first low-cost portable stereo, forever changing the landscape of personal audio. Before its release, music was a stationary experience, bound to home hi-fi systems or bulky boomboxes. The Walkman liberated sound, allowing users to curate their own soundtrack for the city streets. Based on the Pressman dictation machine, engineer Nobutoshi Kihara removed the recording function to save space and added a stereo playback head. \n\nA defining feature of the TPS-L2 was the 'Hotline' button—a small orange key that activated an internal microphone, overlaying outside sound onto the music. This allowed two people listening via the dual headphone jacks to converse without removing their headsets, a feature designed to bridge the isolation of private listening. Though dropped in later models, it exemplifies the social anxieties surrounding this new form of technology.",
    wikiUrl: "https://en.wikipedia.org/wiki/Walkman",
    dimensions: '150 x 88 x 29 mm',
    weight: '390g (w/o batteries)',
    architecture: "SOLID STATE ANALOG",
    mediaSupport: ["COMPACT CASSETTE (TYPE I/II)"],
    storage: "N/A (EXTERNAL MEDIA)",
    hmiOnboard: ["MECHANICAL PLAY/STOP/EJECT", "ANALOG SLIDE VOLUME (L/R)", "HOTLINE BUTTON (MUTE)", "TONE SWITCH"],
    hmiPeripheral: ["MDR-3L2 HEADPHONES (INCLUDED)", "CARRYING CASE"],
    io: ["3.5mm HEADPHONE x2 (A/B)", "DC IN 3V", "MIC (HOTLINE)"],
    displayTech: "N/A",
    specs: {
        "FREQ RESPONSE": "40Hz - 12kHz",
        "OUTPUT": "15mW + 15mW",
        "HEAD": "FG Head",
        "MOTOR": "Coreless Motor"
    },
    launchPrice: 150, // USD
    inflationAdjustedPrice: 620, // USD approx
    unitsSold: "1.5 MILLION (First 2 years)",
    slogan: "LISTEN TO THE FUTURE",
    adAgency: "MCCANN ERICKSON",
    adMusic: "VARIOUS CLASSICAL & POP",
    predecessor: "SONY TC-D5 (CONCEPTUAL)",
    successor: "SONY WM-2",
    productFamily: "WALKMAN",
    competitors: ["AIWA TP-S30", "TOSHIBA KT-S1"],
    culturalCameos: ["GUARDIANS OF THE GALAXY", "STRANGER THINGS", "METAL GEAR SOLID V"],
    powerType: "BATTERY / DC ADAPTER",
    batteryType: "2x AA (1.5V)",
    certifications: ["JIS (JAPAN)"],
    os: ["N/A"],
    manualUrl: "#",
    schematicUrl: "#",
    packagingUrl: "#",
    audioUrl: "#",
    adVideoUrl: "#",
    vectorLogoUrl: "https://substackcdn.com/image/fetch/$s_!eeCu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F723291dc-ed1e-4961-8cd0-6b8ad2bcf676_6000x2288.png",
    tags: ["ICON", "PORTABLE", "BLUE", "ANALOG", "STEREO", "FIRST-GEN"],
    views: 124092,
    likes: 8920,
    uploadedBy: "ARCHIVIST_01",
    createdDate: "2024-02-15",
    lastModified: "2024-03-10"
};

// --- PRODUCT PAGE DATA ---

export const DETAILED_PRODUCT = {
    ...MOCK_PRODUCT,
    slogan: "WALKING STEREO",
    descriptionHook: "THE DEVICE THAT LIBERATED AUDIO FROM THE STATIONARY HOME, TURNING THE PUBLIC STREET INTO A PRIVATE LISTENING ROOM.",
    typology: {
        category: "AUDIO",
        subCategory: "Personal Cassette Player",
        nature: "Standard Production",
        ip: "Sony Walkman Legacy",
        grade: "Consumer / Mainstream",
        target: "Youth / Travelers / Music Lovers",
        mobility: "Portable / Belt-Clip",
        keywords: ["Analog", "Stereo", "Icon", "Revolutionary", "Tactile"]
    },
    timeline: {
        announceDate: "1979-06-22",
        releaseDate: "1979-07-01",
        eolDate: "1981",
        event: "Sony Building Press Event (Tokyo)",
        era: "The Walkman Era",
        eraTags: ["Analog Age", "Japanese Bubble Economy", "Pre-Internet"],
        competitors: ["Aiwa TP-S30", "Toshiba Walky KT-S1", "Panasonic RX-2700"]
    },
    branding: {
        brand: "SONY",
        line: "WALKMAN",
        parent: "SONY CORP.",
        oem: "SONY AUDIO DIV. (JAPAN)",
        collab: "N/A"
    },
    aesthetic: {
        primaryColor: "#3d5c94",
        secondaryColor: "#d1d1d1",
        colorName: "Metallic Blue / Silver",
        materials: ["Stamped Aluminum", "ABS Plastic", "Faux Leather"],
        finish: "Anodized Satin",
        formFactor: "Boxy / Brick",
        lighting: "LED - Red (Battery)",
        style: "Constructivist Industrial",
        designer: "Nobutoshi Kihara",
        agency: "Internal Design Center"
    },
    physical: {
        dimensions: "150 x 88 x 29 mm",
        weight: "390g",
        ruggedness: "Standard / Splash-Resistant Case",
        mechanical: ["Soft Eject Mechanism", "Tactile Push Buttons", "Spring-Loaded Door"]
    },
    tech: {
        base: "Solid State Analog",
        power: "2x AA Batteries (3V DC)",
        media: "Compact Cassette (Type I/II)",
        inputs: ["Internal Mic (Hotline)", "Tactile Buttons"],
        display: "LED Indicator (Battery/Op)",
        ports: ["2x 3.5mm Headphone (Stereo)", "DC In 3V", "Mic Activation Key"]
    },
    market: {
        status: "Global Blockbuster",
        sales: "1.5M+ (Series)",
        launchPrice: "$150.00 (1979)",
        adjPrice: "~$620.00 (2024)",
        valueTrend: "High / Rising"
    },
    culture: {
        cameos: ["Guardians of the Galaxy", "Stranger Things", "Metal Gear Solid V"],
        movements: ["Cassette Culture", "Personal Audio Revolution", "Retrogaming"]
    },
    resources: {
        official: [
             { label: "Archived Product Page", url: "#", source: "Sony Archive" },
             { label: "Original Press Release", url: "#", source: "Sony History" }
        ],
        wiki: [
            { label: "Wikipedia Entry", url: "#", source: "Wikipedia" },
            { label: "Walkman Central", url: "#", source: "Fan Wiki" }
        ],
        manuals: [
            { label: "Service Manual (PDF)", url: "#", source: "ManualsLib" },
            { label: "User Guide (Scan)", url: "#", source: "Archive.org" }
        ],
        community: [
             { label: "r/walkman", url: "#", source: "Reddit" },
             { label: "Stereo2Go Forums", url: "#", source: "Forum" }
        ],
        market: [
             { label: "Sold Listings", url: "#", source: "eBay / Terapeak" }
        ],
        visuals: [
             { label: "Teardown Gallery", url: "#", source: "iFixit" },
             { label: "Flickr Group", url: "#", source: "Flickr" }
        ]
    }
};

export const ASSET_MODES = [
    { id: 'ALL', label: 'ALL', icon: LayoutGrid },
    { id: 'TV_ADS', label: 'TV / ADS', icon: MonitorPlay },
    { id: 'UI_UX', label: 'INTERFACE', icon: LayoutTemplate },
    { id: 'COMMUNITY', label: 'COMMUNITY', icon: Users },
    { id: 'MANUALS', label: 'MANUALS', icon: FileText },
    { id: 'PACKAGING', label: 'PACKAGING', icon: Package },
    { id: 'INTERNALS', label: 'INTERNALS', icon: Cpu },
    { id: 'MISC', label: 'MISC', icon: Archive },
];

export const SUB_CATEGORIES: Record<string, string[]> = {
    TV_ADS: [ "Print Ads", "TV Commercials", "Magazine Features", "Press Kit", "Merchandising" ],
    UI_UX: [ "UI Screenshots", "Wallpapers", "Screensavers", "Boot Animation", "Icon Set" ],
    COMMUNITY: [ "Community Pics", "Mods & Customs", "Fan Art", "Memes" ],
    MANUALS: [ "User Manual", "Quick Start", "Service Manual", "Schematics" ],
    PACKAGING: [ "Box Art", "Full Shot", "Flatlay", "Ephemera" ],
    INTERNALS: [ "Teardown", "PCB", "Blueprints", "X-Ray" ],
    MISC: [ "Active State", "Scale Ref", "Macro", "Stickers" ],
};

export const COLOR_VARIANTS = [
    { name: 'Original Blue', hex: '#3d5c94' },
    { name: 'Guys & Dolls Red', hex: '#ef4444' },
    { name: 'Professional Black', hex: '#171717' }
];

export const ASSET_LIBRARY = [
    { src: 'https://i.redd.it/0sgj1iotcfgf1.gif', title: 'MECHANISM_LOOP', category: 'INTERNALS' },
    { src: 'https://i.pinimg.com/originals/0e/50/66/0e5066d9bcd989b2e874702d587e677f.gif', title: 'CASSETTE_SPIN', category: 'MISC' },
    { src: 'https://64.media.tumblr.com/80640423f7e94e3002c00e6e385ac2bc/96e66ef4fde4d9bb-5c/s500x750/054b5a799079ab6d025c4d135dbf4a393de929de.gif', title: 'WALKMAN_VIBE', category: 'TV_ADS' },
    { src: 'https://s3-alpha.figma.com/hub/file/3487260893/60fe399b-0ae2-4c32-a124-cade2df48b57-cover.png', title: 'VECTOR_ART', category: 'MISC' },
    { src: 'https://stereo2go.com/forums/attachments/sony-walkman-early-ad-12-15-1980-jpg.18905/', title: 'EARLY_AD_1980', category: 'TV_ADS' },
    { src: 'https://stereo2go.com/forums/attachments/sony81-65-jpg.37557/', title: 'CATALOG_81', category: 'MANUALS' },
    { src: 'https://stereo2go.com/forums/attachments/walkman-march-1980-jpg.30211/', title: 'MARCH_1980_Promo', category: 'TV_ADS' },
    { src: 'https://img.walkman.land/sony/tps-l2/adv/s-20190826154559.jpg', title: 'JAPAN_AD_SCAN', category: 'TV_ADS' },
    { src: 'https://www.walkman-archive.com/gadgets/sony/tps-l2/sony_tps-l2_cat_05.jpg', title: 'CATALOG_PAGE_05', category: 'MANUALS' },
    { src: 'https://i.ytimg.com/vi/WslNTxn_fm8/maxresdefault.jpg', title: 'TV_COMMERCIAL_STILL', category: 'TV_ADS' },
    { src: 'https://i.pinimg.com/736x/f0/62/c7/f062c78f7c0c824e493adc1099f248c9.jpg', title: 'LIFESTYLE_VINTAGE', category: 'MISC' },
    { src: 'https://www.walkman-archive.com/wa/wp-content/uploads/2015/02/SONY-Walkman-TPS-L2-Series-01.jpg', title: 'COLLECTION_LINEUP', category: 'PACKAGING' },
    { src: 'https://preview.redd.it/tajnoogg0k681.jpg?width=1080&crop=smart&auto=webp&s=8b0ac421f2475f2c21762bfcc28f473ff8e67938', title: 'REDDIT_USER_FIND', category: 'COMMUNITY' },
    { src: 'https://i.pinimg.com/736x/60/eb/1b/60eb1bd58f562bb08802d8cacb162282.jpg', title: 'RETRO_AESTHETIC', category: 'MISC' },
    { src: 'https://i.pinimg.com/1200x/4d/8d/ad/4d8dad92c616c387facd165f9ea7a7db.jpg', title: 'EXPLODED_VIEW', category: 'INTERNALS' },
    { src: 'https://i.pinimg.com/736x/48/e8/1a/48e81a7dc521a3a334365851d26a26b5.jpg', title: 'BLUEPRINT_STYLE', category: 'INTERNALS' },
    { src: 'https://www.cnet.com/a/img/resize/b3fe22130597b61aaefc9190961c0c7c4fb50744/hub/2014/01/27/f46133ff-a5c4-11e3-a24e-d4ae52e62bcc/sony-walkman-adventures-3.jpg?auto=webp&width=1200', title: 'CNET_ARCHIVE', category: 'TV_ADS' },
    { src: 'https://cdn.i-scmp.com/sites/default/files/d8/images/methode/2019/08/13/c34a6d02-bca8-11e9-8f25-9b5536624008_image_hires_005759.jpg', title: 'SCMP_RETRO', category: 'MISC' },
    { src: 'https://cdna.artstation.com/p/assets/images/images/066/029/804/large/ilya-safonov-promo-01-1.jpg?1691852494', title: 'ARTSTATION_RENDER', category: 'UI_UX' },
    { src: 'https://flints.blob.core.windows.net/stock/13851-9.jpg?v=63802500268343', title: 'FLINT_STOCK', category: 'PACKAGING' },
    { src: 'https://blogs.library.duke.edu/bitstreams/files/2015/05/1980sblog_walkman.jpg', title: 'DUKE_ARCHIVE', category: 'COMMUNITY' },
    { src: 'https://cdnb.artstation.com/p/assets/images/images/049/016/651/original/declan-thomas-walkman-turnaround.gif?1651505881', title: 'TURNAROUND_GIF', category: 'INTERNALS' },
    { src: 'https://i.pinimg.com/1200x/81/ed/6b/81ed6bb952ef1208c96795d4ac5d0ed2.jpg', title: 'PINTEREST_FIND', category: 'MISC' },
];

export const TAG_POOL = ['CYBERPUNK', 'VAPORWAVE', 'ANALOG', 'SONY', '1980s', 'CASSETTE', 'MECHANICAL', 'CHROME', 'LO-FI', 'TACTILE', 'JAPAN', 'TOKYO', 'NEON', 'MODULAR', 'PROTOTYPE', 'RARE', 'LIMITED', 'IMPORT'];

export const SOUND_TRACKS = [
    { id: 1, label: 'EJECT_MECH' },
    { id: 2, label: 'TAPE_HISS' },
    { id: 3, label: 'MOTOR_SPIN' },
    { id: 4, label: 'BTN_CLICK' },
];

// --- NAVIGATION & FILTERS ---

export const CATEGORIES = [
  "AUDIO", "COMPUTING", "IMAGING", "GAMING", "TELEPHONY", "HOUSEHOLD", "HOROLOGY"
];

export const BRANDS = [
  "BRAUN", "SONY", "APPLE", "NINTENDO", "YAMAHA", "CASIO", "LEICA", "BANG & OLUFSEN", "IBM", "COMMODORE"
];

export const MATERIALS = [
  "ALUMINUM", "BEIGE PLASTIC", "TRANSLUCENT", "TITANIUM", "WOOD", "POLYCARBONATE"
];

// --- LOGO COLLECTION (HERO SCROLL) ---

export const LOGOS = [
    // Group 1: Natural (Colors preserved)
    { id: 'sie', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Sony_Interactive_Entertainment_logo_%282016%29.svg", className: "logo-natural" },
    { id: 'playstation', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/c/cf/PlayStation_logo_colour_3.svg", className: "logo-natural" },
    { id: 'set_india', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/5/57/SET_India_logo.svg", className: "logo-natural" },
    { id: 'jbl', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/1/1e/JBL-Logo.svg", className: "logo-natural" },
    { id: 'apple', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/8/84/Apple_Computer_Logo_rainbow.svg", className: "logo-natural" },
    { id: 'ibm', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/4/49/IBM_rgb_logo.svg", className: "logo-natural" },
    { id: 'aix', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/4/45/AIX_logo_old.svg", className: "logo-natural" },
    { id: 'amiga', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/d/da/Commodore_Amiga_logo-07.svg", className: "logo-natural" },
    { id: 'commodore64', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Commodore_64.svg", className: "logo-natural" },
    { id: 'sinclair', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Sinclair_ZX_Spectrum-03.svg", className: "logo-natural" },
    { id: 'raspberry', type: 'img', src: "https://static.wikia.nocookie.net/logopedia/images/c/cb/Raspberry_Pi_Logo.svg", className: "logo-natural" },
    { id: 'gameboycolor', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Game_Boy_Color_logo.svg", className: "logo-natural" },
    { id: 'bsnes', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/2/20/Bsnes_logo_%28Super_Famicom_derivative%29.svg", className: "logo-natural" },
    { id: 'megadrive', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/6/63/MegaDriveJPLogo.svg", className: "logo-natural" },
    { id: 'playstation2', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/c/cf/PlayStation_logo_colour_3.svg", className: "logo-natural" },
    { id: 'neogeopocket', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/5/55/Neo_Geo_Pocket_Color_logo.svg", className: "logo-natural" },
    { id: 'wd', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Western_Digital_brand_mark.svg", className: "logo-natural" },
    { id: 'packardbell', type: 'img', src: "https://static.wikia.nocookie.net/logopedia/images/b/b1/Packard_Bell_%281994%29_Symbol.svg", className: "logo-natural" },
    { id: 'sgi', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Silicon_Graphics_%28sgi%29_tricolour_logo.svg", className: "logo-natural" },
    { id: 'colecovision', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/9/9a/COLECO_VISION_LOGO.svg", className: "logo-natural" },
    { id: 'hudson', type: 'img', src: "https://static.wikia.nocookie.net/logopedia/images/1/12/Hudson.svg", className: "logo-natural" },
    { id: 'konica', type: 'img', src: "https://static.wikia.nocookie.net/logopedia/images/0/0f/Konica_logo.svg", className: "logo-natural" },
    { id: 'shure', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Shure_Logo_2024.svg", className: "logo-natural" },
    { id: 'atari400', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/4/46/Atari_400_logo-06.svg", className: "logo-natural" },
    { id: 'htc', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/HTC.svg", className: "logo-natural" },
    { id: 'nintendo_seal', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Nintendo_Official_Seal.svg", className: "logo-natural" },
    { id: 'gamecube', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/7/79/GC_Logo.svg", className: "logo-natural" },
    { id: 'dreamcast', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/5/59/Dreamcast_swirl.svg", className: "logo-natural" },
    { id: 'segacd', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Sega_CD_Logo.svg", className: "logo-natural" },
    { id: 'xbox', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/7/75/Vectorial_Xbox_logo.svg", className: "logo-natural" },
    { id: 'kodak', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/9/98/Logo_Kodak_%28alt%29.svg", className: "logo-natural" },
    { id: 'nikon', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Nikon_Logo.svg", className: "logo-natural" },
    { id: 'razer', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/5/52/Razer_wordmark.svg", className: "logo-natural" },
    { id: 'iomega', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/5/58/Iomega-ZIP-250-Logo.svg", className: "logo-natural" },
    { id: 'rotel', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Logo_ROTEL.svg", className: "logo-natural" },
    { id: 'jabra', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Jabra_logo.svg", className: "logo-natural" },
    { id: 'nvidia', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/f/f1/NVIDIA_logo_white.svg", className: "logo-natural" },
    { id: 'sun', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/3/30/Sun_Microsystems_1980s_logo.svg", className: "logo-natural" },
    { id: 'realme', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Realme_logo.svg", className: "logo-natural" },
    { id: 'wiko', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Wiko_logo.svg", className: "logo-natural" },
    { id: 'danger', type: 'img', src: "https://static.wikia.nocookie.net/logopedia/images/1/14/Danger_logo.svg", className: "logo-natural" },
    { id: 'hp', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/b/be/HP_logo_1979_brighter_blue.svg", className: "logo-natural" },
    { id: 'dell', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg", className: "logo-natural" },
    { id: 'asus', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/8/86/Asus_blue_logo.svg", className: "logo-natural" },
    { id: 'samsung', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Samsung_Electro-Mechanics_logo_%28korean%29.svg", className: "logo-natural" },
    { id: 'sega_blue', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/2/25/Sega_dark_blue.svg", className: "logo-natural" },
    { id: 'bandai', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Bandai_Spirits_logo.svg", className: "logo-natural" },
    { id: 'ue', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Ultimate_Ears_%28logo%29.svg", className: "logo-natural" },
    { id: 'emachines', type: 'img', src: "https://static.wikia.nocookie.net/logopedia/images/f/f6/EMachines_%281998%29_with_a_Green_Circle.svg", className: "logo-natural" },
    { id: 'fujitsu', type: 'img', src: "https://static.wikia.nocookie.net/logopedia/images/6/63/Fujitsu_1972-1988_era%2C_English%2C_tall.svg", className: "logo-natural" },
    { id: 'meizu', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Meizu_logo_blue.svg", className: "logo-natural" },
    { id: 'aiwa', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Aiwa-new-Logo.svg", className: "logo-natural" },
    { id: 'akai', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/4/46/Akai_brand_logo.svg", className: "logo-natural" },
    { id: 'beats', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/1/17/Beats_Electronics_logo.svg", className: "logo-natural" },
    { id: 'atari_jaguar', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Atari_Jaguar_logo.svg", className: "logo-natural" },
    { id: 'atari_2600', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Atari_2600_logo.svg", className: "logo-natural" },
    { id: 'compaq', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Compaq_logo_1993.svg", className: "logo-natural" },
    { id: 'family_basic', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Family_BASIC_logo.svg", className: "logo-natural" },
    { id: 'nintendo_systems', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/7/76/Logo-nintendo-systems.svg", className: "logo-natural" },
    { id: 'pc_engine', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/2/21/PC_engine_logo_red.svg", className: "logo-natural" },
    { id: 'leica', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Leica_Camera.svg", className: "logo-natural" },
    { id: 'fujifilm', type: 'img', src: "https://static.wikia.nocookie.net/logopedia/images/1/12/Fujifilm_1980.svg", className: "logo-natural" },
    { id: 'cherry', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Cherry_logo_2012.svg", className: "logo-natural" },
    { id: 'magnavox', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Magnavox_Odyssey_Logo.svg", className: "logo-natural" },
    { id: 'imation', type: 'img', src: "https://cdn.worldvectorlogo.com/logos/imation-logo-1.svg", className: "logo-natural" },
    { id: 'alcatel', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Alcatel_Logo_%28last%29.svg", className: "logo-natural" },
    { id: 'nec', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/3/30/NEC-APC-badge.svg", className: "logo-natural" },
    { id: 'sony', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg", className: "logo-invert" },
    { id: 'walkman', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Walkman_logo_%281981-2000%29.svg", className: "logo-invert" },
    { id: 'bose', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Bose_logo.svg", className: "logo-invert" },
    { id: 'marshall', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Marshall_logo.svg", className: "logo-invert" },
    { id: 'nakamichi', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Nakamichi_Logo.svg", className: "logo-invert" },
    { id: 'harman', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/4/40/Harman_Kardon_logo.svg", className: "logo-invert" },
    { id: 'vaio', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/3/35/Vaio.svg", className: "logo-invert" },
    { id: 'blackberry', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/2/22/Blackberry_Logo.svg", className: "logo-invert" },
    { id: 'neogeo', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/0/00/Neogeo-logo.svg", className: "logo-invert" },
    { id: 'corsair', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Corsair_2020_logo.svg", className: "logo-invert" },
    { id: 'tamagotchi', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Tamagotchi_logo_black_no-tm.svg", className: "logo-invert" },
    { id: 'koss', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/KOSS_Corporation_logo.svg", className: "logo-invert" },
    { id: 'nothing', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Nothing_OS_wordmark.svg", className: "logo-invert" },
    { id: 'braun', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/1/16/Braun_Logo.svg", className: "logo-invert" },
    { id: 'roland', type: 'img', src: "https://static.wikia.nocookie.net/logopedia/images/8/8e/Roland.svg", className: "logo-invert" },
    { id: '3do', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/a/aa/3DO_Logo.svg", className: "logo-invert" },
    { id: 'marantz', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Marantz_%28logo%29.svg", className: "logo-invert" },
    { id: 'polaroid', type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Polaroid_logo.svg", className: "logo-red-invert" },
    { id: 'kyocera', type: 'img', src: "https://static.wikia.nocookie.net/logopedia/images/9/99/Kyocera_1982.svg", className: "logo-red-invert" },
];
