'use client'
import { useState, useEffect } from 'react'
import styles from "./list.module.sass"
import Link from "next/link"

import { database } from '../../_firebase'
import { ref, onValue, } from 'firebase/database'

interface DocData {
    [key: string]: {
        doc_name: string
        doc_spec: string
        doc_slots: string
    }
}

export default function Users() {
    const [docData, setDocData] = useState<DocData | null>(null)

    useEffect(() => {
        const db = ref(database, 'docs')

        const handleDataChange = (snapshot: any) => {
            const data = snapshot.val()
            if (data) {
                setDocData(data)
            }
        }
        const handleError = (error: any) => {
            console.error('Error reading data:', error)
        }
        onValue(db, handleDataChange, handleError)

    }, [])


    return (
        <div className="">
            <h2>Docs</h2>
            <div className="">
                <ul className={styles.list_item}>
                    {docData &&
                        Object.keys(docData).map((id) => (
                            <li key={id}>
                                <Link href={`/docs/${id}`}>
                                    <p><b>Doc ID:</b> {id}</p>
                                    <p><b>Name:</b> {docData[id]?.doc_name || 'N/A'}</p>
                                    <p><b>Spec:</b> {docData[id]?.doc_spec || 'N/A'}</p>
                                    <p><b>Slots:</b> {docData[id]?.doc_slots || 'N/A'}</p>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}
