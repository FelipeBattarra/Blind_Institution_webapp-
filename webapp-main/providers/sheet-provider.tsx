"use client"

import React from 'react'
import { useMountedState } from 'react-use'

import NewCategorySheet from '@/features/compras-e-orcamentos/categories/components/new-category-sheet'
import EditCategorySheet from '@/features/compras-e-orcamentos/categories/components/edit-category-sheet'


const SheetProvider = () => {
  const isMounted = useMountedState()

  if (!isMounted) return null

  return (
    <>
      <NewCategorySheet />
      <EditCategorySheet />
    </>
  )
}

export default SheetProvider