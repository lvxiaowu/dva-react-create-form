
export default {

  namespace: 'formData',

  state: {
    widgetFormSelect: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *add({ payload }, { call, put }) {
      yield put({ type: 'addHandle', payload });
    },
    *delete({ payload }, { call, put }) {
      yield put({ type: 'deleteHandle', payload });
    },
    *move({ payload }, { call, put }) {
      yield put({ type: 'moveHandle', payload });
    }
  },

  reducers: {
    addHandle(state, action) {
      const result = Array.from(state.widgetFormSelect);
      const { item, key , index = result.length } = action.payload
      const newItem = Object.assign({},item)
      newItem.key = key
      result.splice(index, 0, newItem)
      return { ...state, widgetFormSelect: result };
    },
    deleteHandle(state, action) {
      const result = Array.from(state.widgetFormSelect);
      const { index = result.length } = action.payload
      result.splice(index, 1)
      return { ...state, widgetFormSelect: result };
    },
    moveHandle(state, action) {
      const { startIndex, endIndex } = action.payload
      const result = Array.from(state.widgetFormSelect);
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return { ...state, widgetFormSelect: result };
    },
  },

};
