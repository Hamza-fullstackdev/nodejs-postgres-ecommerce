import { createBannerSchema } from "./banner.model.js";
import { createCategorySchema } from "./categories.model.js";
import { createUserScheama } from "./user.model.js";

await createUserScheama();
await createCategorySchema();
await createBannerSchema();
