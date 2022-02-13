import { createCookieSessionStorage, redirect } from "remix";
import { db } from "./db.server";
import bcrypt from "bcryptjs";
import { CartItem } from "~/models/ecommerce-provider.server";
// also type def npm install --save-dev @types/bcryptjs

type LoginType = {
  username: string;
  password: string;
};

export async function register({ username, password }: LoginType) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { username, passwordHash },
  });
  return user;
}

export async function login({ username, password }: LoginType) {
  let existingUser = await db.user.findFirst({ where: { username } });
  if (!existingUser) return null;

  const passwordsMatch = await bcrypt.compare(
    password,
    existingUser.passwordHash
  );
  if (!passwordsMatch) return null;

  return existingUser;
}

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("Must enviornment variable SESSION_SECRET");
}

let storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  let session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  let session = await getUserSession(request);
  let userId = session.get("userId");
  if (typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  let userId = await getUserId(request);
  if (!userId) {
    let params = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${params}`);
  }
  return userId;
}

export async function getUser(request: Request) {
  let userId = await getUserId(request);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

export async function logout(request: Request) {
  let session = await getUserSession(request);
  return redirect(`/`, {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

let cartSessionKey = "cart";

export async function getSession(
  input: Request,
  params: any
) {
  let session = await getUserSession(input);

  return {
    // TODO: Get and set cart from redis or something if user is logged in (could probably use a storage abstraction)
    async getCart(): Promise<CartItem[]> {
      let cart = JSON.parse(session.get(cartSessionKey) || "[]");
      return cart;
    },
    async setCart(cart: CartItem[]) {
      session.set(cartSessionKey, JSON.stringify(cart));
    },
  };
}
