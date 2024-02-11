"use client";

import styles from "./form.module.sass";
import { v4 as uuidv4 } from 'uuid';
import { useState, useRef, useEffect } from 'react';
import { ref, set } from 'firebase/database';
import { database } from "../../_firebase";
import { useFormik, resetForm } from 'formik';
import * as yup from 'yup';


export default function AddUser() {
    const form = useRef(null);

    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const formik = useFormik({
        initialValues: {
            phone: '',
            name: '',
        },
        onSubmit: async (values, { resetForm }) => {
            setMessage('Form submitted');
            setSubmitted(true);


            if (form.current) {
                const user_name = form.current.name.value;
                const user_phone = form.current.phone.value;
                const user_id = uuidv4();
                if (user_name.length > 0 && user_phone.length > 0) {
                    writeUserData(user_id, user_name, user_phone);
                    form.current.reset();
                    resetForm();
                    setShowMessage(true);
                }
            }

        },
        validationSchema: yup.object({
            name: yup.string().trim().required('Name is required'),
            phone: yup.string().trim().required('Phone is required').matches(/^\+?\d{10,14}$/, 'Invalid phone number'),
        }),
    });

    function writeUserData(userId: any, name: any, phone: any) {
        const db = database;
        set(ref(db, 'users/' + userId), {
            username: name,
            phone: phone
        });
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowMessage(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [showMessage]);

    return (
        <form className={styles.form} onSubmit={formik.handleSubmit} ref={form} method="POST" noValidate>
            <div className={styles.form_control}>
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="John Doe"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.name && (
                    <div className={styles.text_danger}>{formik.errors.name}</div>
                )}
            </div>

            <div className={styles.form_control}>
                <label htmlFor="phone" className={styles.form_label}>
                    Phone
                </label>
                <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="+777 777 777 77 77"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.phone && (
                    <div className={styles.text_danger}>{formik.errors.phone}</div>
                )}
            </div>

            <button type="submit" className="btn btn-primary">
                Send
            </button>

            {showMessage && (
                <div hidden={!submitted} className={styles.form_send} role="alert">
                    {message}
                </div>
            )}
        </form>
    );
}
