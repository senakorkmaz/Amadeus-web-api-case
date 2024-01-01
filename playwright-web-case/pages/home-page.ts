import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly getStartedButton: Locator;
    readonly pageTitle: RegExp;
    readonly selectFlyFromBtn: Locator;
    readonly selectFlyToBtn: Locator;
    readonly selectFlyFromInput: Locator;
    readonly selectFlyToInput: Locator;
    readonly foundXItems: Locator;
    readonly items: Locator;
    flyDirect: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectFlyFromBtn= page.locator("(//button)[1]");
        this.selectFlyToBtn = page.locator("(//button)[2]");
        this.selectFlyFromInput = page.locator("(//input)[1]");
        this.selectFlyToInput = page.locator("(//input)[2]");
        this.foundXItems = page.locator("//p[@class='mb-10']");
        this.items = page.locator("//ul[@role='list']/li");
    }

    async clickSelectFlyFromBtn(){
        await this.selectFlyFromBtn.click();
    }

    async clickSelectFlyToBtn(){
        await this.selectFlyToBtn.click();
    }

    async clickFlyDirect(direct){
        this.flyDirect = this.page.locator("(//span[text()='"+direct+"'])[1]");
        await expect(this.flyDirect).toBeVisible();
        await this.flyDirect.click()
    }

    async checkFlyFromValue(direct){
        await expect(this.selectFlyFromInput).toHaveValue(direct);
    }

    async checkFlyToValueNot(direct){
        await expect(this.selectFlyToInput).not.toHaveValue(direct);
    }
    async checkFlyToValue(direct){
        await expect(this.selectFlyToInput).toHaveValue(direct);
    }

    async checkFlyCount(){
        let text = await this.foundXItems.textContent();
        let splitText = await text!.split(' '); // Metni boşluklara göre ayır
        let number = await parseInt(splitText[1]); // İkinci elemanı al ve integer'a çevir
        await expect(this.items.nth(number-1)).toBeVisible();
    }
}

export default HomePage;