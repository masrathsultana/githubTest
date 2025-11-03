
exports.RecruitmentPage = 
class RecruitmentPage {
    constructor(page) {
        this.page = page;
        this.RecruitmentLink = "//span[@class='oxd-text oxd-text--span oxd-main-menu-item--name'][normalize-space()='Recruitment']";
        this.AddRecruiterButton = "//button[normalize-space()='Add']";
        this.RecruiterFirstName = "//input[@placeholder='First Name']";
        this.RecruiterLastName = "//input[@placeholder='Last Name']";
        this.vacancyDropdown = "div[class = 'oxd-select-text--after']";
        this.vacancyAllOptions = "div[class = 'oxd-select-option']";
        this.RecruiterEmail = "//div[3]//div[1]//div[1]//div[1]//div[2]//input[1]";
        this.RecruiterPhone = "//body/div[@id='app']/div[@class='oxd-layout orangehrm-upgrade-layout']/div[@class='oxd-layout-container']/div[@class='oxd-layout-context']/div[@class='orangehrm-background-container orangehrm-save-candidate-page']/div[@class='orangehrm-card-container']/form[@class='oxd-form']/div[@class='oxd-form-row']/div[@class='oxd-grid-3 orangehrm-full-width-grid']/div[2]/div[1]/div[2]/input[1]";
        this.UploadFileLink = "input[type = 'file']";
        this.RecruiterExtraInfo = "//input[@placeholder='Enter comma seperated words...']"
        this.CalanderIcon = "//i[@class='oxd-icon bi-calendar oxd-date-input-icon']";
        this.CurrentMonth1 = "div[class = 'oxd-calendar-selector-month-selected']";
        this.CurrentYear1 = "div[class = 'oxd-calendar-selector-year-selected']";
        this.BackButtonCal = "//button[@class='oxd-icon-button']//i[@class='oxd-icon bi-chevron-left']";
        this.CalAllDates = "div[class = 'oxd-calendar-date']";
        this.RecruiterNotes = "//textarea[@placeholder='Type here']";
        this.RecruiterSaveButton = "//button[normalize-space()='Save']";
        this.CandidateNameSearchBox = "//input[@placeholder='Type for hints...']";
        this.CandidateAllOptions = "div[class = 'oxd-autocomplete-option']"
        this.SearchButton = "//button[normalize-space()='Search']";
        this.EditRecruiterButton = "//i[@class='oxd-icon bi-eye-fill']";
        this.CandidateShortListButton = "//button[normalize-space()='Shortlist']";
        this.DeleteRecruiterButton = "//i[@class='oxd-icon bi-trash']";
        this.DeleteAcceptButton = "//button[normalize-space()='Yes, Delete']";
    }
async AddRecruiter(){
    await this.page.locator(this.RecruitmentLink).click()
    await this.page.locator(this.AddRecruiterButton).click();
    await this.page.locator(this.RecruiterFirstName).fill("Aziza");
    await this.page.locator(this.RecruiterLastName).fill("Almaas");
    await this.page.locator(this.vacancyDropdown).click();
    await this.page.waitForTimeout(5000);
    const vacancy = await this.page.$$(this.vacancyAllOptions);
    for(const vac of vacancy){
        const vac1 =await vac.textContent();
        if(vac1.includes("Junior Account Assistant")){
            await vac.click();
            break;  
        }
    }
    await this.page.locator(this.RecruiterEmail).fill("masrath12@gmail.com");
    await this.page.locator(this.RecruiterPhone).fill("9876543210");
    const uploadFile1 = await this.page.locator(this.UploadFileLink);
    await uploadFile1.setInputFiles('C:/Users/masrath.s/Documents/masrathplay.pdf');
    await this.page.locator(this.RecruiterExtraInfo).fill("test automation");
    const Year = '2023';  
    const Month = 'May';
    const Date = '15';
    const cal = await this.page.locator(this.CalanderIcon);
    await cal.scrollIntoViewIfNeeded();
    await cal.click();
    while (true) {
        const currentmonth = await this.page.locator(this.CurrentMonth1).textContent();
        const currentyear = await this.page.locator(this.CurrentYear1).textContent();
        if (currentmonth.includes(Month) && currentyear.includes(Year)) {
            break;
        }     
            await this.page.locator(this.BackButtonCal).click();
    }
       const alldates = await this.page.$$(this.CalAllDates); 
       for(const alldate of alldates){
        const alldate1 = await alldate.textContent();
        if(alldate1.includes(Date)){
            await alldate.click();
            break;
        }
       }
       await this.page.locator(this.RecruiterNotes).fill("Good communication skills");
       await this.page.waitForTimeout(5000);
       const savebtn = await this.page.locator(this.RecruiterSaveButton);
       savebtn.scrollIntoViewIfNeeded();
       await savebtn.click();
    }
    
    async EditRecruiter()
    {
        await this.page.locator(this.RecruitmentLink).click()
        await this.page.locator(this.CandidateNameSearchBox).fill("Az");
        await this.page.waitForTimeout(5000);
        const searchRec = await this.page.$$(this.CandidateAllOptions);
        for(const searchRec1 of searchRec){
            const searchRec2 = await searchRec1.textContent();
            if(searchRec2.includes("Aziza  Almaas")){
                await searchRec1.click();
                break;
            }
    }
    await this.page.locator(this.SearchButton).click();
    await this.page.waitForTimeout(5000);
    await this.page.locator(this.EditRecruiterButton).click();
    await this.page.locator("").click();
    await this.page.waitForTimeout(5000);
    await this.page.locator(this.CandidateShortListButton).fill("Candidate shortlisted");
    const savebtn2 = await this.page.locator(this.RecruiterSaveButton)
    savebtn2.scrollIntoViewIfNeeded();
    await savebtn2.click();
}
    async DeleteRecruiter(){
        await this.page.locator(this.RecruitmentLink).click()
        await this.page.locator(this.CandidateNameSearchBox).fill("Az");
        await this.page.waitForTimeout(5000);
        const searchRec = await this.page.$$(this.CandidateAllOptions);
        for(const searchRec1 of searchRec){
            const searchRec2 = await searchRec1.textContent();
            if(searchRec2.includes("Aziza  Almaas")){
                await searchRec1.click();
                break;
            }
    }
    await this.page.locator(this.SearchButton).click();
    await this.page.waitForTimeout(5000);
    await this.page.on("dialog", async(dialog)=>{
        if (dialog.type() === 'confirm') await dialog.accept();
    })
    await this.page.locator(this.DeleteRecruiterButton).click();
    await this.page.waitForTimeout(5000);
    await this.page.locator(this.DeleteAcceptButton).click();
        }
}

