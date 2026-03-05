import { useState } from "react";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import Tile from "~/components/tile";
import PersonModal from "~/components/person-modal";
import ContactModal from "~/components/contact-modal";
import { fetchPeople, fetchHomePage } from "~/lib/contentful";
import type { Person, HomePageData } from "~/types";

const getHomeData = createServerFn({ method: "GET" }).handler(() => {
  const people = fetchPeople();
  const homePage = fetchHomePage();
  return { people, homePage };
});

export function HomePage(): JSX.Element {
  const { people, homePage }: { people: Person[]; homePage: HomePageData } =
    useLoaderData({ from: "/" });
  const [contactActive, setContactActive] = useState(false);
  const [personActive, setPersonActive] = useState(false);
  const [currentPerson, setCurrentPerson] = useState<Person | undefined>(
    undefined,
  );
  const transitionDelay = 300;

  return (
    <>
      <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-2 max-w-[1200px] p-2 mx-auto mb-20">
        {people.map((person, index) => (
          <Tile
            key={person.id}
            delay={transitionDelay * (index + 1)}
            image={person.portrait}
            label={person.firstName}
            onClick={() => {
              setCurrentPerson(person);
              setPersonActive(true);
            }}
          />
        ))}

        <Tile
          label="Photos"
          image={homePage.photosThumbnail}
          delay={transitionDelay * (people.length + 1)}
        />
        <Tile
          image={homePage.familyHistoryThumbnail}
          delay={transitionDelay * (people.length + 2)}
          label="Family History"
          link="/areyou"
        />
        <Tile
          image={homePage.contactThumbnail}
          delay={transitionDelay * (people.length + 3)}
          label="Contact"
          onClick={() => setContactActive(true)}
        />
      </div>

      <ContactModal
        open={contactActive}
        onClose={() => setContactActive(false)}
        people={people}
      />
      <PersonModal
        open={personActive}
        onClose={() => {
          setPersonActive(false);
          setCurrentPerson(undefined);
        }}
        data={currentPerson}
      />
    </>
  );
}

export const Route = createFileRoute("/")({
  loader: async () => getHomeData(),
  head: () => ({
    meta: [
      { title: "The DiLoreto Family" },
      {
        name: "description",
        content:
          "The DiLoreto Family's home page. Are you a DiLoreto? View our extensive family history and lineage section, or learn more about John, Donna, Carolyn and Paul.",
      },
    ],
  }),
  component: HomePage,
});
