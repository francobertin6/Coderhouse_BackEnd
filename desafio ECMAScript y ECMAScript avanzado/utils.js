import { fileURLToPath } from "url";
import { dirname } from "path";

const fileName = fileURLToPath(import.meta.url);
const _Dirname = dirname(fileName);

export default _Dirname;