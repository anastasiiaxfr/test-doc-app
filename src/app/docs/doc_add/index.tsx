'use client';
import styles from "./form.module.sass";
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ref, set } from 'firebase/database';
import { database } from "../../_firebase";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Input from './input';

export default function AddDoc() {
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const form = useRef<HTMLFormElement>(null);
    const formik = useFormik({
        initialValues: {
            name: '',
            spec: '',
            slots: []
        },
        onSubmit: async (values) => {
            setMessage('Form submitted');
            setShowMessage(true);
            setSubmitted(true);

            const doc_id = uuidv4();
            const { name, spec, slots } = values;

            if (name && spec && slots.length > 0 && form.current) {
                writeUserData(doc_id, name, spec, slots);
                form.current.reset();
                formik.resetForm();
            }
        },
        validationSchema: yup.object({
            name: yup.string().trim().required('Name is required'),
            spec: yup.string().trim().required('Spec is required')
        }),
    });

    function writeUserData(userId: any, name: any, spec: any, slots: any) {
        const db = database;
        set(ref(db, 'docs/' + userId), {
            doc_name: name,
            doc_spec: spec,
            doc_slots: slots.join(', ')
        });
    }

    useEffect(() => {
        if (submitted) {
            document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
        }
    }, [submitted]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowMessage(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [showMessage]);

    return (
        <form onSubmit={formik.handleSubmit} method="POST" noValidate className={styles.form} ref={form}>
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
                <label htmlFor="spec" className={styles.form_label}>
                    Spec
                </label>
                <input
                    type="tel"
                    name="spec"
                    className="form-control"
                    placeholder="Therapist"
                    value={formik.values.spec}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.spec && (
                    <div className={styles.text_danger}>{formik.errors.spec}</div>
                )}
            </div>
            <div>


                <table className={styles.form_datetime}>
                    <tbody>
                        <tr>
                            <th>&nbsp;</th>
                            <th>10:00</th>
                            <th>11:00</th>
                            <th>12:00</th>
                            <th>14:00</th>
                            <th>15:00</th>
                            <th>16:00</th>
                            <th>17:00</th>
                            <th>18:00</th>
                            <th>19:00</th>
                        </tr>
                        <tr>
                            <th>пн</th>
                            <td><Input formik={formik} value="пн-10:00" /></td>
                            <td><Input formik={formik} value="пн-11:00" /></td>
                            <td><Input formik={formik} value="пн-12:00" /></td>
                            <td><Input formik={formik} value="пн-14:00" /></td>
                            <td><Input formik={formik} value="пн-15:00" /></td>
                            <td><Input formik={formik} value="пн-16:00" /></td>
                            <td><Input formik={formik} value="пн-17:00" /></td>
                            <td><Input formik={formik} value="пн-18:00" /></td>
                            <td><Input formik={formik} value="пн-19:00" /></td>
                        </tr>
                        <tr>
                            <th>вт</th>
                            <td><Input formik={formik} value="вт-10:00" /></td>
                            <td><Input formik={formik} value="вт-11:00" /></td>
                            <td><Input formik={formik} value="вт-12:00" /></td>
                            <td><Input formik={formik} value="вт-14:00" /></td>
                            <td><Input formik={formik} value="вт-15:00" /></td>
                            <td><Input formik={formik} value="вт-16:00" /></td>
                            <td><Input formik={formik} value="вт-17:00" /></td>
                            <td><Input formik={formik} value="вт-18:00" /></td>
                            <td><Input formik={formik} value="вт-19:00" /></td>
                        </tr>
                        <tr>
                            <th>ср</th>
                            <td><Input formik={formik} value="ср-10:00" /></td>
                            <td><Input formik={formik} value="ср-11:00" /></td>
                            <td><Input formik={formik} value="ср-12:00" /></td>
                            <td><Input formik={formik} value="ср-14:00" /></td>
                            <td><Input formik={formik} value="ср-15:00" /></td>
                            <td><Input formik={formik} value="ср-16:00" /></td>
                            <td><Input formik={formik} value="ср-17:00" /></td>
                            <td><Input formik={formik} value="ср-18:00" /></td>
                            <td><Input formik={formik} value="ср-19:00" /></td>
                        </tr>
                        <tr>
                            <th>чт</th>
                            <td><Input formik={formik} value="чт-10:00" /></td>
                            <td><Input formik={formik} value="чт-11:00" /></td>
                            <td><Input formik={formik} value="чт-12:00" /></td>
                            <td><Input formik={formik} value="чт-14:00" /></td>
                            <td><Input formik={formik} value="чт-15:00" /></td>
                            <td><Input formik={formik} value="чт-16:00" /></td>
                            <td><Input formik={formik} value="чт-17:00" /></td>
                            <td><Input formik={formik} value="чт-18:00" /></td>
                            <td><Input formik={formik} value="чт-19:00" /></td>
                        </tr>
                        <tr>
                            <th>пт</th>
                            <td><Input formik={formik} value="пт-10:00" /></td>
                            <td><Input formik={formik} value="пт-11:00" /></td>
                            <td><Input formik={formik} value="пт-12:00" /></td>
                            <td><Input formik={formik} value="пт-14:00" /></td>
                            <td><Input formik={formik} value="пт-15:00" /></td>
                            <td><Input formik={formik} value="пт-16:00" /></td>
                            <td><Input formik={formik} value="пт-17:00" /></td>
                            <td><Input formik={formik} value="пт-18:00" /></td>
                            <td><Input formik={formik} value="пт-19:00" /></td>
                        </tr>
                        <tr>
                            <th>сб</th>
                            <td><Input formik={formik} value="сб-10:00" /></td>
                            <td><Input formik={formik} value="сб-11:00" /></td>
                            <td><Input formik={formik} value="сб-12:00" /></td>
                            <td><Input formik={formik} value="сб-14:00" /></td>
                            <td><Input formik={formik} value="сб-15:00" /></td>
                            <td><Input formik={formik} value="сб-16:00" /></td>
                            <td><Input formik={formik} value="сб-17:00" /></td>
                            <td><Input formik={formik} value="сб-18:00" /></td>
                            <td><Input formik={formik} value="сб-19:00" /></td>
                        </tr>
                        <tr>
                            <th>вс</th>
                            <td><Input formik={formik} value="вс-10:00" /></td>
                            <td><Input formik={formik} value="вс-11:00" /></td>
                            <td><Input formik={formik} value="вс-12:00" /></td>
                            <td><Input formik={formik} value="вс-14:00" /></td>
                            <td><Input formik={formik} value="вс-15:00" /></td>
                            <td><Input formik={formik} value="вс-16:00" /></td>
                            <td><Input formik={formik} value="вс-17:00" /></td>
                            <td><Input formik={formik} value="вс-18:00" /></td>
                            <td><Input formik={formik} value="вс-19:00" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button type="submit">Send</button>

            {showMessage && (
                <div role="alert" className={styles.form_send}>
                    {message}
                </div>
            )}
        </form>
    );
}
