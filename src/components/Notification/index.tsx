'use client'
import { useState, useEffect } from 'react'
import { database } from '../../app/_firebase'
import { ref, off, onValue, DataSnapshot } from 'firebase/database'

import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'

interface OfferData {
    [key: string]: {
        user: string
        doc: string
        slot: string
    }
}

export default function Notification() {
    const [offerData, setOfferData] = useState<OfferData | null>(null)
    const [notifications, setNotifications] = useState<string[]>([])

    useEffect(() => {
        const dbRef = ref(database, 'offers')

        const handleDataChange = (snapshot: DataSnapshot) => {
            const data = snapshot.val()
            if (data) {
                setOfferData(data)
                checkNotifications(data)
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

    const checkNotifications = (data: OfferData) => {
        const now = new Date().getTime()
        const twentyFourHours = 24 * 60 * 60 * 1000
        const twoHours = 2 * 60 * 60 * 1000

        const newNotifications: string[] = []

        for (const key in data) {
            const slotTime = new Date(data[key].slot).getTime()
            if (slotTime - now <= twentyFourHours && slotTime - now > 0) {
                newNotifications.push(`User ${data[key].user} has a visit to the doctor tomorrow at ${data[key].slot}`)
            }
            if (slotTime - now <= twoHours && slotTime - now > 0) {
                newNotifications.push(`User ${data[key].user} must visit the doctor in 2 hours at ${data[key].slot}`)
            }
        }

        setNotifications(newNotifications)
    }

    return (
        <Box sx={{ width: '100%' }}>
            {notifications.map((notification, index) => (
                <Collapse key={index} in={true}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    const newNotifications = [...notifications]
                                    newNotifications.splice(index, 1)
                                    setNotifications(newNotifications)
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {notification}
                    </Alert>
                </Collapse>
            ))}
        </Box>
    )
}
