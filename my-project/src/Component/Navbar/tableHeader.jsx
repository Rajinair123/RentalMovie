import React from "react";


const TableHeader=(props)=>{
    const {columns,onSort,sortColumn} = props;
    const raiseSort =(column)=>{
        let newSortColumn={...sortColumn}
    if(sortColumn.path===column.path){
        if(sortColumn.order===1){
            newSortColumn.order = -1
        }else{
            newSortColumn.order = 1
        }
    }else{
        newSortColumn.path=column.path;
        newSortColumn.order=1
    }
    onSort(newSortColumn)
    }
const displaySortIcon=(column)=>{
    if(sortColumn.path!==column.path)return null;
    return sortColumn.order==1?(
    <i className="fa-solid fa-sort-up"></i>
    ):(
    <i className="fa-solid fa-sort-down"></i>
    );

}

return(
    <thead>
         <tr> 
       
         {columns.map(c =>
             <th  className=" border text-left px-8 py-4 bg-teal-400 " 
             key={c.path || c.key} onClick={()=>raiseSort(c)} 
             style={{cursor: "pointer"}}>{c.header}{displaySortIcon(c)}</th>

         )}
 </tr> 
       
    </thead>
)

}

export default TableHeader



