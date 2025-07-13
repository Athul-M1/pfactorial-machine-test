import React, { useEffect, useState } from 'react'
import MobileView from './MobileView'
import DesktopView from './DesktopView'

const CalendarView = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  })
  return (
    <div className="container min-w-full">
      <div className="max-w-6xl mx-auto">
        {isMobile ? <MobileView/> : <DesktopView />}
      </div>

    </div>
  )
}

export default CalendarView
