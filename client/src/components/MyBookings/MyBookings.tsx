import { For, createSignal, onCleanup, type JSX } from 'solid-js'
import Booking from './Booking'
import { type Appointment } from './types'

interface MyBookingsProps {
  appointments: Appointment[]
}

export default function MyBookings (props: MyBookingsProps): JSX.Element {
  const [appointments, setAppointments] = createSignal([
    {
      id: '1',
      time: 'November 19, 10:00',
      dentistName: 'Dr. Smith',
      location: 'Dental Clinic A'
    },
    {
      id: '2',
      time: 'November 18, 10:00',
      dentistName: 'Dr. Johnson',
      location: 'Dental Clinic B'
    },
    {
      id: '3',
      time: 'November 20, 10:00',
      dentistName: 'Dr. Williams',
      location: 'Dental Clinic C'
    }
  ])

  /**
   * Removes the selected appointment from the array of appointments.
   * @param id The id of the appointment being cancelled.
   */
  const handleCancelBooking = (id: string): void => {
    setAppointments((prevAppointments: Appointment[]) => {
      const newAppointments = prevAppointments.filter(appointment => appointment.id !== id)
      return newAppointments
    })
  }

  // Cleanup the signal to prevent memory leaks
  onCleanup(() => {
    setAppointments([])
  })

  return (
    <div class="h-full w-full flex flex-col justify-start items-center">
      <div class='w-full flex justify-start m-10'>
        <h1 class='text-2xl font-bold pl-10'>My bookings</h1>
      </div>
      <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full'>
        <For each={appointments()}>{(appointment: Appointment) => (
          <Booking
          // pass in the appointment as props
            {...appointment}
            onCancel={() => { handleCancelBooking(appointment.id) }}
          />
        )}</For>
      </div>
    </div>
  )
}
