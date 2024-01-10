/**
 * Bundle of haibun-reviews-dashboard
 * Generated: 2024-01-03
 * Version: 1.32.14
 * Dependencies:
 */

// this module might be replaced by specific storage implementations at runtime
const endpoint = '/tracks/';
async function getPublishedReviews() {
    const response = await fetch(endpoint);
    const data = await response.text();
    const latest = parseLinks(data).map(link => link.replace(endpoint, ''))
        .map(link => link.replace(/^\//, '')).filter(link => link.length > 0);
    return latest;
}
function parseLinks(html) {
    const links = [];
    const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g;
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
        const link = match[2];
        links.push(link);
    }
    return links;
}

export { endpoint, getPublishedReviews, parseLinks };
//# sourceMappingURL=indexer.js.map
