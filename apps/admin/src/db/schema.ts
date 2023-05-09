import { mysqlTable, varchar, uniqueIndex, timestamp, index, serial, int, decimal, text } from "drizzle-orm/mysql-core";

export const measurementType = mysqlTable("measurement_type", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 36 }).notNull(),
});
export const measurementUnit = mysqlTable(
  "measurement_unit",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 36 }).notNull(),
    abbreviation: varchar("abbreviation", { length: 36 }).notNull(),
    typeId: int("type_id").notNull(),
  },
  (measurementUnit) => ({
    typeIdIndex: index("type__idx").on(measurementUnit.typeId),
  })
);
export const conversionFactors = mysqlTable("conversion_factors", {
  id: serial("id").primaryKey().notNull(),
  fromUnitId: int("from_unit_id").notNull(),
  toUnitId: int("to_unit_id").notNull(),
  conversionFactor: decimal("conversion_factor", { precision: 10, scale: 4 }).notNull(),
});
export const measurement = mysqlTable(
  "measurement",
  {
    id: serial("id").primaryKey().notNull(),
    priceId: int("price_id").notNull(),
    unitId: int("unit_id").notNull(),
    size: decimal("size", { precision: 10, scale: 2 }).notNull(),
    quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
    mlToGram: decimal("ml_to_gram", { precision: 10, scale: 2 }),
  },
  (measurement) => ({
    priceIdIndex: uniqueIndex("price__idx").on(measurement.priceId),
  })
);
export const price = mysqlTable(
  "price",
  {
    id: serial("id").primaryKey().notNull(),
    ingredientId: int("ingredient_id").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (price) => ({
    ingredientIdIndex: index("price__ingredient__idx").on(price.ingredientId),
  })
);
export const ingredient = mysqlTable("ingredient", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow().notNull(),
});
export const recipe = mysqlTable("recipe", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  yieldName: varchar("yield_name", { length: 255 }).notNull(),
  yieldQuantity: int("yield_count").notNull(),
  targetMargin: decimal("target_margin", { precision: 10, scale: 2 }).notNull(),
  sellPrice: decimal("sell_price", { precision: 10, scale: 2 }).notNull(),
  sellQuantity: int("sell_quantity").notNull(),
  description: text("description"),
});
export const recipeIngredient = mysqlTable(
  "recipe_ingredient",
  {
    id: serial("id").primaryKey().notNull(),
    recipeId: int("recipe_id").notNull(),
    ingredientId: int("ingredient_id").notNull(),
    size: decimal("size", { precision: 10, scale: 4 }).notNull(),
  },
  (recipeIngredient) => ({
    recipeIdIndex: index("recipe__idx").on(recipeIngredient.recipeId),
  })
);
export const ingredientInventory = mysqlTable(
  "ingredient_inventory",
  {
    id: serial("id").primaryKey().notNull(),
    ingredientId: int("ingredient_id").notNull(),
    quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  },
  (ingredientInventory) => ({
    ingredientIdIndex: index("invetory__ingredient__idx").on(ingredientInventory.ingredientId),
  })
);
export const order = mysqlTable("order", {
  id: serial("id").primaryKey().notNull(),
  orderDate: timestamp("order_date").defaultNow().notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
});
export const orderItem = mysqlTable(
  "order_item",
  {
    id: serial("id").primaryKey().notNull(),
    orderId: int("order_id").notNull(),
    ingredientId: int("ingredient_id").notNull(),
    priceId: int("price_id").notNull(),
  },
  (orderItem) => ({
    orderIdIndex: index("order__idx").on(orderItem.orderId),
  })
);
export const sale = mysqlTable("sale", {
  id: serial("id").primaryKey().notNull(),
  saleDate: timestamp("sale_date").defaultNow().notNull(),
});
export const saleItem = mysqlTable(
  "sale_item",
  {
    id: serial("id").primaryKey().notNull(),
    saleId: int("sale_id").notNull(),
    recipeId: int("recipe_id").notNull(),
    yieldSold: int("yield_sold").notNull(),
  },
  (saleItem) => ({
    saleIdIndex: index("sale__idx").on(saleItem.saleId),
  })
);
export const externalCost = mysqlTable("external_cost", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const createdItem = mysqlTable("created_item", {
  id: serial("id").primaryKey().notNull(),
  recipeId: int("recipe_id").notNull(),
  yieldCreated: int("yield_created").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
