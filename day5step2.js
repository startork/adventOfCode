function runFunction() {
    document.getElementById("inputText").addEventListener("change", function () {
      var fr = new FileReader();
      fr.onload = function () {
        var lines = this.result.split("\n");
        var seats = [];
        lines.forEach(element => {
            var rows = [...Array(128).keys()];
            var columns = [...Array(8).keys()];
            while (rows.length > 1) {
                const half = Math.ceil(rows.length / 2);    
                if (element.charAt(0) === 'F') {
                    rows = rows.splice(0, half)
                } else {
                    rows = rows.splice(-half)
                }
                element = element.substring(1);
            }
            while (columns.length > 1) {
                const half = Math.ceil(columns.length / 2);    
                if (element.charAt(0) === 'L') {
                    columns = columns.splice(0, half)
                } else {
                    columns = columns.splice(-half)
                }
                element = element.substring(1);
            }
            const seatId = rows[0] * 8 + columns[0];
            seats[seatId] = 1;
        });
        var mySeat = 0;
        var i = 0;
        while (!mySeat) {
            if (!seats[i] && seats[i-1] && seats[i+1]) {
                mySeat = i;
            } else {
                i++;
            }
        }
        document.getElementById("demo").textContent = i;
      };
  
      fr.readAsText(this.files[0]);
    });
  }
  