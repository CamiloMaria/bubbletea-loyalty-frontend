'use client'

import { useAuth } from '@/lib/hooks/useAuth'
import { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'

export function Navbar() {
    const { user, logout } = useAuth()

    return (
        <nav className="bg-white shadow-sm border-b border-brand-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex flex-shrink-0 items-center">
                            <Link href="/dashboard">
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                />
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <Menu as="div" className="relative ml-3">
                            <MenuButton className="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2">
                                <span className="sr-only">Abrir menú de usuario</span>
                                <UserCircleIcon className="h-8 w-8 text-gray-400" />
                            </MenuButton>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-brand-100 focus:outline-none">
                                    <div className="px-4 py-2 text-sm text-gray-700">
                                        <p className="font-medium">{user?.name}</p>
                                        <p className="text-gray-500">{user?.email}</p>
                                    </div>
                                    <hr />
                                    <MenuItem>
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Mi Perfil
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            onClick={() => logout()}
                                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </nav>
    )
}