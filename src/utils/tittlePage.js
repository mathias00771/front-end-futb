import { useEffect } from 'react';

export const saveTittlePage = (name) => {
  
  const a = document.body.setAttribute('data-tittlepage', name)
}

export const getTittlePage = () => {
  return document.body.getAttribute('data-tittlepage')
}
