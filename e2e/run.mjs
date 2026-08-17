// five end to end tests, run with npm test
// HEADED=1 npm test to watch them

import {
    account,
    assert,
    assertEqual,
    baseURL,
    clearFantasyMovies,
    run,
    signIn,
    signOut,
    signUpAccount,
    signUpOrSignIn,
    test,
    tiles,
    waitFor,
} from "./harness.mjs";

const go = async (page, route) => {
    await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
};

test(
    "signs up an account and lands signed in",
    async (page) => {
        // reuses one fixed account, so repeat runs do not pile up users
        await signUpOrSignIn(page);
        assert(
            await page.getByText(signUpAccount.email).first().isVisible(),
            "header does not show the new account",
        );
        assert(
            await page
                .getByRole("button", { name: "Fantasy Movie", exact: true })
                .count(),
            "private nav did not appear after signing up",
        );
        await signOut(page);
    },
    { needsAuth: true },
);

test(
    "signs in, opens a private route, signs out again",
    async (page) => {
        await go(page, "/fantasy");
        assert(page.url().endsWith("/login"), "private route did not redirect");

        await signIn(page);
        assert(
            await page.getByText(account.email).first().isVisible(),
            "header does not show the signed in account",
        );

        await go(page, "/fantasy");
        assert(page.url().endsWith("/fantasy"), "private route did not open");
        await page.reload({ waitUntil: "networkidle" });
        await page.waitForTimeout(1500);
        assert(
            page.url().endsWith("/fantasy"),
            "a reload bounced the signed in user out",
        );

        await signOut(page);
        await go(page, "/fantasy");
        assert(page.url().endsWith("/login"), "route was not private after sign out");
    },
    { needsAuth: true },
);

test("a signed out visitor can walk movie to actor and back", async (page) => {
    await go(page, "/");
    assert((await tiles(page)) > 5, "the discover grid is empty");

    await page.getByRole("link", { name: /More Info/i }).first().click();
    await page.waitForTimeout(2200);
    assert(/\/movies\/\d+$/.test(page.url()), `expected a movie, got ${page.url()}`);

    const castLink = page.locator('a[href^="/actors/"]').first();
    assert(await castLink.count(), "no cast member linked to an actor");
    await castLink.click();
    await page.waitForTimeout(2400);
    assert(/\/actors\/\d+$/.test(page.url()), `expected an actor, got ${page.url()}`);

    const filmLink = page.locator('a[href^="/movies/"]').first();
    assert(await filmLink.count(), "no filmography credit linked back to a movie");
    await filmLink.click();
    await page.waitForTimeout(2200);
    assert(/\/movies\/\d+$/.test(page.url()), "the movie to actor loop did not close");
});

test(
    "creates two fantasy movies, opens one on its own page, deletes one",
    async (page) => {
        await signIn(page);
        await clearFantasyMovies(page);

        const create = async (title, date, runtime) => {
            await page.locator("#fantasy-title").fill(title);
            await page.locator("#fantasy-overview").fill(`${title} overview.`);
            await page.locator("#fantasy-release-date").fill(date);
            await page.locator("#fantasy-runtime").fill(String(runtime));
            await page
                .locator("#fantasy-production-companies")
                .fill("Saltwater Pictures");
            await page.getByRole("button", { name: "Submit" }).click();
        };

        await create("The Last Lighthouse", "2027-10-29", 118);
        await waitFor(() => tiles(page), 1, "the first movie was not saved");
        assertEqual(
            await page.locator("#fantasy-title").inputValue(),
            "",
            "the form did not reset after submitting",
        );

        // a second must not replace the first
        await create("Winter Harbour", "2028-01-04", 95);
        await waitFor(() => tiles(page), 2, "the second movie replaced the first");

        await page.getByRole("link", { name: /More Info/i }).first().click();
        await page.waitForTimeout(1600);
        assert(
            /\/fantasy\/[0-9a-f-]{36}$/.test(page.url()),
            `expected a fantasy movie page, got ${page.url()}`,
        );

        await page
            .getByRole("button", { name: /Back to your fantasy movies/i })
            .click();
        await page.waitForTimeout(1400);

        await page.getByRole("button", { name: /^Delete / }).first().click();
        await waitFor(() => tiles(page), 1, "delete did not remove a movie");

        // leave the account as we found it
        await clearFantasyMovies(page);
        await signOut(page);
    },
    { needsAuth: true },
);

test(
    "pages through discover and narrows it by genre",
    async (page) => {
        await signIn(page);
        await go(page, "/");

        const poster = () =>
            page.locator(".MuiCardMedia-root").first().getAttribute("style");
        const firstPage = await poster();

        await page.getByRole("button", { name: "Go to page 2" }).click();
        await page.waitForTimeout(2400);
        assert((await poster()) !== firstPage, "page 2 showed the same results");

        await page.getByRole("button", { name: "Go to page 1" }).click();
        await page.waitForTimeout(1800);
        const baseline = await tiles(page);

        await page.locator(".MuiFab-root").first().click();
        await page.waitForTimeout(900);
        await page.locator('input[type="checkbox"]').first().check();
        await page.waitForTimeout(1200);
        assert(
            (await tiles(page)) < baseline,
            "ticking a genre did not narrow the list",
        );

        await page.getByRole("button", { name: "Clear all" }).click();
        await waitFor(() => tiles(page), baseline, "clear all did not restore the list");

        await signOut(page);
    },
    { needsAuth: true },
);

await run();
