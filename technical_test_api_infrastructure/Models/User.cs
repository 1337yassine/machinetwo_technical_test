namespace technical_test_api_infrastructure.Models
{
    public class User
    {
        public Guid Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public bool IsAdmin { get; set; }

        public ICollection<Note>? notes { get; set; }
    }
}