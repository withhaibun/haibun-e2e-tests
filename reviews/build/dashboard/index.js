/**
 * Bundle of haibun-reviews-dashboard
 * Generated: 2024-01-12
 * Version: 1.33.4
 * Dependencies:
 */

import { endpoint } from './indexer.js';

class DataAccess {
    latest = [];
    async getLatest() {
        if (this.latest.length > 0) {
            return this.latest;
        }
        const indexer = await import('./indexer.js');
        return await indexer.getPublishedReviews();
    }
    async getTracksHistories() {
        const links = await this.getLatest();
        const historyFiles = links.filter(link => link.endsWith('-tracksHistory.json'));
        if (!historyFiles) {
            return [];
        }
        const foundHistories = [];
        for (const source of historyFiles) {
            const summary = await summarize(source);
            foundHistories.push(summary);
        }
        return foundHistories;
    }
}
async function summarize(file) {
    const link = `${endpoint}${file}`;
    const response = await fetch(link);
    const foundHistory = await response.json();
    return {
        features: Object.values(foundHistory.histories).map(h => h.meta.feature),
        link: `reviewer.html#source=${link}`,
        date: new Date(foundHistory.meta.date).toLocaleString(),
        results: {
            success: Object.values(foundHistory.histories).filter(h => !!h.meta.ok).length,
            fail: Object.values(foundHistory.histories).filter(h => !h.meta.ok).length,
        }
    };
}

class ReviewOverview extends HTMLElement {
    dataAccess;
    constructor() {
        super();
        this.dataAccess = new DataAccess();
    }
    async connectedCallback() {
        const prData = null; //await this.dataAccess.getLatestPR();
        const reviewData = await this.dataAccess.getTracksHistories().catch(e => {
            this.innerHTML = `<h1>Failed to load data: ${e.message}</h1>`;
            throw (e);
        });
        this.render(prData, reviewData);
    }
    render(prData, reviewData) {
        // const prLink = prData ? `<a href="${prData.link}" data-testid="_hai-latest-pr">${prData.title} (${prData.date})</a>` : 'No latest PR found.';
        const openFrame = window !== top ? 'Open links in a new window to escape this frame.' : '';
        const reviewLinks = reviewData.length > 0 ? reviewData.map(review => {
            const titles = review.features;
            return `<a href="${review.link}" data-testid="_hai-review-titles">${titles} (${review.date}) ✅ ${review.results?.success} ❌ ${review.results?.fail}</a>`;
        }).join('<br>') : 'No review files found.';
        this.innerHTML = `
      <div class="list-container">
        <h2>Reviews</h2>
        <div class="list-item">${reviewLinks}</div>
        <i>${openFrame}</i>
      </div>
    `;
    }
}
customElements.define('link-results', ReviewOverview);

export { ReviewOverview };
//# sourceMappingURL=index.js.map