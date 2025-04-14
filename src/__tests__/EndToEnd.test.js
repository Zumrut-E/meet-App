import { jest } from '@jest/globals';
import puppeteer from 'puppeteer';

jest.setTimeout(60000); // Increase timeout globally for this test file

describe('show/hide event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms
      timeout: 0 // removes any puppeteer/browser timeout limitations
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');

    // Debug: Check and log the event element's HTML
    const eventElement = await page.$('.event');
    if (eventElement) {
      const eventHtml = await page.evaluate(el => el.innerHTML, eventElement);
      console.log('Event HTML:', eventHtml);
    } else {
      console.error('Event element not found!');
    }
  });

  afterAll(async () => {
    await browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see details', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');

    await page.waitForSelector('.event');
    await page.click('.event .details-btn');

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
    await browser.close();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});
