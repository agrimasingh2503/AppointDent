import { type JSX } from 'solid-js/jsx-runtime'
import logo from '../../../assets/logo.png'
import { A } from '@solidjs/router'
import { createSignal } from 'solid-js'

export default function DentistForm (): JSX.Element {
  const [userEmail, setUserEmail] = createSignal('')
  const [userPassword, setUserPassword] = createSignal('')
  const [userFirstName, setUserFirstName] = createSignal('')
  const [userLastName, setUserLastName] = createSignal('')
  const [userCity, setUserCity] = createSignal('')
  const [userStreet, setUserStreet] = createSignal('')
  const [userHouseNumber, setUserHouseNumber] = createSignal('')
  const [userZipcode, setUserZipcode] = createSignal('')
  const [userPicture, setUserPicture] = createSignal('')

  const signup = (): void => {
    console.log(userEmail())
    console.log(userPassword())
    console.log(userFirstName())
    console.log(userLastName())
    console.log(userCity())
    console.log(userStreet())
    console.log(userHouseNumber())
    console.log(userZipcode())
    console.log(userPicture())
  }

  return <>
  <div class="h-full w-full bg-white flex flex-col items-center justify-center">
        <div class="lg:w-3/4 w-5/6 flex flex-col text-black rounded-sm bg-gradient-to-b from-neutral ... lg:px-10 px-5 py-3 text-sm font-medium">
            <div class="flex items-center justify-center">
                <img class="w-40 " src={logo} alt="AppointDent" />
            </div>
            <h1 class="mb-2 mt-4 text-lg">Create a dentist account</h1>
            <p class="mb-6 font-extralight">Welcome to AppointDent! Sign up as a dentist. </p>
          <input
          class="input h-12 px-3 py-2 mb-3 border rounded-xl"
          type="text"
          placeholder="Email"
          onChange={(event) => setUserEmail(event.target.value)}
        />
        <input
          class="input h-12 px-3 py-2 mb-3 border rounded-xl"
          type="password"
          placeholder="Password"
          onChange={(event) => setUserPassword(event.target.value)}
        />
          <div class="flex flex-row">
            <input
              class="input h-12 w-full px-3 py-2 mb-3 md:mb-0 mr-2 border rounded-xl"
              type="text"
              placeholder="First name"
              onChange={(event) => setUserFirstName(event.target.value)}
            />
            <input
              class="input h-12 w-full px-3 py-2 mb-3 border rounded-xl"
              type="text"
              placeholder="Last name"
              onChange={(event) => setUserLastName(event.target.value)}
            />
          </div>
          <div class="flex flex-row">
            <input
              class="input h-12 w-full px-3 py-2 mb-3  mr-2  border rounded-xl"
              type="text"
              placeholder="City"
              onChange={(event) => setUserCity(event.target.value)}
            />
            <input
              class="input h-12 w-full px-3 py-2 mb-3  border rounded-xl"
              type="text"
              placeholder="Street"
              onChange={(event) => setUserStreet(event.target.value)}
            />
          </div>
          <div class="flex flex-row">
            <input
              class="input h-12 w-full px-3 py-2 mb-3  mr-2  border rounded-xl"
              type="text"
              placeholder="House number"
              onChange={(event) => setUserHouseNumber(event.target.value)}
            />
            <input
              class="input h-12 w-full px-3 py-2 mb-3  border rounded-xl"
              type="text"
              placeholder="Zipcode"
              onChange={(event) => setUserZipcode(event.target.value)}
            />
          </div>
          <input
              class="input h-12 w-full px-3 py-2 mb-6  border rounded-xl"
              type="file"
              accept=".jpeg, .jpg, .png"
              placeholder="Upload a profile image"
              onChange={(event) => setUserPicture(event.target.value)}
            />

        <button type="submit" class="log-in-btn h-12 mb-6 bg-secondary rounded-xl text-base" onclick={signup} >
            Create account
            </button>
        <p class="font-extralight">Already have an account?
        <span class="font-medium">
        <A href="/"> Log in.</A>
            </span>
          </p>
        </div>
      </div>
    </>
}
