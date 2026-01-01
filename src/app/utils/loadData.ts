import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

export interface MapCenter {
  lat: number;
  lng: number;
  zoom: number;
  section_title: string;
}

export interface Marker {
  id: number;
  lat: number;
  lng: number;
  title: string;
  image: string;
  description: string;
}

export interface Ticker {
  items: string[];
}

export interface Content {
  title: string;
  text1?: string;
  text2?: string;
}

export interface Hike {
  id: number;
  image: string;
  title: string;
  description: string;
  alltrails: string;
  directions: string;
}

export interface Hikes {
  section_title: string;
  items: Hike[];
}

export interface BirthdayData {
  center: MapCenter;
  markers: Marker[];
  ticker: Ticker;
  content: Content;
  hikes: Hikes;
}

/**
 * Loads and parses the birthday vibes YAML file
 * @returns Parsed birthday data
 */
export function loadBirthdayData(): BirthdayData {
  const filePath = join(process.cwd(), 'data', 'bday_vibes.yaml');
  const fileContents = readFileSync(filePath, 'utf8');
  const data = parse(fileContents) as BirthdayData;
  
  return data;
}

