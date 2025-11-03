import AdminTestData from './AdminTestData.json' assert { type: 'json' };

exports.AdminPage = class AdminPage
{
    constructor(page){
        this.page = page;
        this.Adminlink = "//li[1]//a[1]//span[1]";
        this.AddUserButton = "//button[normalize-space()='Add']";
        this.UserRoleDropdown = "//div[@class='oxd-grid-2 orangehrm-full-width-grid']//div[1]//div[1]//div[2]//div[1]//div[1]//div[2]//i[1]"
        this.UserRoleDropdownAllOptions = "div[class = 'oxd-select-option']"
        this.UserRoleFill = "//input[@placeholder='Type for hints...']"
        this.UserNamesAll = "div[class = 'oxd-autocomplete-option']"
        this.StatusDropdown = "//body[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/form[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[1]"  
        this.StatusDropdownAllOptions = "div[class = 'oxd-select-option']"
        this.AddUserName = "//div[@class='oxd-form-row']//div[@class='oxd-grid-2 orangehrm-full-width-grid']//div[@class='oxd-grid-item oxd-grid-item--gutters']//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']"
        this.Password = "//div[@class='oxd-grid-item oxd-grid-item--gutters user-password-cell']//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@type='password']"
        this.ConfirmPassword = "//div[@class='oxd-grid-item oxd-grid-item--gutters']//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@type='password']"
        this.UserValidation = "//span[normalize-space()='Already exists']"
        this.SaveUserButton = "//button[normalize-space()='Save']"
        this.CancelUserButton = "//button[normalize-space()='Cancel']"
        this.UserSearchBox = "//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']"
        this.AdvSearchButton = "//button[normalize-space()='Search']"
        this.EditUserButton = "//i[@class='oxd-icon bi-pencil-fill']"
        this.ChangePasswordCheckbox = "//i[@class='oxd-icon bi-check oxd-checkbox-input-icon']"
        this.ChangeUserPassword = "//div[@class='oxd-grid-item oxd-grid-item--gutters user-password-cell']//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@type='password']"
        this.DeletButton = "//button[.//i[contains(@class,'bi-trash')]]"
        this.ConfirmationModalYesButton = "//button[normalize-space()='Yes, Delete']"
        this.ConfirmUserPassword = "//div[@class='oxd-grid-item oxd-grid-item--gutters']//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@type='password']"
    }
    async AddUser(){
        await this.page.locator(this.Adminlink).click();
        await this.page.locator(this.AddUserButton).click();
        await this.page.locator(this.UserRoleDropdown).click();
        const Role = await this.page.$$(this.UserRoleDropdownAllOptions);
        for(const Rol of Role){
           const Roleval = await Rol.textContent()
           if(Roleval.includes(AdminTestData.UserRole)){
            await Rol.click();
            break;
           }
        }
        await this.page.locator(this.UserRoleFill).fill(AdminTestData.UserRoleFill);
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector(this.UserNamesAll, { state: 'visible', timeout: 5000 });
        const Empname = await this.page.$$(this.UserNamesAll);
        for(const Empname1 of Empname){
            const Empname2 = await Empname1.textContent();
            if(Empname2.includes(AdminTestData.UserName)){
                await Empname1.click();
                break;
            }
        }
        await this.page.locator(this.StatusDropdown).click();
        const status = await this.page.$$(this.StatusDropdownAllOptions);
        for(const status1 of status){
            const status2 =await status1.textContent();
            if(status2.includes(AdminTestData.UserStatus)){
                await status1.click();
                break
            }
        }
        await this.page.locator(this.AddUserName).fill(AdminTestData.UserAddName);
        await this.page.locator(this.Password).fill(AdminTestData.UserPassword);
        await this.page.locator(this.ConfirmPassword).fill(AdminTestData.UserConfirmPassword);
        const validation = await this.page.locator(this.UserValidation)
        await this.page.locator(this.SaveUserButton).click();
        await this.page.waitForTimeout(5000)
    }
    async EditUser(){
        await this.page.locator(this.Adminlink).click();
        await this.page.locator(this.UserSearchBox).fill(AdminTestData.UserAddName);
        await this.page.locator(this.AdvSearchButton).click();
        // wait for the edit icon to be visible, then click it
        await this.page.waitForSelector(this.EditUserButton, { state: 'visible', timeout: 5000 });
        const editIcon = this.page.locator(this.EditUserButton).first();
        await editIcon.click();   // <-- call .click()

        await this.page.locator(this.ChangePasswordCheckbox).click();
        await this.page.locator(this.ChangeUserPassword).fill(AdminTestData.UserNewPassword);
        await this.page.locator(this.ConfirmUserPassword).fill(AdminTestData.UserNewConfirmPassword);
        await this.page.waitForTimeout(5000);
        const saveBtn = this.page.locator(this.SaveUserButton);
        await saveBtn.waitFor({ state: 'visible', timeout: 5000 });
        await saveBtn.click();
        }
    async DeleteUser(){
        await this.page.locator(this.Adminlink).click();
        await this.page.locator(this.UserSearchBox).fill(AdminTestData.UserAddName)
        await this.page.locator(this.AdvSearchButton).click();
         await this.page.waitForTimeout(5000);
        await this.page.on("dialog", async(dialog)=>{

        if (dialog.type() === 'confirm') await dialog.accept();
    })
        const trashButton = this.page.locator(this.DeletButton).first();
        await trashButton.click();
        await this.page.waitForTimeout(5000);
       await this.page.locator(this.ConfirmationModalYesButton).click();     

    }

    }

