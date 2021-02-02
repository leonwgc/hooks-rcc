import {combineReducers} from 'redux';

export const Update = 'Update';

// type DesginComoment = {
//   id: string;
//   type: string;
//   props: {
//     [p: string]: any;
//   };
//   styles: {
//     [p: string]: string;
//   };
//   comps: DesginComoment[];
// };

// type State = {
//   comps: DesginComoment[];
//   activeComp: string;
// };

const initstate = {
  comps: [],
  activeComp: null,
};

const app = (state = initstate, action) => {
  let payload = action.payload;
  switch (action.type) {
    case Update: {
      return {...state, ...payload};
    }
    default:
      return {...state};
  }
};

export default () => combineReducers({app});