import * as actionTypes from '../../config/store/actions/types.js';

export const initialState = {
    data: null,
    from: null,
    step: "INITIAL",
    todos: []
};

const loadAboutPageData = (state, action) => {
    const updated = {
        data: action.data,
        from: 'LOADED FROM Action loadAboutPageData (fetch github)',
    };

    return { ...state, ...updated };
};

const todoCreated = (state, action) => {
  const updated = {
    step: "TODO_CREATED"
  };

  console.log({updated});



  return { ...state, ...updated };
};

const todoListLoaded = (state, action) => {
  const updated = {
    step: "INITIAL",
    todos: action.data
  };

  return { ...state, ...updated };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_ABOUT_PAGE_DATA: return loadAboutPageData(state, action);
        case actionTypes.TODO_CREATED: return todoCreated(state, action);
        case actionTypes.TODO_LIST_LOADED: return todoListLoaded(state, action);
        default: return state;
    }
};

export default reducer;
