import React from 'react'
import {Note} from "../types/AppTypes";

export const SingleNote = ({id, title, description}: Note) => {
    return (
        <div key={id}
             className={"grow mr-2 p-6 my-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 hover:cursor-pointer"}>
            <h5 className={"mb-2 text-2xl font-bold tracking-tight text-gray-900 capitalize"}>{title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
        </div>
    )
}
