'use client'
import ImageSlices from '@/components/RevealProShow'
import { Vortex } from '@/components/ui/vortex'
import { pressStart2P } from '@/lib/fonts'
import React from 'react'

const page = () => {
    return (
        <>
            <div className="fixed inset-0 -z-10 bg-black pointer-events-auto">
                <Vortex
                    backgroundColor="black"
                    rangeY={300}
                    particleCount={500}
                    baseHue={299}
                    className="flex items-center flex-col justify-center w-full h-full"
                >
                </Vortex>
            </div>
            <section id='proshow1' className='flex items-center flex-col justify-center w-screen h-screen text-red-600'>
                <h3 className={`${pressStart2P.className} text-3xl drop-shadow-[2px_2px_0px_#000] drop-shadow-[#180204]`}>ZeroPause</h3>
                <ImageSlices
                    imageUrl='images/proshow/zeropause.png'
                    revealImageUrl='images/proshow/zeropause2.jpg'
                />
            </section>

            <section id='proshow2' className='h-screen text-white'>
                proshow2
            </section>
        </>
    )
}

export default page