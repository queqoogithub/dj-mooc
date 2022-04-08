import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'

export default function Course() {
  const router = useRouter()
  const { id } = router.query
  console.log('Params Group', id)


  return (
    <>
      Course ID: {id}
      <div>
        <h2>NextJs VideoPlayer - GeeksforGeeks</h2>
        <ReactPlayer url='https://www.youtube.com/watch?v=wWgIAphfn2U' />
      </div>
    </>
  );

}