'use client'
import styles from './list.module.sass'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { database } from '../../_firebase'
import { ref, off, onValue, DataSnapshot } from 'firebase/database'

interface OfferData {
    [key: string]: {
        user: string
        doc: string
        slot: string
    }
}

export default function Offers() {
    const [offerData, setOfferData] = useState<OfferData | null>(null)

    useEffect(() => {
        const dbRef = ref(database, 'offers')

        const handleDataChange = (snapshot: DataSnapshot) => {
            const data = snapshot.val()
            if (data) {
                setOfferData(data)
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
        <div>
            <h2>Offer Details</h2>
            <ul className={styles.list_item}>
                {offerData &&
                    Object.keys(offerData).map((id) => (
                        <li key={id}>
                            <Link href={`/get-doc/${id}`}>
                                <p>
                                    <b>User:</b> {offerData[id]?.user || 'N/A'}
                                </p>
                                <p>
                                    <b>Doc:</b> {offerData[id]?.doc || 'N/A'}
                                </p>
                                <p>
                                    <b>Slot:</b> {offerData[id]?.slot || 'N/A'}
                                </p>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    )
}
