import { Product, User } from "@prisma/client";
import { json, LoaderFunction } from "remix/server";
import { db } from "~/utils/db.server";
import { getSession, getUser } from "~/utils/session.server";

export type LoaderData = {
    user: string | undefined;
    products: Product[];
  };
// init data
export let loader: LoaderFunction = async ({ request }) => {
    let user = await getUser(request);
    const products = await db.product.findMany();
    const cartItems = await (await getSession(request, null)).getCart();
    
    return json<LoaderData>({ user: user?.username, products });
  };
