// small test harness over the playwright library
// the @playwright/test runner does not work in this environment, so tests are
// plain functions and this file discovers, runs and reports them

import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

export const baseURL = process.env.BASE_URL || "http://localhost:3000";
const headed = process.env.HEADED === "1";

// read .env directly, vite is not running in this process
const env = {};
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
        if (!line.includes("=") || line.trim().startsWith("#")) continue;
        const at = line.indexOf("=");
        env[line.slice(0, at).trim()] = line.slice(at + 1).trim();
    }
}

export const account = {
    email: env.TEST_USER_EMAIL,
    password: env.TEST_USER_PASSWORD,
};

// one fixed account for the sign up test, reused every run so repeat runs
// never leave a trail of users behind
export const signUpAccount = {
    email: env.TEST_SIGNUP_EMAIL || "qa.signup@example.com",
    password: env.TEST_SIGNUP_PASSWORD || "PlaywrightSignUp123!",
};

export const hasAccount = Boolean(account.email && account.password);

const registered = [];

/** Registers a test. Pass needsAuth so it skips when .env has no account. */
export const test = (name, fn, { needsAuth = false } = {}) =>
    registered.push({ name, fn, needsAuth });

export const assert = (ok, message) => {
    if (!ok) throw new Error(message);
};

export const assertEqual = (actual, expected, message) =>
    assert(
        actual === expected,
        `${message} (expected ${expected}, got ${actual})`,
    );

/** Waits for fn() to return the wanted value, so tests do not sleep blindly. */
export const waitFor = async (fn, wanted, message, timeout = 15000) => {
    const until = Date.now() + timeout;
    let last;
    while (Date.now() < until) {
        last = await fn();
        if (last === wanted) return;
        await new Promise((r) => setTimeout(r, 300));
    }
    throw new Error(`${message} (expected ${wanted}, got ${last})`);
};

// poster tiles, never .MuiCard-root, the filter drawer renders two Cards of
// its own so card counts jump when it opens
export const tiles = (page) => page.locator(".MuiCardMedia-root").count();

const fillAuth = async (page, { email, password }) => {
    await page.locator("#auth-email").fill(email);
    await page.locator("#auth-password").fill(password);
    await page.locator('form button[type="submit"]').click();
    await page.waitForTimeout(3000);
};

// the account avatar only renders when there is a session, and unlike the
// sign out item it is not tucked inside a menu
const signedIn = (page) =>
    page.getByRole("button", { name: "account", exact: true }).count();

/** Opens the account menu in the header. */
export const openAccountMenu = async (page) => {
    await page.getByRole("button", { name: "account", exact: true }).click();
    await page.waitForTimeout(400);
};

export const signIn = async (page) => {
    await page.goto(`${baseURL}/login`, { waitUntil: "networkidle" });
    await fillAuth(page, account);
    assert(await signedIn(page), "could not sign in with the .env account");
};

/** Signs up, or signs in when the account already exists. Idempotent. */
export const signUpOrSignIn = async (page) => {
    await page.goto(`${baseURL}/login`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /Create an account/i }).click();
    await page.waitForTimeout(500);
    await fillAuth(page, signUpAccount);
    if (await signedIn(page)) return;
    await page.goto(`${baseURL}/login`, { waitUntil: "networkidle" });
    await fillAuth(page, signUpAccount);
    assert(await signedIn(page), "could not sign up or sign in");
};

export const signOut = async (page) => {
    if (!(await signedIn(page))) return;
    await openAccountMenu(page);
    await page.getByRole("menuitem", { name: "Sign out", exact: true }).click();
    await page.waitForTimeout(1500);
};

/** Deletes every fantasy movie, so a run leaves the account as it found it. */
export const clearFantasyMovies = async (page) => {
    await page.goto(`${baseURL}/fantasy`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    const button = () => page.getByRole("button", { name: /^Delete / });
    for (let i = 0; i < 20 && (await button().count()); i += 1) {
        await button().first().click();
        await page.waitForTimeout(600);
    }
};

/** Runs everything registered, one fresh context each, and sets the exit code. */
export const run = async () => {
    const browser = await chromium.launch({ headless: !headed, slowMo: headed ? 80 : 0 });
    let passed = 0;
    const failures = [];

    for (const { name, fn, needsAuth } of registered) {
        if (needsAuth && !hasAccount) {
            console.log(`SKIP  ${name}  (no TEST_USER_* in .env)`);
            continue;
        }
        const context = await browser.newContext({
            viewport: { width: 1500, height: 1000 },
        });
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(String(e)));

        try {
            await fn(page);
            assert(!errors.length, `page error: ${errors[0]}`);
            console.log(`PASS  ${name}`);
            passed += 1;
        } catch (error) {
            console.log(`FAIL  ${name}\n        ${error.message}`);
            failures.push(name);
        } finally {
            await context.close();
        }
    }

    await browser.close();
    console.log(`\n${passed} passed, ${failures.length} failed`);
    process.exitCode = failures.length ? 1 : 0;
};
