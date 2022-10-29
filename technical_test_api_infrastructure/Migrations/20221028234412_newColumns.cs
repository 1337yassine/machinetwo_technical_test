using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace technical_test_api_infrastructure.Migrations
{
    public partial class newColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Notes",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Notes");
        }
    }
}
