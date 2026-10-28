/**
 * South Artists Network — Artist Roster Data
 *
 * IMPORTANT — Data Accuracy Notice:
 * These are representative placeholder profiles for the website showcase.
 * SAN's actual verified talent pool comprises 50+ talents including actors,
 * musicians, dancers & entertainment influencers from all five south states
 * (Tamil Nadu, Andhra Pradesh, Telangana, Karnataka, Kerala).
 *
 * Metrics shown are illustrative. Replace with verified artist data
 * when supplied by the business.
 *
 * Source: LinkedIn profile confirms 50+ talent pool across five south states.
 */

export const ARTISTS = [
  {
    id: "manisha-r",
    name: "Manisha R",
    category: "Actor",
    language: "Tamil",
    reach: 420,
    engagementRate: 6.8,
    city: "Chennai",
    specialty: "Feature films, brand campaigns & heritage fashion",
  },
  {
    id: "krithikaa-s",
    name: "Krithikaa S",
    category: "Creator",
    language: "Tamil",
    reach: 310,
    engagementRate: 7.4,
    city: "Chennai",
    specialty: "Culture commentary, lifestyle narrative & reels",
  },
  {
    id: "akshatha-k",
    name: "Akshatha K",
    category: "Influencer",
    language: "Kannada",
    reach: 265,
    engagementRate: 5.9,
    city: "Bengaluru",
    specialty: "Tech lifestyle, urban dining & travel vlogs",
  },
  {
    id: "pallavi-v",
    name: "Pallavi V",
    category: "Model",
    language: "Telugu",
    reach: 540,
    engagementRate: 4.6,
    city: "Hyderabad",
    specialty: "High editorial fashion, luxury couture & jewellery",
  },
  {
    id: "naleef-a",
    name: "Naleef A",
    category: "Creator",
    language: "Malayalam",
    reach: 198,
    engagementRate: 8.2,
    city: "Kochi",
    specialty: "Cinematography shorts, indie music & youth culture",
  },
  {
    id: "dev-anand",
    name: "Dev Anand",
    category: "Actor",
    language: "Telugu",
    reach: 880,
    engagementRate: 3.9,
    city: "Hyderabad",
    specialty: "Leading commercial cinema & pan-South brand endorsements",
  },
  {
    id: "meera-nair",
    name: "Meera Nair",
    category: "Dancer",
    language: "Malayalam",
    reach: 350,
    engagementRate: 5.1,
    city: "Kochi",
    specialty: "Classical & contemporary dance, award galas & cultural festivals",
  },
  {
    id: "karthik-j",
    name: "Karthik J",
    category: "Musician",
    language: "Tamil",
    reach: 620,
    engagementRate: 6.1,
    city: "Madurai",
    specialty: "Independent music, regional folk fusion & live performances",
  },
  {
    id: "sahana-rao",
    name: "Sahana Rao",
    category: "Influencer",
    language: "Kannada",
    reach: 240,
    engagementRate: 7.0,
    city: "Mysuru",
    specialty: "Sustainable living, artisanal textiles & wellness",
  },
  {
    id: "ishaan-p",
    name: "Ishaan P",
    category: "Model",
    language: "Tamil",
    reach: 175,
    engagementRate: 6.6,
    city: "Coimbatore",
    specialty: "Streetwear, fitness aesthetics & runway presentation",
  },
  {
    id: "priya-reddy",
    name: "Priya Reddy",
    category: "Actor",
    language: "Telugu",
    reach: 490,
    engagementRate: 5.5,
    city: "Visakhapatnam",
    specialty: "Telugu cinema, serial dramas & brand endorsements",
  },
  {
    id: "arun-kumar",
    name: "Arun Kumar",
    category: "Creator",
    language: "Tamil",
    reach: 380,
    engagementRate: 7.8,
    city: "Chennai",
    specialty: "Comedy sketches, movie reviews & entertainment content",
  },
];

export const CATEGORIES = [
  "All",
  "Actor",
  "Creator",
  "Influencer",
  "Model",
  "Musician",
  "Dancer",
];

export const LANGUAGES = [
  { value: "", label: "All languages" },
  { value: "Tamil", label: "Tamil" },
  { value: "Telugu", label: "Telugu" },
  { value: "Malayalam", label: "Malayalam" },
  { value: "Kannada", label: "Kannada" },
];

export const SORT_OPTIONS = [
  { value: "reach", label: "Most reach" },
  { value: "er", label: "Highest engagement" },
  { value: "name", label: "Name (A to Z)" },
];
