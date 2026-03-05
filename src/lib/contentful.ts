import siteData from "~/data/site-data.json";
import type { Person, HistoryRecord, HomePageData } from "~/types";

export function fetchPeople(): Person[] {
  return siteData.people as Person[];
}

export function fetchHomePage(): HomePageData {
  return siteData.homePage as HomePageData;
}

export function fetchFamilyHistory(): HistoryRecord[] {
  return siteData.familyHistory as HistoryRecord[];
}
