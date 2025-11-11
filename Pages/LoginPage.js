exports.LoginPage = class LoginPage
{

    constructor(page){
        this.page = page;
        //this.url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
        this.usernamexpath = "input[name = 'username']"
        this.passwordxpath = "input[name = 'password']"
        this.buttonxpath = "button[class = 'oxd-button oxd-button--medium oxd-button--main orangehrm-login-button']"
    }
    async gotoLogin()
    {
    `await page.goto('/')`
    }
   async Login(username, password)
    {
    await this.page.locator(this.usernamexpath).fill(username)
    await this.page.locator(this.passwordxpath).fill(password)
    await this.page.locator(this.buttonxpath).click()
    }
    async Logout(){
        await this.page.locator("//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();
        await this.page.locator("//a[normalize-space()='Logout']").click();
    }
}