using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BusinessObjects.Migrations
{
    /// <inheritdoc />
    public partial class sthchange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Libraries_LibraryId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_LibraryId",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Libraries_UserId",
                table: "Libraries",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Libraries_Users_UserId",
                table: "Libraries",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Libraries_Users_UserId",
                table: "Libraries");

            migrationBuilder.DropIndex(
                name: "IX_Libraries_UserId",
                table: "Libraries");

            migrationBuilder.CreateIndex(
                name: "IX_Users_LibraryId",
                table: "Users",
                column: "LibraryId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Libraries_LibraryId",
                table: "Users",
                column: "LibraryId",
                principalTable: "Libraries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
