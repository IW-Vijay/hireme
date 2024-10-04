export default {
  encodeString() {
    var str = "This is fun & stuff";
    var div = document.createElement('div');
   // div.innerText = str;  // Insert raw text
    var decoded = div.textContent || div.innerText; // Get the decoded text
    return decoded; // "This is fun & stuff"
  }
}

