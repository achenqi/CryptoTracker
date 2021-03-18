import { createSlice } from '@reduxjs/toolkit';


let blankMap = [[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}]];

var count = 10
let randomMap =[]
function mapGen() {
  for (let i = 0; i < blankMap.length; i++) {
    for (let j = 0; j < blankMap[i].length; j++) {
      var mine = Math.random() * 100;
      if (mine < 10 && count > 0 && (blankMap[i][j].val === 0 || blankMap[i][j].val === undefined)) {
        count--;
        console.log('bang')
        blankMap[i][j] = {val: 1};
      } else if ( blankMap[i][j].val !== 1) {
        blankMap[i][j] = {val: 0};
      }
    }
  }
  console.log(count);
  if (count > 0) {
    console.log('here')
    mapGen();
  }

}


mapGen();

// let randomMap = blankMap.map((rows) => rows.map((val) => {
//   var mine = Math.random() * 100;
//   if (mine < 10 && count >= 0) {
//     count--;
//     return {val: 1};
//   } else {
//     return {val: 0};
//   }
// }))

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    value: blankMap,
  },
  reducers: {
    update: (state, action) => {
      //var oldMap = [...state.value];
      // oldMap[action.payload[0]].splice(action.payload[1],1, 1)
      console.log(action.payload)
      state.value = action.payload;
    }
  }
})

export const { update } = mapSlice.actions;

export const mapCount = state => state.map.value;

export default mapSlice.reducer;