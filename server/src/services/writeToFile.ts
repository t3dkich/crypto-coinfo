import fs from "fs";

const writeToFile: Function = (data: string) => {
  fs.writeFileSync("/src/db/coinsList.json", data);
};

export default writeToFile;
