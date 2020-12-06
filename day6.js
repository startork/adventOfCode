function runFunction() {
    document.getElementById("inputText").addEventListener("change", function () {
      var fr = new FileReader();
      fr.onload = function () {
        var lines = this.result.split("\r\n");
        lines.forEach((element, i) => {
          if (!element) lines[i] = '&&';
        });
        groups = lines.join('').split('&&');
        groups.forEach((element, i) => {
          groups[i] = new Set(element).size;
        })
        const answerStep1 = groups.reduce((a, b) => a + b, 0)
        
        console.log(answerStep1);

        var lines = this.result.split("\r\n");
        lines.forEach((element, i) => {
          if (!element) lines[i] = '&';
        });
        groups = lines.join('&').split('&&&');
        groups.forEach((element, i) => {
          groups[i] = element.split('&');
        })
        groupYes = groups.map(element => {
          var arrayNum = element.reduce((a, b) => a.filter(element => [...b].includes(element)), [...element[0]]);
          return arrayNum.length
        })

        const answerStep2 = groupYes.reduce((a, b) => a + b, 0)
        console.log(answerStep2);
      };
  
      fr.readAsText(this.files[0]);
    });
  }
  