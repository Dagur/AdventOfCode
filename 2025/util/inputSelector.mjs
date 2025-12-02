import fs from "fs";

/**
 * Get file content as string
 * @folder "examples" | "inputs"
 * @day number from 1 to 25
 * @item number
 */
function getContent(folder, day, item) {
  const path = `${process.cwd()}/${folder}/${day}_${item}.txt`;
  try {
    return fs.readFileSync(path).toString();
  } catch (cause) {
    throw new Error(`Could not find ${path}`, { cause })
  }
}

export function createInputSelector(day, testing) {
  const folder = testing ? "examples" : "inputs";
  return (item) => getContent(folder, day, item);
}
