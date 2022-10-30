import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';
import {useDispatch} from "react-redux";
import {authenticate} from "../../redux/features/login/loginSlice";
import {useAuthenticateMutation} from "../../redux/features/api/apiSlice";
import localforage from "localforage";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('email is required'),
});
export const Login = () => {

    const [authenticate] = useAuthenticateMutation();
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.getItem('token') && navigate('/');
    })
    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={SignupSchema}
                            validateOnBlur={true}
                            validateOnChange={true}
                            onSubmit={values => {
                                // same shape as initial values
                                console.log(values);
                                authenticate(values).unwrap().then((result) => {
                                    localStorage.setItem('token', result.tokenId);
                                    navigate('/');
                                });
                            }}
                        >
                            {({errors, touched, dirty, isValid}) => (
                                <Form className="space-y-6">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-1">
                                            <Field
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            {errors.email && touched.email ? (
                                                <div className='text-red-500 font-medium mt-1'>{errors.email}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Password
                                        </label>
                                        <div className="mt-1">
                                            <Field
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            {errors.password && touched.password ? (
                                                <div className='text-red-500 font-medium mt-1'>{errors.password}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            disabled={!dirty || !isValid}
                                            className="w-full disabled:bg-gray-400 disabled:text-black disabled:cursor-not-allowed justify-center cursor-pointer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};
