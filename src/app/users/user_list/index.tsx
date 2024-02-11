'use client'
import { useState, useEffect } from 'react'
import styles from "./list.module.sass"
import Link from "next/link"

import { database } from '../../_firebase'
import { ref, off, onValue, DataSnapshot } from 'firebase/database'

interface UserData {
    [key: string]: {
        user_name: string
        user_phone: string
    }
}

export default function Users() {
    const [userData, setUserData] = useState<UserData | null>(null)

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

    return (
        <div className="">
            <h2>Users</h2>
            <div className="">
                <ul className={styles.list_item}>
                    {userData &&
                        Object.keys(userData).map((id) => (
                            <li key={id}>
                                <Link href={`/users/${id}`}>
                                    <p><b>Name:</b> {userData[id]?.user_name || 'N/A'}</p>
                                    <p><b>Phone:</b> {userData[id]?.user_phone || 'N/A'}</p>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}
