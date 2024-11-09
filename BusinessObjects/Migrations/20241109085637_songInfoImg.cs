using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BusinessObjects.Migrations
{
    /// <inheritdoc />
    public partial class songInfoImg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Users",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 9),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 7));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Tracks",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 9),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 7));

            migrationBuilder.AddColumn<string>(
                name: "SongInfoImg",
                table: "Tracks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "TrackPlayLists",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 9),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 7));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Playlists",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 9),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 7));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Library_Playlists",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 9),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 7));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Library_Artists",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 9),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 7));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Library_Albums",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 9),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 7));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Libraries",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 9),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 7));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Artists",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 9),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 7));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Albums",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 9),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 7));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SongInfoImg",
                table: "Tracks");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Users",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 7),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 9));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Tracks",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 7),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 9));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "TrackPlayLists",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 7),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 9));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Playlists",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 7),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 9));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Library_Playlists",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 7),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 9));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Library_Artists",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 7),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 9));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Library_Albums",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 7),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 9));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Libraries",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 7),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 9));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Artists",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 7),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 9));

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateDate",
                table: "Albums",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(2024, 11, 7),
                oldClrType: typeof(DateOnly),
                oldType: "date",
                oldDefaultValue: new DateOnly(2024, 11, 9));
        }
    }
}
