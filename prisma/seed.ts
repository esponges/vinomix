import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type product = {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  discount: number;
  isAvailable: boolean;
  isFeatured: boolean;
};

const sync = async () => {
  await prisma.user.create({
    data: {
      username: "esponges",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });

  await Promise.all(
    getProducts().map((product: product) => {
      return prisma.product.create({ data: product });
    })
  );
};

const getProducts = () => {
  return [
    {
      name: "Product 1",
      price: 10,
      description: "This is product 1",
      imageUrl: "https://via.placeholder.com/150",
      category: "Category 1",
      discount: 0,
      isAvailable: true,
      isFeatured: true,
    },
    {
      name: "Product 2",
      price: 20,
      description: "This is product 2",
      imageUrl: "https://via.placeholder.com/150",
      category: "Category 2",
      discount: 0,
      isAvailable: true,
      isFeatured: true,
    },
    {
      name: "Product 3",
      price: 30,
      description: "This is product 3",
      imageUrl: "https://via.placeholder.com/150",
      category: "Category 3",
      discount: 0,
      isAvailable: true,
      isFeatured: true,
    },
    {
      name: "Product 4",
      price: 40,
      description: "This is product 4",
      imageUrl: "https://via.placeholder.com/150",
      category: "Category 4",
      discount: 0,
      isAvailable: true,
      isFeatured: true,
    },
    {
      name: "Product 5",
      price: 50,
      description: "This is product 5",
      imageUrl: "https://via.placeholder.com/150",
      category: "Category 5",
      discount: 0,
      isAvailable: true,
      isFeatured: true,
    },
  ];
};

sync();
