'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { database } from '../../_firebase'
import { ref, onValue, off } from 'firebase/database'

type Props = {
  params: {
    id: string
  }
}
interface OfferData {

  user: string
  doc: string
  slot: string

}

export default function User({ params: { id } }: Props) {
  const [offerData, setOfferData] = useState<OfferData | null>(null)

  useEffect(() => {
    const dbRef = ref(database, `offers/${id}`)

    const handleDataChange = (snapshot: any) => {
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
    <div className="single-page">
      <h2>Offer Details</h2>
      <p><b>Doc ID:</b> {id} </p>
      <p><b>Name:</b> {offerData?.user || 'N/A'}</p>
      <p><b>Doc:</b> {offerData?.doc || 'N/A'}</p>
      <p><b>Slots:</b> {offerData?.slot || 'N/A'}</p>
      <Link href="../docs" className="btn-link">Go Back</Link>
    </div>
  )
}
