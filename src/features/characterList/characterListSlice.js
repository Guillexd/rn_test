import { createSlice } from "@reduxjs/toolkit";

export const characterListSlice = createSlice({
  name: "characterList",
  initialState: {
    value: {
      characters: [],
      mustReload: false,
      charactersInKartInfo: [],
    },
  },
  reducers: {
    addCharacter: (state, action) => {
      state.value.characters.push(action.payload.id);
    },
    removeCharacter: (state, action) => {
      state.value.characters = state.value.characters.filter(
        (character) => character !== action.payload.id
      );
    },
    setNewCharacters: (state, action) => {
      state.value.characters = action.payload;
    },
    setTrueReload: (state) => {
      state.value.mustReload = true;
    },
    setFalseReload: (state) => {
      state.value.mustReload = false;
    },
    removeCharactersInKartInfo: (state, action) => {
      state.value.charactersInKartInfo =
        state.value.charactersInKartInfo.filter(
          (character) => character.id !== action.payload.id
        );
    },
    setNewCharactersInKartInfo: (state, action) => {
      const newData = action.payload.map((el) => {
        return {
          id: el.id,
          quantity: el.quantity,
        };
      });
      state.value.charactersInKartInfo = newData;
    },
  },
});

export const {
  addCharacter,
  removeCharacter,
  setNewCharacters,
  setTrueReload,
  setFalseReload,
  setNewCharactersInKartInfo,
} = characterListSlice.actions;

export default characterListSlice.reducer;
