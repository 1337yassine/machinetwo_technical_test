import React from 'react'
import {Note} from "../types/AppTypes";
import {SingleNote} from "@components/SingleNote";
import {useDeleteNoteMutation} from "../redux/features/api/apiSlice";

type NoteListProps = {
    notes: Note[],
    openModal: (noteId: number) => void
}

export const NoteList: React.FC<NoteListProps> = ({notes, openModal}: NoteListProps) => {

    const [deleteNote] = useDeleteNoteMutation();

    function deleteNoteById(id: number) {
        deleteNote({Id: id}).unwrap().then(() => {
            console.log('note deleted');
        });

    }

    return (
        <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
            <tr>
                <th scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Note Id
                </th>
                <th scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Title
                </th>
                <th scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Edit
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Delete
                </th>
            </tr>
            </thead>
            <tbody className="bg-white">
            {notes?.map((note, noteIdx) => (
                <tr key={note.id}
                    className={noteIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {note.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{note.title}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{note.description}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-medium">
                        <a href="#"
                           onClick={() => openModal(note.id)}
                           className="text-indigo-600 hover:text-indigo-900">
                            Edit<span className="sr-only">, {note.id}</span>
                        </a>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-bold">
                        <a href="#"
                           onClick={() => deleteNoteById(note.id)}
                           className="text-red-600 hover:text-indigo-900">
                            Delete<span className="sr-only">, {note.id}</span>
                        </a>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}


