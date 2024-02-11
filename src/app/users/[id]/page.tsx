'use client';
import styles from './single.module.sass';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { database } from '../../_firebase';
import { ref, onValue, } from 'firebase/database';

type Props = {
  params: {
    id: string
  }
}

export default function User({ params: { id } }: Props) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const db = ref(database, `users/${id}`)

    const handleDataChange = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUserData(data)
      }
    }
    const handleError = (error) => {
      console.error('Error reading data:', error)
    }
    onValue(db, handleDataChange, handleError)
    //console.log('data', data)

  }, []);
  return (
    <div className="single-page">
      <h1>User Details</h1>
      <p><b>User ID:</b> {id} </p>
      <p><b>Name:</b> {userData?.username}</p>
      <p><b>Phone:</b> {userData?.phone} </p>

      <Link href="../users" className="btn-link">Go Back</Link>
    </div>
  );
}
