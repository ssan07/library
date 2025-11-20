import React from 'react'

function YearSelect({ searchYear, setSearchYear }) {
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for(let y=currentYear;y>=1900;y--){
        years.push(y);
    }

  return (
    <>
    
    <select value={searchYear} onChange={(e) => setSearchYear(e.target.value)} className="rounded-md border-gray-200 px-2 py-2">
                  <option key={1} value={""}>All years</option>
                  {years.map((n,i)=>{
                    return <option key={i+2} value={n}>{n}</option>
                  })}
                </select>

    </>
  )
}

export default YearSelect
