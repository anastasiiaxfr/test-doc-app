'use client'
import styles from "./form.module.sass"
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ref, set } from 'firebase/database'
import { database } from "../../_firebase"
import { useFormik } from 'formik'
import * as yup from 'yup'
import Row from './row'

function getDaysInMonth(month: any, year: any) {
    return new Date(year, month, 0).getDate()
}

export default function AddDoc() {
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const form = useRef<HTMLFormElement>(null)
    const targetYear = new Date().getFullYear()
    const [targetMonth, setTargetMonth] = useState<string>('')
    const [daysInMonth, setDaysInMonth] = useState<number[]>([])

    const formik = useFormik({
        initialValues: {
            name: '',
            spec: '',
            target_month: '',
            slots: []
        },
        onSubmit: async (values) => {
            setMessage('Form submitted')
            setShowMessage(true)
            setSubmitted(true)

            const doc_id = uuidv4()
            const { name, spec, slots, target_month } = values

            setTargetMonth(target_month)

            if (form.current && name && spec && target_month && slots.length > 0) {
                writeUserData(doc_id, name, spec, slots)
                form.current.reset()
                formik.resetForm()
                setTargetMonth('')
            }
        },
        validationSchema: yup.object({
            name: yup.string().trim().required('Name is required'),
            spec: yup.string().trim().required('Spec is required'),
            target_month: yup.string().trim().required('Month is required'),

        }),
    })

    function writeUserData(userId: any, name: any, spec: any, slots: any) {
        const db = database
        set(ref(db, 'docs/' + userId), {
            doc_name: name,
            doc_spec: spec,
            doc_slots: slots.join(', ')
        })
    }

    useEffect(() => {
        if (submitted) {
            document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false
            })
        }
    }, [submitted])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowMessage(false)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [showMessage])

    useEffect(() => {
        if (targetMonth && targetYear) {
            const days = getDaysInMonth(targetMonth, targetYear)
            const daysArray = Array.from({ length: days }, (_, i) => i + 1)
            setDaysInMonth(daysArray)
        }
    }, [targetMonth, targetYear])

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

            <div className={styles.form_control}>
                <label htmlFor="target_month" className="form-label">
                    Choose Target Month {targetYear}
                </label>

                <select
                    name="target_month"
                    value={formik.values.target_month}
                    onChange={(e) => {
                        formik.handleChange(e)
                        setTargetMonth(e.target.value)
                    }}
                    onBlur={formik.handleBlur}
                >
                    <option value="">Select Month</option>
                    <option value="01">Jan</option>
                    <option value="02">Feb</option>
                    <option value="03">Mar</option>
                    <option value="04">Apr</option>
                    <option value="05">May</option>
                    <option value="06">Jun</option>
                    <option value="07">Jul</option>
                    <option value="08">Aug</option>
                    <option value="09">Sep</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                </select>

                {formik.errors.target_month && <div className={styles.text_danger}>{formik.errors.target_month}</div>}

            </div>

            {targetMonth && <div>
                <label htmlFor="target_datetime" className="form-label">
                    Choose Target Date && Time
                </label>

                <div className={styles.table_wrap}>

                </div>
                <table className={styles.form_datetime} id="target_datetime">
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

                        {daysInMonth.map((day) => (
                            <Row key={day} formik={formik} day={day} month={targetMonth} year={targetYear.toString().slice(-2)} />

                        ))}


                    </tbody>
                </table>
            </div>}
            <button type="submit">Send</button>

            {showMessage && (
                <div role="alert" className={styles.form_send}>
                    {message}
                </div>
            )}
        </form>
    )
}
