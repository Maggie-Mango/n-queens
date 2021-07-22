// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*   ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //get array
      //console.log('rowIndex ' + rowIndex);
      //console.log('row' + row);
      //var row = this.rows()[rowIndex];
      var row = this.get(rowIndex);
      var counter = 0;
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }
      //check how many values are `1`
      //if it is more than 1, return true
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //get the board and all the rows
      var board = this.rows();
      //loop through the board
      for (var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        } // does it exit the loop if returns true
      }

      //recurvisely call hasAnyRowConflicts
      //if it meets requirement then return true
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {

      // get the board, keep count
      var board = this.rows();
      var boardWidth = this.get('n');
      var counter = 0;
      // iterate through the board
      for (let i = 0; i < board.length; i++) {
        // if board at each row and column index is 1
        var eachCol = board[i][colIndex];
        if (eachCol === 1) {
          // then increment the count
          counter += 1;
        }
      }

      //if the count is more than 1
      if (counter > 1) {
        // then return true;
        return true;
      }

      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //inputs: none
      var boardWidth = this.get('n');
      //iterate over each column, use i as column index
      for (var i = 0; i < boardWidth; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      //use helper function to pass i
      //return true if helper function is also true


      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var col = majorDiagonalColumnIndexAtFirstRow;
      var length = this.get('n');
      var counter = 0;
      var colIsNegative = false;

      //for negative values -

      if (col <= 0) {
        colIsNegative = true;
        var startAt = 0;
        col = -col;
        for (var i = col; i < length; i++) {
          if (this.rows()[i][startAt] === 1) {

            counter++;
          }
          startAt++;
        }
      }

      //turn input from negative to positive
      //start from that positive value and iterate
      //positive indexes
      //if input is 1, we want to iterate over the rows, i length can be set to the length of the board - col (aka index)
      if (!colIsNegative) {
        for (var i = 0; i < length - col; i++) {
          if (this.rows()[i][col] === 1) {
            counter++;

          }
          col++;
        }
      }
      // if board[i][col] === 1
      //then increment the column
      if (counter > 1) {
        return true;
      }
      //if count is more than 1
      //return true
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var boardWidth = this.get('n');
      var startAt = -boardWidth + 1;
      //iterate over boardwidth
      for (var i = startAt; i < boardWidth; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
