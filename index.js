var { Resolver } = require("dns");

const args = process.argv.slice(2);
if (!args.length) {
  console.log(`
        Usage: dinos [<host>]

        For IPv6: IP=6 dinos [<host>]

        Example: dinos localhost
  `);
  process.exit(-1);
}

Math.round(13.747 ** 2)
  .toString()
  .split("")
  .forEach(num => {
    const resolver = new Resolver();
    const ip = num
      .repeat(0b100)
      .split("")
      .join(".");
    resolver.setServers([ip]);

    args.forEach(host => {
      resolver[`resolve${process.env["IP"] === "6" ? 6 : 4}`](
        host,
        (err, addresses) =>
          err
            ? (function() {
                console.log(`An error occured with server ${ip} for ${host}`);
              })()
            : (function() {
                addresses.forEach(addr =>
                  console.log(
                    ip,
                    "resolves",
                    args.length > 1 ? `${addr} for ${host}` : addr
                  )
                );
              })()
      );
    });
  });
