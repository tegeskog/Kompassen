﻿namespace WU15.StudentAdministration.Web.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Ssn { get; set; }
        public bool Aktive_student { get; set; }
    }
}