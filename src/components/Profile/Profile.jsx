import React from 'react'

export default function Profile({userdata}) {
 
  return (
    <div><h2>hello {userdata?.name}</h2></div>
  )
}
