import { Box } from '@mui/material'
import React from 'react'
import Image from 'next/image'

const Index = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw">
            <Image
                src={`/assets/logo/logo-light.png`}
                alt="Logo"
                width="1500"
                height="800"
                layout="responsive"
            />
        </Box>
    )
}

export default Index