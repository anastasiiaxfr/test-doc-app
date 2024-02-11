'use client'
import styles from './single.module.sass'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { database } from '../../_firebase'
import { ref, onValue, } from 'firebase/database'

type Props = {
  params: {
    id: string
  }
}

interface UserData {
  user_name: string
  user_phone: string
}

export default function User({ params: { id } }: Props) {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const db = ref(database, `users/${id}`)

    const handleDataChange = (snapshot: any) => {
      const data = snapshot.val()
      if (data) {
        setUserData(data)
        console.log('data', data)

      }
    }
    const handleError = (error: any) => {
      console.error('Error reading data:', error)
    }
    onValue(db, handleDataChange, handleError)

  }, [])
  return (
    <div className="single-page">
      <h1>User Details</h1>
      <p><b>User ID:</b> {id} </p>
      <p><b>Name:</b> {userData?.user_name || 'N/A'}</p>
      <p><b>Phone:</b> {userData?.user_phone || 'N/A'} </p>

      <Link href="../users" className="btn-link">Go Back</Link>
    </div>
  )
}
