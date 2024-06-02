import React from 'react'
import ContentTabs from '../../components/admin/ContenTabs'

const ContentManagement = () => {
  return (
    <>
            <div className='mx-4' >
                <h1 className='text-slate-200 text-2xl font-semibold' >Content Management</h1>
                <div className='mt-4' >
                <ContentTabs />
                </div>
            </div>
        </>
  )
}

export default ContentManagement