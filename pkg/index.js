function getHDDSerialNumber() {
    var sys = require('util')
    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) {            
        console.log(sys.inspect(stdout, {showHidden: true, depth: null}))
        var theString = sys.inspect(stdout, {showHidden: true, depth: null})
        var rgx = /\s\s/gi;
        theString = theString.replace(rgx, "");
        console.log(theString);
    }
    exec("wmic DISKDRIVE get SerialNumber", puts);
}
getHDDSerialNumber()



