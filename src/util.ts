const limit = 400;

// cut back to the last space, comma or full stop before the limit so the
// excerpt ends on a word rather than mid one
export const excerpt = (string: string) => {
    if (string.length <= limit) {
        return string;
    }

    const cut = string.slice(0, limit);
    const lastBreak = cut.search(/[^ ]*$/);

    return `${cut.slice(0, lastBreak).replace(/,?\.* +$/, "")}...`;
};
