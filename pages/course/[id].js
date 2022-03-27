import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/router'

export default function Course() {
  const router = useRouter()
  const {id} = router.query
  console.log('Params Group', id)


  return(
    <> Course ID: { id } </>
  );

}