/*
 * Example smart contract written in RUST
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://near-docs.io/develop/Contract
 *
 */
/*
Also an alternative to approach is to place an implementation of all vectors 
*/
use std::vec;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::{near_bindgen, env, Promise, AccountId};

// Define the default message
// const DEFAULT_MESSAGE: &str = "Hello";

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize,BorshSerialize)]
#[derive(Debug)]
#[derive(Clone)]
pub struct Student{
    name :String,
    course: String,
    reg_no: String,
    age : i16,
    admyear: i32,
    year: i16
}
#[near_bindgen]
#[derive(BorshDeserialize,BorshSerialize)]
#[derive(Debug)]
#[derive(Clone)]
pub struct Studcoll {
    vecstudent: Vec<Student>,
 }
#[near_bindgen]
#[derive(BorshDeserialize,BorshSerialize)]
#[derive(Clone)]
pub struct Course {
    identity: i32,
    name: String,
}
#[near_bindgen]
#[derive(BorshDeserialize,BorshSerialize)]
pub struct  Courses{
    courses_vec : Vec<Course>
}

#[near_bindgen]
#[derive(BorshDeserialize,BorshSerialize)]
#[derive(Clone)]
pub struct Finance{
    reg_no: String,
    total_fee:f64,
    paid_amount:f64,
    active_balance: f64,
    
}
#[near_bindgen]
#[derive(BorshDeserialize,BorshSerialize)]
pub struct Finances{
    finances_vec : Vec<Finance>
}


#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct App {
    //key is the signer id 
    students:LookupMap<AccountId,Studcoll>,
    courses: LookupMap<AccountId,Courses>,
    payments:LookupMap<AccountId,Finances>,
    
}
// define default for the student collection
impl Default for Studcoll{
    fn default() -> Self {
        Self{
            vecstudent: vec![],
        }
    }
}
// define default for the Units to be added
impl  Default for Courses {
    fn default() -> Self {
        Self { 
            courses_vec: vec![],
        }
    }
}
// define default for the finance records
impl  Default for Finances {
    fn default() -> Self {
        Self { 
            finances_vec: vec![] 
        }
    }
}

// Define the default, which automatically initializes the contract
impl Default for App{
    fn default() -> Self{
        Self{
            students:LookupMap::new(b"m"),
            courses: LookupMap::new(b"m"),
            payments:LookupMap::new(b"m"),
        }
    }
}
// implement student collection struct

#[near_bindgen]
impl Studcoll {
    #[result_serializer(borsh)]
    pub fn new_stud() -> Self {
        Self {
            vecstudent: vec![]
        }
    }
    pub fn add(&mut self,name :String,
        course: String,
        reg_no: String,
        age : i16,
        admyear: i32,
        year: i16) {
        let new_student: Student = Student{
            name,
            course,
            reg_no,
            age,
            admyear,
            year,
        };
        self.vecstudent.push(new_student);
    }
    #[result_serializer(borsh)]
    pub fn remove(&mut self, index: u64) -> Student {
        let size: u64 = self.vecstudent.len() as u64;
        assert!(size > 0 && index < size, "Invalid car id!");
        self.vecstudent.remove(index as usize)
    }
    #[result_serializer(borsh)]
    pub fn display(&self, start: u32, limit: u32) -> Vec<Student> {
        let result: Vec<Student> = self.vecstudent.iter().skip(start as usize).take(limit as usize).cloned().collect();
        result
    }
}

#[near_bindgen]
impl Courses {
    
    #[result_serializer(borsh)]
    pub fn init_course() -> Self {
        Self { 
            courses_vec: vec![],
        }
    }
    pub fn add_c(&mut self, identity: i32,name: String,){
        let new_course = Course{
            identity,
            name,
        };
        self.courses_vec.push(new_course);
    }
    #[result_serializer(borsh)]
    pub fn display_c(&self, start: u32, limit: u32) -> Vec<Course> {
        let result: Vec<Course> = self.courses_vec.iter().skip(start as usize).take(limit as usize).cloned().collect();
        result
    }
    #[result_serializer(borsh)]
    pub fn course_remove(&mut self, index: u64) -> Course {
        let size: u64 = self.courses_vec.len() as u64;
        assert!(size > 0 && index < size, "Invalid Unit id!");
        self.courses_vec.remove(index as usize)
    }
}
#[near_bindgen]
impl Finances {
    #[result_serializer(borsh)]
    pub fn init_finance() -> Self {
        Self { 
            finances_vec:vec![],
        }
    }
    pub fn add_f(&mut self, reg_no: String,
        total_fee:f64,
        paid_amount:f64,
        ){
        let new_payment = Finance{
            reg_no,
            total_fee,
            paid_amount,
            active_balance: total_fee -paid_amount,
        };
        self.finances_vec.push(new_payment);
    }
    #[result_serializer(borsh)]
    pub fn display_f(&self, start: u32, limit: u32) -> Vec<Finance> {
        let result: Vec<Finance> = self.finances_vec.iter().skip(start as usize).take(limit as usize).cloned().collect();
        result
    }
    #[result_serializer(borsh)]
    pub fn remove_payment(&mut self, index: u64) -> Finance {
        let size: u64 = self.finances_vec.len() as u64;
        assert!(size > 0 && index < size, "Invalid Unit id!");
        self.finances_vec.remove(index as usize)
    }
}
// Implement the App structure
#[near_bindgen]
impl App {

    #[payable]
    pub fn add_student(
        &mut self,
        name :String,
        course: String,
        reg_no: String,
        age : i16,
        admyear: i32,
        year: i16
    ){
        //get signer wallet address at this point school         
        let signer = env::predecessor_account_id();
        // get attached deposit 
        let attached_deposit = env::attached_deposit();
        //get our Initial storage 
        let initial_storage =env::storage_usage();
        //check if their is a school signer account 
        if let Some(mut stud_in_school) =self.students.get(&signer)  {
            // updating record of a new student 
            stud_in_school.add(name, course, reg_no, age, admyear, year);
            self.students.insert(&signer, &stud_in_school);
            self.pay_for_storage(initial_storage, attached_deposit);
        }else {
            //initialize a new user object 
            let mut stud_in_school = Studcoll::new_stud();
            //creating a new student
            stud_in_school.add(name, course, reg_no, age, admyear, year);
            self.students.insert(&signer, &stud_in_school);
            self.pay_for_storage(initial_storage, attached_deposit);
        }
    }
   
    #[result_serializer(borsh)]
    //Rust default uses serde serialization but below here we declare we want to use borsh serialization explicity
    pub fn get_student(&self , start: u32 , limit: u32)->Option<Vec<Student>>{
        let signer = env::predecessor_account_id();
        // let mut student_obj: Student;

        if let Some(c_student) = self.students.get(&signer){
            // get a list of students in student sollection
            let vstudents:Vec<Student> = c_student.display(start,limit);
            //return the list
            Some(vstudents)
        } else {
            //return empty list
            Some(vec![])
        }

    }
    #[result_serializer(borsh)]
    pub fn delete_student(&mut self,id:u64)->Option<Student>{
        // Get user account id
        let signer = env::predecessor_account_id();

        // Get initial storage space occupied
        let initial_storage = env::storage_usage();

        if let Some(mut stud_in_school) =self.students.get(&signer){
            //delete student object 
            let removed_student =  stud_in_school.remove(id);
            //update object in blockchain
            self.students.insert(&signer, &stud_in_school);
            // credit back the tokens unlocked after releasing storage space 
            self.refund_storage_cost(initial_storage);

            Some (removed_student)
        }else {
            //return a Null
            None
        }
    }
    // #[result_serializer(borsh)]
    // pub fn display(&self, start: u32, limit: u32) -> Vec<Student> {
    //     let result: Vec<Student> = self.vecstudent.iter().skip(start as usize).take(limit as usize).cloned().collect();
    //     result
    //    }
    pub fn pay_for_storage(&mut self, initial_storage:u64 , attached_storage_cost:u128){
        //get current storage
        let current_storage =env::storage_usage();
        //get storage used
        let storage_used = current_storage - initial_storage;
        // get storage cost per byte 
        let storage_cost = env::storage_byte_cost();
        if let Some(total_storage_cost) = storage_cost.checked_mul(storage_used as u128) {
            //check if user attached enough tokens to cater for storage 
            assert!(attached_storage_cost<=total_storage_cost,"Insufficient funds");
            //check for balance 
            let excess_balance =  total_storage_cost - attached_storage_cost ;
            if excess_balance > 0{
                // returnexcess tokens to user
                self.return_excess_tokens(excess_balance);
            }            
        }
    }
    
    // sends back excess tokens to user 

    pub fn return_excess_tokens(&self,excess_balance:u128){
        //Get signer address
        let signer = env::predecessor_account_id();

        //send back excess
        Promise::new(signer).transfer(excess_balance);
    }

    pub fn refund_storage_cost(&self, initial_storage: u64) {
        // Get current storage space
        let current_storage = env::storage_usage();

        // Compute storage space released
        let storage_released = initial_storage - current_storage;

        // Get storage unit price (per byte)
        let storage_unit_price = env::storage_byte_cost();

        // Compute total refundable storage cost
        if let Some(refundable_storage_cost) = storage_unit_price.checked_mul(storage_released.into()) {
            // Transfer to user wallet address
            self.return_excess_tokens(refundable_storage_cost);
        } else {
            panic!("Error calculating storage cost");
        }
    }

   
    pub fn add_course(&mut self ,identity: i32,
        name: String){
         //get signer wallet address at this point school         
         let signer = env::predecessor_account_id();
        // check for an existing unit 
        if let Some(mut valid_course) = self.courses.get(&signer)  {
            // updating  record of a unit
            valid_course.add_c(identity, name);
            self.courses.insert(&signer, &valid_course);
        } else {
            let mut valid_course = Courses::init_course();
            valid_course.add_c(identity, name);
            self.courses.insert(&signer, &valid_course);
        }
    }

    #[result_serializer(borsh)]
    pub fn get_courses(&self,start: u32,limit: u32)-> Option<Vec<Course>>{
        //get signer wallet address at this point school         
        let signer = env::predecessor_account_id();
        //checking for an existing key
        match self.courses.get(&signer) {
            Some(v_course) => {
                let vcourses:Vec<Course> = v_course.display_c(start, limit);
                Some(vcourses)
            }
            None => Some(vec![]),
        }
    } 
    
    #[result_serializer(borsh)]
    pub fn  delete_course(& mut self, index: u64)-> Option<Course>{
         // Get user account id
         let signer = env::predecessor_account_id();
         match self.courses.get(&signer) {
            Some(mut v_course) => {
                //delete student object 
                let removed_course =  v_course.course_remove(index);
                //update object in blockchain
                self.courses.insert(&signer, &v_course);

                Some (removed_course)
            }
            None => {
                    //return a Null
                    None
                }
        }
    }
   
   pub fn add_payment(&mut self,  reg_no: String,
    total_fee:f64,
    paid_amount:f64,
    ){
          //get signer wallet address at this point school         
          let signer = env::predecessor_account_id();
            //check if their is a school signer account 
        if let Some(mut entry_payment) =self.payments.get(&signer)  {
            // updating record of a new payment
            entry_payment.add_f(reg_no, total_fee, paid_amount);
            self.payments.insert(&signer, &entry_payment);
        }else {
            //initialize a new user object 
            let mut entry_payment = Finances::init_finance();
            //creating a new payment
            entry_payment.add_f(reg_no, total_fee, paid_amount);
            self.payments.insert(&signer, &entry_payment);
        }
   }
   #[result_serializer(borsh)]
   pub fn get_payments(&self,start: u32,limit: u32)-> Option<Vec<Finance>>{
       //get signer wallet address at this point school         
       let signer = env::predecessor_account_id();
       //checking for an existing key
       if let Some(v_payment) = self.payments.get(&signer) {
           let vpayments:Vec<Finance> = v_payment.display_f(start, limit);
           Some(vpayments)
        } else {
        Some(vec![])
        }
   } 
   #[result_serializer(borsh)]
    pub fn  delete_payment(& mut self, index: u64)-> Option<Finance>{
         // Get user account id
         let signer = env::predecessor_account_id();
         match self.payments.get(&signer) {
            Some(mut v_payment) => {
                //delete student object 
                let removed_payment =  v_payment.remove_payment(index);
                //update object in blockchain
                self.payments.insert(&signer, &v_payment);

                Some (removed_payment)
            }
            None => {
                    //return a Null
                    None
                }
        }
    }

   
    // //check signer
    // // pub fn check(&mut self , signer:AccountId )-> bool{
    // //    return self.students.contains_key(&signer);
    // // }
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 */
#[cfg(test)]
mod tests {
    use super::*;
    // use near_sdk::test_utils::VMContextBuilder;
    // use near_sdk::{testing_env,VMContext};

    // fn get_context(is_view:bool)->VMContext{
    //     VMContextBuilder::new().signer_account_id("joe.near".parse().unwrap())
    //     .is_view(is_view).attached_deposit(1000000000000000000000000).build()
    // }
    #[test]
    fn add_student(){
        // let context = get_context(false);
        // testing_env!(context);
        // let mut scontract = Studcoll::default();

        let mut acontract =App::default();
        //adding a student
        acontract.add_student("Jerry".to_owned(), "ASR".to_owned(), "BSEC/342".to_owned(), 34, 2003, 3);
        acontract.add_student("Joseph".to_owned(), "PRED".to_owned(), "BSEC/356".to_owned(), 21, 2007, 1);
        if let Some(c_students) = acontract.get_student(0, 3) {
            assert_eq!(2,c_students.len())
        }else {
            panic!("Not the actual count length")
        }
    }

    #[test]
    fn get_student (){

    }
    #[test]
    fn delete_student(){
        let mut acontract =App::default();
        //adding a student 
        acontract.add_student("Jerry".to_owned(), "ASR".to_owned(), "BSEC/342".to_owned(), 34, 2003, 3);
        acontract.add_student("Joseph".to_owned(), "PRED".to_owned(), "BSEC/356".to_owned(), 21, 2007, 1);
        if let Some(c_students) = acontract.get_student(0, 3) {
            assert_eq!(2,c_students.len())
        }else {
            panic!("Not the actual count length")
        }
        //deleting a student
        acontract.delete_student(1);

        if let Some (c_students) = acontract.get_student(0, 3)  {
            assert_eq!(1, c_students.len());
        } else {
            panic!("Error reading Vector");
        }
    }
    #[test]
    fn add_course(){
        // let context = get_context(false);
        // testing_env!(context);
        // let mut scontract = Studcoll::default();

        let mut acontract =App::default();
        //adding a student
        acontract.add_course(2, "Computer Science".to_owned());
        acontract.add_course(4, "Civil Engineering".to_owned());
        acontract.add_course(5, "Architecture".to_owned());
        if let Some(c_courses) = acontract.get_courses(0,5) {
            assert_eq!(3,c_courses.len())
        }else {
            panic!("Not the actual count length")
        }
    }
    #[test]
    fn delete_course(){
        let mut acontract =App::default();
        //adding a student
        acontract.add_course(2, "Computer Science".to_owned());
        acontract.add_course(4, "Civil Engineering".to_owned());
        acontract.add_course(5, "Architecture".to_owned());
        if let Some(c_courses) = acontract.get_courses(0,5) {
            assert_eq!(3,c_courses.len())
        }else {
            panic!("Not the actual count length")
        }
        //deleting a student
        acontract.delete_course(2);

        if let Some (c_courses) = acontract.get_courses(0,5)  {
            assert_eq!(2, c_courses.len());
        } else {
            panic!("Error reading Vector");
        }
    }

    #[test]
    fn add_payment(){
        // let context = get_context(false);
        // testing_env!(context);
        // let mut scontract = Studcoll::default();

        let mut acontract =App::default();
        //adding a payment record 
        acontract.add_payment("BSEC/342".to_owned(), 27000.65, 7000.25);
        if let Some(c_payment) = acontract.get_payments(0,5) {
            assert_eq!(1,c_payment.len())
        }else {
            panic!("Not the actual count length")
        }
    }
    #[test]
    fn delete_pay(){
        let mut acontract =App::default();
        //adding a payment record 
        acontract.add_payment("BSEC/342".to_owned(), 27000.65, 7000.25);
        if let Some(c_payment) = acontract.get_payments(0,5) {
            assert_eq!(1,c_payment.len())
        }else {
            panic!("Not the actual count length")
        }
        //deleting a student
        acontract.delete_payment(0);

        if let Some (c_payment) = acontract.get_payments(0,5)  {
            assert_eq!(0, c_payment.len());
        } else {
            panic!("Error reading Vector");
        }
    }

}
