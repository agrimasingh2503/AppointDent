import { type JSX } from 'solid-js/jsx-runtime'
import { createSignal } from 'solid-js'
import './LoginForm.css'
import logo from '../../assets/logo.png'
import { A } from '@solidjs/router'
import { Api } from '../../utils/api'
// import { type UserType } from '../../utils/types'

export default function LoginForm (): JSX.Element { // props: { userType: UserType }
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [error, setError] = createSignal<string | null>(null)

  const login = async (): Promise<void> => {
    try {
      // Attempt to login as a dentist
      await Api.post('/dentists/login', { email: email(), password: password() }, { withCredentials: true })

      // Dentist login successful, redirect to dentist-specific page
      window.location.replace('/calendar')
    } catch (dentistError) {
      try {
        // If dentist login fails, attempt patient login
        await Api.post('/patients/login', { email: email(), password: password() }, { withCredentials: true })

        // Patient login successful, redirect to patient-specific page
        window.location.replace('/map')
      } catch (patientError) {
        // Both dentist and patient login failed, handle the error
        console.error('Error during login', patientError)
        setError('Login failed. Please check your credentials and try again.')
      }
    }
  }

  return <>
  <div class="h-full w-full bg-white flex flex-col items-center justify-center">
        <div class="lg:w-3/4 w-5/6 flex flex-col text-black rounded-sm bg-gradient-to-b from-neutral ... px-10 py-10 text-sm font-medium">
            <div class="flex items-center justify-center">
                <img class="w-40 " src={logo} alt="AppointDent" />
            </div>
            <h1 class="mb-4 mt-10 text-lg">Log in</h1>
            <p class="mb-10 font-extralight">Hello, welcome back to AppointDent!</p>
          <input
          class="input h-12 px-3 py-2 mb-5 border rounded-xl"
          type="text"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          />
        <input
          class="input h-12 px-3 py-2 mb-8 border rounded-xl"
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        {error() !== null && <p class="text-error">{error()}</p>}
        <button type="submit" class="log-in-btn h-12 mb-10 bg-secondary rounded-xl text-base"
        onClick={login}>
            Log in
            </button>
        <p class="font-extralight">Not registered yet?
        <span class="font-medium">
        <A class='text-black' href="/signup"> Create an account.</A>
            </span>
          </p>
        </div>
      </div>
    </>
}
