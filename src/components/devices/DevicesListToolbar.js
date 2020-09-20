import React, { useContext, useEffect, useState } from 'react';
import DeviceContext from './DeviceContext';

const DevicesListToolbar = ({onCriteriaChange}) => {
  // Hooks
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection] = useState('asc');

  useEffect(() => {
    onCriteriaChange({
      typeFilter,
      sortBy,
      sortDirection
    });
  }, [typeFilter, sortBy, sortDirection, onCriteriaChange]);

  const deviceContext = useContext(DeviceContext);

  return (
    <div className="deviceListToolbar">
      <div className="deviceListFilterField">
        <label>Device Type:</label>
        <select 
          value={typeFilter}
          onChange={event => setTypeFilter(event.target.value)}
        >
          <option key="" value="">All</option>
          {
            deviceContext.systemTypes.map(opt => (<option key={opt.value} value={opt.value}>{opt.display}</option>))
          }
        </select>
      </div>
      <div className="deviceListSortByField">

        <label>Sort By:</label>
        <select value={sortBy}
          onChange={event => setSortBy(event.target.value)}
        >
          {
            deviceContext.sortOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.display}</option>))
          }
        </select>

      </div>
    </div>
  )
}

export default  DevicesListToolbar;