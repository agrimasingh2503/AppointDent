import { type JSX } from 'solid-js/jsx-runtime'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { For, Show, createEffect, createSignal } from 'solid-js'
import { patientRoutes } from './routes'
import { fadeIn, fadeOut, hamburger, notify, slideIn, slideOut, toggleHamburger, toggleNotification } from './animation'
import location from '../../assets/location.png'
import { Api } from '../../utils/api'
import profile from '../../assets/profile.png'
import ServicesUnavailable from '../ServicesUnavailable/ServicesUnavailable'

const logout = async (): Promise<void> => {
  const endpoints = ['/dentists/logout', '/patients/logout', '/admins/logout']

  for (const endpoint of endpoints) {
    try {
      await Api.delete(endpoint, { withCredentials: true })
      window.location.replace('/')
      return // If logout is successful, exit the function
    } catch (error) {
      console.error(`Error during logout from ${endpoint}`, error)
    }
  }
}

const userType = async (): Promise<string> => {
  const response = await Api.get('sessions/whois', { withCredentials: true })
  return response.data.type
}

createEffect(async () => {
  const type = await userType()
  setType(type)
  switch (type) {
    case 'd':
      setLogoLink('/calendar')
      break

    case 'p':
      setRoutes(patientRoutes)
      setLogoLink('/map')
      break

    case 'a':
      setLogoLink('/notifications') // TODO: replace with admin dashboard when it's added on FE
      break

    default:
      break
  }
})

const [routes, setRoutes] = createSignal<any[]>()
const [logoLink, setLogoLink] = createSignal<string>('')
const [type, setType] = createSignal<string>('')

export default function Navbar (): JSX.Element {
  return <>
    <nav class="bg-primary text-white zAbove">
        <div class="mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button onClick={toggleHamburger} type="button" class="hamburger relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none" aria-controls="mobile-menu" aria-expanded="false">
                <span class="absolute -inset-0.5"></span>
                <span class="sr-only">Open main menu</span>

                <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <a href={logoLink()} class="flex flex-shrink-0 items-center">
                    <img class="h-8 w-auto" src={logo} alt="AppointDent" />
                </a>
                <div class="hidden md:ml-6 ml-2 sm:block">
                <div class="flex ">
                    <For each={routes()}>{(route, index) =>
                        <div class="flex row">
                            <a href={route.href} class="rounded-md px-2 md:px-3 py-2 text-sm font-medium">{route.name}</a>
                            {route.name === 'Explore' && <img class="w-6 h-6 mt-1" src={location} alt="Arrow left" />}
                            {index() === 0 && <div class='border-l h-auto ml-2 lg:ml-5 bg-white' style="color: white;"/>}
                        </div>
                    }</For>
                </div>
                </div>
            </div>
            <ServicesUnavailable />
                <div class="flex items-center sm:static sm:inset-auto ">
            <a href="/notifications">
                <button onClick={toggleNotification} type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none">
                    <span class="absolute -inset-1.5"></span>
                    <span class="sr-only">View notifications</span>
                    <svg class="h-6 w-6 notification" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                </button>
            </a>
            <div class="inset-y-0 right-0 absolute top-10">
                <Show when={notify()}>
                    <div class={fadeIn() ? 'notification fade-in-element' : fadeOut() ? 'notification fade-out-element' : 'notification'}>
                        <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                            <p class="block px-4 py-2 text-sm text-primary">No notifications!</p>
                        </div>
                    </div>
                </Show>
            </div>
        </div>
        <div class="relative ml-2 md:ml-4">
                <div>
                    <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span class="sr-only">Open user menu</span>
                    {type() !== 'a' &&
                    <a href="/user-profile">
                        <img class="h-8 w-8 rounded-full" src={profile} alt=""></img>
                    </a>
                    }
                    </button>
                </div>

                </div>
            <div class='ml-2 md:ml-4'>
                <button onclick={() => {
                  logout()
                    .catch((error) => {
                      console.error('Error logging out:', error)
                    })
                }}>Log out</button>
            </div>
            </div>

                    </div>

            </nav>
            <Show when={hamburger()}>
                <div class={ slideIn() ? 'slide-in-element bg-primary zUnder' : slideOut() ? 'slide-out-element bg-primary zUnder' : 'bg-primary zUnder' }>
                    <div id="">
                        <div class="space-y-1 px-2 pb-3 pt-2">
                        <For each={routes()}>{(route) =>
                                <a href={route.href} class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">{route.name}</a>

                            }</For>
                        </div>
                    </div>
                </div>
                </Show>
            </>
}
