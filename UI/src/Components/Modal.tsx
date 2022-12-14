import React, {Fragment} from 'react';

import {Disclosure, Menu, Transition, Dialog} from '@headlessui/react'
import {Note} from "../types/AppTypes";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useAddNewNoteMutation} from "../redux/features/api/apiSlice";

type ModalProps = {
    note: Note,
    open: boolean,
    setOpen: (open: boolean) => void
    cancelButtonRef: React.RefObject<HTMLButtonElement>
    eventType: string
}

const noteSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required!'),
    description: Yup.string().required('description is required!'),
});


const Modal = ({cancelButtonRef, setOpen, open, note, eventType}: ModalProps) => {
    const [addNote, {isLoading, isSuccess, isError, error}] = useAddNewNoteMutation();
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3"
                                                          className="text-lg mb-4 uppercase font-medium leading-6 text-gray-900">
                                                {eventType == 'ADD_NOTE' ? 'Add Note' : 'Edit Note'}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <Formik
                                                    initialValues={{
                                                        title: '',
                                                        description: '',
                                                        date: new Date().toISOString()
                                                    }}
                                                    validationSchema={noteSchema}
                                                    validateOnBlur={true}
                                                    validateOnChange={true}
                                                    onSubmit={values => {
                                                        if (eventType == 'ADD_NOTE') {
                                                            addNote(values).unwrap().then((res) => {
                                                                setOpen(false);
                                                            });
                                                        }
                                                    }}
                                                >
                                                    {({errors, touched, dirty, isValid}) => (
                                                        <Form className="space-y-3">
                                                            <div>
                                                                <label
                                                                    htmlFor="email"
                                                                    className="block text-sm font-medium text-gray-700"
                                                                >
                                                                    Note Title
                                                                </label>
                                                                <div className="mt-1">
                                                                    <Field
                                                                        id="title"
                                                                        name="title"
                                                                        value={note.title}
                                                                        type="text"
                                                                        required
                                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                    />
                                                                    {errors.title && touched.title ? (
                                                                        <div
                                                                            className='text-red-500 font-medium mt-1'>{errors.title}</div>
                                                                    ) : null}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label
                                                                    htmlFor="password"
                                                                    className="block text-sm font-medium text-gray-700"
                                                                >
                                                                    Description
                                                                </label>
                                                                <div className="mt-1">
                                                                    <Field
                                                                        as="textarea"
                                                                        id="description"
                                                                        name="description"
                                                                        value={note.description}
                                                                        type="text"
                                                                        required
                                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                    />
                                                                    {errors.description && touched.description ? (
                                                                        <div
                                                                            className='text-red-500 font-medium mt-1'>{errors.description}</div>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                            <div className="mt-0">
                                                                <button
                                                                    type="submit"
                                                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                                                                >
                                                                    {eventType == 'ADD_NOTE' ? 'Add Note' : 'Edit Note'}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                                    onClick={() => setOpen(false)}
                                                                    ref={cancelButtonRef}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>)
};

export default Modal;
