function runFunction() {
    document.getElementById("inputText").addEventListener("change", function () {
      var fr = new FileReader();
      fr.onload = function () {
        var lines = this.result.split("\n");
        var highestId = 0;
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
            if (seatId > highestId) {
                highestId = seatId;
            }
        });
        document.getElementById("demo").textContent = highestId;
      };
  
      fr.readAsText(this.files[0]);
    });
  }
  