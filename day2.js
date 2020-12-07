function runFunction() {
    document.getElementById("inputText").addEventListener("change", function () {
      var fr = new FileReader();
      fr.onload = function () {
        lines = this.result.split('\r\n');

        // Step Two
        const num = lines.filter(line => {
            const test = line.split(' ');
            const [min, max] = test[0].split('-')
            const letter = test[1].split(':')[0].trim();
            const name = test[2].trim();
            const first = name[+min-1] === letter;
            const second = name[+max-1] === letter;

            return first !== second;
        }).length;

        console.log(num);

        // Step One 
        const numTwo = lines.filter(line => {
            const test = line.split(' ', 3);
            const [min, max] = test[0].split('-')
            const letter = test[1].split(':')[0];
            const name = test[2];
            const corrletters = name.length - name.replaceAll(letter, '').length;
            
            return +min <= corrletters && corrletters <= +max;
        }).length;

        console.log(numTwo);
        };
      fr.readAsText(this.files[0]);
    });
  }