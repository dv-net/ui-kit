import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

async function generateSvgList() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const iconsDir = await fs.readdir("src/lib/assets/icons/");
  const outputFile = path.resolve(__dirname, "src/lib/helpers/svg-list.ts");
  const arrays = [];
  iconsDir.forEach(async (item) => {
    const files = await fs.readdir(`src/lib/assets/icons/${item}`);
    const filesArray = files.filter((file) => path.extname(file) === ".svg").map((file) => path.basename(file, ".svg"));
    arrays.push(`export const svgList${item} = ${JSON.stringify(filesArray, null, 2)} as const;\n`);
  });
  await fs.writeFile(outputFile, arrays, "utf-8");
}

generateSvgList().catch(console.error);
