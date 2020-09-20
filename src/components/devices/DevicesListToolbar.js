import React, { useContext, useEffect, useState } from 'react';
import { sortObjectsFn } from '../../utils/sort';
import Badge from '../common/Badge';
import DeviceContext from './DeviceContext';

const DeviceListToolbar = ({onCrieriaChange}) => {
  const deviceContext = useContext(DeviceContext);

  // Hooks
  const [typeFilter, setTypeFilter] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortDirection] = useState('asc');

  /**
   * Effect to propagate criteria change to parent
   */
  useEffect(() => {
    onCrieriaChange({
      typeFilter, sortBy, sortDirection
    })
  }, [typeFilter, sortBy, sortDirection])

  
  /**
   * Handle filter field - Append badges/filter
   * @param {event} event 
   */
  const handleFilterChange = (event) => {
    const selectedVal = event.target.value;
    setTypeFilter([...typeFilter, selectedVal]);
  }
  /**
   * Handle filter field - remove badge/filter
   * @param {string} badgeValue 
   */
  const handleBadgeRemove = (badgeValue) => {
    const idx = typeFilter.findIndex(filter => filter === badgeValue);
    typeFilter.splice(idx, 1);
    setTypeFilter([...typeFilter]);
  }

  
  /**
   * This function return the 'inactive' filters
   */
  const getAvailableFilterOpts = () => {
    const availableFilters = [];
    for (const opt of deviceContext.systemTypes) {
      if ( typeFilter.indexOf(opt.value)  === -1 ) {
        availableFilters.push(opt);
      }
    }
    availableFilters.sort((a, b) => sortObjectsFn(a, b, 'value', 'asc'));
    return availableFilters;
  }



  return (
          

    <div className="deviceListToolbar">
    <div className="deviceListFilterField">
      <label>Filter Device Type:</label>
      <select 
        value={''}
        onChange={handleFilterChange}
      >
        <option key="" value=""></option>
        {
          getAvailableFilterOpts().map(opt => (<option key={opt.value} value={opt.value}>{opt.display}</option>))
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
    
    {
      typeFilter.length > 0 ?
      typeFilter.map(filter => (
        <Badge key={filter} onClick={() => handleBadgeRemove(filter)}>
          {deviceContext.systemTypes.find(item => item.value === filter).display}
        </Badge>
      ))
      : ''
    }
  
  </div>
  
  )
}


export default DeviceListToolbar;