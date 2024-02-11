'use client'
import styles from "./form.module.sass"
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { database } from "../../_firebase"
import { ref, set, off, push, onValue, DataSnapshot } from 'firebase/database'

import { useFormik } from 'formik'
import * as yup from 'yup'

interface UserData {
    [key: string]: {
        user_name: string
        user_phone: string
    }
}

interface DocData {
    [key: string]: {
        doc_name: string
        doc_spec: string
        doc_slots: string
        selectedSlots: Set<string>

    }
}

export default function AddOffer() {
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const form = useRef<HTMLFormElement>(null)

    const [userData, setUserData] = useState<UserData | null>(null)
    const [docData, setDocData] = useState<DocData | null>(null)


    useEffect(() => {
        const dbRef = ref(database, 'users')

        const handleDataChange = (snapshot: DataSnapshot) => {
            const data = snapshot.val()
            if (data) {
                setUserData(data)
            }
        }

        const handleError = (error: any) => {
            console.error('Error reading data:', error)
        }

        onValue(dbRef, handleDataChange, handleError)

        return () => {
            off(dbRef, 'value', handleDataChange)
        }
    }, [])

    useEffect(() => {
        const db = ref(database, 'docs')

        const handleDocDataChange = (snapshot: any) => {
            const data = snapshot.val()
            if (data) {
                Object.keys(data).forEach((docId: string) => {
                    data[docId].selectedSlots = new Set<string>()
                })
                setDocData(data)
            }
        }

        const handleError = (error: any) => {
            console.error('Error reading doctor data:', error)
        }

        onValue(db, handleDocDataChange, handleError)

    }, [])

    const formik = useFormik({
        initialValues: {
            user: '',
            doc: '',
            slot: ''
        },
        onSubmit: async (values) => {
            setMessage('Form submitted')
            setShowMessage(true)

            const id = uuidv4()
            const { user, doc, slot } = values

            if (user && doc && slot && form.current) {
                writeData(id, user, doc, slot)
                form.current.reset()
                formik.resetForm()
            }
        },
        validationSchema: yup.object({
            user: yup.string().trim().required('User Name is required'),
            doc: yup.string().trim().required('Doc Name is required'),
            slot: yup.string().trim().required('Slot is required')
        }),
    })

    function writeData(Id: any, user: any, doc: any, slot: any) {
        const db = database;
        const offersRef = ref(db, 'offers');
        const newOfferRef = push(offersRef);
        const newOfferKey = newOfferRef.key;

        // Remove selected slot 
        const selectedDoctor = docData && docData[doc];
        if (selectedDoctor) {
            const updatedSlots = selectedDoctor.doc_slots.split(',').filter(s => s.trim() !== slot);
            set(ref(db, `docs/${doc}/doc_slots`), updatedSlots.join(','));
        }

        set(newOfferRef, {
            id: newOfferKey,
            user: user,
            doc: doc,
            slot: slot
        });
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowMessage(false)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [showMessage])

    return (
        <form onSubmit={formik.handleSubmit} method="POST" noValidate className={styles.form} ref={form}>
            <div className={styles.form_control}>
                <label htmlFor="user" className="form-label">
                    Choose User Name
                </label>

                <select
                    name="user"
                    value={formik.values.user}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="">Choose one</option>
                    {userData &&
                        Object.keys(userData).map((id) => (
                            <option key={id} value={id}>
                                {userData[id]?.user_name}
                            </option>
                        ))}
                </select>

                {formik.errors.user && <div className={styles.form_error}>{formik.errors.user}</div>}
            </div>
            <div className={styles.form_control} >
                <label htmlFor="doc" className="form-label">
                    Choose Doctor Name
                </label>

                <select
                    name="doc"
                    value={formik.values.doc}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="">Choose one</option>
                    {docData &&
                        Object.keys(docData).map((id) => (
                            <option value={id} key={id}>
                                {docData[id]?.doc_name}
                            </option>
                        ))}
                </select>

                {formik.errors.doc && <div className={styles.form_error}>{formik.errors.doc}</div>}
            </div>
            <div className={styles.form_control}>
                <label htmlFor="slot" className="form-label">
                    Choose Slot
                </label>

                <select
                    name="slot"
                    value={formik.values.slot}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="">Choose one</option>
                    {formik.values.doc && docData && docData[formik.values.doc] &&
                        docData[formik.values.doc].doc_slots.split(',').map((slot) => {
                            const trimmedSlot = slot.trim();
                            return (
                                <option value={trimmedSlot} key={trimmedSlot}>
                                    {trimmedSlot}
                                </option>
                            );
                        })}
                </select>

                {formik.errors.slot && <div className={styles.form_error}>{formik.errors.slot}</div>}
            </div>
            <button type="submit">Send</button>
            {showMessage && (
                <div role="alert" className={styles.form_send}>
                    {message}
                </div>
            )}
        </form>
    )
}
