var dns = require("dns")

dns.lookup("google.com", (err, address, family) => {
    if (err){
        console.log(err)
    } else {
        console.log(address)
        console.log(family)
    }
})