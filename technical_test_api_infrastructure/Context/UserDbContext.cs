using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using technical_test_api_infrastructure.Models;

namespace technical_test_api_infrastructure.Context
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        public DbSet<Note> Notes { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }


    }
}