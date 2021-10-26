import { createSlice } from '@reduxjs/toolkit'

const initialUiSlice = {
  notification: {
    show: false,
    type: '',
    message: '',
  },
  modal: {
    show: false,
    type: '',
    props: null,
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiSlice,
  reducers: {
    setNotification(state, action) {
      const notification = {
        show: true,
        type: action.payload.type,
        message: action.payload.message,
      }
      state.notification = notification
    },
    closeNotification(state, payload) {
      state.notification = initialUiSlice.notification
    },
    setModal(state, action) {
      const modal = {
        show: true,
        type: action.payload.type,
        props: action.payload.props,
      }
      state.modal = modal
    },
    closeModal(state, payload) {
      state.modal = initialUiSlice.modal
    },
  },
})

export default uiSlice.reducer
export const uiActions = uiSlice.actions
