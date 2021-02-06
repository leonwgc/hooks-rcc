export function gid() {
  let stamp = +new Date();
  return (((1 + Math.random()) * stamp) | 0).toString(16);
}

export const getActiveComponentById = (id, comps = []) => {
  if (!id) return null;

  let comp = comps.filter((c) => c.id === id)[0];

  if (!comp) {
    let flexArray = comps.filter((c) => c.type === 'Flex');
    let current;
    for (var i = 0; i < flexArray.length; i++) {
      current = flexArray[i];
      if (current.id === id) {
        comp = current;
        break;
      } else {
        comp = current.comps.filter((c) => c.id === id)[0];
        if (comp) {
          break;
        }
        let subFlexs = current.comps.filter((c) => c.type === 'Flex');
        flexArray = flexArray.concat(subFlexs);
      }
    }
  }
  return comp;
};