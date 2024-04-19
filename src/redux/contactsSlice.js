import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  AddContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from "./contactsOps";
import { selectFilter } from "./filterSlice";

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,

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
      })
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.pending,
          deleteContactThunk.pending,
          AddContactThunk.pending
        ),
        (state) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.rejected,
          deleteContactThunk.rejected,
          AddContactThunk.rejected
        ),
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.fulfilled,
          deleteContactThunk.fulfilled,
          AddContactThunk.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const selectContacts = (state) => state.contacts.contacts;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const searchData = filter.toLowerCase();
    return contacts?.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchData) ||
        contact.number.includes(searchData)
    );
  }
);

export const contactsReducer = contactsSlice.reducer;
