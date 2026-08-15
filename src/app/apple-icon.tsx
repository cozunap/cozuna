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
          color: '#ffffff',
          fontSize: 52,
          fontWeight: 900,
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '-2px',
          borderRadius: '24px',
          border: '4px solid #3b82f6', // Brand Primary border
        }}
      >
        C<span style={{ color: '#3b82f6' }}>O</span>
      </div>
    ),
    { ...size }
  )
}
