  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var columns;
  var columnHolders = new Array();
  var bodyPos;

  var numColumns = 64;
  var numLetters = 20;
  var boxSize = 30;

  function setUpColumns() {
    columns = new Array();

    for (var i = 0; i < numColumns; i++) {
      var column = new Array();

      for (var j = 0; j < numLetters; j++) {
        column.push(getChar());
      }

      columns.push(column);
    }
  }

  function getChar() {
    var randnum = Math.floor(Math.random() * chars.length)
    var chr = chars.charAt(randnum);

    return chr;
  }

  function showColumns() {
    for (var i = 0; i < numColumns; i++) {
      var rand = Math.random();
      var fontSize = 8 + rand * 20;

      var holder = $("<div></div>").css({
        position: "absolute",
        top: Math.floor(Math.random() * (numLetters*boxSize)),
        left: Math.floor(Math.random() * (numColumns*boxSize)),
        "font-size": fontSize,
        "color": "rgba(102,255,51,"+rand+")"
      });

      var column = columns[i];

      for (var j = 0; j < numLetters; j++) {
        var letter = column[j];

        var letterHolder = $("<div></div>").css({
          width: boxSize,
          height: boxSize,
          "text-align" : "center"
        }).append(letter);

        if (j == (numLetters - 1)) {
          letterHolder.css({
            "color": "rgba(255,255,255,"+rand+")"
          });
        }

        holder.append(letterHolder);
      }

      columnHolders[i] = holder;

      $("body").append(holder, function(){
      });
    }
  }

  function animateColumn(i) {
    var holder = columnHolders[i];
    var position = holder.position();
    var top = parseInt(holder.height() * 2);
    var left = Math.floor(Math.random() * (numColumns*boxSize));

    holder.css({
      top: (-1*holder.height()),
      left: left
    });

    holder.animate({top: top},Math.floor(Math.random() * 10000), function(){
      animateColumn(i);
    });
  }

  setUpColumns();
  showColumns();

  for (var i = 0; i < numColumns; i++) {
    animateColumn(i);
  }