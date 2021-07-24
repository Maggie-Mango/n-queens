/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
/*
O: A matrix chessboard, with n rooks placed (1)
I: n - size of the board, number rooks
C: no negative numbers, no conflicts
E:
Justification:
Explanation: We're returning a chess board with rooks
Visualization:
Approximation:
Verification:
Implementation:
*/

window.findNRooksSolution = function(n) {
  var solution = board;
  var board = new Board({n: n});

  for (i = 0; i < n; i++) {
    board.togglePiece(i, i);
  }
  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};
/*
O: Returning a count of how many different ways you can place the rook so it doesn't attack each other
I: A number 1-8
C:
E:

*/
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

// if n = 0, return 1
//recurse n * recursiveFunc(n - 1)
//Count = recursiveFunc(n)

window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  //keep a obj where is row and value is column

  var board = new Board({n: n});
  var clearBoard = function(n) {
    //console.log('filling board: ' + board.rows())
    for (var i = 0; i < n; i++) {
      board.rows()[i].fill(0);
    }
  };

  var reducer = function(memo, col) {
    return memo + col;
  };


  //keep a counter
  var traverseBoard = function(col) {
    if (col === n) {
      //console.log('base case hit, increment solution');
      //var nRooks = board.rows().flat().reduce(reducer, 0);
      //if (nRooks === n) {
        solutionCount++;

      return;
    }
    for (var i = 0; i < n; i++) {
      //check conflict
      if (!board.hasRowAttacked(i, col)) {
        //console.log('no conflicts, putting piece down')
        board.togglePiece(i, col);
        //console.log('board ' + board.rows());
        //console.log('first row ' + board.rows()[0])
        //console.log('second row ' + board.rows()[1])
        traverseBoard(col + 1);

        //keep the current i & col position and clear the rest
        clearBoard();
        board.togglePiece(i, col);
      }
    }
  };

  traverseBoard(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


var checkBoard = function (row, n, board, callBack) {
  if (row === n) {
    //console.log('board ' + board.rows())
    return callBack();
  }

  for (var i = 0; i < n; i++) {
    board.togglePiece(row, i);
    if (!board['hasAnyQueensConflicts']()) {
      var storage = checkBoard(row + 1, n, board, callBack)
      if (storage) {
        return;
      }
    }
    board.togglePiece(row, i);
  }
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme
  //function
  var board = new Board({n: n});
  // if (n === 0) {
  //   return solution;
  // }
  if (n === 0 || n === 2 || n === 3) {
    return board.rows();
  }
  var traverseBoard = function(col) {
    if (col === n) {
      console.log('board ' + board.rows());

      //solution.concat(board.rows());
      solution = board.rows().map(element => element.slice());
      return;
      // solution = board.rows();
      // return;
    }
    for (let row = 0; row < n; row++) {
      board.togglePiece(row, col);
      //check if the board has any conflict
      // if no conflict, then we move to the next col
      if (!board['hasAnyQueensConflicts']()) {
        traverseBoard(col + 1);
      }
      // if conflict, then we remove that piece and move on to the next row
      board.togglePiece(row, col);
    }
  };
  traverseBoard(0);
  // solution = board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};
/*
example n= ({4: 4})
1,0,0,0,
0,0,1,0,
0,0,0,1,
0,1,0,0

0,0,1,0,
1,0,0,0,
0,0,0,1,
0,1,0,0

0,1,0,0,
0,0,0,1,
1,0,0,0,
0,0,1,0
*/



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let solutionCount = 0;

  let board = new Board({n:n});
  if (n === 2 || n === 3) {
    return solutionCount;
  }
  cb = function() {
    solutionCount++;
  };
  checkBoard(0, n, board, cb);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


//notes - first idea - make a helper function. it failed, for now
/*
var travelBoard = function (row, n, board, callBack) {
  if (row === n) {
    console.log('board ' + board.rows());
    // return callBack();
    callBack();
  }

  for (var i = 0; i < n; i++) {
    board.togglePiece(row, i);
    if (!board["hasAnyQueensConflicts]()"]) {
      if (travelBoard(row + 1, n, board, callBack)) {
        return; // stop recursion
      }
    }
    board.togglePiece(row, i);
  }
  console.log(board)
}
*/
/*
input: is row and n (the board), a call back function
  base case is if row = n, then invoke the call back function;
  for loop i < n
    toggle piece
    if there is no conflict
      then recursion row/col + 1
    return;
*/
/*
var travelBoard = function(col, n, board, cb) {
  if (col === n) {
    cb();
  }

  for (let i = 0; i < n; i++) {
    board.togglePiece(i, col);
    if (!board["hasAnyQueensConflicts"]()) {
      travelBoard(col + 1, n, board, cb);
    }
    return;
  }
};
*/