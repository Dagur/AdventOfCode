const fs = require("fs");

export function readFile(filename: string) {
  // __dirname means relative to script. Use "./data.txt" if you want it relative to execution path.
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + filename, "ascii", (error: any, data: unknown) => {
      if (error) {
        throw error;
      }
      resolve(data);
    });

  })
}