/**
 * Seeds the database with fake development data.
 *
 *   npm run seed          insert fake data (skips if data already present)
 *   npm run seed:fresh    wipe seeded collections, then insert
 *   npm run seed:destroy  wipe seeded collections only
 *
 * Documents are created in dependency order (category -> subcategory -> brand
 * -> product) so the required ObjectId refs point at real records. Images are
 * written as plain {public_id, url} subdocuments, which bypasses Cloudinary —
 * no upload credentials are needed to seed.
 */
const path = require("path");
const mongoose = require("mongoose");
const slugify = require("slugify");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const CategoryModel = require("../../models/categoryModel");
const SubCategoryModel = require("../../models/subCategoryModel");
const BrandModel = require("../../models/brandModel");
const ProductModel = require("../../models/productModel");
const UserModel = require("../../models/userModel");
const CouponModel = require("../../models/couponModel");

// Deterministic placeholder image so seeded records render in the UI.
const img = (label) => ({
  public_id: `seed/${label}`,
  url: `https://placehold.co/600x600/eeeeee/333333?text=${encodeURIComponent(
    label
  )}`,
});

const CATEGORIES = [
  { name: "Electronics", nameAr: "إلكترونيات" },
  { name: "Clothing", nameAr: "ملابس" },
  { name: "Books", nameAr: "كتب" },
  { name: "Home and Kitchen", nameAr: "المنزل والمطبخ" },
];

const SUBCATEGORIES = {
  Electronics: [
    { name: "Laptops", nameAr: "أجهزة الكمبيوتر المحمولة" },
    { name: "Smartphones", nameAr: "الهواتف الذكية" },
  ],
  Clothing: [
    { name: "Mens Clothing", nameAr: "ملابس رجالية" },
    { name: "Womens Clothing", nameAr: "ملابس نسائية" },
  ],
  Books: [{ name: "Programming", nameAr: "برمجة" }],
  "Home and Kitchen": [{ name: "Cookware", nameAr: "أدوات الطهي" }],
};

const BRANDS = [
  { name: "Acme", nameAr: "أكمي" },
  { name: "Globex", nameAr: "جلوبكس" },
  { name: "Initech", nameAr: "إنيتek" },
  { name: "Umbrella", nameAr: "أمبريلا" },
];

// category / subCategory / brand are filled in from created documents.
const PRODUCTS = [
  {
    title: "Pro Laptop 14 inch",
    titleAr: "لابتوب برو 14 بوصة",
    description:
      "A lightweight 14 inch laptop with 16GB of RAM and a 512GB SSD, built for everyday development work.",
    descriptionAr:
      "كمبيوتر محمول خفيف الوزن مقاس 14 بوصة مع ذاكرة وصول عشوائي 16 جيجابايت وقرص صلب 512 جيجابايت.",
    quantity: 25,
    sold: 4,
    price: 1299.99,
    priceAfterDiscount: 1149.99,
    colors: ["Silver", "Space Gray"],
    category: "Electronics",
    subcategory: "Laptops",
    brand: "Acme",
    ratingsAverage: 4.5,
    ratingsQuantity: 12,
  },
  {
    title: "Smartphone X20",
    titleAr: "هاتف ذكي X20",
    description:
      "A 6.5 inch OLED smartphone with a triple camera system and all day battery life.",
    descriptionAr:
      "هاتف ذكي بشاشة OLED مقاس 6.5 بوصة مع نظام كاميرا ثلاثي وبطارية تدوم طوال اليوم.",
    quantity: 60,
    sold: 31,
    price: 799,
    priceAfterDiscount: 699,
    colors: ["Black", "Blue"],
    category: "Electronics",
    subcategory: "Smartphones",
    brand: "Globex",
    ratingsAverage: 4.2,
    ratingsQuantity: 40,
  },
  {
    title: "Classic Cotton T Shirt",
    titleAr: "تي شيرت قطني كلاسيكي",
    description:
      "A soft 100 percent cotton t shirt with a regular fit, available in several colors.",
    descriptionAr: "تي شيرت قطني ناعم بقصة عادية متوفر بعدة ألوان.",
    quantity: 200,
    sold: 85,
    price: 24.5,
    colors: ["White", "Black", "Navy"],
    category: "Clothing",
    subcategory: "Mens Clothing",
    brand: "Acme",
    ratingsAverage: 4,
    ratingsQuantity: 55,
  },
  {
    title: "Summer Floral Dress",
    titleAr: "فستان صيفي بنقشة الزهور",
    description:
      "A breathable summer dress with a floral print and adjustable waist tie.",
    descriptionAr: "فستان صيفي مريح بنقشة زهور ورabط خصر قابل للتعديل.",
    quantity: 45,
    sold: 22,
    price: 59.99,
    priceAfterDiscount: 44.99,
    colors: ["Red", "Yellow"],
    category: "Clothing",
    subcategory: "Womens Clothing",
    brand: "Umbrella",
    ratingsAverage: 4.7,
    ratingsQuantity: 18,
  },
  {
    title: "Clean Code Handbook",
    titleAr: "كتاب الكود النظيف",
    description:
      "A practical guide to writing readable, maintainable software with worked examples.",
    descriptionAr: "دليل عملي لكتابة برمجيات قابلة للقراءة والصيانة مع أمثلة.",
    quantity: 80,
    sold: 47,
    price: 39.99,
    category: "Books",
    subcategory: "Programming",
    brand: "Initech",
    ratingsAverage: 4.8,
    ratingsQuantity: 96,
  },
  {
    title: "Non Stick Frying Pan 28cm",
    titleAr: "مقلاة غير لاصقة 28 سم",
    description:
      "A 28cm non stick frying pan with an aluminium body and heat resistant handle.",
    descriptionAr: "مقلاة غير لاصقة 28 سم بجسم من الألومنيوم ومقبض مقاوم للحرارة.",
    quantity: 120,
    sold: 63,
    price: 34.75,
    priceAfterDiscount: 29.99,
    colors: ["Black"],
    category: "Home and Kitchen",
    subcategory: "Cookware",
    brand: "Globex",
    ratingsAverage: 4.1,
    ratingsQuantity: 27,
  },
];

// Password is hashed by the userModel pre-save hook.
const USERS = [
  {
    name: "Seed Admin",
    email: "admin@seed.local",
    password: "123456",
    role: "admin",
  },
  {
    name: "Seed Manager",
    email: "manager@seed.local",
    password: "123456",
    role: "manager",
  },
  {
    name: "Seed Customer",
    email: "customer@seed.local",
    password: "123456",
    role: "user",
  },
];

const COUPONS = [
  { name: "SEED10", discount: 10 },
  { name: "SEED25", discount: 25 },
];

// Collections this script owns. Carts, orders and reviews are left untouched.
const seededModels = [
  ProductModel,
  SubCategoryModel,
  CategoryModel,
  BrandModel,
  CouponModel,
];

const destroy = async () => {
  for (const Model of seededModels) {
    // eslint-disable-next-line no-await-in-loop
    const { deletedCount } = await Model.deleteMany({});
    console.log(`  removed ${deletedCount} from ${Model.modelName}`);
  }
  // Only remove the users this script created, never real accounts.
  const { deletedCount } = await UserModel.deleteMany({
    email: { $in: USERS.map((u) => u.email) },
  });
  console.log(`  removed ${deletedCount} seeded users`);
};

const insert = async () => {
  // Slugs are normally set by the route validators, which a direct insert
  // bypasses — and `slug` is required on the product model.
  const categories = await CategoryModel.create(
    CATEGORIES.map((c) => ({
      ...c,
      slug: slugify(c.name, { lower: true }),
      image: img(c.name),
    }))
  );
  const categoryByName = new Map(categories.map((c) => [c.name, c]));
  console.log(`  ${categories.length} categories`);

  const subcategoryPayload = Object.entries(SUBCATEGORIES).flatMap(
    ([categoryName, subs]) =>
      subs.map((s) => ({
        ...s,
        slug: slugify(s.name, { lower: true }),
        category: categoryByName.get(categoryName)._id,
      }))
  );
  const subcategories = await SubCategoryModel.create(subcategoryPayload);
  const subcategoryByName = new Map(subcategories.map((s) => [s.name, s]));
  console.log(`  ${subcategories.length} subcategories`);

  const brands = await BrandModel.create(
    BRANDS.map((b) => ({
      ...b,
      slug: slugify(b.name, { lower: true }),
      image: img(b.name),
    }))
  );
  const brandByName = new Map(brands.map((b) => [b.name, b]));
  console.log(`  ${brands.length} brands`);

  const productPayload = PRODUCTS.map((p) => {
    const { category, subcategory, brand, ...rest } = p;
    return {
      ...rest,
      slug: slugify(p.title, { lower: true }),
      imageCover: img(p.title),
      images: [img(`${p.title} 2`), img(`${p.title} 3`)],
      category: categoryByName.get(category)._id,
      subcategories: [subcategoryByName.get(subcategory)._id],
      brand: brandByName.get(brand)._id,
    };
  });
  const products = await ProductModel.create(productPayload);
  console.log(`  ${products.length} products`);

  // create() runs the password-hashing hook; insertMany() would not.
  const users = await UserModel.create(USERS);
  console.log(`  ${users.length} users (password: 123456)`);

  const year = new Date().getFullYear() + 1;
  const coupons = await CouponModel.create(
    COUPONS.map((c) => ({ ...c, expire: new Date(`${year}-12-31`) }))
  );
  console.log(`  ${coupons.length} coupons`);
};

const run = async () => {
  const mode = process.argv[2] || "--insert";

  if (!process.env.DB_URI) {
    console.error("DB_URI is not set. Copy .env.example to .env first.");
    process.exit(1);
  }

  await mongoose.connect(process.env.DB_URI);
  console.log(`connected to ${mongoose.connection.name}\n`);

  try {
    if (mode === "--destroy" || mode === "-d") {
      console.log("destroying seeded data...");
      await destroy();
    } else if (mode === "--fresh" || mode === "-f") {
      console.log("destroying seeded data...");
      await destroy();
      console.log("\ninserting fake data...");
      await insert();
    } else {
      const existing = await ProductModel.countDocuments();
      if (existing > 0) {
        console.log(
          `${existing} products already exist. Use "npm run seed:fresh" to wipe and reseed.`
        );
      } else {
        console.log("inserting fake data...");
        await insert();
      }
    }
    console.log("\ndone.");
  } finally {
    await mongoose.connection.close();
  }
};

run().catch((err) => {
  console.error(`\nseed failed: ${err.message}`);
  process.exit(1);
});
