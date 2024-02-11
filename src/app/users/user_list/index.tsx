'use client';
import { useState, useEffect } from 'react';
import styles from "./list.module.sass";
import Link from "next/link";

import { database } from '../../_firebase';
import { ref, onValue, } from 'firebase/database';


export default function Users() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const db = ref(database, 'users')

        const handleDataChange = (snapshot) => {
            const data = snapshot.val()
            if (data) {
                setUserData(data)
            }
        }
        const handleError = (error) => {
            console.error('Error reading data:', error)
        }
        onValue(db, handleDataChange, handleError)

    }, []);


    return (
        <div className="">
            <h1>Users</h1>
            <div className="">
                <ul className={styles.list_item}>
                    {userData &&
                        Object.keys(userData).map((id) => (
                            <li key={id}>
                                <Link href={`/users/${id}`}>
                                    <p><strong>User ID:</strong> {id}</p>
                                    <p><strong>Name:</strong> {userData[id].username}</p>
                                    <p><strong>Phone:</strong> {userData[id].phone}</p>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}
