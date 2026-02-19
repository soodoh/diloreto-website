import siteData from "~/data/site-data.json";
import type { Person, HistoryRecord, HomePageData } from "~/types";

export async function fetchPeople(): Promise<Person[]> {
  return siteData.people as Person[];
}

export async function fetchHomePage(): Promise<HomePageData> {
  return siteData.homePage as HomePageData;
}

export async function fetchFamilyHistory(): Promise<HistoryRecord[]> {
  return siteData.familyHistory as HistoryRecord[];
}
