import Layout from '../../components/Layout'
import { API_URL } from '../../config/index'
import EventItem from '../../components/EventItem'
import Pagination from '../../components/Pagination'

const PER_PAGE = 5


export default function EventsPage({ events, page, total }) {
    // console.log(events);

    const lastPage = Math.ceil(total / PER_PAGE)

    // console.log(lastPage);
    // console.log(total);
    // console.log(page);

    return (
        <Layout>
            <h1>Events</h1>
            {events.length === 0 && <h3>No Events to Show</h3>}
            {events.map(evt => (
                <EventItem key={evt.id} evt={evt}>
                    {evt.name}
                </EventItem>
            ))}
            <Pagination page={page} lastPage={lastPage} />
        </Layout>
    )
}

export async function getServerSideProps({ query: { page = 1 } }) {
    // console.log(page);
    //Clac start page
    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

    //Fetch total
    const totalRes = await fetch(`${API_URL}/events/count`)
    const total = await totalRes.json()

    // Fetch events
    const evtRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
    const events = await evtRes.json()
    return {
        props: { events, page: +page, total }
    }
}