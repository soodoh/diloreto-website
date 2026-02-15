import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import Tile from '~/components/Tile'
import PersonModal from '~/components/PersonModal'
import ContactModal from '~/components/ContactModal'
import { fetchPeople, fetchHomePage } from '~/lib/contentful'
import type { Person } from '~/types'

const getHomeData = createServerFn({ method: 'GET' }).handler(async () => {
  const [people, homePage] = await Promise.all([fetchPeople(), fetchHomePage()])
  return { people, homePage }
})

export const Route = createFileRoute('/')({
  loader: () => getHomeData(),
  head: () => ({
    meta: [
      { title: 'The DiLoreto Family' },
      {
        name: 'description',
        content:
          "The DiLoreto Family's home page. Are you a DiLoreto? View our extensive family history and lineage section, or learn more about John, Donna, Carolyn and Paul.",
      },
    ],
  }),
  component: HomePage,
})

function HomePage() {
  const { people, homePage } = Route.useLoaderData()
  const [contactActive, setContactActive] = useState(false)
  const [personActive, setPersonActive] = useState(false)
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null)
  const transitionDelay = 300

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
              setCurrentPerson(person)
              setPersonActive(true)
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
          setPersonActive(false)
          setCurrentPerson(null)
        }}
        data={currentPerson}
      />
    </>
  )
}
