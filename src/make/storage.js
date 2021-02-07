const key = '__make__tpl';

export const getList = () => {
  const str = localStorage.getItem(key);
  let list = [];
  if (str) {
    list = JSON.parse(str);
  }
  return list;
};

const setList = (list) => {
  localStorage.setItem(key, JSON.stringify(list));
};

export const addTpl = (tplData) => {
  const list = getList();
  list.push(tplData);
  setList(list);
};

export const removeAll = () => {
  localStorage.removeItem(key);
};
