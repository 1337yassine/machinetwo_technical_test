using System;

namespace technical_test_api_infrastructure.Models
{
    public class Note
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime date { get; set; }
    }
}