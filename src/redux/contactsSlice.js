import { createSlice } from "@reduxjs/toolkit";
import {
  AddContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from "./contactsOps";

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  selectors: {
    selectContacts: (state) => state.contacts,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsThunk.fulfilled, (state, { payload }) => {
        state.contacts = payload;
      })
      .addCase(AddContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.push(payload);
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.contacts = state.contacts.filter(
          (item) => item.id !== payload.id
        );
      });
  },
});

export const { addNewContact, deleteContact, isError, isLoading, dataFetched } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
export const { selectContacts, selectIsError, selectIsLoading } =
  contactsSlice.selectors;
