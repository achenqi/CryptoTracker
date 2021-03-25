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
        blankMap[i][j] = {val: 1};
      } else if ( blankMap[i][j].val !== 1) {
        blankMap[i][j] = {val: 0};
      }
    }
  }
  if (count > 0) {
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

function sweep(map, y,x) {
  console.log('start');
  var nearMines = 0;
  var safe = true;
  var safeList = [];
  if (map[y][x].searched) {
    return;
  }
  map[y][x].searched = true;
  // if (map[y][x].clicked) {
  //   return;
  // }
  if (map[y][x].val === 0) {
    map[y][x] = {val: map[y][x].val,clicked: true, searched: true};
  }
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      console.log('all', i+y, j+x)
      if (map[i + y]) {
        if (map[i+y][j+x]){
          if (map[i+y][j+x].val === 1){
            nearMines++;
            safe = false;
          } else {
            if (i !== 0 || j !== 0) {
              safeList.push([i+y,j+x])
              //sweep(map, i+y,j+x)
            }
          }
        }

      }
    }
  }
  if (map[y][x].val === 0) {
    map[y][x] = {val: 0,clicked: true, mines: nearMines, searched: true};
  }
  //map[y][x] = {val: nearMines,clicked: true};
  if (safe) {
    for (var i = 0; i < safeList.length; i++) {
      // map[safeList[i][0]][safeList[i][1]] = {val: map[safeList[i][0]][safeList[i][1]].val,clicked: true, mines: map[safeList[i][0]][safeList[i][1]].mines};
      map[safeList[i][0]][safeList[i][1]].val = map[safeList[i][0]][safeList[i][1]].val;
      map[safeList[i][0]][safeList[i][1]].clicked = true;
      map[safeList[i][0]][safeList[i][1]].mines = map[safeList[i][0]][safeList[i][1]].mines;
      sweep(map, safeList[i][0],safeList[i][1])
    }
  }

}

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    value: blankMap,
  },
  reducers: {
    update: (state, action) => {
      var oldMap = [...state.value];
      const [key1,key2] = action.payload;
      console.log('val', oldMap[key1][key2].val, key1, key2 );
      if (oldMap[key1][key2].val === 1) {
        console.log('NOT SAFE');
        state.value = oldMap.map((rows) => rows.map((value) => {
          return {val:  value.val, clicked:true, mines: value.mines}
        }))
      return;
      }
      // oldMap[key1][key2] = {val: oldMap[key1][key2].val,clicked: true, mines: oldMap[key1][key2].val.mines};
      sweep(oldMap, key1, key2);
      state.value = oldMap;
    },
  }
})


export const { update } = mapSlice.actions;

export const mapCount = state => state.map.value;

export default mapSlice.reducer;