import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';

const URL = 'https://flights-app.pages.dev/';
let homePage: HomePage;
const flyDirect1 = "Istanbul"
const flyDirect2 = "Los Angeles"
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    homePage = new HomePage(page);
});


test.describe('Fly Website', async () => {

    test('@smoke - Same direction control', async () => {
        await test.step('Select same direction', async () => {
            await homePage.clickSelectFlyFromBtn();
            await homePage.clickFlyDirect(flyDirect1);
            await homePage.clickSelectFlyToBtn();
            await homePage.clickFlyDirect(flyDirect1);
        });
      
        await test.step('Check same direction didnt select', async () => {
            await homePage.checkFlyFromValue(flyDirect1);
            await homePage.checkFlyToValueNot(flyDirect1);
            //Delay for check
            //await delay(3000);
        });
    });

    test('Fly count control', async () => {
        await test.step('Select directions', async () => {
            await homePage.clickSelectFlyFromBtn();
            await homePage.clickFlyDirect(flyDirect1);
            await homePage.clickSelectFlyToBtn();
            await homePage.clickFlyDirect(flyDirect2);
        });
      
        await test.step('Check fly count', async () => {
            await homePage.checkFlyFromValue(flyDirect1);
            await homePage.checkFlyToValue(flyDirect2);
            await homePage.checkFlyCount();
            //Delay for check
            //await delay(3000);
        });
    });
    
    
});