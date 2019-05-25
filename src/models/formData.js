
export default {

  namespace: 'formData',

  state: {
    widgetFormSelect:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *changeForm({ payload }, {call,put}){
      yield put({ type: 'change',payload });
    }
  },

  reducers: {
    change(state, action) {
      return { ...state, widgetFormSelect:[...state.widgetFormSelect.concat(action.payload)] };
    },
  },

};
