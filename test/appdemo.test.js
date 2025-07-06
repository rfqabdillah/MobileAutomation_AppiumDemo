import { expect } from 'chai';

describe('Appium Test App', ()=>{
    afterEach(async () => {
        await browser.execute('mobile: terminateApp', { appId: 'io.appium.android.apis'});
        await browser.pause(1000);
        await browser.execute('mobile: activateApp', { appId: 'io.appium.android.apis'});
    });

    it('Click Element', async ()=>{
        const elementKlik = await $(`//android.widget.TextView[@content-desc="Accessibility"]`)
        await elementKlik.click();
    });

    it('Input Element', async ()=>{
        const appMenu = await $(`//android.widget.TextView[@content-desc="App"]`);
        const alertDialogMenu = await $(`//android.widget.TextView[@content-desc="Alert Dialogs"]`);
        const textEntryMenu = await $(`//android.widget.Button[@content-desc="Text Entry dialog"]`);
        await appMenu.click();
        await alertDialogMenu.click();
        await textEntryMenu.click();

        const namaField = await $(`//android.widget.EditText[@resource-id="io.appium.android.apis:id/username_edit"]`);
        const passField = await $(`//android.widget.EditText[@resource-id="io.appium.android.apis:id/password_edit"]`);
        await namaField.setValue('RAbdillah');
        await passField.setValue('user123');
    });
    
    it('Memastikan App bisa terbuka dan elemen tersedia', async ()=>{
        const accessibilityMenu = await $(`//android.widget.TextView[@content-desc="Accessibility"]`);

        await accessibilityMenu.waitForDisplayed({ timeout: 10000 });
        const isVisible = await accessibilityMenu.isDisplayed();
        expect(isVisible).to.be.true;
    });

    it('Swipe Element hard-Coded', async ()=>{
        const viewsMenu = await $(`//android.widget.TextView[@content-desc="Views"]`);
        const galleryMenu = await $(`//android.widget.TextView[@content-desc="Gallery"]`);
        const photosMenu = await $(`//android.widget.TextView[@content-desc="1. Photos"]`);
        await viewsMenu.click();
        await galleryMenu.click();
        await photosMenu.click();

        const galleryWidget = await $(`//android.widget.Gallery[@resource-id="io.appium.android.apis:id/gallery"]`);
        await galleryWidget.waitForDisplayed({ timeout: 10000});
        const isGalleryVisible = await galleryWidget.isDisplayed();
        expect(isGalleryVisible).to.be.true;

        const location = await galleryWidget.getLocation();
        const size = await galleryWidget.getSize();
        const y = location.y + size.height /2;
        const startX = location.x + size.width - 10;
        const endX = location.x + 10;

        await browser.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch'},
            actions: [
                { type: 'pointerMove', duration: 0, x: startX, y },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerMove', duration: 300, x: endX, y },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
        await browser.releaseActions();
    });

    it('Scroll Down', async ()=>{
        const viewMenu = await $(`//android.widget.TextView[@content-desc="Views"]`);
        await viewMenu.click();

        const target = await $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Layouts"))`);
        await target.click();
    });


});