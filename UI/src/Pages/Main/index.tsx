import {Fragment, useEffect, useRef, useState} from 'react'
import {Disclosure, Menu, Transition, Dialog} from '@headlessui/react'
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline'
import Modal from "@components/Modal";
import {Note, NoteArray} from "../../types/AppTypes";
import {Pagination} from "@components/Pagination";
import {NoteList} from "@components/NoteList";
import {useNavigate} from "react-router-dom";
import {useGetNotesQuery} from "../../redux/features/api/apiSlice";

const user = {
    name: 'Yassine Moutabih',
    email: 'yassine@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    {name: 'My Notes', href: '#', current: true},
]
const userNavigation = [
    {name: 'Your Profile', href: '#'},
    {name: 'Sign out', href: '#'},
]

const ExampleNotes = [
    {
        "id": "d3f7bbd1-7aa2-444f-bfa7-d606ffd170c3",
        "title": "Title 1",
        "description": "Description 1",
        "date": "2022-10-30T04:06:26.007Z"
    },
    {
        "id": "d3f7bbd1-7aa2-444f-bfa7-d606ffd170c4",
        "title": "Title 2",
        "description": "Description 2",
        "date": "2022-10-30T04:06:26.007Z"
    },
    {
        "id": "d3f7bbd1-7aa2-444f-bfa7-d606ffd170c5",
        "title": "Title 3",
        "description": "Description 3",
        "date": "2022-10-30T04:06:26.007Z"
    },
    {
        "id": "80bab3c9-e2e7-448a-805a-9d116f8b8281",
        "title": "Note 11",
        "description": "Descriptiom 11",
        "date": "2022-10-30T04:26:08.804Z"
    }
];

const EDIT_NOTE = "EDIT_NOTE"
const ADD_NOTE = "ADD_NOTE"

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export const Main = () => {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const [managedNote, setManagedNote] = useState({} as Note)
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [notesPerPage] = useState(10);
    const [eventType, setEventType] = useState("");
    const [noteList, setNoteList] = useState<NoteArray[]>([]);
    const {data: notes, isLoading, isSuccess, isError, error} = useGetNotesQuery();

    useEffect(() => {
        if (isLoading) {
            setLoading(true);
        } else {
            setLoading(false);
            setNoteList(ExampleNotes);
        }
    })

    // Get current posts
    const indexOfLastPost = currentPage * notesPerPage;
    const indexOfFirstPost = indexOfLastPost - notesPerPage;
    const currentNotes = noteList?.slice(indexOfFirstPost, indexOfLastPost);


    // Change page
    const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
    const navigate = useNavigate();

    function openModal(id: number) {
        // @ts-ignore
        setManagedNote(noteList.find((note: Note) => {
            return note.id === id;
        }))
        setOpen(true)
        setEventType(EDIT_NOTE);
    }

    function openAddNoteModal() {
        setOpen(true)
        setManagedNote({} as Note)
        setEventType(ADD_NOTE);
    }


    useEffect(() => {
        !localStorage.getItem('token') && navigate('/login');
    });

    return (
        <>
            <Modal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef} note={managedNote}
                   eventType={eventType}/>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-white border-b border-gray-200">
                    {({open}) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between h-16">
                                    <div className="flex">
                                        <div className="flex-shrink-0 flex items-center">
                                            <h2 className='font-bold text-2xl text-indigo-700'>NoteList</h2>
                                        </div>
                                        <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'border-indigo-500 text-gray-900'
                                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                        <button
                                            type="button"
                                            className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                        </button>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="ml-3 relative">
                                            <div>
                                                <Menu.Button
                                                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt=""/>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({active}) => (
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                    <div className="-mr-2 flex items-center sm:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button
                                            className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                            ) : (
                                                <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="sm:hidden">
                                <div className="pt-2 pb-3 space-y-1">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                                                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                                'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="pt-4 pb-3 border-t border-gray-200">
                                    <div className="flex items-center px-4">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt=""/>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-800">{user.name}</div>
                                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                                        </div>
                                        <button
                                            type="button"
                                            className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <div className="py-10">
                    <main>
                        <div className="w-[90%] mx-auto ">
                            <div className="px-4 sm:px-6 lg:px-8">
                                <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
                                        <p className="mt-2 text-sm text-gray-700">
                                            A list of all the notes in your account including their id, title,
                                            description.
                                        </p>
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                openAddNoteModal()
                                            }}
                                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                        >
                                            Add new note
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-8 flex flex-col">
                                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div
                                                className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                                <NoteList notes={currentNotes} openModal={openModal}/>
                                                <Pagination paginate={paginate}
                                                            currentNumberOfNotes={currentNotes?.length}
                                                            notesPerPage={notesPerPage}
                                                            totalNotes={noteList?.length}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
