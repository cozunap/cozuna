import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const size = { width: 96, height: 96 }
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b', // Zinc 950 (Black)
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#3b82f6', // Brand Primary (Blue)
          fontSize: 45,
          fontWeight: 900,
          fontFamily: 'sans-serif',
          letterSpacing: '-1px',
          borderRadius: '21px',
        }}
      >
        CO
      </div>
    ),
    { ...size }
  )
}
