import{test, expect} from '@playwright/test';
import {LoginPage} from '../Pages/LoginPage';
import {PIMPage} from '../Pages/PIMPage';
import{AdminPage} from '../Pages/AdminPage';
import{RecruitmentPage} from '../Pages/RecruitmentPage';

let login, PIM1, Admin1, recruitment1;

test.setTimeout(120000);

test.describe.serial('test Suite', () => {
test.beforeEach('test', async ({page}) => {
    login = new LoginPage(page); 
    await login.gotoLogin();
    await login.Login('Admin', 'admin123');
    PIM1 = new PIMPage(page);
    Admin1 = new AdminPage(page);
    recruitment1 = new RecruitmentPage(page);

});
test.afterEach('test', async () => {
await login.Logout();
})
test('Add Emp@Employee', async () => {
await PIM1.AddEmp();
})
test('Edit Emp@Employee', async () => {
await PIM1.EditEmp();
})
test('Delete Emp@Employee', async () => {
await PIM1.DeleteEmp();
})
test('Add User@User', async () => {
await Admin1.AddUser();
})
test('Edit User@User', async () => {
await Admin1.EditUser();
})
test('Delete User@User', async () => {
await Admin1.DeleteUser();
})
test('Add Recruiter@Recruiter', async () => {
await recruitment1.AddRecruiter();
})
test('Edit Recruiter@Recruiter', async () => {
await recruitment1.EditRecruiter();
})
test('Delete Recruiter@Recruiter', async () => {
await recruitment1.DeleteRecruiter();
})
})
