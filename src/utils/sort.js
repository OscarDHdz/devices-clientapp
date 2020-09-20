/**
 * Descendent Object Comparator Function by given Key
 * @param {object} objA 
 * @param {object} objB 
 * @param {string} key - Object key to compare
 */
export const sortObjByKeyDesc = (objA, objB, key) => {
  const valA = objA[key];
  const valB = objB[key];
  if (valA < valB) return -1;
  if (valA > valB) return 1;
  return 0;
}

/**
 * Object Comparator Function by given Key and Direction
 * @param {object} objA 
 * @param {object} objB 
 * @param {string} key - Object key to compare
 * @param {string} direction - Can be 'asc'|'desc'
 */
export const sortObjectsFn = (objA, objB, key, direction) => {
  const sortVal = sortObjByKeyDesc(objA, objB, key);
  if (direction === 'asc') return sortVal;
  else return -sortVal;
}

export default {
  sortObjByKeyDesc, sortObjectsFn
}