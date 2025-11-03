import PIMTestData from '../Pages/PIMTestData.json' assert { type: "json" };
exports.PIMPage = 
class PIMPage
{
    constructor(page)
    {
        this.page = page;
        this.PIMlink = "//a[span = 'PIM']";
        this.Addbutton = "button[class = 'oxd-button oxd-button--medium oxd-button--secondary']";
        this.AddFirstName = "input[name = 'firstName']"
        this.AddLastName = "input[name = 'lastName']"
        this.AddEmpId = "//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']";
        this.Savebutton1 = "button[type= 'submit']"
        this.NationalityDropdown = "//div[@class='orangehrm-horizontal-padding orangehrm-vertical-padding']//div[@class='oxd-grid-3 orangehrm-full-width-grid']//div[1]//div[1]//div[2]//div[1]//div[1]//div[2]//i[1]"
        this.NationalityAllData = "div[class = 'oxd-select-option']"
        this.MaritalDropdown = "//body/div[@id='app']/div[@class='oxd-layout orangehrm-upgrade-layout']/div[@class='oxd-layout-container']/div[@class='oxd-layout-context']/div[@class='orangehrm-background-container']/div[@class='orangehrm-card-container']/div[@class='orangehrm-edit-employee']/div[@class='orangehrm-edit-employee-content']/div[@class='orangehrm-horizontal-padding orangehrm-vertical-padding']/form[@class='oxd-form']/div[@class='oxd-form-row']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]"
        this.MaritalAllData = "div[class= 'oxd-select-option']"
        this.Calender = "//body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/form[1]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/i[1]"
        this.CurrentYearXpath = "div[class = 'oxd-calendar-selector-year-selected']"
        this.CurrentMonthXpath = "div[class = 'oxd-calendar-selector-month-selected']"
        this.CalenderArrowClick = "//button[@class='oxd-icon-button']//i[@class='oxd-icon bi-chevron-left']"
        this.CalenderAllDates = "div[class = 'oxd-calendar-date']"
        this.SexCheckbox = "//label[normalize-space()='Female']"
        this.SaveButton2 = "//div[@class='orangehrm-horizontal-padding orangehrm-vertical-padding']//button[@type='submit'][normalize-space()='Save']"
        this.EmpIDSearch = "//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']"
        this.EditSearchButton = "//button[normalize-space()='Search']"
        this.EditButton = "//button[.//i[contains(@class,'bi-pencil-fill')]]"
        this.BloodGroupDropdown = "//div[@class='orangehrm-custom-fields']//div[@class='orangehrm-card-container']//form[@class='oxd-form']//div[@class='oxd-form-row']//div[@class='oxd-grid-3 orangehrm-full-width-grid']//div[@class='oxd-grid-item oxd-grid-item--gutters']//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//div[@class='oxd-select-text oxd-select-text--active']"
        this.BloodGroupAllOptions = "div[class = 'oxd-select-option']"
        this.SaveButtonAfterEdit = "//div[@class='orangehrm-custom-fields']//button[@type='submit'][normalize-space()='Save']"
        this.SeachButton = "//button[normalize-space()='Search']"
        this.DeleteButton = "//button[.//i[contains(@class,'bi-trash')]]"
        this.ConfirmButton = "//button[normalize-space(.)='Yes, Delete' or normalize-space(.)='Yes' or normalize-space(.)='Confirm' or normalize-space(.)='Ok' or normalize-space(.)='Delete']"
    }
    async AddEmp()
    {
        await this.page.locator(this.PIMlink).click();
        await this.page.locator(this.Addbutton).click();
        await this.page.locator(this.AddFirstName).fill(PIMTestData.EmpFirstName);
        await this.page.locator(this.AddLastName).fill(PIMTestData.EmpLastName);
        await this.page.locator(this.AddEmpId).fill(PIMTestData.EmpId);
        await this.page.locator(this.Savebutton1).click();
        await this.page.waitForTimeout(5000);
        await this.page.locator(this.NationalityDropdown).click();
        const nationality = await this.page.$$(this.NationalityAllData);
        for(const nat of nationality){
            const value = await nat.textContent();
            if(value.includes(PIMTestData.EmpNationality)){
                await nat.click();
                break;
            }
        }
        await this.page.waitForTimeout(5000);
        await this.page.locator(this.MaritalDropdown).click();
        const marital = await this.page.$$(this.MaritalAllData)
        for(const mar of marital){
            const mar1 = await mar.textContent();
            if(mar1.includes(PIMTestData.EmpMaritalStatus)){
                await mar.click();
                break;
            }
        }
        const year = PIMTestData.EmpYear
        const month = PIMTestData.EmpMonth
        const date = PIMTestData.EmpDay
        const cal = await this.page.locator(this.Calender);
        await cal.scrollIntoViewIfNeeded();
        await cal.click();
        while(true){
        const currentyear = await this.page.locator(this.CurrentYearXpath).textContent()
        const currentmonth = await this.page.locator(this.CurrentMonthXpath).textContent()
        if(currentyear == year && currentmonth == month)
        {
            break;
        }
        await this.page.locator(this.CalenderArrowClick).click();
    }
        const dates = await this.page.$$(this.CalenderAllDates)
        for(const da1 of dates){
        if(await da1.textContent() == date)
        {
            da1.click();
        }
        }
        await this.page.locator(this.SexCheckbox).check();
        await this.page.locator(this.SaveButton2).click();
    }
    async EditEmp(){
        await this.page.locator(this.PIMlink).click();
        await this.page.locator(this.EmpIDSearch).fill(PIMTestData.EmpId);
        await this.page.locator(this.EditSearchButton).click();
        const editbuttonclick = await this.page.locator(this.EditButton).first();
        await editbuttonclick.scrollIntoViewIfNeeded();
        await editbuttonclick.waitFor({ state: 'visible', timeout: 7000 })
        await editbuttonclick.click();
        const elem = await this.page.locator(this.BloodGroupDropdown);
        await elem.scrollIntoViewIfNeeded();
        await elem.click();
        const bloodgrp = await this.page.$$(this.BloodGroupAllOptions)
        for(const bg of bloodgrp){
            const bg1 = await bg.textContent();
            if(bg1.includes(PIMTestData.EmpBloodGroup)){
                await bg.click();
                break;
            }
        }
        await this.page.locator(this.SaveButtonAfterEdit).click();
    }

    async DeleteEmp(){
        await this.page.locator(this.PIMlink).click();
        await this.page.locator(this.EmpIDSearch).fill(PIMTestData.EmpId);
        await this.page.locator(this.EditSearchButton).click();
        // register native dialog handler just in case this is a real browser confirm()
        const nativeDialogHandler = async dialog => {
            try {
               // console.log('native dialog:', dialog.type(), dialog.message());
                if (dialog.type() === 'confirm') await dialog.accept();
                else await dialog.dismiss();
            } catch (e) { /* ignore handler errors */ }
        };
        this.page.on('dialog', nativeDialogHandler);

        // click the delete control — click the button that contains the trash icon (more reliable than clicking the <i>)
        const trashButton = this.page.locator(this.DeleteButton).first();
        await trashButton.click();

        // If the app uses an in-page modal, wait for its confirm button and click it.
        // Try some common label texts — adjust the XPath to match the actual modal button text in your app.
        const confirmModalButton = this.page.locator(this.ConfirmButton);
        try {
            await confirmModalButton.waitFor({ state: 'visible', timeout: 3000 });
            await confirmModalButton.click();
        } catch (e) {
            // no in-page modal found within timeout — native dialog handler should have handled it if present
        }
        // small wait to let deletion complete, then remove the dialog handler
        await this.page.waitForTimeout(2000);
        this.page.off('dialog', nativeDialogHandler);
        // optional: verify deletion by asserting the search results or absence of the employee row
    }
    }

