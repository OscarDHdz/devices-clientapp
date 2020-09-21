import React, { useContext, useEffect, useState } from 'react';
import { sortObjectsFn } from '../../utils/sort';
import Badge from '../common/Badge';
import ConfigContext from '../common/ConfigContext';
import './DeviceListToolbar.css';

const DeviceListToolbar = ({onCriteriaChange}) => {
  // Context
  const configContext = useContext(ConfigContext);

  // Hooks
  const [typeFilter, setTypeFilter] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  /**
   * Effect to propagate criteria change to parent
   */
  useEffect(() => {
    onCriteriaChange({
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
    for (const opt of configContext.systemTypes) {
      if ( typeFilter.indexOf(opt.value)  === -1 ) {
        availableFilters.push(opt);
      }
    }
    availableFilters.sort((a, b) => sortObjectsFn(a, b, 'value', 'asc'));
    return availableFilters;
  }
  const availableFilterOpts = getAvailableFilterOpts();

  return (
          

    <div className="deviceListToolbar">
      <div className="toolbarFields">

        <div className="deviceListFilterField">

          <table>
            <tbody>
              <tr>
                <td className="labelCell">
                  <label>Filter Device Type:</label>
                </td>
                <td>
                  <select 
                    value={''}
                    onChange={handleFilterChange}
                    disabled={availableFilterOpts.length === 0}
                  >
                    <option key="" value=""></option>
                    {
                      availableFilterOpts.map(opt => (<option key={opt.value} value={opt.value}>{opt.display}</option>))
                    }
                  </select>
                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="deviceListSortByField">

          <table>
            <tbody>
              <tr>
                <td className="labelCell">
                  <label>Sort By:</label>
                </td>
                <td>
                  <select value={sortBy}
                    onChange={event => setSortBy(event.target.value)}
                  >
                    {
                      configContext.sortOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.display}</option>))
                    }
                  </select>
                  
                </td>
                <td>
                  <button disabled={!sortBy} onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
                    {sortDirection === 'asc' ? '↓' : '↑'}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>


        </div>

      </div>

      

      <div className="filterBadges">
        {
          typeFilter.length > 0 ?
          typeFilter.map(filter => (
            <Badge key={filter} onClick={() => handleBadgeRemove(filter)}>
              {configContext.systemTypes.find(item => item.value === filter).display}
            </Badge>
          ))
          : ''
        }

      </div>
  
    </div>
  
  )
}


export default DeviceListToolbar;