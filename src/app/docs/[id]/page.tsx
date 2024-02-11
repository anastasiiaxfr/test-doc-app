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
interface DocData {
  doc_name: string;
  doc_spec: string;
  doc_slots: string;
}

export default function User({ params: { id } }: Props) {
  const [docData, setDocData] = useState(null);

  useEffect(() => {
    const db = ref(database, `docs/${id}`)

    const handleDataChange = (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        setDocData(data)
        console.log('data', data)

      }
    }
    const handleError = (error: any) => {
      console.error('Error reading data:', error)
    }
    onValue(db, handleDataChange, handleError)

  }, []);
  return (
    <div className="single-page">
      <h1>Doc Details</h1>
      <p><b>Doc ID:</b> {id} </p>
      <p><b>Name:</b> {docData?.doc_name || 'N/A'}</p>
      <p><b>Spec:</b> {docData?.doc_spec || 'N/A'}</p>
      <p><b>Slots:</b> {docData?.doc_slots || 'N/A'}</p>
      <Link href="../users" className="btn-link">Go Back</Link>
    </div>
  );
}
