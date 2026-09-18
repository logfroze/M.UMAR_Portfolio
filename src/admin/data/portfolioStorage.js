/**
 * Persistent Portfolio Storage Service
 * Handles localStorage persistence, data versioning, export/import, and factory reset.
 */

import { defaultPortfolioData } from './defaultPortfolioData';

const STORAGE_KEY = 'alan_portfolio_cms_v1';

export function loadPortfolioData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      savePortfolioData(defaultPortfolioData);
      return defaultPortfolioData;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return defaultPortfolioData;
    }
    // Deep merge top-level keys to ensure newly added properties exist
    return {
      ...defaultPortfolioData,
      ...parsed,
      lastUpdatedDate: parsed.lastUpdatedDate || defaultPortfolioData.lastUpdatedDate,
      heroAbout: { ...defaultPortfolioData.heroAbout, ...(parsed.heroAbout || {}) },
      sections: { ...defaultPortfolioData.sections, ...(parsed.sections || {}) },
    };
  } catch (err) {
    console.warn('Failed to load stored portfolio data, falling back to default:', err);
    return defaultPortfolioData;
  }
}

export function savePortfolioData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('Failed to save portfolio data:', err);
    return false;
  }
}

export function resetPortfolioData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    savePortfolioData(defaultPortfolioData);
    return defaultPortfolioData;
  } catch (err) {
    console.error('Failed to reset portfolio data:', err);
    return defaultPortfolioData;
  }
}

export function exportPortfolioData() {
  const current = loadPortfolioData();
  return JSON.stringify(current, null, 2);
}

export function importPortfolioData(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid JSON format');
    }
    savePortfolioData(parsed);
    return { success: true, data: parsed };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
