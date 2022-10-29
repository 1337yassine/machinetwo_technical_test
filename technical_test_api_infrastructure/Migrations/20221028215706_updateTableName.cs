using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace technical_test_api_infrastructure.Migrations
{
    public partial class updateTableName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Utilisateurs_UserId",
                table: "Roles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Utilisateurs",
                table: "Utilisateurs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Roles",
                table: "Roles");

            migrationBuilder.RenameTable(
                name: "Utilisateurs",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "Roles",
                newName: "Notes");

            migrationBuilder.RenameIndex(
                name: "IX_Roles_UserId",
                table: "Notes",
                newName: "IX_Notes_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Notes",
                table: "Notes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Users_UserId",
                table: "Notes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Users_UserId",
                table: "Notes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Notes",
                table: "Notes");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "Utilisateurs");

            migrationBuilder.RenameTable(
                name: "Notes",
                newName: "Roles");

            migrationBuilder.RenameIndex(
                name: "IX_Notes_UserId",
                table: "Roles",
                newName: "IX_Roles_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Utilisateurs",
                table: "Utilisateurs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Roles",
                table: "Roles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Utilisateurs_UserId",
                table: "Roles",
                column: "UserId",
                principalTable: "Utilisateurs",
                principalColumn: "Id");
        }
    }
}
