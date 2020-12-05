function runFunction() {
    document.getElementById("inputText").addEventListener("change", function () {
      var fr = new FileReader();
      fr.onload = function () {
        var lines = this.result.split("\n");
        const seats = lines.map(element => parseInt(element.replace(/[FL]/g, '0').replace(/[BR]/g, '1'), 2));
        console.log(Math.max(...seats));
        var mySeat = 0;
        var i = 0;
        for (i = Math.min(...seats); i < Math.max(...seats); i++) {
            if (!seats.includes(i) && seats.includes(i+1) && seats.includes(i-1)) {
                mySeat = i;
            }
        }
        
       console.log(mySeat);
      };
  
      fr.readAsText(this.files[0]);
    });
  }
  