import React from "react"
import NavMenu from "./menu"

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className="flex flex-row min-h-screen">
        <NavMenu />
        <div className="flex-1">
            {children}
        </div>
      </main>
    </>
  )
}

type LayoutProps = {
  children?: React.ReactNode
};