import { Product } from "@prisma/client";
import { json, LoaderFunction } from "remix/server";
import { CartItem } from "~/models/ecommerce-provider.server";
import { db } from "~/utils/db.server";
import { getSession, getUser } from "~/utils/session.server";

export type LoaderData = {
    user: string | undefined;
    products: Product[];
    cartItems: CartItem[];
  };

export let loader: LoaderFunction = async ({ request }) => {
    let user = await getUser(request);
    const products = await db.product.findMany();
    const cartItems = await (await getSession(request, null)).getCart();
    // console.log({ user: user?.username, products, cartItems });
    
    return json<LoaderData>({ user: user?.username, products, cartItems });
  };
