import React from "react";

const ListGroup = (props) => {
  const { items, selectedItem, onItemSelect } = props;
  return (
<div class="flex justify-center">
  <ul class="bg-teal-100 rounded-lg border border-gray-600 w-96 text-gray-900">
            {items.map((g) => (
        <li
          className={ 
            g.name === selectedItem
              ? "page-link relative block py-1.5 px-3 border-0 bg-teal-400 outline-none transition-all duration-300  text-white hover:text-white hover:bg-teal-600 shadow-md focus:shadow-md"
              : "list-group-item px-6 py-2 border-b border-gray-700 w-full"
          }
          style={{ cursor: "pointer" }}
          key={g._id}
          onClick={() => onItemSelect(g.name)}
        >
          {g.name}
        </li>
      ))}
    </ul>
    </div>
    
  );
};

    
   

export default ListGroup;
