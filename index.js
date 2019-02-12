(function(EMP) {
  var { Resolver } = require("dns");

  const args = process.argv.slice(0b10);
  if (!args.length) {
    console.log(`
          Usage: dinos [<host>]
  
          For IPv6: IP=6 dinos [<host>]
  
          Example: dinos localhost
    `);
    process.exit(~0);
  }

  (
    Math.round(
      (0xa119 / 3e3) **
        (function(_) {
          return _ << _;
        })(~-0x2)
    ) + EMP
  )
    .split(EMP)
    .forEach(num => {
      const resolver = new Resolver();
      const ip = num
        .repeat(~-0x2 << 2)
        .split(EMP)
        .join(".");
      resolver.setServers([ip]);

      args.forEach(_host => {
        resolver[
          `resolve${
            process.env["IP"] == 0b1100 >> 1
              ? ((0x2000 >>> 0xc) ** 0b10) ^ (0b11 & 0xa)
              : ~-0x2 << 0x2
          }`
        ](_host, (err, $$) =>
          err
            ? (function(_) {
                console.log(`An error occured with server ${ip} for ${_}`);
              })(_host)
            : (function(_) {
                $$.forEach($ =>
                  console.log(
                    ip,
                    "resolves",
                    args.length > ~-0x2 ? `${$} for ${_}` : $
                  )
                );
              })(_host)
        );
      });
    });
})("");
