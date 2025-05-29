"use client"
import React from 'react'
import { Counter } from '../components/Counter' 
function page() {
  console.log("esto es el home, componente page de /app/page.tsx");
  
  return (
    <div>
      esto es el home, componente page de /app/page.tsx
      <Counter />
    </div>
  )
}

export default page